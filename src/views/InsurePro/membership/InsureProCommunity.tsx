import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/common/Button'
import Header from '../../../components/common/header/Header'
import QRConnector from '../../../components/common/QRConnector'
import SelectField from '../../../components/common/TextField/SelectField'
import TextField from '../../../components/common/TextField'
import TextFieldS from '../../../components/common/TextFieldS'
import { UserContext } from '../../../App'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import InfoText from '../../../components/common/InfoText'
import ProgressWeight from '../../../components/common/progress-weight/ProgressWeight'
import Rules from '../../../components/common/FileUpload/Rules'
import UploadingFile from '../../../components/common/FileUpload/UploadingFile'
import DownloadBox from '../../../components/common/DownloadBox'
import FormAgreament from '../../../components/common/FormAgreament'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import { openAlert, closeAlert } from '../../../redux/alerts'
import { convertJsonToString } from '../../../utils/helpers'
import { getCurrentDateTime } from '../../../utils/dateTime'
import lighthouse from '@lighthouse-web3/sdk'
import { uploadJsonData } from '../../../lighthouse'
import {
  is_kyc_reviewer,
  apply_for_InsurePro,
  getUserData,
  getPools,
} from '../../../api'
import {
  createUser,
  updateInsureProVerificationState,
  createChatRoom,
  applicationsUpdate,
} from '../../../database'
import { getUser } from '../../../tableland'
import { removeItemFromArray } from '../../../utils/helpers'

interface popupProps {
  onClose?: () => void
  setUserVerificationState: any
}

interface Document {
  link: string
  name: string
}

function InsureProCommunity(
  { onClose, setUserVerificationState }: popupProps,
  props: any
) {
  const { theme } = React.useContext(UserContext)
  const [currentIcon, setcurrentIcon] = useState('')
  const { library, account } = useWeb3React()
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    workArea: '',
    workField: '',
    pool: 'Car Insurance',
    reviewerDocuments: [] as Document[],
  })
  const [formFilled, setFormFilled] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0) // Tracks progress for each file
  const [fileUploadInitated, setFileUploadInitiated] = useState(false)
  const [showPools, setShowPools] = useState(false)
  const [policyPools, setPolicyPools] = useState([])

  type ProgressData = {
    total: number
    uploaded: number
  }

  useEffect(() => {
    if (formState.workField !== 'KYC Reviewer' && formState.workField !== '') {
      setShowPools(true)
    } else {
      setShowPools(false)
    }
  }, [formState.workField])

  useEffect(() => {
    const setPools = async () => {
      const pools = await getPools()
      setPolicyPools(pools)
    }
    setPools()
  }, [])

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
    const currentDocuments: Document[] = [...formState.reviewerDocuments]
    currentDocuments.push({
      link: link,
      name: file[0].name,
    })
    setFormState((prevState) => ({
      ...prevState,
      reviewerDocuments: currentDocuments,
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
      formState.reviewerDocuments,
      formState.reviewerDocuments[index].link
    )
    setFormState((prevState: any) => ({
      ...prevState,
      reviewerDocuments: newArray,
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
    const user = await getUserData(account)
    setFileUploadInitiated(true)
    const date = getCurrentDateTime()
    setFormState((prevState) => ({
      ...prevState,
      date: date,
      address: account,
    }))
    const formFilled = areAllValuesFilled(formState)
    setFormFilled(formFilled)
    // if (verificationState !== 'verified') {
    //   setEmailRequiredMessage(true)
    // }
    // if (formFilled && verificationState === 'verified') {
    if (formFilled) {
      // fetch('https://ipinfo.io/json')
      //   .then((response) => response.json())
      //   .then(async (data) => {
      const formData = {
        ...formState,
        date: date,
        address: account,
        region: 'NG',
        ...user,
      }
      const dataString = convertJsonToString(formData)
      const userData = await uploadJsonData(dataString)
      // const isReviwer = await is_kyc_reviewer(signer);

      await apply_for_InsurePro(
        userData,
        formState.workField,
        'NG',
        'Car Insurance'
      )
        .then(async (result) => {
          if (result.success) {
            const userInfo = await getUser(account as string)
            const userId = userInfo.id

            await createChatRoom('insure-pro', 'NG', userId as number, {
              [account as string]: formData.firstName,
              // eslint-disable-next-line no-useless-computed-key
              ['0xCaB5F6542126e97b76e5C9D4cF48970a3B8AC0AD']: 'Admin',
            })
            await updateInsureProVerificationState(account, 'verifying')
            await applicationsUpdate()
            dispatch(
              openAlert({
                displayAlert: true,
                data: {
                  id: 1,
                  variant: 'Successful',
                  classname: 'text-black',
                  title: 'Submission Successful',
                  tag1: 'Insure Pro application submitted',
                  tag2: 'View on etherscan',
                  hash: result.hash,
                },
              })
            )
            setTimeout(() => {
              dispatch(closeAlert())
            }, 10000)
            setUserVerificationState('verifying')
            if (onClose !== undefined) onClose()
          } else {
            dispatch(
              openAlert({
                displayAlert: true,
                data: {
                  id: 2,
                  variant: 'Failed',
                  classname: 'text-black',
                  title: 'Transaction Failed',
                  tag1: result.reason ? result.reason : '',
                  tag2: 'View on etherscan',
                  hash: result.hash,
                },
              })
            )
            setTimeout(() => {
              dispatch(closeAlert())
            }, 10000)
          }
        })
        // })
        .catch((error) => {
          console.log('Error fetching IP address information: ', error)
        })
    }
  }

  return (
    <div>
      <div className="mb-10 lg:flex gap-[60px]">
        <div className="flex-grow">
          <div className="flex justify-between">
            <div className="flex gap-[10px] items-center">
              <p className="InsureProCommunity-title">InsurePro Community</p>
            </div>
            <div className="flex items-center">
              <div className="flex justify-end">
                <button type="button" onClick={onClose}>
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
                  <p className="welcome-subtitle">Submit InsurePro</p>
                </div>
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
                  <div className="flex flex-col gap-5 pt-6 lg:pt-2">
                    <SelectField
                      labelIcon={false}
                      handleChange={handleChange}
                      filled={formFilled}
                      label="Work Area"
                      placeholder="Please Select"
                      name="workArea"
                    />
                    <SelectField
                      labelIcon={false}
                      handleChange={handleChange}
                      filled={formFilled}
                      label="Work Field"
                      placeholder="Domain"
                      name="workField"
                    />
                    {showPools && (
                      <SelectField
                        labelIcon={false}
                        handleChange={handleChange}
                        filled={formFilled}
                        label="Pool"
                        placeholder="Please select"
                        name="pool"
                        pools={policyPools}
                      />
                    )}
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
                          handleRemove={() => removeFile(index)}
                        />
                      </div>
                    ))}
                    <div className="my-[20px]">
                      <Rules padding="py-[20px] px-[20px]" space="ml-[20px]" />
                    </div>
                    {((formState.reviewerDocuments.length === 0 &&
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
export default InsureProCommunity
