import React from 'react'
import Header from '../../components/common/header/Header'
import SearchField from '../../components/common/SearchField'

function Qrcode() {
  return (
    <>
      <Header name={'Verify Policy'} showBackAero={true} />
      <div className="flex md:flex-row justify-center flex-col gap-[70px] sm-:gap-[35px] mx-[22px] mb-[20px]">
        <div className="flex flex-col items-center justify-start basis-4/12 ">
          <p className="font-medium mb-[50px] text-[18px] leading-[21.09px] tracking-[0.35px]">
            Scan QR Code of the Policy
          </p>
          <div className="mb-[50px] flex flex-col items-center">
            <img
              className=""
              width={290}
              height={230}
              src="/images/qr1.png"
              alt=""
            />
          </div>
          <p className="font-medium mb-[15px] text-[14px] leading-[16.41px] tracking-[0.35px] text-center text-[#85858A]">
            The QR Code will be automaticly detected when you position it
            between the guide lines
          </p>
          <p className="font-medium mb-[20px] text-[18px] leading-[21.09px] tracking-[0.35px] text-center text-[#FAFAFA] dark:text-[#85858A] dark:text-[#85858A]">
            Or
          </p>
          <div className="w-[100%]">
            <SearchField text="Policy ID" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-start basis-4/12">
          <p className="font-medium mb-[50px] text-[18px] leading-[21.09px] tracking-[0.35px]">
            Insurance Certificate
          </p>
          <div className="mb-[50px]">
            <img src="/images/qr2.png" width={230} height={230} alt="" />
          </div>
          <div className="mb-[42px]">
            <p className="font-medium text-[18px] leading-[22px] tracking-[0.35px] text-center text-[#FAFAFA] dark:text-[#85858A]">
              Natacha Wilson
            </p>
            <p className="font-medium text-[14px] leading-[22px] tracking-[0.35px] text-center text-[#FAFAFA] dark:text-[#85858A]">
              14.01.1990
            </p>
          </div>
          <div className="rounded box-border-2x-light dark:box-border-2x-dark bg-[#1D2024] dark:bg-[#FFF] w-[100%] flex items-center flex-col relative box-border-2x-light dark:box-border-2x-dark">
            <div className="absolute top-[-15px]">
              <img width={25} height={25} src="/images/success.png" alt="" />
            </div>
            <div className="flex justify-center items-center mt-[12.5px] mb-[7.5px] ">
              <span className="fw-500 fs-14 leading-[22px] pt-[2px]">
                Verification Successful
              </span>
            </div>
            <img src="/images/hr_svg.svg" alt="" />
            <div className="flex mb-[34px] mt-[31px]">
              <p className="fw-500 fs-12 leading-[14px] text-[#606166] mr-[26px]">
                Policy Status
              </p>
              <p className="fw-500 fs-12 leading-[14px] text-[#FAFAFA] dark:text-[#85858A]">
                Active since 17/01/2022
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start basis-4/12">
          <p className="font-medium mb-[50px] text-[18px] leading-[21.09px] tracking-[0.35px]">
            Insurance Certificate
          </p>
          <div className="mb-[50px]">
            <img src="/images/qr3.png" width={230} height={230} alt="" />
          </div>
          <div className="mb-[42px]">
            <p className="font-medium text-[18px] leading-[22px] tracking-[0.35px] text-center text-[#FAFAFA] dark:text-[#85858A]">
              Natacha Wilson
            </p>
            <p className="font-medium text-[14px] leading-[22px] tracking-[0.35px] text-center text-[#FAFAFA] dark:text-[#85858A]">
              14.01.1990
            </p>
          </div>
          <div className="rounded box-border-2x-light dark:box-border-2x-dark bg-[#1D2024] dark:bg-[#FFF] w-[100%] flex items-center flex-col relative box-border-2x-light dark:box-border-2x-dark">
            <div className="absolute top-[-15px]">
              <img width={25} height={25} src="/images/red-alert.png" alt="" />
            </div>
            <div className="flex justify-center items-center mt-[12.5px] mb-[7.5px]">
              <span className="fw-500 fs-14 leading-[22px] pt-[2px]">
                Verification Successful
              </span>
            </div>
            <img src="/images/hr_svg.svg" alt="" />
            <div className="flex mb-[34px] mt-[31px]">
              <p className="fw-500 fs-12 leading-[14px] text-[#606166] mr-[26px]">
                Policy Status
              </p>
              <p className="fw-500 fs-12 leading-[14px] text-[#FAFAFA] dark:text-[#85858A]">
                Active since 17/01/2022
              </p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  )
}

export default Qrcode
