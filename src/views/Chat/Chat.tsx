import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import Attachment from '../../components/common/Attachment'
import Button from '../../components/common/Button'
import Header from '../../components/common/header/Header'
import Progress from '../../components/common/Progress'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import Conversition from './Conversition'
import InfoHeader from './InfoHeader'
import MessageType from './MessageType'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getChatRoom,
  sendMessage,
  db,
  markAllMessagesAsRead,
} from '../../database'
import { useWeb3React } from '@web3-react/core'
import { doc, onSnapshot } from 'firebase/firestore'
import AttachmentPreview from '../../components/common/AttachmentPreview/AttachmentPreview'
import Popup from '../../components/templates/Popup'
import { useSelector } from 'react-redux'
import {
  getUserData,
  modifyPolicy,
  get_covers,
  getPolicyData,
  getStakeRewards,
} from '../../api'
import { findObjectById, removeItemFromArray } from '../../utils/helpers'
import {
  switchCoverModifyState,
  switchKYCReviewerModify,
  updateCoverQuote,
  getCoverDetails,
} from '../../database'
import Score from '../../views/Dashboard/Score'
import Rewards from '../../views/Dashboard/Rewards'

function getType(roomId: string) {
  const hyphenIndex = roomId.indexOf('-')
  if (hyphenIndex !== -1) {
    return roomId.substring(0, hyphenIndex)
  }
  return roomId // If no hyphen is found, return the entire string
}

function getIndex(roomId: string) {
  const link = roomId
  const number = link.split('-').pop()
  return number
}

