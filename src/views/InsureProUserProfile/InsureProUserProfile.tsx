import React, { useState, useEffect } from 'react'
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
import { Tooltip as ReactTooltip } from 'react-tooltip'
import AttachmentPreview from '../../components/common/AttachmentPreview/AttachmentPreview'
import Popup from '../../components/templates/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { createDateString } from '../../utils/dateTime'
import { useWeb3React } from '@web3-react/core'
import { findObjectById, removeItemFromArray } from '../../utils/helpers'
import { getCurrentDateTime } from '../../utils/dateTime'
import { convertJsonToString } from '../../utils/helpers'
import { uploadJsonData } from '../../lighthouse'
import { openAlert, closeAlert } from '../..//redux/alerts'
import { getUserData, modifyInsureProApplication } from '../../api'
import { switchKYCReviewerModify } from '../../database'
import lighthouse from '@lighthouse-web3/sdk'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import Rules from '../../components/common/FileUpload/Rules'
import { setKYCReviewerApplicants } from '../../redux/kyc'

interface Document {
  link: string
  name: string
}

function InsureProUserProfile() {
  const { theme } = React.useContext(UserContext)
  const { kycReviewerApplicants } = useSelector((state: any) => state.kyc)
  const { user } = useSelector((state: any) => state.user)
  const { account, library } = useWeb3React()
  const [currentIcon, setcurrentIcon] = useState('')
  const [popup, setPopup] = useState(false)
  const togglePopup = () => setPopup((v) => !v)
  let { userId } = useParams()
  let navigate = useNavigate()
  const [applicant, setApplicant] = useState(
    findObjectById(kycReviewerApplicants, userId)
  )
  const [canModify, setCanModify] = useState(false)
  const [formState, setFormState] = useState(applicant)
  console.log(applicant)
  const [formFilled, setFormFilled] = useState(true)
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0) // Tracks progress for each file
  const [selectedDocument, setSelectedDocument] = useState(
    applicant.reviewerDocuments[0]
  )
  const [documentsDisplayed, setDocumentsDisplayed] = useState(
    applicant.reviewerDocuments
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

    if (formFilled) {
      fetch('https://ipinfo.io/json')
        .then((response) => response.json())
        .then(async (data) => {
          console.log('Country: ' + data.country)
          // var prevData = await getUserData(account)
          const formData = {
            ...formState,
            date: date,
            address: account,
            region: data.country,
          }
          const dataString = convertJsonToString(formData)
          const userData = await uploadJsonData(dataString)
          await modifyInsureProApplication(data.country, userData)

          dispatch(
            openAlert({
              displayAlert: true,
              data: {
                id: 1,
                variant: 'Successful',
                classname: 'text-black',
                title: 'Submission Successful',
                tag1: 'Insure Pro application modified',
                tag2: 'modfifications made',
              },
            })
          )
          setTimeout(() => {
            dispatch(closeAlert())
          }, 10000)
          setApplicant(formData)
          switchKYCReviewerModify(applicant.address).then(() => {
            var temp = [...kycReviewerApplicants]
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
            dispatch(setKYCReviewerApplicants({ data: temp }))
          })
        })
        .catch((error) => {
          console.log('Error fetching IP address information: ', error)
        })
    }
  }

  // useEffect(() => {
  //   console.log(applicant)
  //   if (applicant.canModifyKYCReviewer && applicant.address === account) {
  //     console.log('Correct!!')
  //     setCanModify(true)
  //   }
  // }, [])

  useEffect(() => {
    const temp = findObjectById(kycReviewerApplicants, userId)
    setApplicant(temp)
    if (temp.canModifyKYCReviewer && temp.address === account) {
      setCanModify(true)
    } else {
      setCanModify(false)
    }
  }, [kycReviewerApplicants])

  return (
    <>
      <Header name="InsurePro" showBackAero={true} />
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
                  Professional Details
                </b>
                <p className="text-lg text-dark-650 ">
                  Your professional information is never to other users.
                </p>
              </div>
              {/* text-dark-650 flex-grow 
              text-white bg-dark-800 rounded h-[40px] text-lg py-3 w-full px-5 */}
              <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                <SelectField
                  labelIcon={true}
                  label="Work Area"
                  placeholder="Please Select"
                  name="workArea"
                  handleChange={handleChange}
                  filled={formFilled}
                  initialValue={applicant.workArea}
                  disabled={!canModify}
                />
                <SelectField
                  labelIcon={true}
                  label="Work Field"
                  placeholder="Domain"
                  name="workField"
                  handleChange={handleChange}
                  filled={formFilled}
                  initialValue={applicant.workField}
                  disabled={!canModify}
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
export default InsureProUserProfile
