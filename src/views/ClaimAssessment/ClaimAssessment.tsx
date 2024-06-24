import React, { useState, useEffect } from 'react'
import Attachment from '../../components/common/Attachment'
import Button from '../../components/common/Button'
import IncidentCard from '../../components/common/cards/IncidentCard'
import Header from '../../components/common/header/Header'
import InfoText from '../../components/common/InfoText'
import Progress from '../../components/common/Progress'
import WeightRow from '../../components/common/WeightRow'
import WeightTitle from '../../components/common/WeightTitle'
import CastYourVote from '../../components/global/CastYourVote'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import IncidentDetails from '../../components/common/IncidentDetails'
import useWindowDimensions from '../../components/global/UserInform/useWindowDimensions'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useNavigate, useParams } from 'react-router-dom'
import VerifyIdentity from '../Welcome/membership/VerifyIdentity'
import CastVote from '../Welcome/membership/CastVote'
import CastVoteWallet from '../Welcome/membership/CastVoteWallet'
import { getClaimDataById, getClaimValidationData } from '../../api'
import { extractHash } from '../../utils/helpers'
import { useWeb3React } from '@web3-react/core'

function shortenAddress(address: string) {
  const firstPart = address.slice(0, 8)
  const lastPart = address.slice(-8)
  return `${firstPart}....${lastPart}`
}

