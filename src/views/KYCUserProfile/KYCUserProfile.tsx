import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import SelectField from '../../components/common/TextField/SelectField'
import TextField from '../../components/common/TextField'
import InsureProUserInfom from '../../components/global/InsureProUserInfom/InsureProUserInfom'
import { UserContext } from '../../App'
import Score from '../Dashboard/Score'
import Attachment from '../../components/common/Attachment'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import { useNavigate, useParams } from 'react-router-dom'
import TextFieldS from '../../components/common/TextFieldS'
import AttachmentPreview from '../../components/common/AttachmentPreview/AttachmentPreview'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import Popup from '../../components/templates/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { createDateString } from '../../utils/dateTime'
import { useWeb3React } from '@web3-react/core'
import { findObjectById } from '../../utils/helpers'
import { getCurrentDateTime } from '../../utils/dateTime'
import {
  convertJsonToString,
  removeItemFromArray,
  isLinkPresent,
} from '../../utils/helpers'
import { uploadJsonData } from '../../lighthouse'
import { openAlert, closeAlert } from '../../redux/alerts'
import { modifyMembershipApplication } from '../../api'
import { switchKYCModify } from '../../database'
import lighthouse from '@lighthouse-web3/sdk'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import Rules from '../../components/common/FileUpload/Rules'
import { setKYCApplicants } from '../../redux/kyc'

interface Document {
  link: string
  name: string
}

