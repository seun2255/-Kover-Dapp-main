import React, { useState, useEffect } from 'react'
import Agreament from '../../components/common/Agreament'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import WeightTitle from '../../components/common/WeightTitle'
import QRConnector from '../../components/common/QRConnector'
import Rules from '../../components/common/FileUpload/Rules'
import SelectField from '../../components/common/TextField/SelectField'
import { UserContext } from '../../App'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import FormAgreament from '../../components/common/FormAgreament'
import { Link } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import { openAlert, closeAlert } from '../../redux/alerts'
import { convertJsonToString } from '../../utils/helpers'
import { getCurrentDateTime } from '../../utils/dateTime'
import lighthouse from '@lighthouse-web3/sdk'
import { uploadJsonData } from '../../lighthouse'
import {
  is_kyc_reviewer,
  apply_for_InsurePro,
  getUserData,
  getPools,
} from '../../api'
import {
  createUser,
  updateInsureProVerificationState,
  createChatRoom,
} from '../../database'
import { getUser } from '../../tableland'
import { removeItemFromArray } from '../../utils/helpers'
import { getUserDetails } from '../../database'
import VerifyIdentity from '../Welcome/membership/VerifyIdentity'
import StartProcess from '../InsurePro/membership/StartProcess'
import { useSelector } from 'react-redux'
import { openLoader } from '../../redux/alerts'

interface popupProps {
  userVerificationState: string
  setUserVerificationState: any
}

interface Document {
  link: string
  name: string
}

function Adjuster() {
  const { theme } = React.useContext(UserContext)
  const { width } = useWindowDimensions()
  const [currentIcon, setcurrentIcon] = useState('')
  const { library, account } = useWeb3React()
  const { connected } = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    workArea: '',
    workField: '',
    pool: 'Car Insurance',
    reviewerDocuments: [] as Document[],
  })
  const fileName = ['Id_back.png', 'Id_front.png', 'img 001.png', 'Doc 002.pdf']
  const [formFilled, setFormFilled] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0) // Tracks progress for each file
  const [fileUploadInitated, setFileUploadInitiated] = useState(false)
  const [showPools, setShowPools] = useState(false)
  const [policyPools, setPolicyPools] = useState([])
  const [kycVerified, setKycVerified] = useState(false)
  const [userVerificationState, setUserVerificationState] =
    useState('unverified')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  type ProgressData = {
    total: number
    uploaded: number
  }

  useEffect(() => {
    const setPools = async () => {
      const pools = await getPools()
      setPolicyPools(pools)
    }
    setPools()
  }, [])

  useEffect(() => {
    if (account) {
      getUserDetails(account).then((user) => {
        if (user) {
          if (user.kycVerificationState === 'verified') {
            setKycVerified(true)
          }
          if (user.insureProVerificationState === 'verified') {
            navigate('/kyc-application')
          }
          setUserVerificationState(user.insureProVerificationState)
        }
        setLoading(false)
      })
    }
  }, [connected])

  useEffect(() => {
    if (formState.workField !== 'KYC Reviewer' && formState.workField !== '') {
      setShowPools(true)
    } else {
      setShowPools(false)
    }
  }, [formState.workField])

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
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Approving Token use',
      })
    )
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

      const hash = await apply_for_InsurePro(
        userData,
        formState.workField,
        'NG',
        'Car Insurance',
        dispatch
      )
      if (hash) {
        const userInfo = await getUser(account as string)
        const userId = userInfo.id

        await createChatRoom('insure-pro', 'NG', userId as number, {
          [account as string]: formData.firstName,
          // eslint-disable-next-line no-useless-computed-key
          ['0x0Af54e344C1DcC79B11C20768FDE1d79E99c6CC2']: 'Admin',
        })
        await updateInsureProVerificationState(account, 'verifying')
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
              hash: hash,
            },
          })
        )
        setTimeout(() => {
          dispatch(closeAlert())
        }, 10000)
        setUserVerificationState('verifying')
      }
    }
  }

  return loading ? (
    <div></div>
  ) : !kycVerified ? (
    <>
      <div className="flex-grow flex flex-col w-[1100px]">
        {!connected && (
          <div className="mt-[28px]">
            <VerifyIdentity />
          </div>
        )}
        {connected && (
          <div className="mt-[10px]">
            <StartProcess kycVerified={kycVerified} />
          </div>
        )}
      </div>
    </>
  ) : userVerificationState !== 'unverified' ? (
    <div className="mt-[10px]">
      <StartProcess kycVerified={kycVerified} />
    </div>
  ) : (
    <>
      <div className="mb-10 lg:flex gap-[60px] sm:mt-[20px]">
        <div className="flex-grow">
          <div className="lg:grid lg:grid-cols-2">
            <div className="sm:w-[60%] w-full">
              <div className="flex gap-[5px] items-center mb-[10px] ">
                <b className="form-section-title dark:form-section-title-dark block">
                  Professional Details
                </b>
              </div>
              <p className="form-section-subtitle">
                Your professional information is never to other users.
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-5 lg:pt-2">
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
          <hr className="my-[25px]" />
          <div className="lg:grid lg:grid-cols-2">
            <div className="sm:w-[60%] w-full">
              <div className="flex gap-[5px] items-stretch mb-[10px] ">
                <b className="form-section-title dark:form-section-title-dark block">
                  {' '}
                  Professional Certification
                </b>
                <img
                  src={`${
                    currentIcon === 'professional-certification-1'
                      ? '/images/info-green-icon.svg'
                      : '/images/Maskd (2).svg'
                  }`}
                  className="w-[14px]"
                  alt=""
                  id={`professional-certification-1`}
                  onMouseEnter={() => {
                    setcurrentIcon('professional-certification-1')
                  }}
                  onMouseLeave={() => {
                    setcurrentIcon('')
                  }}
                />
                <ReactTooltip
                  className={`my-tool-tip z-500`}
                  anchorId={'professional-certification-1'}
                  place="bottom"
                  content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                />
              </div>
              <p className="form-section-subtitle">
                Drag and drop one or multiple files (Max size: 1Mb)
              </p>
            </div>
            <div className="flex flex-col gap-5 lg:pt-0 pt-[10px]">
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
              </div>
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

          <hr className="my-[25px]" />
          <div className="lg:grid lg:grid-cols-2 mt-[20px]">
            <div className="col-start-2">
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
            <QRConnector
              className="hidden lg:block"
              size="w-[279px] h-[249px]"
            />

            <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <WeightTitle title="Attachments" />
              <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                {[...Array(2)].map((value, index) => (
                  <>
                    <div className="flex justify-between">
                      <div className="flex basis-3/4 gap-[16px]">
                        <img src="/images/pin.svg" alt="" />
                        <Link
                          className={`${
                            theme === 'dark'
                              ? 'font-bold text-[#606166] hover:text-[#000000]'
                              : 'text-white hover:text-[#50ff7f]'
                          } file-name `}
                          to={''}
                        >
                          Essential IPID
                        </Link>
                      </div>
                      <img
                        className="items-end w-[20px]"
                        src={
                          theme === 'dark'
                            ? '/images/downloadblack.svg'
                            : '/images/download.svg'
                        }
                        alt=""
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adjuster
