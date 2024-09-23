import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import InfoText from '../../components/common/InfoText'
import ProgressWeight from '../../components/common/progress-weight/ProgressWeight'
import QRConnector from '../../components/common/QRConnector'
import TextField from '../../components/common/TextField/SelectField'
import { UserContext } from '../../App'
import Rules from '../../components/common/FileUpload/Rules'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import DownloadBox from '../../components/common/DownloadBox'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import Timepicker from '../Timepicker/Timepicker'
import Popup from '../../components/templates/Popup'
import FormAgreament from '../../components/common/FormAgreament'
import { useNavigate } from 'react-router-dom'
import { createDateString } from '../../utils/dateTime'
import { useWeb3React } from '@web3-react/core'
import lighthouse from '@lighthouse-web3/sdk'
import { convertJsonToString } from '../../utils/helpers'
import { getCurrentDateTime } from '../../utils/dateTime'
import { openAlert, closeAlert } from '../../redux/alerts'
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromArray } from '../../utils/helpers'
import { uploadJsonData } from '../../lighthouse'
import { raiseClaim } from '../../api'
import { applicationsUpdate, updateCoverClaimState } from '../../database'

interface Document {
  link: string
  name: string
}

function NewClaim() {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  const [timeValue, settimeValue] = useState()
  // const [value, setValue] = React.useState(new Date());
  const [popup, setPopup] = React.useState(false)
  const popManager = () => {
    setPopup(true)
  }
  let navigate = useNavigate()
  const { library, account } = useWeb3React()
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    claimType: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    timezone: '',
    estimatedLossAmount: '',
    incidentDescription: '',
    documents: [] as Document[],
  })
  const [formFilled, setFormFilled] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0) // Tracks progress for each file
  const [fileUploadInitated, setFileUploadInitiated] = useState(false)

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

  const handleTimeChange = (value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      eventTime: value,
    }))
  }

  const handleEventDateChange = (value: any) => {
    const dateString = createDateString(value)
    setFormState((prevState) => ({
      ...prevState,
      eventDate: dateString,
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
    console.log('Button was clicked')
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
    setFormFilled(formFilled)
    if (!formFilled) {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Failed',
            tag1: 'Some fields not filled!',
            tag2: 'please fill all fields',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
    }

    if (formFilled) {
      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const poolName = localStorage.getItem('claimPoolName')
      const formData = {
        ...formState,
        date: date,
        address: account,
        region: 'NG',
        poolName: poolName,
      }
      const dataString = convertJsonToString(formData)
      const userData = await uploadJsonData(dataString)
      const hash = await raiseClaim(
        poolName as string,
        userData,
        account as string,
        860,
        dispatch
      )
      await updateCoverClaimState(account, poolName as string, 'in progress')
      await applicationsUpdate()
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 1,
            variant: 'Successful',
            classname: 'text-black',
            title: 'Submission Successful',
            tag1: 'Claim application submitted',
            tag2: 'View on etherscan',
            hash: hash,
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
      localStorage.removeItem('claimPoolName')
      navigate(-1)
      // })
      // .catch((error) => {
      //   console.log('Error fetching IP address information: ', error)
      // })
    }
  }

  return (
    <>
      <div>
        <Header name="New Claim" showBackAero={true} />
        <div className="items-center justify-between hidden mb-5 md:flex black-btn">
          <Button
            onClick={() => navigate(-1)}
            icon={
              theme === 'dark'
                ? '/images/leftBlackAero.svg'
                : '/images/Mask (2ss).svg'
            }
            className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
            text="Back"
          />
          <Link to="/" className="hidden how-it-work text-brand-300 sm:block">
            How it works
          </Link>
        </div>
        <div className="mb-10 lg:flex gap-[60px]">
          <div className="flex-grow">
            <div className="lg:grid lg:grid-cols-2">
              <div>
                <b className="font-normal text-3xl mb-2.5 block">
                  Incident Details
                </b>
                <p className="text-lg text-dark-650 ">
                  Your information is never shared with other users.
                </p>
              </div>
              <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                <TextField
                  label="Claim Type"
                  placeholder="Please Select"
                  handleChange={handleChange}
                  showRequiredMessage={formFilled}
                  name="claimType"
                />
                <TextField
                  label="Event Type"
                  placeholder="Please Select"
                  borderRight="border-r border-r-primary-700"
                  handleChange={handleChange}
                  showRequiredMessage={formFilled}
                  name="eventType"
                />
                <TextField
                  label="Event Date"
                  placeholder={['Month', 'Day', 'Year']}
                  handleDobChange={handleEventDateChange}
                  showRequiredMessage={formFilled}
                  name="eventDate"
                />
                <div className="grid grid-cols-2 sm:gap-5 gap-2.5 ">
                  <div className="flex gap-2.5 flex-col">
                    <div className="flex gap-[5px] ">
                      <span className="fs-12 lh-14 ls-35 leading-[14px] placeholder:fs-12 text-[#606166]">
                        Event Time
                      </span>
                      <img
                        src={`${
                          currentIcon === 'Event-Time'
                            ? '/images/info-green-icon.svg'
                            : '/images/Maskd (2).svg'
                        }`}
                        width={10}
                        height={10}
                        alt=""
                        id={'Event-Time'}
                        onMouseEnter={() => {
                          setcurrentIcon('Event-Time')
                        }}
                        onMouseLeave={() => {
                          setcurrentIcon('')
                        }}
                      />
                      <>
                        <ReactTooltip
                          className={`my-tool-tip z-500`}
                          anchorId={'Event-Time'}
                          place="bottom"
                          content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                        />
                      </>
                    </div>

                    <div className="rounded flex gap-[5px] px-[20px] py-[9px] bg-[#2A2B31] box-border-2x-light dark:box-border-2x-dark  items-center justify-between placeholder:text-dark-650 placeholder:fs-12 placeholder:text dark:bg-light-800">
                      <input
                        type="text"
                        placeholder="Set Time"
                        className="w-full selectTime"
                        value={formState.eventTime}
                        onClick={() => popManager()}
                      />
                      <img src="/images/clock-icon.svg" alt="" />
                    </div>
                  </div>
                  <TextField
                    label="Time Zone"
                    placeholder="Please Select "
                    borderRight="border-r border-r-brand-100"
                    handleChange={handleChange}
                    showRequiredMessage={formFilled}
                    name="timezone"
                  />
                </div>

                <div className="flex gap-[10px] flex-col">
                  <div className="flex gap-[5px]">
                    <span className="fs-12 lh-14 ls-35 text-[#606166]">
                      Estimated Loss Amount
                    </span>
                    <img
                      src={`${
                        currentIcon === 'Estimated-Loss-Amount'
                          ? '/images/info-green-icon.svg'
                          : '/images/Maskd (2).svg'
                      }`}
                      width={10}
                      height={10}
                      alt=""
                      id={'Estimated-Loss-Amount'}
                      onMouseEnter={() => {
                        setcurrentIcon('Estimated-Loss-Amount')
                      }}
                      onMouseLeave={() => {
                        setcurrentIcon('')
                      }}
                    />
                    <>
                      <ReactTooltip
                        className={`my-tool-tip z-500`}
                        anchorId={'Estimated-Loss-Amount'}
                        place="bottom"
                        content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                      />
                    </>
                  </div>
                  {/* outline={true}
                  classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]" */}

                  <div className=" text-[#606166] rounded flex gap-[5px] px-[20px] py-[12px] bg-[#2A2B31] dark:bg-light-800 box-border-2x-light dark:box-border-2x-dark">
                    <span>$</span>
                    <input
                      type="text"
                      color="white"
                      placeholder="e.g. 5000"
                      className="w-full text-white placeholder:text-dark-650"
                      name="estimatedLossAmount"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <div>
                <InfoText
                  textClassName="dark:text-dark-600"
                  variant="large"
                  color={theme === 'dark' ? 'dark-600' : 'white'}
                  text="Incident Description"
                />
                <p className="text-dark-650 text-lg mt-2.5 ">
                  Your information is never shared with other users.
                </p>
              </div>
              <div className="mt-[20px] ">
                <textarea
                  className={`py-4 px-5 rounded placeholder:text-dark-650  text-lg w-full h-[200px] box-border-2x-light dark:box-border-2x-dark 
                  ${
                    theme === 'dark'
                      ? 'dark:bg-light-800 text-dark-800'
                      : 'bg-dark-800 text-white'
                  }
                  `}
                  placeholder="Type here ..."
                  onChange={handleChange}
                  name="incidentDescription"
                />
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <div>
                <InfoText
                  textClassName="dark:text-dark-600"
                  variant="large"
                  color={theme === 'dark' ? 'dark-600' : 'white'}
                  text="Incident Evidence"
                />
                <p className="text-dark-650 text-lg mt-2.5">
                  Drag and drop one or multiple files (Max size: 1Mb)
                </p>
              </div>
              <div>
                <label
                  className={`mb-[20px] mt-[15px] flex justify-center w-full  transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color w-full h-[40px]`}
                  onClick={(e) => {
                    console.log('Clicked')
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
                  />
                </label>
                {selectedFiles.map((file, index) => (
                  <div className="mb-[5px]" key={index}>
                    <UploadingFile
                      progress={uploadProgress}
                      file={file}
                      handleRemove={() => removeFile(index)}
                    />
                  </div>
                ))}
                <div className="my-[20px]">
                  <Rules padding="py-[20px] px-[20px]" space="ml-[20px]" />
                </div>
                {((formState.documents.length === 0 && fileUploadInitated) ||
                  !formFilled) && (
                  <span style={{ color: 'red' }}>Document is required</span>
                )}
              </div>
            </div>
            <hr className="my-[24px]" />
            <div className="lg:grid lg:grid-cols-2">
              <span />
              <div className="flex flex-col gap-2.5">
                <FormAgreament
                  agreeURL="/"
                  mainClass="flex flex-col"
                  variety="checkbox"
                  agree="Terms of Use"
                  bntText="Submit"
                  item1Class="w-full flex gap-[12px] items-center"
                  item2Class="w-full mt-[10px] flex justify-end"
                  btn="sm:w-fit w-full"
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col gap-5 sm:w-[285px] max-[640px]:w-full pt-8">
              <QRConnector className="hidden sm:block" />
              <DownloadBox
                title="Attachments"
                classname="box-border-2x-light dark:box-border-2x-dark"
              />
              <ProgressWeight current={53} name="Claim" subtitle="Progress" />
            </div>
          </div>
        </div>
      </div>
      <div></div>

      <div>
        <Popup
          visible={popup}
          onClose={() => {
            setPopup(false)
          }}
        >
          <Timepicker
            onClose={() => setPopup(false)}
            setTime={handleTimeChange}
          />
        </Popup>
      </div>
    </>
  )
}
export default NewClaim
