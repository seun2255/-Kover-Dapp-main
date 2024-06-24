import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Header from '../header/Header'
import QRConnector from '../QRConnector'
import SelectField from '../TextField/SelectField'
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
import { openAlert, closeAlert } from '../../../redux/alerts'
import { updateUser } from '../../../redux/user'
import { useSelector, useDispatch } from 'react-redux'
import { displayKycModal } from '../../../redux/app'

import {
  encryptAndHandleFile,
  encryptText,
  decryptAndHandleFile,
} from '../../../utils/encryption'
import { uploadJsonData } from '../../../lighthouse'
import { is_kyc_reviewer, getUserData } from '../../../api'
import { createUser, updateVerificationState } from '../../../database'
import { removeItemFromArray } from '../../../utils/helpers'

interface popupProps {
  onClose?: () => void
  setPolicyProcessState: any
}
interface Document {
  link: string
  name: string
}

function CarInsurance(
  { onClose, setPolicyProcessState }: popupProps,
  props: any
) {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  const { library, account } = useWeb3React()
  const { kycModal } = useSelector((state: any) => state.app)
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dob: '',
    // countryCode: '',
    // phoneNumber: '',
    state: '',
    address1: '',
    address2: '',
    city: '',
    postCode: '',
    country: '',
    identityType: '',
    nationalID: '',
    documents: [] as Document[],
  })
  const [formFilled, setFormFilled] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0) // Tracks progress for each file
  type VerificationState = 'unverified' | 'verifying' | 'verified'
  const [verificationState, setVerificationState] =
    useState<VerificationState>('unverified')
  const [success, setSuccess] = useState(false)
  const [fileUploadInitated, setFileUploadInitiated] = useState(false)
  const [emailRequiredMessage, setEmailRequiredMessage] = useState(false)

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

  const handleDobChange = (value: any) => {
    const dateString = createDateString(value)
    setFormState((prevState) => ({
      ...prevState,
      dob: dateString,
    }))
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

    if (verificationState !== 'verified') {
      setEmailRequiredMessage(true)
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Failed',
            tag1: 'Email not verified!',
            tag2: 'please verify your mail first',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
    } else if (!formFilled) {
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

    if (formFilled && verificationState === 'verified') {
      // if (formFilled) {
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
      const signer = library.getSigner(account)
      // const isReviwer = await is_kyc_reviewer(signer);

      await updateVerificationState(account, 'verifying')
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 1,
            variant: 'Successful',
            classname: 'text-black',
            title: 'Submission Successful',
            tag1: 'KYC application submitted',
            tag2: 'View on etherscan',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
      //   setPolicyProcessState('verifying')
      // const updatedData = await getUserData(account)
      // dispatch(updateUser({ data: updatedData }))
      if (kycModal) {
        dispatch(displayKycModal({ display: false }))
      }
      if (onClose !== undefined) onClose()
      // })
      // .catch((error) => {
      //   console.log('Error fetching IP address information: ', error)
      // })
    }
  }

  const verifymail = async () => {
    const auth = getAuth(app)
    setVerificationState('verifying')

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      formState.email,
      'dance$$183'
    )
    const user = userCredentials.user

    // Send the verification email
    await sendEmailVerification(user)

    // Define the repeated function
    const checkIfVerified = async () => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formState.email,
        'dance$$183'
      )
      const updatedUser = userCredential.user
      if (updatedUser?.emailVerified) {
        setVerificationState('verified')

        // Delete the user account
        await deleteUser(updatedUser)
        setEmailRequiredMessage(false)
        clearInterval(intervalID)
        clearTimeout(timeoutID)
      }
    }

    // Run the function every 10 seconds
    const intervalID = setInterval(checkIfVerified, 10000)

    // Stop the interval after 2 minutes (120,000 milliseconds)
    const stopFunctionAfterTwoMinutes = () => {
      clearInterval(intervalID)
      setVerificationState('unverified')
    }

    const timeoutID = setTimeout(stopFunctionAfterTwoMinutes, 120000)
  }

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
                      <SelectField
                        label="Make"
                        labelIcon={false}
                        placeholder="Please select"
                      />
                      <SelectField
                        label="Model"
                        labelIcon={false}
                        placeholder="Please select"
                      />
                    </div>
                    <div></div>
                    <SelectField
                      labelIcon={false}
                      label="Year of Manufacture"
                      placeholder={['YYYY', 'Please select']}
                    />
                    <SelectField
                      label="Engine Size"
                      labelIcon={false}
                      placeholder="Please select"
                    />
                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <TextField
                        labelIcon={false}
                        label="Registration Number"
                        placeholder="654875236"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        label="Insurable Value"
                        field="$"
                        placeholder="e.g. 5000"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <SelectField
                        label="Estimated Annual Mileage"
                        placeholder="Please select"
                      />
                      <SelectField
                        label="Overnight Parking "
                        placeholder="Please select"
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
                    <SelectField
                      label="Cover Type"
                      placeholder="Please select"
                    />
                    <SelectField label="Usage" placeholder="Please select" />
                    <SelectField
                      label="Security Measures"
                      placeholder="Please select"
                    />

                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <SelectField
                        label="Driving Offences"
                        placeholder="Please select"
                      />
                      <SelectField
                        label="Claim History"
                        placeholder="Please select"
                      />
                      <SelectField
                        labelIcon={false}
                        label="Year of Obtaining Licence"
                        placeholder="YYYY"
                      />
                      <TextField
                        labelIcon={false}
                        label="Driving Licence Number"
                        placeholder="e.g. RJ5852"
                      />
                    </div>
                    <SelectField
                      label="Risk Address"
                      placeholder="Please select"
                    />
                    <TextField
                      labelIcon={false}
                      label="Country/Region"
                      placeholder="e.g. California"
                      outline={true}
                      classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    />
                    <div className="grid grid-cols-2 sm:gap-5 gap-[10px]">
                      <TextField
                        labelIcon={false}
                        label="ADDRESS LINE 1"
                        placeholder="e.g. 645 EShaw Ave"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        labelIcon={false}
                        label="ADDRESS LINE 2"
                        placeholder="e.g.  Fresco, ca 93710"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        labelIcon={false}
                        label="City"
                        placeholder="e.g. New York"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        labelIcon={false}
                        label="Post Code"
                        placeholder="e.g.  4450"
                        outline={true}
                        classname="box-border-2x-light dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
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
                    {((formState.documents.length === 0 &&
                      fileUploadInitated) ||
                      !formFilled) && (
                      <span style={{ color: 'red' }}>Document is required</span>
                    )}
                  </div>
                </div>
                <hr className="my-[24px]" />
                <div className="lg:grid lg:grid-cols-2">
                  <div></div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CarInsurance