function ClaimAssessment() {
  let navigate = useNavigate()
  const { theme } = React.useContext(UserContext)
  const [zero, setZero] = useState(false)
  const { width } = useWindowDimensions()
  const [icon, setIcon] = useState('')
  const [claimdetails, setClaimdetails] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [isYes, setIsYes] = useState(false)
  const [hoverIcon, sethoverIcon] = useState('')
  const { account } = useWeb3React()
  const handleChange = (event: any) => {
    if (event.target.value === '00.00') {
      setZero(true)
    } else {
      setZero(false)
    }
  }
  let { claimId } = useParams()
  const [validationData, setValidationData] = useState<any>({})

  const getRecommendation = (status: string) => {
    if (status === 'approved') {
      return 'Approve'
    } else if (status === 'rejected') {
      return 'reject'
    } else {
      return 'Pending'
    }
  }

  const handleSubmit = async () => {
    const validationData = await getClaimValidationData(
      claimdetails.poolName,
      claimdetails.address
    )
    setValidationData(validationData)
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getClaimDataById(claimId as string)
      console.log('Data: ', data)
      setClaimdetails(data)

      const validationData = await getClaimValidationData(
        data.poolName,
        data.address
      )
      setValidationData(validationData)
      setLoading(false)
    }
    getData()
  }, [])

  const titleClassName = 'fw-400 fs-13 lh-15 text-light-800 dark:text-dark-600'
  const textClassName = 'fw-500 fs-13 lh-15 text-light-800 dark:text-dark-600'

  return loading ? (
    <></>
  ) : (
    <div>
      <Header name={`Claim #${claimId}`} showBackAero={true} overview={true} />
      {width < 600 ? (
        <>
          <div className="flex mb-10  flex-col sm:hidden">
            <div className="w-full flex flex-col gap-5 min-w-full ">
              <div className="bg-dark-600 rounded p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                <div className="mb-7">
                  <WeightTitle title="Current Results" />
                </div>
                <div className="flex gap-4 items-center mb-7">
                  <Button
                    size="small"
                    color="dark"
                    className="h-6 min-w-[70px]"
                    variant="outline"
                    shape="circle"
                    text="Active"
                    btnText="fw-500 fs-12 lh-14 ls-35"
                  />
                  <div className="flex-grow">
                    <img className="" src="/images/Ellipse 21.svg" alt="" />
                  </div>
                  <span className="text-light-800 dark:text-dark-600 fw-500 fs-14 lh-16 lowercase">
                    1 DAY, 2HRS LEFT
                  </span>
                </div>
                <div className="flex flex-col gap-4 mb-4">
                  <WeightRow
                    name="For"
                    value="26048660 (65%)"
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <div>
                    <Progress
                      current={65}
                      color={
                        theme === 'dark'
                          ? 'rgb(42, 43, 49)'
                          : 'rgba(148, 233, 63,0.8)'
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <WeightRow
                    name="Against"
                    value="125465 (35%)"
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <div>
                    <Progress
                      current={15}
                      color={
                        theme === 'dark'
                          ? 'rgb(42, 43, 49)'
                          : 'rgba(193, 30, 15, 0.8)'
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="bg-dark-600 rounded p-7 dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                <div className="mb-7">
                  <WeightTitle title="Current Results" />
                </div>
                <div className="flex items-center justify-between mb-7">
                  <img
                    className="dark:border1x w-[50px]"
                    src={
                      theme === 'dark'
                        ? '/images/whiteCar.svg'
                        : '/images/darkCar.svg'
                    }
                    alt=""
                  />
                  <span className="font-medium text-white dark:text-dark-800">
                    Car insurance{' '}
                  </span>
                </div>
                <div className="flex flex-col gap-6">
                  <WeightRow
                    name="Purchase"
                    value="13/05/2022 20:58"
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <WeightRow
                    name="Cover ID"
                    value="2ab256355df..."
                    valueStyle={{ color: 'dark:text-dark-600' }}
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
                    value="2565200 USDC"
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <WeightRow
                    name="Assesor"
                    valueStyle={{
                      color: 'hover:text-brand-400 dark:text-dark-600',
                    }}
                    value="0x95e441..."
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                </div>
              </div>
            </div>

            <div className=" bg-dark-600 mt-[20px] px-[20px] py-[30px] dark:bg-white box-border-2x-light dark:box-border-2x-dark">
              <div className="flex flex-row justify-between  bg-dark-600  dark:bg-white">
                <b className="fw-500 fs-16 lh-19 text-[#F1F1F1] dark:text-dark-600  block">
                  Incident Details
                </b>
                <img src="/images/Frame 2937.svg" alt="" />
              </div>

              <div className="mt-[30px]">
                <div className="flex gap-3 sm:hidden">
                  <img
                    width={40}
                    height={40}
                    src="/images/__avatar_url.png"
                    alt=""
                  />
                  <div className="flex flex-col justify-center w-full">
                    <span className="sm:ml-[11px]">BY: BY: 0x95e441...</span>
                    <div className="flex gap-1 mt-[2px]">
                      <img
                        width={6}
                        height={6}
                        src="/images/Ellipse 21.svg"
                        alt=""
                      />
                      <span className="text-brand-400  dark:text-dark-800 dark:font-semibold font-normal fw-500">
                        Created{' '}
                      </span>
                      <span className="claim-date"> on April 23rd, 2022</span>
                    </div>
                  </div>
                </div>

                <p className="incident-text">
                  Distracted by the readable content of a page when looking at
                  its layout. The point of using Lorem Ipsum is that it has a
                  more-or-less normal distribution of letters, as opposed to
                  using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web
                  page editors now use Lorem Ipsum as their default model text,
                  and a search for 'lorem ipsum' will uncover Many web sites
                  still in their infancy. Various versions have evolved over the
                  years, sometimes by accident, sometimes on purpose (injected
                  humour and the like).
                  <br />
                  <br />
                  Distracted by the readable content of a page when looking at
                  its layout. The point of using Lorem Ipsum is that it has a
                  more-or-less normal distribution of letters, as opposed to
                  using 'Content here, content here', making it look.
                </p>
              </div>
            </div>

            <div className="mt-[20px] ">
              <IncidentDetails data={claimdetails} />
            </div>

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

            <div className="mt-[20px]">
              <div>
                <h6 className="fw-500 fs-16 lh-19 mb-[20px]">Decision</h6>
                <div className=" py-[10px] px-[20px] sm:px-[30px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark">
                  <div className="flex justify-between items-center">
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
                        $3.09
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[20px]">
                <CastYourVote
                  headline
                  view="moblie"
                  firsttext="By voting, I accept Kover's"
                  setIsYes={setIsYes}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>

            <div className="mt-[20px]">
              <h6 className="text-3xl font-medium  mb-5 text-[#fff] dark:text-[#3F4048]">
                VOTE (160)
              </h6>

              <div className="grid grid-cols-3  px-0 mb-4 items-center dark:bg-white">
                <div className="flex items-center gap-4 pl-8">
                  <InfoText
                    icon={false}
                    textClassName="general-text-10 dark:general-text-10"
                    text="ADDRESS"
                  />
                </div>
                <div className="flex justify-center">
                  <InfoText
                    icon={false}
                    textClassName="general-text-10 dark:general-text-10"
                    text="Vote"
                  />
                </div>
                <div className="flex justify-end pr-3">
                  <InfoText
                    icon={true}
                    textClassName="general-text-10 dark:general-text-10"
                    text="VOTING POWER"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5 ">
                {[...Array(3)].map((value, index) => (
                  <div key={index}>
                    <div className="grid grid-cols-3 items-center py-4 px-7 bg-dark-600 rounded dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                      <div className="flex items-center gap-4">
                        <img
                          src="/images/Vector.png"
                          className="rounded-full"
                          alt=""
                        />
                        <Link to="" className="hover:no-underline no-underline">
                          <span
                            className={`${
                              theme === 'dark'
                                ? 'text-[#6D6E76] hover:text-[#000]'
                                : 'hover:text-brand-400'
                            }`}
                          >
                            0x95e441...
                          </span>
                        </Link>
                      </div>
                      <div className="flex justify-center">
                        <span>Yes</span>
                      </div>
                      <div className="flex justify-end">
                        <span>15,856.640</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-5 justify-between items-center hidden back-btn">
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

          <div className="hidden sm:flex mb-10 gap-[30px] flex-wrap ">
            <div className="flex-grow flex flex-col gap-5 w-[400px]">
              <div>
                <b className="fw-500 fs-16 lh-19 text-[#F1F1F1] dark:text-dark-600 block mb-5">
                  Incident Details
                </b>
                <IncidentCard data={claimdetails} />
              </div>

              <IncidentDetails data={claimdetails} />

              <div className="mt-[20px] bg-dark-600  dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                <InfoText
                  variant="large"
                  text="Investigation Report"
                  color={theme === 'dark' ? 'dark' : 'white'}
                  className="pt-[30px] px-[20px] flex gap-[5px] text-[#F1F1F1] dark:text-dark-600 fw-500 fs-16 lh-19"
                  textClassName="text-[#F1F1F1] dark:text-dark-600 fw-500 fs-16 lh-19 ls-35"
                />

                <div className="pt-[20px] px-[20px] pb-[30px] bg-dark-600 rounded dark:bg-white ">
                  <div className="flex flex-col gap-[19px]">
                    <div className="flex w-full">
                      <div className="flex w-[177px]">
                        <span className="investigation-item-title text-dark-200">
                          Asessor Report
                        </span>
                      </div>
                      <div className="flex w-[80%]">
                        <div className="flex items-center">
                          <Attachment
                            className="file-name investigation-item-value"
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
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex w-[177px]">
                        <span className="investigation-item-title text-dark-200">
                          File Hash
                        </span>
                      </div>
                      <div className="flex w-[80%]">
                        <span className="investigation-item-value">
                          {extractHash(claimdetails.report.link)}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex w-[177px] gap-[10px]">
                        <span className="investigation-item-title text-dark-200">
                          Recommandation
                        </span>
                        <img
                          width={10}
                          id={`Recommandation`}
                          src={`${
                            icon === 'Recommandation'
                              ? '/images/info-green-icon.svg'
                              : '/images/Maskd (2).svg'
                          }`}
                          alt=""
                          onMouseEnter={() => {
                            setIcon('Recommandation')
                          }}
                          onMouseLeave={() => {
                            setIcon('')
                          }}
                        />
                        <ReactTooltip
                          className="my-tool-tip z-500"
                          anchorId={'Recommandation'}
                          place="bottom"
                          content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                        />
                      </div>
                      <div className="flex w-[80%]">
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

              {/* <div>
              <div>
                <h6 className="fw-500 fs-16 lh-19 mb-[20px]">Decision</h6>
                <div className=" py-[10px] px-[20px] sm:px-[30px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder={'0000'}
                        onChange={handleChange}
                        className={`placeholder:text-dark-300 text-6xl max-w-none min-w-0 w-[65px] flex-grow dark:placeholder:text-dark-300 
                    fw-400 lh-42 input-value 
                    ${
                      zero
                        ? 'text-[#42434B]'
                        : 'text-[#FFF] dark:text-dark-800'
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
                        $3.09
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[20px]">
                <CastYourVote />
              </div>
            </div> */}

              {account ? (
                <CastVote
                  claimDetails={claimdetails}
                  onComplete={handleSubmit}
                />
              ) : (
                <CastVoteWallet />
              )}

              <div>
                <h6 className="vote dark:vote-dark mb-[22px]">
                  Votes ({validationData.validators.length})
                </h6>
                <div className="grid grid-cols-3 pr-[15px] pl-[32px] mb-4 items-center">
                  <InfoText
                    icon={false}
                    textClassName="uppercase"
                    titleclassname="vote-table-col-tag"
                    text="ADDRESS"
                  />
                  <div className="flex justify-center">
                    <InfoText
                      icon={false}
                      textClassName="uppercase vote-table-col-tag"
                      text="Vote"
                    />
                  </div>
                  <div className="flex justify-end">
                    <InfoText
                      icon={true}
                      textClassName="uppercase vote-table-col-tag"
                      text="VOTING POWER"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5 ">
                  {validationData.validators.map(
                    (validator: any, index: number) => (
                      <div key={index}>
                        <div className="grid grid-cols-3 items-center py-[17px] px-[30px] bg-dark-600 rounded dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                          <div className="flex items-center gap-4">
                            <img
                              src="/images/Vector.png"
                              className="rounded-full"
                              alt=""
                            />
                            <Link
                              to=""
                              className="hover:no-underline no-underline"
                            >
                              <span
                                className={`${
                                  theme === 'dark'
                                    ? 'text-[#6D6E76] hover:text-[#000]'
                                    : 'hover:text-brand-400'
                                }`}
                              >
                                {shortenAddress(validator.address)}
                              </span>
                            </Link>
                          </div>
                          <div className="flex justify-center">
                            <span>{validator.isYes ? 'Yes' : 'No'}</span>
                          </div>
                          <div className="flex justify-end">
                            <span>{validator.votePower}</span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex sm:flex flex-col gap-5 claim-side-data">
              <h6 className="text-dark-300">Overview</h6>
              <div className="bg-dark-600 rounded p-7  dark:bg-white box-border-2x-light dark:box-border-2x-dark">
                <div className="mb-7">
                  <WeightTitle title="Current Results" />
                </div>
                <div className="flex gap-4 items-center mb-7">
                  <Button
                    size="small"
                    color="dark"
                    className="h-6 min-w-[70px]"
                    variant="outline"
                    shape="circle"
                    text="Active"
                    btnText="fw-500 fs-12 lh-14 ls-35"
                  />
                  <div className="flex-grow">
                    <img className="" src="/images/Ellipse 21.svg" alt="" />
                  </div>
                  <span className="text-light-800 dark:text-dark-600 fw-500 fs-14 lh-16 lowercase">
                    {' '}
                    1 DAY, 2HRS LEFT
                  </span>
                </div>
                <div className="flex flex-col gap-4 mb-4">
                  <WeightRow
                    name="For"
                    value={`${validationData.votesFor} (${
                      Math.round(
                        (validationData.votesFor * 100) /
                          validationData.totalVotePower
                      )
                        ? Math.round(
                            (validationData.votesFor * 100) /
                              validationData.totalVotePower
                          )
                        : 0
                    }%)`}
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <div>
                    <Progress
                      current={
                        Math.round(
                          (validationData.votesFor * 100) /
                            validationData.totalVotePower
                        )
                          ? Math.round(
                              (validationData.votesFor * 100) /
                                validationData.totalVotePower
                            )
                          : 0
                      }
                      color={
                        theme === 'dark'
                          ? 'rgb(42, 43, 49)'
                          : 'rgba(148, 233, 63,0.8)'
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <WeightRow
                    name="Against"
                    value={`${validationData.votesAgainst} (${
                      Math.round(
                        (validationData.votesAgainst * 100) /
                          validationData.totalVotePower
                      )
                        ? Math.round(
                            (validationData.votesAgainst * 100) /
                              validationData.totalVotePower
                          )
                        : 0
                    }%)`}
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <div>
                    <Progress
                      color={
                        theme === 'dark'
                          ? 'rgb(42, 43, 49)'
                          : 'rgba(193, 30, 15, 0.8)'
                      }
                      current={
                        Math.round(
                          (validationData.votesAgainst * 100) /
                            validationData.totalVotePower
                        )
                          ? Math.round(
                              (validationData.votesAgainst * 100) /
                                validationData.totalVotePower
                            )
                          : 0
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="bg-dark-600 rounded dark:bg-white box-border-2x-light dark:box-border-2x-dark pt-[30px] px-[30px] pb-[40px]">
                <div className="mb-7">
                  <WeightTitle title="Summary" />
                </div>
                <div className="flex items-center justify-between mb-7 ">
                  <img
                    className="dark:border1x w-[50px]"
                    src={
                      theme === 'dark'
                        ? '/images/whiteCar.svg'
                        : '/images/darkCar.svg'
                    }
                    alt=""
                  />
                  <span className="font-medium text-white dark:text-dark-800">
                    Car insurance{' '}
                  </span>
                </div>
                <div className="flex flex-col gap-[25px]">
                  <WeightRow
                    name="Purchase"
                    value="13/05/2022 20:58"
                    valueStyle={{ color: 'dark-text-800' }}
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
                    valueStyle={{ color: 'dark-text-800' }}
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <WeightRow
                    name="Claim ID"
                    value="1250"
                    valueStyle={{ color: 'dark-text-800' }}
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <WeightRow
                    name="Claim Amount"
                    value="2565200 USDC"
                    valueStyle={{ color: 'dark-text-800' }}
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                  <WeightRow
                    name="Assesor"
                    valueStyle={{
                      color:
                        theme === 'dark'
                          ? 'text-[#6D6E76] hover:text-[#000]'
                          : 'hover:text-brand-400',
                    }}
                    value="0x95e441..."
                    titleclassname={titleClassName}
                    textclassname={textClassName}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default ClaimAssessment
