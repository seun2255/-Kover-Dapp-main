import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { UserContext } from '../../App'
import AddMoreDocuments from '../../components/common/AddMoreDocuments '
import Attachment from '../../components/common/Attachment'
import Button from '../../components/common/Button'
import IncidentCard from '../../components/common/cards/IncidentCard'
import FormAgreament from '../../components/common/FormAgreament'
import Header from '../../components/common/header/Header'
import IncidentDetails from '../../components/common/IncidentDetails'
import InfoText from '../../components/common/InfoText'
import Notes from '../../components/common/Notes'
import Progress from '../../components/common/Progress'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import CastYourVote from '../../components/global/CastYourVote'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import { useNavigate, useParams } from 'react-router-dom'
import { getClaimDataById } from '../../api'
import { extractHash } from '../../utils/helpers'
import CastAssesment from '../Welcome/membership/CastAssesment'
import Popup from '../../components/templates/Popup'
import AttachmentPreview from '../../components/common/AttachmentPreview/AttachmentPreview'

function ClaimViewUser() {
  let navigate = useNavigate()
  const { theme } = React.useContext(UserContext)
  const [open, setOpen] = useState<boolean>(false)
  const [hoverIcon, sethoverIcon] = useState('')
  let { claimId } = useParams()
  const [claimdetails, setClaimdetails] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const toggle = () => setOpen((v) => !v)
  const fileList = ['Id_back.png', 'Id_front.png', 'img 001.png', 'doc 002.pdf']
  const [isYes, setIsYes] = useState(false)
  const [icon, setIcon] = useState('')
  const [popup, setPopup] = useState(false)
  const togglePopup = () => setPopup((v) => !v)

  const options = [
    {
      id: 435,
      text: 'Cancel',
    },
    {
      id: 364,
      text: 'Chat',
    },
  ]

  useEffect(() => {
    const getData = async () => {
      const data = await getClaimDataById(claimId as string)
      console.log('Data: ', data)
      setClaimdetails(data)
      setLoading(false)
    }
    getData()
  }, [])

  const getRecommendation = (status: string) => {
    if (status === 'approved') {
      return 'Approve'
    } else if (status === 'rejected') {
      return 'reject'
    } else {
      return 'Pending'
    }
  }

  const [currentIcon, setcurrentIcon] = useState(-1)
  const [zero, serZero] = useState(false)

  const { width } = useWindowDimensions()

  const handleChange = (event: any) => {
    if (event.target.value === '00.00') {
      serZero(true)
    } else {
      serZero(false)
    }
  }

  const handleReportClick = () => {
    setPopup(true)
  }

  const handleSubmit = async () => {}

  const titleClassName = 'fw-400 fs-13 lh-15 text-light-800 dark:text-dark-600'
  const textClassName = 'fw-500 fs-13 lh-15 text-light-800 dark:text-dark-600'

  return loading ? (
    <></>
  ) : (
    <>
      <div>
        <Header name="Claim #1250" showBackAero={true} overview={true} />
        <div className="items-center justify-between hidden mb-5 back-btn">
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
        </div>

        {width >= 600 ? (
          <>
            <div className="hidden sm:flex mb-10 gap-[30px] flex-wrap">
              <div className="flex-grow flex flex-col gap-5 w-[400px]">
                <div>
                  <span className="fw-500 fs-16 lh-19 text-[#F1F1F1] dark:text-dark-600 block mb-5">
                    Incident Details
                  </span>
                  <IncidentCard data={claimdetails} />
                </div>
                <IncidentDetails data={claimdetails} />
                {/* <div>
                  <AddMoreDocuments subtext={true} />
                  <FormAgreament
                    agreeURL="/"
                    mainClass="flex justify-between pt-[15px]"
                    variety="checkbox"
                    agree="Terms of Use & Privacy Policy"
                    bntText="Submit"
                    item1Class="w-fit flex gap-[11px] items-center"
                    item2Class="w-fit"
                    btn="w-fit"
                    handleSubmit={handleSubmit}
                  />
                </div> */}

                <div className="mt-[20px] bg-dark-600  dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                  <InfoText
                    variant="large"
                    text="Investigation Report"
                    color={theme === 'dark' ? 'dark' : 'white'}
                    className="pt-[30px] px-[20px] flex gap-[5px] text-[#F1F1F1] dark:text-dark-600 fw-500 fs-16 lh-19"
                    textClassName="text-[#F1F1F1] dark:text-dark-600 fw-500 fs-16 lh-19 ls-35"
                  />

                  <div className="pt-[20px] px-[20px] pb-[30px] bg-dark-600 rounded dark:bg-white">
                    <div className="flex flex-col gap-3">
                      <div className="flex w-full">
                        <div className="flex w-[177px]">
                          <span className="text-dark-200 investigation-item-title-sm">
                            Asessor Report
                          </span>
                        </div>
                        <div className="flex w-[60%]">
                          <div className="flex items-center">
                            <Attachment
                              className="file-name investigation-item-value-sm"
                              icon={
                                theme === 'dark'
                                  ? '/images/backFile.svg'
                                  : '/images/Group 218.svg'
                              }
                              name={claimdetails.report.name}
                              status={
                                theme === 'dark'
                                  ? '/images/downloadblack.svg'
                                  : '/images/Group 219.svg'
                              }
                              height={19}
                              width={19}
                              gap={2}
                              button={true}
                              handleClick={handleReportClick}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="min-w-full">
                        <img
                          className="min-w-full"
                          src="/images/line-2.svg"
                          alt=""
                        />
                      </div>

                      <div className="flex w-full">
                        <div className="flex w-[177px]">
                          <span className="text-dark-200 investigation-item-title-sm">
                            File Hash
                          </span>
                        </div>
                        <div className="flex w-[60%]">
                          <span className="investigation-item-value-sm">
                            {extractHash(claimdetails.report.link)}
                          </span>
                        </div>
                      </div>

                      <div className="min-w-full">
                        <img
                          className="min-w-full"
                          src="/images/line-2.svg"
                          alt=""
                        />
                      </div>

                      <div className="flex w-full">
                        <div className="flex w-[177px] gap-[8px]">
                          <span className="text-dark-200 investigation-item-title-sm">
                            Recommandation
                          </span>
                          <img
                            width={8}
                            id={`recommandation`}
                            src={`${
                              icon === 'recommandation'
                                ? '/images/info-green-icon.svg'
                                : '/images/Maskd (2).svg'
                            }`}
                            alt=""
                            onMouseEnter={() => {
                              setIcon('recommandation')
                            }}
                            onMouseLeave={() => {
                              setIcon('')
                            }}
                          />
                          <ReactTooltip
                            className="my-tool-tip z-500"
                            anchorId={'recommandation'}
                            place="bottom"
                            content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                          />
                        </div>
                        <div className="flex w-[60%]">
                          <span
                            className={`text-[${
                              claimdetails.resultStatus === 'approved'
                                ? '#50ff7f'
                                : '#DA0A0A'
                            }] investigation-item-value-sm`}
                          >
                            {getRecommendation(claimdetails.resultStatus)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CastAssesment claimDetails={claimdetails} />
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
                      {' '}
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
                      name="Claim Amount"
                      value="----"
                      titleclassname={titleClassName}
                      textclassname={textClassName}
                    />
                    <WeightRow
                      name="Assesor"
                      value="----"
                      titleclassname={titleClassName}
                      textclassname={textClassName}
                    />
                  </div>
                </div>
                <div className="rounded bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
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
          </>
        ) : (
          <>
            {' '}
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
                    {' '}
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
              <IncidentDetails data={claimdetails} />
              <div>
                <AddMoreDocuments subtext={true} />
                <FormAgreament
                  agreeURL="/"
                  mainClass="flex flex-col mt-[30px]"
                  variety="checkbox"
                  agree="Terms of Use & Privacy Policy "
                  bntText="Submit"
                  item1Class="w-full flex gap-[12px] items-center"
                  item2Class="w-full mt-[10px] flex sm:justify-end"
                  btn="w-full sm:w-fit"
                />
              </div>

              <div className="rounded bg-dark-600 p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
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
          </>
        )}
      </div>
      <Popup visible={popup} onClose={togglePopup} maxWidth="max-w-[824px]">
        <AttachmentPreview
          attachmentName={claimdetails.report.name}
          attachmentLink={claimdetails.report.link}
          onClose={togglePopup}
        />
      </Popup>
    </>
  )
}

export default ClaimViewUser
