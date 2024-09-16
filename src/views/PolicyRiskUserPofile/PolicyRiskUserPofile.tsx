import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import RiskSelectField from '../../components/common/TextField/riskSelectField'
import TextField from '../../components/common/TextField'
import InsureProUserInfom from '../../components/global/RiskPolicyUserInfom/RiskPolicyUserInfom'
import { UserContext } from '../../App'
import Score from '../Dashboard/Score'
import Attachment from '../../components/common/Attachment'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import { useNavigate, useParams } from 'react-router-dom'
import TextFieldS from '../../components/common/TextFieldS'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import AttachmentPreview from '../../components/common/AttachmentPreview/AttachmentPreview'
import Popup from '../../components/templates/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { createDateString } from '../../utils/dateTime'
import { findObjectById, removeItemFromArray } from '../../utils/helpers'
import { getCurrentDateTime } from '../../utils/dateTime'
import { convertJsonToString } from '../../utils/helpers'
import { uploadJsonData } from '../../lighthouse'
import { openAlert, closeAlert } from '../..//redux/alerts'
import { getUserData, modifyPolicy, get_covers, getPolicyData } from '../../api'
import {
  switchCoverModifyState,
  switchKYCReviewerModify,
  updateCoverQuote,
  getCoverDetails,
} from '../../database'
import lighthouse from '@lighthouse-web3/sdk'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import Rules from '../../components/common/FileUpload/Rules'
import { setCoverApplications, setKYCReviewerApplicants } from '../../redux/kyc'
import calculatePremiumQuote from '../../utils/premiumSimulator'

interface Document {
  link: string
  name: string
}

// Cover Durations
const coverDurations = ['2 weeks', '30 days', '90 days', '180 days', '365 days']

// Finds the index of the duration
function findIndex(array: any, searchText: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === searchText) {
      return i // Return index if match found
    }
  }
  return -1 // Return -1 if no match found
}

