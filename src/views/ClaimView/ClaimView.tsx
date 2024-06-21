import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { UserContext } from '../../App'
import AddMoreDocuments from '../../components/common/AddMoreDocuments '
import Attachment from '../../components/common/Attachment'
import Button from '../../components/common/Button'
import IncidentCard from '../../components/common/cards/IncidentCard'
import UploadingFile from '../../components/common/FileUpload/UploadingFile'
import FormAgreament from '../../components/common/FormAgreament'
import Header from '../../components/common/header/Header'
import IncidentDetails from '../../components/common/IncidentDetails'
import InfoText from '../../components/common/InfoText'
import Notes from '../../components/common/Notes'
import Progress from '../../components/common/Progress'
import UploadButton from '../../components/common/UploadButton'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import CastYourVote from '../../components/global/CastYourVote'
import Popup from '../../components/templates/Popup'
import { useNavigate, useParams } from 'react-router-dom'
import { getClaimDataById, submitClaimAssesment } from '../../api'
import { convertJsonToString, removeItemFromArray } from '../../utils/helpers'
import lighthouse from '@lighthouse-web3/sdk'
import { uploadJsonData } from '../../lighthouse'
import { createClaim, getNotes, addNote } from '../../database'
import { useWeb3React } from '@web3-react/core'
import { openAlert, closeAlert } from '../../redux/alerts'
import { useDispatch } from 'react-redux'

interface Document {
  link: string
  name: string
}