function KYCUserProfile() {
  const { theme } = React.useContext(UserContext)
  const { kycApplicants } = useSelector((state: any) => state.kyc)
  const { user } = useSelector((state: any) => state.user)
  const [popup, setPopup] = useState(false)
  const togglePopup = () => setPopup((v) => !v)
  const { account, library } = useWeb3React()
  const [currentIcon, setcurrentIcon] = useState('')
  let { userId } = useParams()
  let navigate = useNavigate()
  const [applicant, setApplicant] = useState(
    findObjectById(kycApplicants, userId)
  )
  const [canModify, setCanModify] = useState(false)
  const [formState, setFormState] = useState(applicant)
  const [showRequiredMessage, setShowRequiredMessage] = useState(true)
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

  const handleDobChange = (value: any) => {
    const dateString = createDateString(value)
    setFormState((prevState: any) => ({
      ...prevState,
      dob: dateString,
    }))
  }

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
      if (
        obj.hasOwnProperty(key) &&
        (obj[key] === '' || obj[key].length === 0)
      ) {
        return false // If any value is an empty string, return false
      }
    }
    return true // All values are filled
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
    const currentDocuments: Document[] = [...formState.documents]
    currentDocuments.push({
      link: link,
      name: file[0].name,
    })
    setFormState((prevState: any) => ({
      ...prevState,
      documents: currentDocuments,
    }))
  }

  const removeFile = (document: Document) => {
    const newArray = removeItemFromArray(formState.documents, document.link)
    setFormState((prevState: any) => ({
      ...prevState,
      documents: newArray,
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
    setShowRequiredMessage(!formFilled)

    if (formFilled) {
      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      console.log('Country: ' + 'NG')
      const formData = {
        ...formState,
        date: date,
        address: account,
        region: 'NG',
      }
      const dataString = convertJsonToString(formData)
      const userData = await uploadJsonData(dataString)
      const hash = await modifyMembershipApplication('NG', userData, dispatch)

      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 1,
            variant: 'Successful',
            classname: 'text-black',
            title: 'Submission Successful',
            tag1: 'KYC application modified',
            tag2: 'modfifications made',
            hash: hash,
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
      setApplicant(formData)
      switchKYCModify(user.address).then(() => {
        var temp = [...kycApplicants]
        var placeholder = {}
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].id === user.id) {
            placeholder = {
              ...temp[i],
              canModifyKYC: !temp[i].canModifyKYC,
            }
            temp.splice(i, 1)
            i--
          }
        }
        temp.push(placeholder)
        dispatch(setKYCApplicants({ data: temp }))
      })
      // })
      // .catch((error) => {
      //   console.log('Error fetching IP address information: ', error)
      // })
    }
  }

  useEffect(() => {
    const temp = findObjectById(kycApplicants, userId)
    // console.log('Applicants: ', kycApplicants)
    setApplicant(temp)
    if (temp.canModifyKYC && temp.address === account) {
      setCanModify(true)
    } else {
      setCanModify(false)
    }
  }, [kycApplicants])

  return (
    <>
      <Header name="Profile" showBackAero={true} />
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
          <InsureProUserInfom variant="personal" user={applicant} />
          <div className="flex-grow mb-[50px] mt-[20px]">
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <b className="font-normal text-3xl mb-2.5 block">
                  Personal Details
                </b>
                <p className="text-lg text-dark-650 ">
                  Your personal information is never shared with other users.
                </p>
              </div>
              {/* text-dark-650 flex-grow 
              text-white bg-dark-800 rounded h-[40px] text-lg py-3 w-full px-5 */}
              <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                <div className="flex flex-col gap-5 border-none lg:grid lg:grid-cols-2">
                  <TextField
                    handleChange={handleChange}
                    showRequiredMessage={showRequiredMessage}
                    label="First Name"
                    name="firstName"
                    labelIcon={false}
                    placeholder="Nikita"
                    outline={true}
                    initialValue={applicant.firstName}
                    disabled={!canModify}
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                  <TextField
                    handleChange={handleChange}
                    showRequiredMessage={showRequiredMessage}
                    label="Last Name"
                    name="lastName"
                    labelIcon={false}
                    initialValue={applicant.lastName}
                    disabled={!canModify}
                    outline={true}
                    placeholder="Resheteev"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                </div>

                <SelectField
                  showRequiredMessage={showRequiredMessage}
                  labelIcon={false}
                  name="dob"
                  initialValue={applicant.dob}
                  disabled={!canModify}
                  label="Date of Birth"
                  placeholder={['Month', 'Day', 'Year']}
                  handleDobChange={handleDobChange}
                />

                <TextField
                  handleChange={handleChange}
                  showRequiredMessage={showRequiredMessage}
                  label="Email"
                  name="email"
                  labelIcon={false}
                  initialValue={applicant.email}
                  disabled={!canModify}
                  variant="outlined"
                  placeholder="nik.resheteev@gmail.com"
                  verify={true}
                />
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <b className="font-normal text-3xl mb-2.5 block">
                  Address Details
                </b>
                <p className="text-lg text-dark-650 ">
                  Your personal information is never shared with other users.
                </p>
              </div>
              <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
                <TextField
                  handleChange={handleChange}
                  showRequiredMessage={showRequiredMessage}
                  label="State/ Province"
                  name="state"
                  labelIcon={false}
                  initialValue={applicant.state}
                  disabled={!canModify}
                  placeholder="e.g. California"
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                  <TextField
                    handleChange={handleChange}
                    showRequiredMessage={showRequiredMessage}
                    label="Address Line 1"
                    name="address1"
                    labelIcon={false}
                    initialValue={applicant.address1}
                    disabled={!canModify}
                    placeholder="e.g. 645 EShaw Ave"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                  <TextField
                    handleChange={handleChange}
                    showRequiredMessage={showRequiredMessage}
                    label="Address Line 2"
                    name="address2"
                    labelIcon={false}
                    initialValue={applicant.address2}
                    disabled={!canModify}
                    placeholder="e.g.  Fresco, ca 93710"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                </div>
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                  <TextField
                    handleChange={handleChange}
                    showRequiredMessage={showRequiredMessage}
                    label="City"
                    name="city"
                    labelIcon={false}
                    initialValue={applicant.city}
                    disabled={!canModify}
                    placeholder="e.g. New York"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                  <TextField
                    handleChange={handleChange}
                    showRequiredMessage={showRequiredMessage}
                    label="Post Code"
                    name="postCode"
                    labelIcon={false}
                    initialValue={applicant.postCode}
                    disabled={!canModify}
                    placeholder="e.g.  4450"
                    classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                  />
                </div>
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <div className="sm:w-[60%]">
                <div className="flex gap-[5px] items-center mb-[10px] ">
                  <b className="font-normal text-3xl mb-2.5 block">
                    Identity Details
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
                  Your identity is never shared with other users.
                </p>
              </div>
              <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
                <SelectField
                  handleChange={handleChange}
                  showRequiredMessage={showRequiredMessage}
                  label="Issuing Country/Region"
                  initialValue={applicant.country}
                  disabled={!canModify}
                  labelIcon={false}
                  name="country"
                  placeholder="Please Select"
                />

                <SelectField
                  handleChange={handleChange}
                  showRequiredMessage={showRequiredMessage}
                  label="Identity Type"
                  initialValue={applicant.identityType}
                  disabled={!canModify}
                  labelIcon={true}
                  name="identityType"
                  placeholder="Please Select"
                />

                <TextField
                  handleChange={handleChange}
                  showRequiredMessage={showRequiredMessage}
                  label="National ID Number"
                  name="nationalID"
                  labelIcon={false}
                  initialValue={applicant.nationalID}
                  disabled={!canModify}
                  placeholder="e.g. 5589855455"
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                />
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

        <div className="flex justify-center hidden sm:flex">
          <div className="flex flex-col gap-5  sm:w-[285px] max-[640px]:w-full ">
            <h6 className="text-dark-300">Overview</h6>
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
          </div>
        </div>
      </div>

      <Popup visible={popup} onClose={togglePopup} maxWidth="max-w-[824px]">
        <AttachmentPreview
          attachmentName={selectedDocument.name}
          attachmentLink={selectedDocument.link}
          onClose={togglePopup}
        />
      </Popup>
    </>
  )
}
export default KYCUserProfile