function RiskPolicyUserProfile() {
  const { theme } = React.useContext(UserContext)
  const { coverApplications } = useSelector((state: any) => state.kyc)
  const { user } = useSelector((state: any) => state.user)
  const { account, library } = useWeb3React()
  const [popup, setPopup] = useState(false)
  const togglePopup = () => setPopup((v) => !v)
  let { coverId } = useParams()
  let navigate = useNavigate()
  const [applicant, setApplicant] = useState(
    findObjectById(coverApplications, coverId)
  )
  console.log('Applicant: ', applicant)
  const [canModify, setCanModify] = useState(false)
  const [formState, setFormState] = useState(applicant)
  const [summaryData, setSummaryData] = useState({
    purchase: '---',
    coverId: '---',
    status: '---',
    claimId: '---',
    claimAmout: '---',
    claimHistory: '---',
    PRP: '---',
  })
  const [formFilled, setFormFilled] = useState(true)
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0) // Tracks progress for each file
  const [selectedDocument, setSelectedDocument] = useState(
    applicant.documents[0]
  )
  const [documentsDisplayed, setDocumentsDisplayed] = useState(
    applicant.documents
  )
  const originalFilesLength = applicant.documents.length

  const [currentIcon, setcurrentIcon] = useState('')
  const titleClassName = 'fw-400 fs-13 lh-15 text-light-800 dark:text-dark-600'
  const textClassName = 'fw-500 fs-13 lh-15 text-light-800 dark:text-dark-600'

  // Generic change handler for all inputs
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function areAllValuesFilled(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === '') {
        return false // If any value is not an empty string, return false
      }
    }
    return true // All values are empty strings
  }

  type ProgressData = {
    total: number
    uploaded: number
  }

  const progressCallback = (progressData: ProgressData) => {
    let percentageDone = Math.round(
      (progressData?.uploaded / progressData?.total) * 100
    )
    setUploadProgress(percentageDone)
  }

  //Uploads File to IPFS
  const uploadFile = async (file: any) => {
    console.log(file)
    const output = await lighthouse.upload(
      file,
      process.env.REACT_APP_LIGHTHOUSE_API_KEY as string,
      false,
      undefined,
      progressCallback
    )
    const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    const currentDocuments: Document[] = [...formState.reviewerDocuments]
    currentDocuments.push({
      link: link,
      name: file[0].name,
    })
    setFormState((prevState: any) => ({
      ...prevState,
      reviewerDocuments: currentDocuments,
    }))
  }

  const removeFile = (document: Document) => {
    console.log(formState.reviewerDocuments)
    const newArray = removeItemFromArray(
      formState.reviewerDocuments,
      document.link
    )
    console.log(newArray)
    setFormState((prevState: any) => ({
      ...prevState,
      reviewerDocuments: newArray,
    }))
    setDocumentsDisplayed(newArray)
  }

  const handleFileRemove = (index: number) => {
    const newArray = removeItemFromArray(
      formState.documents,
      formState.documents[originalFilesLength + index].link
    )
    setFormState((prevState: any) => ({
      ...prevState,
      documents: newArray,
    }))
    var newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
  }

  const handleFileChange = async (event: any) => {
    const files = event.target.files
    const updatedFiles = [...selectedFiles]

    for (let i = 0; i < files.length; i++) {
      updatedFiles.push(files[i])
    }

    // const encryptedFile = await encryptAndHandleFile(files[0])
    // console.log(encryptedFile)
    // const decryptedFile = await decryptAndHandleFile(encryptedFile)
    // console.log(decryptedFile)

    setSelectedFiles(updatedFiles)
    uploadFile(files)
  }

  // Handle form submission
  const handleSubmit = async () => {
    const date = getCurrentDateTime()
    setFormState((prevState: any) => ({
      ...prevState,
      date: date,
    }))
    setFormState((prevState: any) => ({
      ...prevState,
      address: account,
    }))
    const formFilled = areAllValuesFilled(formState)
    setFormFilled(formFilled)
    console.log(formFilled)

    if (formFilled) {
      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const formData = {
        ...formState,
        date: date,
        address: account,
        region: 'NG',
      }
      const dataString = convertJsonToString(formData)
      const userData = await uploadJsonData(dataString)

      const durationIndex = findIndex(coverDurations, formData.coverDuration)

      const premiumQuote = calculatePremiumQuote(formData)

      //Come update this after redeploying
      const hash = await modifyPolicy(
        'Car Insurance',
        userData,
        durationIndex,
        dispatch
      )

      if (hash) {
        await updateCoverQuote(account, 'Car Insurance', premiumQuote)

        dispatch(
          openAlert({
            displayAlert: true,
            data: {
              id: 1,
              variant: 'Successful',
              classname: 'text-black',
              title: 'Submission Successful',
              tag1: 'Cover application modified',
              tag2: 'modfifications made',
              hash: hash,
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
        setApplicant(formData)
        switchCoverModifyState(applicant.address, applicant.poolName).then(
          () => {
            var temp = [...coverApplications]
            var placeholder = {}
            for (var i = 0; i < temp.length; i++) {
              if (temp[i].id === applicant.id) {
                placeholder = {
                  ...temp[i],
                  canModify: !temp[i].canModify,
                }
                temp.splice(i, 1)
                i--
              }
            }
            temp.push(placeholder)
            dispatch(setCoverApplications({ data: temp }))
          }
        )
        // })
        // .catch((error) => {
        //   console.log('Error fetching IP address information: ', error)
        // })
      }
    }
  }

  useEffect(() => {
    const preLoad = async () => {
      const covers = await get_covers('Car')
      var temp = findObjectById(covers, coverId)
      const userData = await getUserData(temp.address)
      const coverFirebaseDetails = await getCoverDetails(
        temp.address,
        temp.poolName
      )
      const policyData = await getPolicyData(temp.address, temp.poolName)
      temp = { ...userData, ...coverFirebaseDetails, ...temp, ...policyData }

      const summaryData = {
        purchase: temp.purchaseDate || '---',
        coverId: temp.coverId || '---',
        status: temp.status || '---',
        claimId: temp.claimId || '---',
        claimAmout: temp.claimAmount || '---',
        claimHistory: '---',
        PRP: `${temp.PRP} %` || '---',
      }
      setApplicant(temp)
      setSummaryData(summaryData)
      console.log(temp)
      console.log(account)
      if (temp.canModify && temp.address === account?.toLowerCase()) {
        setCanModify(true)
      } else {
        setCanModify(false)
      }
    }

    preLoad()
  }, [coverApplications, account, coverId])

  return (
    <>
      <Header name="Policy Risk" showBackAero={true} />
      <div className="items-center justify-between hidden mb-5 sm:flex">
        <Button
          onClick={() => navigate(-1)}
          icon={
            theme === 'dark'
              ? '/images/leftBlackAero.svg'
              : '/images/Mask (2ss).svg'
          }
          className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800 black-btn"
          text="Back"
        />
        <Link
          to="/"
          className={
            theme === 'dark'
              ? 'text-lg font-bold text-dark-800'
              : 'text-lg font-bold text-brand-300'
          }
        >
          How it works
        </Link>
      </div>
      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow mb-[50px]">
          <InsureProUserInfom variant="customer" user={applicant} />
          <div className="flex-grow mb-[50px] mt-[20px]">
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <b className="font-normal text-3xl mb-2.5 block">
                  Vehicule Details
                </b>
                <p className="text-lg text-dark-650 ">
                  Your personal information is never shared with other users.
                </p>
              </div>
              {/* text-dark-650 flex-grow 
              text-white bg-dark-800 rounded h-[40px] text-lg py-3 w-full px-5 */}
              <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                  <RiskSelectField
                    labelIcon={false}
                    label="Make"
                    placeholder="Please Select"
                    filled={formFilled}
                    name="make"
                    handleChange={handleChange}
                    initialValue={applicant.make}
                    disabled={!canModify}
                  />
                  <RiskSelectField
                    labelIcon={false}
                    label="Model"
                    placeholder="Please Select"
                    carMake={formState.make}
                    filled={formFilled}
                    name="model"
                    handleChange={handleChange}
                    initialValue={applicant.model}
                    disabled={!canModify}
                  />
                </div>
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                  <RiskSelectField
                    labelIcon={false}
                    label="Year of Manufacture"
                    placeholder="YYYY"
                    filled={formFilled}
                    name="yearManufactured"
                    handleChange={handleChange}
                    initialValue={applicant.yearManufactured}
                    disabled={!canModify}
                  />
                  {/* <RiskSelectField
                    labelIcon={false}
                    label="Type of Fuel "
                    placeholder="Please Select"
                  /> */}
                </div>
                <RiskSelectField
                  labelIcon={true}
                  label="Engine Size"
                  placeholder="Please Select"
                  filled={formFilled}
                  name="engineSize"
                  handleChange={handleChange}
                  initialValue={applicant.engineSize}
                  disabled={!canModify}
                />
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                  <TextField
                    labelIcon={false}
                    label="Registration Number"
                    placeholder="654875236"
                    outline={true}
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    handleChange={handleChange}
                    filled={formFilled}
                    name="registrationNumber"
                    initialValue={applicant.registrationNumber}
                    disabled={!canModify}
                  />
                  <TextField
                    label="Insurable Value"
                    field="$"
                    placeholder="e.g. 5000"
                    outline={true}
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    handleChange={handleChange}
                    filled={formFilled}
                    name="insurableValue"
                    initialValue={applicant.insurableValue}
                    disabled={!canModify}
                  />
                </div>
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                  <RiskSelectField
                    labelIcon={true}
                    label="Estimated Annual Mileage"
                    placeholder="Please Select"
                    filled={formFilled}
                    name="annualMileage"
                    handleChange={handleChange}
                    initialValue={applicant.annualMileage}
                    disabled={!canModify}
                  />
                  <RiskSelectField
                    labelIcon={true}
                    label="Overnight Parking "
                    placeholder="Please Select"
                    filled={formFilled}
                    name="overnightParking"
                    handleChange={handleChange}
                    initialValue={applicant.overnightParking}
                    disabled={!canModify}
                  />
                </div>
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <b className="font-normal text-3xl mb-2.5 block">
                  Insured Details
                </b>
                <p className="text-lg text-dark-650 ">
                  Your personal information is never shared with other users.
                </p>
              </div>
              <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
                <RiskSelectField
                  labelIcon={true}
                  label="Cover Duration"
                  placeholder="Please Select"
                  filled={formFilled}
                  name="coverDuration"
                  handleChange={handleChange}
                  initialValue={applicant.coverDuration}
                  disabled={!canModify}
                />
                <RiskSelectField
                  labelIcon={true}
                  label="Cover Type"
                  placeholder="Please Select"
                  filled={formFilled}
                  name="coverType"
                  handleChange={handleChange}
                  initialValue={applicant.coverType}
                  disabled={!canModify}
                />
                <RiskSelectField
                  labelIcon={true}
                  label="Usage "
                  placeholder="Please Select"
                  filled={formFilled}
                  name="usage"
                  handleChange={handleChange}
                  initialValue={applicant.usage}
                  disabled={!canModify}
                />
                <RiskSelectField
                  labelIcon={true}
                  label="Security Measures"
                  placeholder="Please Select"
                  filled={formFilled}
                  name="securityMeasures"
                  handleChange={handleChange}
                  initialValue={applicant.securityMeasures}
                  disabled={!canModify}
                />
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                  <RiskSelectField
                    labelIcon={true}
                    label="Driving Offences"
                    placeholder="Please Select"
                    filled={formFilled}
                    name="drivingOffences"
                    handleChange={handleChange}
                    initialValue={applicant.drivingOffences}
                    disabled={!canModify}
                  />
                  <RiskSelectField
                    labelIcon={true}
                    label="Claim History"
                    placeholder="Please Select"
                    filled={formFilled}
                    name="claimHistory"
                    handleChange={handleChange}
                    initialValue={applicant.claimHistory}
                    disabled={!canModify}
                  />
                </div>
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                  <RiskSelectField
                    labelIcon={false}
                    label="Year of Obtaining Licence"
                    placeholder="YYYY"
                    filled={formFilled}
                    name="yearObtainedLicence"
                    handleChange={handleChange}
                    initialValue={applicant.yearObtainedLicence}
                    disabled={!canModify}
                  />
                  <TextField
                    labelIcon={false}
                    label="Driving Licence Number"
                    placeholder="e.g. RJ5852"
                    handleChange={handleChange}
                    filled={formFilled}
                    name="drivingLicenceNumber"
                    initialValue={applicant.drivingLicenceNumber}
                    disabled={!canModify}
                  />
                </div>
                <RiskSelectField
                  labelIcon={true}
                  label="Risk Address"
                  placeholder="Please Select"
                  filled={formFilled}
                  name="riskAddress"
                  handleChange={handleChange}
                  initialValue={applicant.riskAddress}
                  disabled={!canModify}
                />
                <RiskSelectField
                  label="Country/Region"
                  placeholder="e.g. California"
                  filled={formFilled}
                  name="country"
                  handleChange={handleChange}
                  initialValue={applicant.country}
                  disabled={!canModify}
                />
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                  <TextField
                    labelIcon={false}
                    label="ADDRESS LINE 1"
                    placeholder="e.g. 645 EShaw Ave"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    handleChange={handleChange}
                    filled={formFilled}
                    name="address1"
                    initialValue={applicant.address1}
                    disabled={!canModify}
                  />
                  <TextField
                    labelIcon={false}
                    label="ADDRESS LINE 2"
                    placeholder="e.g.  Fresco, ca 93710"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    handleChange={handleChange}
                    filled={formFilled}
                    name="address2"
                    initialValue={applicant.address2}
                    disabled={!canModify}
                  />
                  <TextField
                    labelIcon={false}
                    label="City"
                    placeholder="e.g. New York"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    handleChange={handleChange}
                    filled={formFilled}
                    name="city"
                    initialValue={applicant.city}
                    disabled={!canModify}
                  />
                  <TextField
                    labelIcon={false}
                    label="Post Code"
                    placeholder="e.g.  4450"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    handleChange={handleChange}
                    filled={formFilled}
                    name="postCode"
                    initialValue={applicant.postCode}
                    disabled={!canModify}
                  />
                </div>
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="flex justify-end">
              <Button
                className={`${
                  theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
                } font-medium px-8 max-[640px]:w-full disabled:opacity-10 disabled:pointer-events-none`}
                text="Save"
                disabled={!canModify}
                // color={theme === 'dark' ? 'btn-white' : 'grey-gradient'}
                onClick={canModify ? handleSubmit : () => null}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center hidden sm:flex">
          <div className="flex flex-col gap-5  sm:w-[285px] max-[640px]:w-full ">
            <h6 className="text-dark-300">Overview</h6>
            <div className="rounded bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <div className="mb-7">
                <WeightTitle title="Summary" />
              </div>
              <div className="flex items-center justify-between mb-7">
                <img
                  className="w-[35px] h-[35px]"
                  src={
                    theme === 'dark'
                      ? '/images/whiteCar.svg'
                      : '/images/lodgo.svg'
                  }
                  alt=""
                />
                <span className="font-medium text-dark-10 dark:text-dark-800">
                  Car insurance{' '}
                </span>
              </div>
              <div className="flex flex-col gap-[25px]">
                <WeightRow
                  name="Purchase"
                  value={summaryData.purchase}
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Cover ID"
                  value={summaryData.coverId}
                  valueStyle={{
                    color:
                      theme === 'dark'
                        ? 'text-[#6D6E76] hover:text-[#000]'
                        : 'hover:text-brand-400',
                  }}
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Status"
                  value={summaryData.status}
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim ID"
                  value={summaryData.claimId}
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim Amount"
                  value={summaryData.claimAmout}
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim History"
                  withInfo
                  value={summaryData.claimHistory}
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="PRP"
                  withInfo
                  value={summaryData.PRP}
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-3.5">
                <button
                  type="button"
                  className={` medium dark  dark:bg-white  square  button focus:bg-[#4C4D55] focus:border-[#4C4D55] border-[#4C4D55] border-2`}
                >
                  <span className="">Cancel</span>
                </button>
                <Button
                  to={`/chat/policy-NG-${applicant.id}`}
                  text="Contact User"
                  color={theme === 'dark' ? '' : 'dark'}
                  className="dark:bg-light-1100 focus:bg-[#4C4D55] "
                />
              </div>
            </div>
            <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <WeightTitle title="Attachments" />
              <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                {documentsDisplayed.map((document: any, index: number) => (
                  <>
                    <div className="flex justify-between">
                      <div className="flex basis-3/4 gap-[16px]">
                        <img src="/images/pin.svg" alt="" />
                        <Link
                          onClick={() => {
                            setSelectedDocument(document)
                            setPopup(true)
                          }}
                          className={`${
                            theme === 'dark'
                              ? 'font-bold text-[#606166] hover:text-[#000000]'
                              : 'text-white hover:text-[#50ff7f]'
                          } file-name `}
                          to={''}
                        >
                          {document.name}
                        </Link>
                      </div>
                      {canModify && (
                        <img
                          className="items-end w-[20px]"
                          src={
                            theme === 'dark'
                              ? '/images/downloadblack.svg'
                              : '/images/Remove (1).svg'
                          }
                          style={{ cursor: 'pointer' }}
                          alt=""
                          onClick={() => removeFile(document)}
                        />
                      )}
                    </div>
                  </>
                ))}
              </div>
              {canModify && (
                <div>
                  <label
                    className={`mb-[20px] mt-[15px] flex justify-center w-full  transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color w-full h-[40px]`}
                  >
                    <span className="flex items-center space-x-2">
                      <img
                        className="w-[14px] h-[16px]"
                        src="/images/uploadAeroBlack.svg"
                        alt=""
                      />
                      <span className="upload-text dark:text-dark-800">
                        Upload
                      </span>
                    </span>
                    <input
                      type="file"
                      name="file_upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFiles.map((file, index) => (
                    <div className="mb-[5px]" key={index}>
                      <UploadingFile
                        progress={uploadProgress}
                        file={file}
                        handleRemove={() => handleFileRemove(index)}
                      />
                    </div>
                  ))}
                  <div className="my-[20px]">
                    <Rules padding="py-[20px] px-[20px]" space="ml-[20px]" />
                  </div>
                </div>
              )}
            </div>
            <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <WeightTitle title="Policy T&C" />
              <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                {[...Array(2)].map((value, index) => (
                  <>
                    <div className="flex justify-between">
                      <div className="flex basis-3/4 gap-[16px]">
                        <img src="/images/pin.svg" alt="" />
                        <Link
                          onClick={() => {
                            setPopup(true)
                          }}
                          className={`${
                            theme === 'dark'
                              ? 'font-bold text-[#606166] hover:text-[#000000]'
                              : 'text-white hover:text-[#50ff7f]'
                          } file-name block`}
                          to={''}
                        >
                          Essential IPID
                        </Link>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup visible={popup} onClose={togglePopup} maxWidth="max-w-[824px]">
        <AttachmentPreview
          attachmentName="Id_front.png"
          attachmentLink=""
          onClose={togglePopup}
        />
      </Popup>
    </>
  )
}
export default RiskPolicyUserProfile