function ClaimView() {
  let navigate = useNavigate()
  const { account } = useWeb3React()
  const { theme } = React.useContext(UserContext)
  const [open, setOpen] = useState<boolean>(false)
  const [popup, setPopup] = React.useState(false)
  // const [addNote, setAddNote] = useState(false)
  const toggle = () => setOpen((v) => !v)
  let { claimId } = useParams()
  const [claimdetails, setClaimdetails] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [isYes, setIsYes] = useState(false)
  const [documents, setDocuments] = useState<any>([])
  const [amount, setAmount] = useState('0')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0) // Tracks progress for each file
  const [fileUploadInitated, setFileUploadInitiated] = useState(false)
  const [noteText, setNoteText] = useState('')

  const dispatch = useDispatch()

  const getData = async () => {
    const data = await getClaimDataById(claimId as string)
    await createClaim(Number(claimId))
    const notes = await getNotes(claimId as string)
    console.log('Data: ', { ...data, notes: notes })
    setClaimdetails({ ...data, notes: notes })
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const fileList = ['Id_back.png', 'Id_front.png', 'img 001.png', 'doc 002.pdf']

  const options = [
    {
      id: 435,
      text: 'Suspend',
    },
    {
      id: 364,
      text: 'Extend',
    },
  ]

  const [currentIcon, setcurrentIcon] = useState(-1)
  const [zero, setZero] = useState(false)
  const handleChange = (event: any) => {
    if (event.target.value === '00.00') {
      setZero(true)
    } else {
      setZero(false)
      setAmount(event.target.value)
    }
  }

  const titleClassName = 'fw-400 fs-13 lh-15 text-light-800 dark:text-dark-600'
  const textClassName = 'fw-500 fs-13 lh-15 text-light-800 dark:text-dark-600'

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
    const currentDocuments: Document[] = [...documents]
    currentDocuments.push({
      link: link,
      name: file[0].name,
    })
    setDocuments(currentDocuments)
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
    const newArray = removeItemFromArray(documents, documents[index].link)
    setDocuments(newArray)
    var newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
  }

  const handleSubmit = async () => {
    if (amount === '0') {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Failed',
            tag1: 'Enter a valid amount!',
            tag2: 'please input approved payout',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
    } else if (documents.length === 0) {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Failed',
            tag1: 'No Report file uploaded!',
            tag2: 'please upload a report file',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
    } else {
      const report = {
        documents: documents,
        approvedAmount: amount,
      }

      const dataString = convertJsonToString(report)
      const reportData = await uploadJsonData(dataString)
      console.log('Report: ', reportData)

      console.log('Is yes: ', isYes)

      await submitClaimAssesment(
        claimdetails.poolName,
        claimdetails.address,
        isYes,
        amount,
        reportData
      )

      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 1,
            variant: 'Successful',
            classname: 'text-black',
            title: 'Submission Successful',
            tag1: 'Claim Review submitted',
            tag2: 'View on etherscan',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
      navigate(-1)
    }
  }

  return loading ? (
    <></>
  ) : (
    <>
      <Header name="Claim #1250" showBackAero={true} overview={true} />
      <div>
        <div className="items-center justify-between hidden mb-5 black-btn ">
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
        </div>

        <div className="hidden sm:flex mb-10 gap-[30px] flex-wrap">
          <div className="flex-grow flex flex-col gap-5 w-[400px]">
            <div>
              <span className="fw-500 fs-16 lh-19 text-[#F1F1F1] dark:text-dark-600 block mb-5">
                Incident Details
              </span>
              <IncidentCard data={claimdetails} />
            </div>
            <IncidentDetails data={claimdetails} />
            <div>
              <h6 className="fw-500 fs-16 lh-19 mb-[20px]">Decision</h6>
              <div className=" py-[10px] px-[20px] sm:px-[30px] rounded dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      maxLength={8}
                      type="text"
                      placeholder={'0000'}
                      onChange={handleChange}
                      className={`placeholder:text-dark-300 text-6xl max-w-none min-w-0 w-[95px] flex-grow dark:placeholder:text-dark-300 
                    fw-400 lh-42 input-value 
                    ${
                      zero ? 'text-[#42434B]' : 'text-[#FFF] dark:text-dark-800'
                    }`}
                    />
                    <div className="ml-[10px]">
                      <InfoText text="ELA" />
                    </div>
                    <div className="ml-[64px]">
                      <Button
                        className="px-6 h-[30px] font-medium text-3xl bg-[#3F4048] dark:bg-[#FFFFFF]"
                        text="USDC"
                      />
                    </div>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="fw-400 fs-16 lh-42 sm:decision-amount">
                      ~
                    </span>
                    <span className="fw-400 fs-16 lh-42 sm:decision-amount">
                      ${amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-[20px] text-[#85858A] dark:text-[#000000]">
                Drag and drop report file (Max size: 1Mb)
              </p>
              <div className="flex flex-col gap-5 lg:pt-0">
                <div>
                  <label
                    className={`flex justify-center w-full  transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color w-full h-[40px]`}
                    htmlFor="file_upload"
                  >
                    <span className="flex items-center gap-[10px] sm:gap-[15px]">
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
                </div>
              </div>
            </div>

            <div className="flex gap-[12px] flex-col">
              {selectedFiles.map((file, index) => (
                <div key={index}>
                  <UploadingFile
                    progress={uploadProgress}
                    file={file}
                    handleRemove={() => removeFile(index)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-[10px]">
              <CastYourVote
                headline
                view="moblie"
                firsttext="By voting, I accept Kover's"
                setIsYes={setIsYes}
                handleSubmit={handleSubmit}
              />
            </div>
            <div>
              <div className="mb-[25px]">
                <span className="fw-500 fs-16 lh-19">Note</span>
              </div>

              <div className=" gap-[20px] flex flex-col">
                {claimdetails.notes.map((note: any) => {
                  return <Notes note={note} />
                })}
              </div>
              <div
                onClick={() => {
                  setPopup(true)
                }}
              >
                <AddMoreDocuments text="Add Note" title="Notes" />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-5 sm:flex claim-side-data">
            <h6 className="text-dark-300">Overview</h6>
            <div className="bg-dark-600 rounded p-[30px] dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <div className="mb-[30px] flex justify-between items-center">
                <span className="current-result">Current Result</span>
                <div className="relative">
                  <img
                    alt=""
                    src={
                      theme === 'dark'
                        ? '/images/dark-icon.svg'
                        : '/images/Icon.svg'
                    }
                    role="button"
                    onClick={toggle}
                  />
                  {open && (
                    <div className="relative z-[1]">
                      <div
                        onClick={toggle}
                        className="fixed top-0 bottom-0 left-0 right-0 bg-transparent -z-10"
                      />
                      <div className="absolute right-0 py-3 rounded top-7 bg-dark-800 w-max dark:bg-light-800">
                        {options.map(({ id, text }) => (
                          <button
                            key={id}
                            type="button"
                            className="flex w-full gap-2.5 items-center py-2 px-5 "
                            onClick={toggle}
                          >
                            <span className="text-lg font-medium hover:text-[#727272]">
                              {text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-[35px]">
                <button className="evaluation-btn">Evaluation</button>
                <div className="flex-grow ml-[15px]">
                  <img className="" src="/images/Ellipse 21.svg" alt="" />
                </div>
                <span className="font-medium lowercase ml-[12px]">
                  {' '}
                  1 DAY,2HRS LEFT
                </span>
              </div>
              <div className="flex flex-col gap-[15px] mb-4">
                <WeightRow
                  name="For"
                  value="00.00 (00.00%)"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <div>
                  <Progress current={0} />
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <WeightRow
                  name="Against"
                  value="00.00 (00.00%)"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <div>
                  <Progress
                    current={0}
                    color={
                      theme === 'dark'
                        ? 'rgb(42, 43, 49)'
                        : 'rgba(193, 30, 15, 0.8)'
                    }
                  />
                </div>
              </div>
            </div>
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
                  value="13/05/2022 20:58"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Cover ID"
                  value="2ab256355df..."
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
                  value="Active"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim ID"
                  value="1250"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim Amount"
                  value="1250 USCD"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="Claim History"
                  withInfo
                  value="1250 USCD"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
                <WeightRow
                  name="PRP"
                  withInfo
                  value="2000"
                  titleclassname={titleClassName}
                  textclassname={textClassName}
                />
              </div>
            </div>
            <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <WeightTitle title="Attachments" />
              <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                {[...Array(4)].map((value, index) => (
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

        <div className="flex sm:hidden flex-col gap-[20px] mb-[20px]">
          <div className="bg-dark-600 rounded p-[30px] dark:bg-white box-border-2x-light dark:box-border-2x-dark">
            <div className="mb-[30px] flex justify-between items-center">
              <span className="current-result">Current Result</span>
              <div className="relative">
                <img
                  alt=""
                  src={
                    theme === 'dark'
                      ? '/images/dark-icon.svg'
                      : '/images/Icon.svg'
                  }
                  role="button"
                  onClick={toggle}
                />
                {open && (
                  <div className="relative z-[1]">
                    <div
                      onClick={toggle}
                      className="fixed top-0 bottom-0 left-0 right-0 bg-transparent -z-10"
                    />
                    <div className="absolute right-0 py-3 rounded top-7 bg-dark-800 w-max dark:bg-light-800">
                      {options.map(({ id, text }) => (
                        <button
                          key={id}
                          type="button"
                          className="flex w-full gap-2.5 items-center py-2 px-5"
                          onClick={toggle}
                        >
                          <span className="text-lg font-medium hover:text-[#727272]">
                            {text}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center mb-[35px]">
              <button className="evaluation-btn">Evaluation</button>
              <div className="flex-grow ml-[15px]">
                <img className="" src="/images/Ellipse 21.svg" alt="" />
              </div>
              <span className="font-medium lowercase ml-[12px]">
                1 DAY, 2HRS LEFT
              </span>
            </div>
            <div className="flex flex-col gap-[15px] mb-4">
              <WeightRow
                name="For"
                value="00.00 (00.00%)"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
              <div>
                <Progress current={0} />
              </div>
            </div>
            <div className="flex flex-col gap-[15px]">
              <WeightRow
                name="Against"
                value="00.00 (00.00%)"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
              <div>
                <Progress
                  current={0}
                  color={
                    theme === 'dark'
                      ? 'rgb(42, 43, 49)'
                      : 'rgba(193, 30, 15, 0.8)'
                  }
                />
              </div>
            </div>
          </div>
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
                value="13/05/2022 20:58"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
              <WeightRow
                name="Cover ID"
                value="2ab256355df..."
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
                value="Active"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
              <WeightRow
                name="Claim ID"
                value="1250"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
              <WeightRow
                withInfo
                name=" Claim History"
                value="2"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
              <WeightRow
                withInfo
                name=" PRP"
                value="2000"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-[30px]">
              <button
                type="button"
                className={` medium dark  dark:bg-white  square  button focus:bg-[#4C4D55] focus:border-[#4C4D55] border-[#4C4D55] border-2`}
              >
                <span className="">Cancel Cover</span>
              </button>
              <Button
                to="/chat"
                text="Contact User"
                color={theme === 'dark' ? '' : 'dark'}
                className="dark:bg-light-1100 focus:bg-[#4C4D55] "
              />
            </div>
          </div>
          <div>
            <span className="fw-500 fs-16 lh-19 text-[#F1F1F1] dark:text-dark-600 block mb-5">
              Incident Details
            </span>
            <IncidentCard data={claimdetails} />
          </div>
          <>
            <IncidentDetails data={claimdetails} />
            <div>
              <h6 className="fw-500 fs-16 lh-19 mb-[20px]">Decision</h6>
              <div className=" py-[10px] px-[20px] sm:px-[30px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder={'0000'}
                      onChange={handleChange}
                      className={`placeholder:text-dark-300 text-6xl max-w-none min-w-0 w-[42px] flex-grow dark:placeholder:text-dark-300 
                    fw-400 lh-42 input-value 
                    ${
                      zero ? 'text-[#42434B]' : 'text-[#FFF] dark:text-dark-800'
                    }`}
                    />
                    <div className="ml-[15px]">
                      <Button
                        className="px-3 h-[30px] font-medium text-3xl bg-[#3F4048] dark:bg-[#FFFFFF]"
                        text="USDC"
                        btnText="fs-12"
                      />
                    </div>
                    <div className="ml-[10px]">
                      <InfoText text="ELA" />
                    </div>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="fw-400 fs-16 lh-42 sm:decision-amount">
                      ~
                    </span>
                    <span className="fw-400 fs-16 lh-42 sm:decision-amount">
                      ${amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-[20px] text-[#85858A] dark:text-[#000000]">
                Drag and drop report file (Max size: 1Mb)
              </p>
              <div className="flex flex-col gap-5 lg:pt-0">
                <div>
                  <label
                    className={`flex justify-center w-full transition border-2 border-gray-300 dark:dark-light-box-border dark:border-dashed border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none border-color w-full h-[40px]`}
                  >
                    <span className="flex items-center gap-[10px] sm:gap-[15px]">
                      <img
                        className="w-[14px] h-[16px]"
                        src="/images/uploadAeroBlack.svg"
                        alt=""
                      />
                      <span className="upload-text dark:text-dark-800">
                        Upload
                      </span>
                    </span>
                    <input type="file" name="file_upload" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-[12px] flex-col">
              <UploadingFile progress={100} />
              <UploadingFile progress={80} />
            </div>
            <div className="mt-[10px]">
              <CastYourVote
                headline
                view="moblie"
                firsttext="By voting, I accept Kover's"
                setIsYes={setIsYes}
                handleSubmit={handleSubmit}
              />
            </div>
          </>
          <div>
            <div className="mb-[25px]">
              <span className="fw-500 fs-16 lh-19">Note</span>
            </div>

            <div className=" gap-[20px] flex flex-col">
              {claimdetails.notes.map((note: any) => {
                return <Notes note={note} />
              })}
            </div>
            <div
              onClick={() => {
                setPopup(true)
              }}
            >
              <AddMoreDocuments text="Add Note" title="Notes" />
            </div>
          </div>

          <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
            <WeightTitle title="Attachments" />
            <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
              {[...Array(4)].map((value, index) => (
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

      <Popup
        visible={popup}
        onClose={() => {
          setPopup(false)
        }}
      >
        <div className="px-[30px] pb-[40px] pt-[30px] dark:bg-white">
          <div className="flex justify-end">
            <img
              role={'button'}
              className="w-2.5"
              src="/images/Group 158.svg"
              alt=""
              onClick={() => {
                setPopup(false)
              }}
            />
          </div>
          <div className="flex flex-col items-center mb-[32px]">
            <img
              className="mt-[10px] w-[25px] h-[27px]"
              src={
                theme === 'dark'
                  ? '/images/x-logo-dark.svg'
                  : '/images/x-logo.svg'
              }
              alt=""
            />
            <h3 className="mt-[17px] fw-500 fs-16 lh-28">Add Note</h3>
          </div>
          <div className="flex flex-col gap-[10px]">
            <textarea
              className="box-border-2x-light dark:box-border-2x-dark rounded bg-dark-800 dark:bg-light-800 py-4 px-5 rounded placeholder:text-dark-650 text-white dark:text-[#000000] text-lg h-[133px] w-[250px]"
              placeholder="Type here ..."
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <span className="text-[#606166] fw-500 fs-12 lh-14">0/250</span>
            </div>
          </div>
          <button
            onClick={async () => {
              await addNote(
                claimId as string,
                'Daniel',
                account as string,
                noteText
              )
              await getData()
              setNoteText('')
              setPopup(false)
            }}
            type="button"
            className={`${
              theme === 'dark' ? 'dark:white dark:box-border' : 'greenGradient'
            } contained medium font-medium px-8 w-full square button mt-[15px]`}
          >
            <span>{'Submit Note'}</span>
            <img className="duration-150 " src={'/images/125.svg'} alt="" />
          </button>
        </div>
      </Popup>
    </>
  )
}

export default ClaimView