function Chat() {
  const { kycApplicants, kycReviewerApplicants, coverApplications } =
    useSelector((state: any) => state.kyc)
  let navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const { account } = useWeb3React()
  const [attachements, setAttachments] = useState<any[]>([])
  const [popup, setPopup] = useState(false)
  const togglePopup = () => setPopup((v) => !v)
  const [selectedDocument, setSelectedDocument] = useState<any>({})
  let { roomId } = useParams()
  const type = getType(roomId as string)
  const [summaryData, setSummaryData] = useState({
    purchase: '---',
    coverId: '---',
    status: '---',
    claimId: '---',
    claimAmout: '---',
    claimHistory: '---',
    PRP: '---',
  })
  const [loadingRewards, setLoadingRewards] = useState(true)
  const [userDetails, setUserDetails] = useState<any>({ rewards: 0 })

  interface ChatRoom {
    messages: any[]
    names: { [key: string]: any }
  }

  const toggle = () => setOpen((v) => !v)
  const { theme } = React.useContext(UserContext)
  const [chatRoom, setChatRoom] = useState<ChatRoom>({
    messages: [],
    names: {},
  })

  markAllMessagesAsRead(roomId as string, account)
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

  const titleClassName = 'fw-400 fs-13 lh-15 text-light-800 dark:text-dark-600'
  const textClassName = 'fw-500 fs-13 lh-15 text-light-800 dark:text-dark-600'

  const handleSend = (text: any) => {
    if (account && roomId) {
      var temp: any = { ...chatRoom }
      const message = {
        message: {
          text,
          time: '...',
        },
        sender: {
          name: chatRoom.names[account],
          address: account,
        },
      }
      temp.messages.push(message)
      setChatRoom(temp)
      console.log(chatRoom.names)

      const sender = {
        name: chatRoom.names[account],
        address: account,
      }
      sendMessage(roomId, sender, text)
    }
  }

  const preLoad = async (roomId: string) => {
    const covers = await get_covers('Car')
    const index = getIndex(roomId)
    console.log(index)
    var temp = findObjectById(covers, index)
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
    setSummaryData(summaryData)
  }

  useEffect(() => {
    if (roomId) {
      getChatRoom(roomId).then((chatRoom) => {
        setChatRoom(chatRoom)
        Object.keys(chatRoom.names).map((address: string) => {
          if (type === 'kyc') {
            if (chatRoom.names[address] !== 'reviewer') {
              kycApplicants.map((applicant: any) => {
                if (applicant.address === address) {
                  setAttachments(applicant.documents)
                }
              })
            }
          } else if (type === 'insure') {
            if (chatRoom.names[address] !== 'Admin') {
              console.log('all: ', kycReviewerApplicants)
              kycReviewerApplicants.map((applicant: any) => {
                if (applicant.address === address) {
                  setAttachments(applicant.reviewerDocuments)
                }
              })
            }
          } else if (type === 'policy') {
            if (chatRoom.names[address] !== 'reviewer') {
              coverApplications.map((applicant: any) => {
                if (applicant.address === address) {
                  setAttachments(applicant.documents)
                }
              })
            }
            preLoad(roomId as string)
          } else if (type === 'claim') {
            const getRewards = async () => {
              const rewards = await getStakeRewards(account as string)
              setUserDetails({ rewards })
              setLoadingRewards(false)
            }
            getRewards()
          }
        })
      })
      const unsubChatRoom = onSnapshot(doc(db, 'chat-rooms', roomId), (doc) => {
        setChatRoom(doc.data() as ChatRoom)
      })
    }
  }, [])

  return (
    <div className="mb-10">
      <Header name="Chat" showBackAero={true} />
      <div className="block md:flex gap-[20px]">
        <div className="flex-grow">
          <div className="mb-[20px]">
            <Button
              onClick={() => navigate(-1)}
              icon={
                theme === 'dark'
                  ? '/images/leftBlackAero.svg'
                  : '/images/Mask (2ss).svg'
              }
              className="dark:text-primary-100 dark:bg-light-1100 bg-dark-800 black-btn "
              text="Back"
            />
          </div>
          <div className="rounded bg-dark-600 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
            <InfoHeader roomId={roomId} users={chatRoom.names} />
            <Conversition messages={chatRoom.messages} />
            <MessageType handleSend={handleSend} />
          </div>
        </div>

        <div className="flex-col gap-5 w-full max-w-[285px] hidden md:flex mt-5">
          <h6 className="text-dark-300">Overview</h6>
          {/* <div className="bg-dark-600 rounded p-[30px] dark:bg-white box-border-2x-light dark:box-border-2x-dark">
            <div className="mb-[30px] flex justify-between">
              <span className="current-result">Current Result</span>
              <div className="relative">
                <img
                  src={
                    theme === 'dark'
                      ? '/images/dark-icon.svg'
                      : '/images/Icon.svg'
                  }
                  role="button"
                  onClick={toggle}
                  alt=""
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
                name="Claim History"
                value="2"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
              <WeightRow
                withInfo
                name="PRP"
                value="2000"
                titleclassname={titleClassName}
                textclassname={textClassName}
              />
            </div>
          </div> */}

          {/* <div className="rounded bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
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
          </div> */}
          {type === 'kyc' ||
            (type === 'insure' && (
              <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                <WeightTitle title="Attachments" />
                <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                  {attachements.map((document: any, index: number) => (
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
                      </div>
                    </>
                  ))}
                </div>
              </div>
            ))}
          {type === 'policy' && (
            <>
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
              </div>
              <div className="bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                <WeightTitle title="Attachments" />
                <div className="flex gap-[12px] flex-col mt-[25px] sm:mt-[0px]">
                  {attachements.map((document: any, index: number) => (
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
                      </div>
                    </>
                  ))}
                </div>
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
            </>
          )}
          {type === 'claim' && (
            <>
              <Rewards details={userDetails} />
              <Score size="w-[90px]" />
            </>
          )}
        </div>
      </div>

      <Popup visible={popup} onClose={togglePopup} maxWidth="max-w-[824px]">
        <AttachmentPreview
          attachmentName={selectedDocument.name}
          attachmentLink={selectedDocument.link}
          onClose={togglePopup}
        />
      </Popup>
    </div>
  )
}

export default Chat
