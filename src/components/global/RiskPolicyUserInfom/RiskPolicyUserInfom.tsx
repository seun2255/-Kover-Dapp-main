import React, { useState, useEffect } from 'react'
import { UserContext } from '../../../App'
import Button from '../../common/Button'
import InfoText from '../../common/InfoText'
import UploadButton from '../../common/UploadButton'
import useWindowDimensions from './useWindowDimensions'
import {
  switchCoverModifyState,
  switchKYCModify,
  switchKYCReviewerModify,
} from '../../../database'
import { useWeb3React } from '@web3-react/core'
import { useDispatch, useSelector } from 'react-redux'
import { openAlert, closeAlert } from '../../../redux/alerts'
import { setCoverApplications, setKYCApplicants } from '../../../redux/kyc'

interface UserInformProps {
  variant?: 'customer' | 'personal'
  user: any
}

function RiskPolicyUserInform({ variant, user }: UserInformProps) {
  const [viewmore, setViewmore] = useState(false)
  const [history, setHistory] = useState(false)
  const { coverApplications } = useSelector((state: any) => state.kyc)
  const { theme } = React.useContext(UserContext)
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const viewmoreHandler = () => {
    viewmore ? setViewmore(false) : setViewmore(true)
  }

  const [canEdit, setCanEdit] = useState(user.canModify)

  const historyHandler = () => {
    history ? setHistory(false) : setHistory(true)
  }

  useEffect(() => {
    setCanEdit(variant === 'personal' ? user.canModify : user.canModify)
  }, [user])

  return (
    <>
      <div className="relative">
        <div className="flex flex-col hidden max-[700px]:block">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-between">
              <div className="flex gap-8 w-[88px] h-[88px] bg-[#2A2B31] dark:bg-light-1200 items-center justify-center">
                <img
                  width={50}
                  height={50}
                  src="/images/profile-photo.jpg"
                  alt=""
                  className="rounded-full"
                />
              </div>
              <div className="ml-[20px]">
                <span className="text-md block mb-2.5 fw-400">
                  User ID <span className="font-medium">{user.id}</span>
                </span>
                <strong
                  role="button"
                  className="font-medium text-3xl fs-400 mb-[5px] nderline block user-name"
                >
                  {`${user.firstName} ${user.lastName}`}
                </strong>
              </div>
              <div className="">sandra.adams@gmail.com</div>
            </div>
            <div className="flex flex-row-reverse justify-end">
              <div className="flex gap-1.5">
                <img
                  src="/images/Group 219 (1).svg"
                  className="w-[10px] h-[11px]"
                  alt=""
                />
                <span className="font-medium text-md">Verified</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-5 mt-[20px]">
              <div className="w-[88px]">
                {variant === 'personal' ? (
                  <Button
                    icon="/images/Group 220 (3).svg"
                    text="Upload"
                    className="min-w-[88px] dark:bg-[#E9E9E9]  border-grey"
                  />
                ) : (
                  <Button
                    className="min-w-[88px] font-medium dark:bg-[#E9E9E9]  border-grey"
                    text="Edit PRP"
                  />
                )}
              </div>
              <div>
                <div className={variant === 'customer' ? 'mt-[-25px]' : ''}>
                  <p className="text-3xl mb-[5px] fs-400">
                    {variant === 'personal' ? 'Change Picture' : '2000'}
                  </p>
                  <InfoText
                    className="mb-2.5 fw-400"
                    color="dark-650"
                    variant="small"
                    icon={variant === 'personal' ? true : undefined}
                    text={
                      variant === 'personal'
                        ? 'Maximum file size: 10Mb'
                        : 'Policy Risk Point'
                    }
                  />
                  {(variant === 'customer' || variant === undefined) && (
                    <>
                      <div
                        onClick={historyHandler}
                        role="button"
                        className="flex items-center gap-2.5"
                      >
                        <span className="font-medium text-primary-700 text-md dark:text-dark-800">
                          Change history
                        </span>
                        <img
                          className={`duration-150 ${
                            history ? 'rotate-180' : ''
                          }`}
                          src="/images/Mask (21).svg"
                          alt=""
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[20px]">
            <Button
              className="min-w-[125px] dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
              text={canEdit ? 'Stop Edit' : 'Allow Edit'}
              onClick={() => {
                console.log(user)
                // if (user.reviewer === account) {
                //   switchCoverModifyState(user.address, user.poolName).then(
                //     () => {
                //       setCanEdit(!canEdit)
                //       var temp = [...coverApplications]
                //       var placeholder = {}
                //       for (var i = 0; i < temp.length; i++) {
                //         if (temp[i].id === user.id) {
                //           placeholder = {
                //             ...temp[i],
                //             canModify: !temp[i].canModify,
                //           }
                //           temp.splice(i, 1)
                //           i--
                //         }
                //       }
                //       temp.push(placeholder)
                //       dispatch(setCoverApplications({ data: temp }))
                //     }
                //   )
                // } else {
                //   dispatch(
                //     openAlert({
                //       displayAlert: true,
                //       data: {
                //         id: 2,
                //         variant: 'Failed',
                //         classname: 'text-black',
                //         title: 'Transaction Failed',
                //         tag1: 'Assign application first',
                //         tag2: 'application not assigned to you',
                //       },
                //     })
                //   )
                //   setTimeout(() => {
                //     dispatch(closeAlert())
                //   }, 10000)
                // }
              }}
            />
            {variant === 'personal' ? (
              ''
            ) : (
              <Button
                variant="outline"
                color="dark"
                text="View more"
                endIcon={
                  theme === 'dark'
                    ? '/images/Mask (14).svg'
                    : '/images/Mask (20).svg'
                }
                iconRotate={`${viewmore ? '' : 'rotate-180'}`}
                onClick={() => {
                  viewmoreHandler()
                }}
                className={`w-full`}
              />
            )}
          </div>
        </div>

        <div className="block max-[700px]:hidden gap-6 flex-row  max-[800px]:flex-col flex-wap">
          <div className="flex flex-wrap gap-[50px] justify-between">
            <div>
              <div>
                <div className="flex gap-8">
                  <div className="flex gap-8 w-[88px] h-[88px] bg-[#2A2B31] dark:bg-light-1200 items-center justify-center ">
                    <img
                      width={50}
                      height={50}
                      src="/images/profile-photo.jpg"
                      alt=""
                      className="rounded-full"
                    />
                  </div>

                  <div className="w-max">
                    <span className="text-md block mb-2.5 fw-400 ">
                      User ID <span className="font-medium">{user.id}</span>
                    </span>
                    <strong
                      role="button"
                      className="font-medium text-3xl mb-[5px] hover:underline block user-name"
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </strong>
                    <span
                      role="button"
                      className="block mb-4 text-dark-650 hover:underline"
                    >
                      {user.email}
                    </span>
                    <div className="flex justify-end max-[640px]:items-center">
                      <div className="items-center flex gap-1.5">
                        <img src="/images/Group 219 (1).svg" alt="" />
                        <span className="font-medium text-md">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="self-center">
                  {variant === 'personal' ? (
                    ''
                  ) : (
                    <Button
                      variant="outline"
                      color="dark"
                      text="View more"
                      endIcon={
                        theme === 'dark'
                          ? '/images/Mask (14).svg'
                          : '/images/Mask (20).svg'
                      }
                      iconRotate={`${viewmore ? 'rotate-180' : ''}`}
                      onClick={() => {
                        viewmoreHandler()
                      }}
                      className={`w-full mt-[14px] max-[120px]`}
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="relative z-0 col-span-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-3xl mb-[5px] fw-400">
                        {variant === 'personal' ? '' : `${user.PRP}%`}
                      </p>
                      <InfoText
                        className="mb-2.5"
                        titleclassname="fw-400"
                        color="dark-650"
                        variant="small"
                        icon={variant === 'personal' ? undefined : true}
                        text={variant === 'personal' ? '' : 'Policy PRP'}
                      />
                      {(variant === 'customer' || variant === undefined) && (
                        <div
                          onClick={historyHandler}
                          role="button"
                          className="flex items-center gap-2.5"
                        >
                          <span className="font-medium text-primary-700 text-md dark:text-dark-800">
                            Change history
                          </span>
                          <img
                            className={`duration-150 ${
                              history ? '' : 'rotate-180'
                            }`}
                            src="/images/Mask (21).svg"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <>
                <Button
                  className="min-w-[120px] dark:text-primary-100 dark:bg-light-1100 bg-dark-800"
                  text={canEdit ? 'Stop Edit' : 'Allow Edit'}
                  onClick={() => {
                    console.log('data: ', user)
                    if (user.resultStatus === 'pending') {
                      if (user.reviewer === account) {
                        if (
                          user.resultStatus === 'approved' ||
                          user.resultStatus === 'rejected'
                        ) {
                          dispatch(
                            openAlert({
                              displayAlert: true,
                              data: {
                                id: 2,
                                variant: 'Failed',
                                classname: 'text-black',
                                title: "Application can't be modified",
                                tag1: 'application already assesed',
                                tag2: 'modifications no longer possible',
                              },
                            })
                          )
                          setTimeout(() => {
                            dispatch(closeAlert())
                          }, 10000)
                        } else {
                          switchCoverModifyState(
                            user.address,
                            user.poolName
                          ).then(() => {
                            setCanEdit(!canEdit)
                            var temp = [...coverApplications]
                            var placeholder = {}
                            for (var i = 0; i < temp.length; i++) {
                              if (temp[i].id === user.id) {
                                placeholder = {
                                  ...temp[i],
                                  canModify: !temp[i].canModify,
                                }
                                temp.splice(i, 1)
                                i--
                              }
                            }
                            temp.push(placeholder)
                            dispatch(setCoverApplications({ data: temp }))
                          })
                        }
                      } else {
                        dispatch(
                          openAlert({
                            displayAlert: true,
                            data: {
                              id: 2,
                              variant: 'Failed',
                              classname: 'text-black',
                              title: 'Transaction Failed',
                              tag1: 'Assign application first',
                              tag2: 'application not assigned to you',
                            },
                          })
                        )
                        setTimeout(() => {
                          dispatch(closeAlert())
                        }, 10000)
                      }
                    } else {
                      dispatch(
                        openAlert({
                          displayAlert: true,
                          data: {
                            id: 2,
                            variant: 'Failed',
                            classname: 'text-black',
                            title: 'Policy Closed',
                            tag1: 'A decision has already been made',
                            tag2: 'cannot modify',
                          },
                        })
                      )
                      setTimeout(() => {
                        dispatch(closeAlert())
                      }, 10000)
                    }
                  }}
                />
              </>
            </div>
          </div>
        </div>
        <hr className="mt-[24px]" />
        {viewmore ? (
          <>
            <div className="rounded box-border-2x-light dark:box-border-2x-dark  bg-dark-800 p-5 w-[100%] md:w-[48%] left-0 absolute dark:bg-light-1100 dark:text-dark-800">
              <div className="flex px-[10px] sm:px-[60px] py-[20px] gap-[20px]">
                <div className="flex flex-col gap-[20px] basis-1/3 sm:basis-1/2">
                  <span className="font-normal infotext-span lg:font-medium fw-400 tab-text">
                    Date of Birth
                  </span>
                  <span className="font-normal infotext-span lg:font-medium fw-400 tab-text">
                    Address
                  </span>
                </div>
                <div className="flex flex-col gap-[20px] basis-1/3 sm:basis-1/2">
                  <span className="text-lg font-medium">26/01/1993</span>
                  <span className="text-lg font-medium">
                    26 av Louis Vito CH45 8 London UK
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {history ? (
          <>
            <div
              className={`absolute z-10 right-0 rounded box-border-2x-light dark:box-border-2x-dark change-history bg-dark-800 rounded-b py-[30px] px-[20px] dark:bg-light-1100 dark:text-dark-800 z-41 w-full md:w-[36%]`}
            >
              <div className="grid grid-cols-2 gap-2 mx-auto">
                <div className="flex flex-col gap-5">
                  <InfoText
                    variant="small"
                    icon
                    color="dark-650"
                    text="Change History"
                  />
                  <InfoText variant="small" color="dark-650" text="Created" />
                  <InfoText
                    variant="small"
                    color="dark-650"
                    text="Last Change"
                  />
                </div>
                <div className="flex flex-col gap-5 text-right">
                  <span className="text-lg font-medium">3</span>
                  <span className="text-lg font-medium">13/05/2022 20:58</span>
                  <span className="text-lg font-medium">13/05/2022 20:58</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default RiskPolicyUserInform
