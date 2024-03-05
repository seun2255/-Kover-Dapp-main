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

import {
  encryptAndHandleFile,
  encryptText,
  decryptAndHandleFile,
} from '../../../utils/encryption'
import { uploadJsonData } from '../../../lighthouse'
import { is_kyc_reviewer, apply_for_membership } from '../../../api'
import { createUser } from '../../../database'
import { useDispatch } from 'react-redux'

interface popupProps {
  onClose?: () => void
  setUserVerificationState: any
}
interface Document {
  link: string
  name: string
}

function KYC({ onClose, setUserVerificationState }: popupProps, props: any) {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  const { library, account } = useWeb3React()
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
    document: {
      link: '',
      name: '',
    },
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
    console.log(file)
    const output = await lighthouse.upload(
      file,
      process.env.REACT_APP_LIGHTHOUSE_API_KEY as string,
      false,
      undefined,
      progressCallback
    )
    const link = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash
    setFormState((prevState) => ({
      ...prevState,
      document: {
        link: link,
        name: file[0].name,
      },
    }))
  }

  const handleFileChange = async (event: any) => {
    setFileUploadInitiated(true)
    const files = event.target.files
    const updatedFiles = []

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
    // if (verificationState !== 'verified') {
    //   setEmailRequiredMessage(true)
    // }
    // if (formFilled && verificationState === 'verified') {
    if (formFilled) {
      fetch('https://ipinfo.io/json')
        .then((response) => response.json())
        .then(async (data) => {
          console.log('Country: ' + data.country)
          const formData = {
            ...formState,
            date: date,
            address: account,
            region: data.country,
          }
          const dataString = convertJsonToString(formData)
          const userData = await uploadJsonData(dataString)
          const signer = library.getSigner(account)
          // const isReviwer = await is_kyc_reviewer(signer);

          await apply_for_membership(signer, userData, data.country)
          await createUser(account)
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
          setUserVerificationState('verifying')
          if (onClose !== undefined) onClose()
        })
        .catch((error) => {
          console.log('Error fetching IP address information: ', error)
        })
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
              <p className="popup-heading">KYC</p>
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
                  <p className="welcome-subtitle">Submit KYC</p>
                </div>
                <div className="lg:grid lg:grid-cols-2">
                  <div className="sm:w-[60%] w-full">
                    <div className="flex gap-[5px] items-center mb-[10px] ">
                      <b className="block form-section-title dark:form-section-title-dark">
                        Personal Details
                      </b>
                    </div>
                    <p className="form-section-subtitle">
                      Your personal information is never shared with other
                      users.
                    </p>
                  </div>
                  <div className="flex flex-col gap-5 pt-5 lg:pt-2">
                    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2">
                      <TextField
                        handleChange={handleChange}
                        filled={formFilled}
                        label="First Name"
                        name="firstName"
                        labelIcon={false}
                        placeholder="Nikita"
                        outline={true}
                        classname="dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        handleChange={handleChange}
                        filled={formFilled}
                        label="Last Name"
                        name="lastName"
                        labelIcon={false}
                        placeholder="Resheteev"
                        outline={true}
                        classname="dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                    </div>
                    <SelectField
                      labelIcon={false}
                      filled={formFilled}
                      name="dob"
                      label="Date of Birth"
                      placeholder={['Month', 'Day', 'Year']}
                      handleDobChange={handleDobChange}
                    />
                    <TextField
                      handleChange={handleChange}
                      filled={formFilled}
                      label="Email"
                      name="email"
                      labelIcon={false}
                      placeholder="nik.resheteev@gmail.com"
                      classname="dark:bg-light-800 dark:box-border"
                      verify={true}
                      verificationState={verificationState}
                      startVerification={verifymail}
                    />
                    {emailRequiredMessage && (
                      <span style={{ color: 'red' }}>
                        Email verification required!
                      </span>
                    )}

                    {/* <div className="sm:grid sm:grid-cols-[100px_auto]  max-[640px]:grid  max-[640px]:grid-cols-[100px_auto] sm:gap-5 gap-2.5">
                      <SelectField
                        handleChange={handleChange}
                        filled={formFilled}
                        label="Phone"
                        name="countryCode"
                        labelIcon={false}
                        placeholder="+331"
                      />
                      <div className="mt-[25px]">
                        <TextField
                          handleChange={handleChange}
                          filled={true}
                          verify={true}
                          name="phoneNumber"
                          placeholder="654875236"
                          outerClass="justify-end"
                        />
                      </div>
                    </div> */}

                    {/* <TextFieldS
                      handleChange={handleChange}
                      variant="outlined"
                      label="OTP Code"
                      labelIcon={false}
                      placeholder="65487"
                      outline={true}
                      classname={`${
                        theme === 'dark'
                          ? 'otp-input-dark'
                          : 'otp-input bg-transparent'
                      }`}
                    /> */}
                  </div>
                </div>
                <hr className="my-[24px]" />
                <div className="lg:grid lg:grid-cols-2">
                  <div className="sm:w-[60%] w-full">
                    <div className="flex gap-[5px] items-center ">
                      <b className="block form-section-title dark:form-section-title-dark">
                        Address Details
                      </b>
                    </div>
                    <p className="form-section-subtitle">
                      Your personal information is never shared with other
                      users.
                    </p>
                  </div>
                  <div className="flex flex-col gap-5 sm:pt-2 max-[640px]:pt-6">
                    <TextField
                      handleChange={handleChange}
                      filled={formFilled}
                      label="State/ Province"
                      outline={true}
                      name="state"
                      labelIcon={false}
                      placeholder="e.g. California"
                      classname="dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"

                      // classname="border-none"
                    />
                    <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                      <TextField
                        handleChange={handleChange}
                        filled={formFilled}
                        label="Address Line 1"
                        outline={true}
                        name="address1"
                        labelIcon={false}
                        placeholder="e.g. 645 EShaw Ave"
                        classname="dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"

                        // classname={`${
                        //   theme === "dark" ? "otp-input-dark" : "otp-input"
                        // }`}
                      />
                      <TextField
                        handleChange={handleChange}
                        filled={formFilled}
                        label="Address Line 2"
                        labelIcon={false}
                        name="address2"
                        placeholder="e.g.  Fresco, ca 93710"
                        outline={true}
                        classname="dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:gap-5 gap-2.5">
                      <TextField
                        handleChange={handleChange}
                        filled={formFilled}
                        label="City"
                        labelIcon={false}
                        name="city"
                        placeholder="e.g. New York"
                        outline={true}
                        classname="dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                      <TextField
                        handleChange={handleChange}
                        filled={formFilled}
                        label="Post Code"
                        labelIcon={false}
                        name="postCode"
                        placeholder="e.g.  4450"
                        outline={true}
                        classname="dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-[24px]" />
                <div className="lg:grid lg:grid-cols-2">
                  <div className="sm:w-[60%]">
                    <div className="flex gap-[5px] items-center">
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
                      filled={formFilled}
                      label="Issuing Country/Region"
                      labelIcon={false}
                      placeholder="Please Select"
                      name="country"
                    />

                    <SelectField
                      handleChange={handleChange}
                      filled={formFilled}
                      label="Identity Type"
                      labelIcon={false}
                      name="identityType"
                      placeholder="Please Select"
                    />

                    <TextField
                      handleChange={handleChange}
                      filled={formFilled}
                      label="National ID Number"
                      name="nationalID"
                      labelIcon={false}
                      placeholder="e.g. 5589855455"
                      classname="dark:box-border-2x-dark max-[700px]:w-full width-fill-available  bg-dark-800 justify-between sm:bg-dark-800 rounded p-2.5 flex items-center dark:text-dark-800 dark:text-primary-100 dark:bg-white w-[250px]"
                    />
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
                      onClick={() =>
                        setTimeout(() => {
                          setFileUploadInitiated(true)
                        }, 10000)
                      }
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
                        <UploadingFile progress={uploadProgress} file={file} />
                      </div>
                    ))}
                    <div className="my-[20px]">
                      <Rules padding="py-[20px] px-[20px]" space="ml-[20px]" />
                    </div>
                    {((formState.document.link === '' && fileUploadInitated) ||
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
export default KYC
