import React, { useState } from "react";
import { UserContext } from "../../../../App";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Button, { ButtonProps } from "../../Button";

interface CardProps {
  index?: number;
  coverName?: string;
  data: any;
  selectButton?: ButtonProps;
}

function Card({ index, coverName, data,selectButton }: CardProps) {
  const { theme } = React.useContext(UserContext);
  const [currentIcon, setcurrentIcon] = useState("");

  const cardIndex = index;
  return (
    <>
      <div className="pt-[35px] px-[30px] pb-[40px] bg-[#1D2024] dark:bg-[#FFFFFF] rounded dark:box-border general-box-border">
        <div className="flex items-center justify-between flex-wrap status-card-center">
          <div className="flex items-center">
            <img
              src={`${ theme === "dark" ? "/images/whiteCar.svg" : "/images/lodgo.svg" }`}
              className="w-[35px] h-[35px] status-card-item-1"
              alt="car-logo" />
            <span className="cover-title dark:cover-title-dark status-card-item-2">
             {coverName ? coverName : 'Car Cover'}
            </span>
            <img
              src={`${
                theme === "dark"
                  ? "/images/okicon.svg"
                  : "/images/ShieldActiveFinance 1.svg"
              }`}
              className="status-card-item-3"
              alt="Shield-icon"
            />
          </div>
          <div className={`flex flex-col items-end`}>
            <span
              className={`max-w-[800px]:mb-[5px] status-card-cover-no dark:status-card-cover-no-dark justify-end`}
            >
              4551
            </span>
            <>
              <div className="flex infotext justify-end small dark gap-[5px]">
                <span className=" infotext-span font-normal lg:font-medium fw-400 fw-500">
                  Total Policies
                </span>

                <img
                  src={`${
                    currentIcon === `${index}`
                      ? "/images/info-green-icon.svg"
                      : "/images/Maskd (2).svg"
                  }`}
                  alt=""
                  width={10}
                  height={10}
                  onMouseEnter={() => {
                    setcurrentIcon(`${index}`);
                  }}
                  onMouseLeave={() => {
                    setcurrentIcon("");
                  }}
                  id={"Card-" + index}
                />

                <ReactTooltip
                  className="my-tool-tip z-500"
                  anchorId={"Card-" + index}
                  place="bottom"
                  content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                />
              </div>
            </>
          </div>
        </div>

        {/* <div className="flex justify-center card-hr">
          <img
            src={theme === "dark" ? "/images/012.svg" : "/images/hr_svg.svg"}
            alt=""
          />
        </div> */}
        <hr className="mt-[35px] mb-[25px]" />
        <div className="flex justify-between flex-col sm:flex-row gap-[7px]">
          {data.map((item: any, _index: any) => (
            <>
                <div className="hidden sm:flex flex-col justify-center items-center">
                    <div className="flex flex-row gap-[5px]">
                    <span className="text-[#606166] fw-500 fs-12 lh-14">
                    
                        {item.title}
                    </span>
                    {item.icon ? (
                        <>
                        <img
                            src={`${
                            currentIcon === `card-` + cardIndex + `-` + _index
                                ? "/images/info-green-icon.svg"
                                : "/images/Maskd (2).svg"
                            }`}
                            alt="info-icon"
                            width="10"
                            height="10"
                            onMouseEnter={() => {
                            setcurrentIcon(`card-` + cardIndex + `-` + _index);
                            }}
                            onMouseLeave={() => {
                            setcurrentIcon("");
                            }}
                            id={`card-` + cardIndex + `-` + _index}
                        />
                        </>
                    ) : (
                        ""
                    )}
                    </div>
                    <div className="mt-[20px]">
                    <span className="fw-500 fs-12 lh-14">{item.value}</span>
                    </div>
                </div>

                <div className="sm:hidden flex  justify-between gap-[7px]">
                        <div className="flex gap-[5px]">
                        <span className="text-[#606166] fw-500 fs-12 lh-14"> {item.title}</span>
                        <img
                        src={`${
                          currentIcon === `card-` + cardIndex + `-` + _index
                            ? "/images/info-green-icon.svg"
                            : "/images/Maskd (2).svg"
                        }`}
                        alt="info-icon"
                        width="10"
                        height="10"
                        onMouseEnter={() => {
                          setcurrentIcon(`card-` + cardIndex + `-` + _index);
                        }}
                        onMouseLeave={() => {
                          setcurrentIcon("");
                        }}
                        id={`card-` + cardIndex + `-` + _index}
                      />
                        </div>
                            
                        <span>  {item.value} </span>        
                </div>
              <>
                <ReactTooltip
                  className="my-tool-tip z-500"
                  anchorId={`card-` + cardIndex + `-` + _index}
                  place="bottom"
                  content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached."
                />
              </>
            </>
          ))}
          </div>
        <div className="mt-[24px]">
          <Button
            {...selectButton}
            text="Select"
            className={`w-full dark:box-border border font-medium ${
              theme === "dark"
                ? "dark:hover:bg-[#F1F1F1]"
                : "hover:button-hover-grey"}`}
            color={theme === "dark" ? "" : "greenGradient"}
          />
        </div>
      </div>
    </>
  );
}
export default Card;
