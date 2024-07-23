import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Header from '../header/Header'
import QRConnector from '../QRConnector'
import RiskSelectField from '../TextField/riskSelectField'
import TextField from '../TextField'
import TextFieldS from '../TextFieldS'
import { UserContext } from '../../../App'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import InfoText from '../InfoText'
import ProgressWeight from '../progress-weight/ProgressWeight'
import Rules from '../FileUpload/Rules'
import UploadingFile from '../FileUpload/UploadingFile'
import DownloadBox from '../DownloadBox'
import FormAgreament from '../FormAgreament'
import { useNavigate } from 'react-router-dom'
import { createDateString } from '../../../utils/dateTime'
import { useWeb3React } from '@web3-react/core'
import lighthouse from '@lighthouse-web3/sdk'
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  deleteUser,
} from 'firebase/auth'
import { convertJsonToString } from '../../../utils/helpers'
import { getCurrentDateTime } from '../../../utils/dateTime'
import app from '../../../firebaseConfig/firebaseApp'
import Alert from '../Alert'
import {
  openAlert,
  closeAlert,
  openLoader,
  closeLoader,
} from '../../../redux/alerts'
import { updateUser } from '../../../redux/user'
import { useSelector, useDispatch } from 'react-redux'
import { displayKycModal } from '../../../redux/app'
import calculatePremiumQuote from '../../../utils/premiumSimulator'

import {
  encryptAndHandleFile,
  encryptText,
  decryptAndHandleFile,
} from '../../../utils/encryption'
import { uploadJsonData } from '../../../lighthouse'
import {
  is_kyc_reviewer,
  getUserData,
  getPoolAddresses,
  modifyPolicy,
} from '../../../api'
import {
  applicationsUpdate,
  createUser,
  updateCoverQuote,
  updateVerificationState,
} from '../../../database'
import { removeItemFromArray } from '../../../utils/helpers'
import { addCover } from '../../../database'

interface popupProps {
  onClose?: () => void
  onSubmit?: () => void
  poolName: string
  coverDetails?: any
  setFilledForm?: any
}
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

function ModifyCarInsurance(
  { onClose, poolName, coverDetails, onSubmit }: popupProps,
  props: any
) {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  const { library, account } = useWeb3React()
  const { kycModal } = useSelector((state: any) => state.app)
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    make: 'Toyota',
    model: '',
    yearManufactured: '',
    engineSize: '',
    registrationNumber: '',
    insurableValue: '',
    annualMileage: '',
    overnightParking: '',
    coverDuration: '',
    coverType: '',
    usage: '',
    securityMeasures: '',
    drivingOffences: '',
    claimHistory: '',
    yearObtainedLicence: '',
    drivingLicenceNumber: '',
    riskAddress: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    postCode: '',
    documents: (coverDetails.documents as Document[]) || [],
  })
  const [formFilled, setFormFilled] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState([0]) // Tracks progress for each file
  type VerificationState = 'unverified' | 'verifying' | 'verified'
  const [verificationState, setVerificationState] =
    useState<VerificationState>('unverified')
  const [success, setSuccess] = useState(false)
  const [fileUploadInitated, setFileUploadInitiated] = useState(false)
  const [emailRequiredMessage, setEmailRequiredMessage] = useState(false)
  //   const [canModify, setCanModify] = useState(false)
  console.log('Details: ', coverDetails)
  const canModify = coverDetails.canModify

  type ProgressData = {
    total: number
    uploaded: number
  }

  const progressCallback = (progressData: ProgressData) => {
    let percentageDone = Math.round(
      (progressData?.uploaded / progressData?.total) * 100
    )
    var all = uploadProgress
    all[all.length] = percentageDone
    setUploadProgress(all)
  }

  //Uploads File to IPFS
  const uploadFile = async (file: any) => {
    const output = await lighthouse.upload(
      file,
      process.env.REACT_APP_LIGHTHOUSE_API_KEY as string,
      false,
      undefined,
      progressCallback
    )
    const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    const currentDocuments: Document[] = [...formState.documents]
    currentDocuments.push({
      link: link,
      name: file[0].name,
    })
    setFormState((prevState) => ({
      ...prevState,
      documents: currentDocuments,
    }))
  }

  const handleFileChange = async (event: any) => {
    setFileUploadInitiated(true)
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

  const removeFile = (index: number) => {
    const newArray = removeItemFromArray(
      formState.documents,
      formState.documents[index].link
    )
    setFormState((prevState: any) => ({
      ...prevState,
      documents: newArray,
    }))
    var newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
  }

  // Generic change handler for all inputs
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
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

  // Handle form submission
  const handleSubmit = async () => {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Modifying Policy',
      })
    )
    setFileUploadInitiated(true)
    const date = getCurrentDateTime()
    setFormState((prevState) => ({
      ...prevState,
      date: date,
    }))
    setFormState((prevState) => ({
      ...prevState,
      address: account,
    }))
    const formFilled = areAllValuesFilled(formState)
    // setFormFilled(formFilled)

    // if (formFilled) {
    // fetch('https://ipinfo.io/json')
    //   .then((response) => response.json())
    //   .then(async (data) => {
    const formData = {
      ...formState,
      date: date,
      address: account,
      region: 'NG',
      poolName: poolName,
    }
    const dataString = convertJsonToString(formData)
    const userData = await uploadJsonData(dataString)
    // const userData =
    //   'https://gateway.lighthouse.storage/ipfs/Qmf4rzQkV64hBzkr5M4EsTWKUHMTsioea8fD6JXWu9gsBT'

    const durationIndex = findIndex(coverDurations, formData.coverDuration)
    console.log('Duration: ', durationIndex)

    const premiumQuote = calculatePremiumQuote(formData)
    console.log('Quote data: ', premiumQuote)

    // const hash = await modifyPolicy(poolName, userData, 1, dispatch)
    var hash
    if (coverDetails.policyStatus === 'active') {
      hash = await modifyPolicy(poolName, userData, 1, dispatch)
    } else {
      hash = undefined
    }
    await updateCoverQuote(account, 'Car Insurance', {
      ...premiumQuote,
      formData: userData,
    })
    await applicationsUpdate()
    dispatch(closeLoader())
    dispatch(
      openAlert({
        displayAlert: true,
        data: {
          id: 1,
          variant: 'Successful',
          classname: 'text-black',
          title: 'Submission Successful',
          tag1: 'policy application modified',
          tag2: 'View on etherscan',
          hash: hash,
        },
      })
    )
    // setFilledForm(true)
    setTimeout(() => {
      dispatch(closeAlert())
    }, 10000)
    // setPolicyProcessState('verifying')
    const updatedData = await getUserData(account)
    dispatch(updateUser({ data: updatedData }))
    if (kycModal) {
      dispatch(displayKycModal({ display: false }))
    }
    if (onSubmit !== undefined) onSubmit()
    // })
    // .catch((error) => {
    //   console.log('Error fetching IP address information: ', error)
    // })
    // }
  }

  useEffect(() => {
    Object.keys(formState).forEach((key) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: coverDetails[key],
      }))
    })

    coverDetails.documents.map((document: any, index: number) => {
      var all = uploadProgress
      all[index] = 100
      setUploadProgress(all)
      setSelectedFiles(coverDetails.documents)
    })
  }, [])

  return (
    <div>
      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow">
          <div className="flex justify-between">
            <div className="flex gap-[10px] items-center">
              <p className="popup-heading">Policy Risk</p>
            </div>
            <div className="flex items-center">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  title="close-modal-button"
                >
                  <img
                    className="w-2.5 h-2.5"
                    src="/images/Group 144.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            className="scrollbar-customise bg-opacity-20 mt-[45px]"
            id="style-1"
          >
            <div className="force-overflow">
              <div className="kyc-popup-form">
                <div className=" w-full mb-[20px]">
                  <p className="welcome-subtitle">Car cover PRP</p>
                </div>
                <div className="lg:grid lg:grid-cols-2">
                  <div className="sm:w-[60%] w-full">
                    <div className="flex gap-[5px] items-center mb-[10px] ">
                      <b className="block form-section-title dark:form-section-title-dark">
                        Vehicle Details
                      </b>
                    </div>
                    <p className="form-section-subtitle">
                      Your personal information is never shared with other
                      users.
                    </p>
                  </div>
                  <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <RiskSelectField
                        label="Make"
                        labelIcon={false}
                        placeholder="Please select"
                        filled={formFilled}
                        initialValue={coverDetails.make}
                        disabled={!canModify}
                        name="make"
                        handleChange={handleChange}
                      />
                      <RiskSelectField
                        label="Model"
                        labelIcon={false}
                        placeholder="Please select"
                        carMake={formState.make}
                        initialValue={coverDetails.model}
                        disabled={!canModify}
                        filled={formFilled}
                        name="model"
                        handleChange={handleChange}
                      />
                    </div>
                    <div></div>
                    <RiskSelectField
                      labelIcon={false}
                      label="Year of Manufacture"
                      placeholder="YYYY"
                      filled={formFilled}
                      initialValue={coverDetails.yearManufactured}
                      disabled={!canModify}
                      name="yearManufactured"
                      handleChange={handleChange}
                    />
                    <RiskSelectField
                      label="Engine Size"
                      labelIcon={false}
                      placeholder="Please select"
                      filled={formFilled}
                      initialValue={coverDetails.engineSize}
                      disabled={!canModify}
                      name="engineSize"
                      handleChange={handleChange}
                    />
                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <TextField
                        labelIcon={false}
                        label="Registration Number"
                        placeholder="654875236"
                        outline={true}
                        initialValue={coverDetails.registrationNumber}
                        disabled={!canModify}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        handleChange={handleChange}
                        filled={formFilled}
                        name="registrationNumber"
                      />
                      <TextField
                        label="Insurable Value"
                        field="$"
                        placeholder="e.g. 5000"
                        outline={true}
                        initialValue={coverDetails.insurableValue}
                        disabled={!canModify}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        handleChange={handleChange}
                        filled={formFilled}
                        name="insurableValue"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <RiskSelectField
                        label="Estimated Annual Mileage"
                        placeholder="Please select"
                        filled={formFilled}
                        initialValue={coverDetails.annualMileage}
                        disabled={!canModify}
                        name="annualMileage"
                        handleChange={handleChange}
                      />
                      <RiskSelectField
                        label="Overnight Parking "
                        placeholder="Please select"
                        filled={formFilled}
                        initialValue={coverDetails.overnightParking}
                        disabled={!canModify}
                        name="overnightParking"
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-[24px]" />
                <div className="lg:grid lg:grid-cols-2">
                  <div>
                    <b className="font-normal text-3xl mb-2.5 block">
                      Insured Details
                    </b>
                    <p className="text-lg text-dark-650 ">
                      Your personal information is never shared with other
                      users.
                    </p>
                  </div>
                  <div className="flex flex-col sm:gap-5 gap-[10px] pt-5 lg:pt-2">
                    <RiskSelectField
                      label="Cover Duration"
                      placeholder="Please select"
                      filled={formFilled}
                      initialValue={coverDetails.coverDuration}
                      disabled={!canModify}
                      name="coverDuration"
                      handleChange={handleChange}
                    />
                    <RiskSelectField
                      label="Cover Type"
                      placeholder="Please select"
                      filled={formFilled}
                      initialValue={coverDetails.coverType}
                      disabled={!canModify}
                      name="coverType"
                      handleChange={handleChange}
                    />
                    <RiskSelectField
                      label="Usage"
                      placeholder="Please select"
                      filled={formFilled}
                      initialValue={coverDetails.usage}
                      disabled={!canModify}
                      name="usage"
                      handleChange={handleChange}
                    />
                    <RiskSelectField
                      label="Security Measures"
                      placeholder="Please select"
                      filled={formFilled}
                      initialValue={coverDetails.securityMeasures}
                      disabled={!canModify}
                      name="securityMeasures"
                      handleChange={handleChange}
                    />

                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <RiskSelectField
                        label="Driving Offences"
                        placeholder="Please select"
                        filled={formFilled}
                        initialValue={coverDetails.drivingOffences}
                        disabled={!canModify}
                        name="drivingOffences"
                        handleChange={handleChange}
                      />
                      <RiskSelectField
                        label="Claim History"
                        placeholder="Please select"
                        filled={formFilled}
                        initialValue={coverDetails.claimHistory}
                        disabled={!canModify}
                        name="claimHistory"
                        handleChange={handleChange}
                      />
                      <RiskSelectField
                        labelIcon={false}
                        label="Year of Obtaining Licence"
                        placeholder="YYYY"
                        filled={formFilled}
                        initialValue={coverDetails.yearObtainedLicence}
                        disabled={!canModify}
                        name="yearObtainedLicence"
                        handleChange={handleChange}
                      />
                      <TextField
                        labelIcon={false}
                        label="Driving Licence Number"
                        placeholder="e.g. RJ5852"
                        handleChange={handleChange}
                        initialValue={coverDetails.drivingLicenceNumber}
                        disabled={!canModify}
                        filled={formFilled}
                        name="drivingLicenceNumber"
                      />
                    </div>
                    <RiskSelectField
                      label="Risk Address"
                      placeholder="Please select"
                      filled={formFilled}
                      initialValue={coverDetails.riskAddress}
                      disabled={!canModify}
                      name="riskAddress"
                      handleChange={handleChange}
                    />
                    <RiskSelectField
                      label="Country/Region"
                      placeholder="e.g. California"
                      filled={formFilled}
                      initialValue={coverDetails.country}
                      disabled={!canModify}
                      name="country"
                      handleChange={handleChange}
                    />
                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <TextField
                        labelIcon={false}
                        label="ADDRESS LINE 1"
                        placeholder="e.g. 645 EShaw Ave"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        handleChange={handleChange}
                        initialValue={coverDetails.address1}
                        disabled={!canModify}
                        filled={formFilled}
                        name="address1"
                      />
                      <TextField
                        labelIcon={false}
                        label="ADDRESS LINE 2"
                        placeholder="e.g.  Fresco, ca 93710"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        handleChange={handleChange}
                        initialValue={coverDetails.address2}
                        disabled={!canModify}
                        filled={formFilled}
                        name="address2"
                      />
                      <TextField
                        labelIcon={false}
                        label="City"
                        placeholder="e.g. New York"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        handleChange={handleChange}
                        initialValue={coverDetails.city}
                        disabled={!canModify}
                        filled={formFilled}
                        name="city"
                      />
                      <TextField
                        labelIcon={false}
                        label="Post Code"
                        placeholder="e.g.  4450"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                        handleChange={handleChange}
                        initialValue={coverDetails.postCode}
                        disabled={!canModify}
                        filled={formFilled}
                        name="postCode"
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-[24px]" />
                <div className="lg:grid lg:grid-cols-2">
                  <div className="sm:w-[60%]">
                    <div className="flex gap-[5px] items-center">
                      <b className="font-normal text-3xl mb-2.5 block">
                        Insured's Documents
                      </b>

                      <img
                        src={`${
                          currentIcon === 'kyc-Identity-Details'
                            ? '/images/info-green-icon.svg'
                            : '/images/Maskd (2).svg'
                        }`}
                        alt=""
                        width={14}
                        height={14}
                        id="kyc-Identity-Details"
                        className="mb-2.5"
                        onMouseEnter={() => {
                          setcurrentIcon('kyc-Identity-Details')
                        }}
                        onMouseLeave={() => {
                          setcurrentIcon('')
                        }}
                      />
                      {/* <img className="w-[14px] h-[14px]" src="/images/Mask (11).svg" alt="" /> */}
                      <ReactTooltip
                        className="my-tool-tip z-500"
                        anchorId={'kyc-Identity-Details'}
                        place="bottom"
                        content="This is the total amount available for  you to borrow. You can borrow based on your 		collateral and until the borrowcap is reached."
                      />
                    </div>
                    <p className="text-lg text-dark-650 ">
                      Drag and drop one or multiple files (Max size: 1Mb)
                    </p>
                  </div>
                  <div>
                    <label
                      className={`mb-[20px] mt-[15px] flex justify-center w-full  transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color w-full h-[40px]`}
                      onClick={(e) => {
                        console.log('Clicked')
                        // setTimeout(() => {
                        //   setFileUploadInitiated(true)
                        // }, 10000)
                      }}
                      htmlFor="file_upload"
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
                        id="file_upload"
                        type="file"
                        name="file_upload"
                        className="hidden"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        onChange={handleFileChange}
                        disabled={!canModify}
                      />
                    </label>
                    {selectedFiles.map((file, index) => (
                      <div className="mb-[5px]" key={index}>
                        <UploadingFile
                          progress={uploadProgress[index]}
                          file={file}
                          handleRemove={() => removeFile(index)}
                        />
                      </div>
                    ))}
                    <div className="my-[20px]">
                      <Rules padding="py-[20px] px-[20px]" space="ml-[20px]" />
                    </div>
                    {((formState.documents.length === 0 &&
                      fileUploadInitated) ||
                      !formFilled) && (
                      <span style={{ color: 'red' }}>Document is required</span>
                    )}
                  </div>
                </div>
                <hr className="my-[24px]" />
                <div className="flex justify-end">
                  <Button
                    className={`${
                      theme === 'dark' ? 'whiteBgBtn' : 'greenGradient'
                    } font-medium px-8 max-[640px]:w-full disabled:opacity-10 disabled:pointer-events-none`}
                    text="Save"
                    // color={theme === 'dark' ? 'btn-white' : 'grey-gradient'}
                    disabled={!canModify}
                    onClick={canModify ? handleSubmit : () => null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModifyCarInsurance
