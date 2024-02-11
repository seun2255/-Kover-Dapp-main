import React, { useState } from "react";
import { UserContext } from "../../App";
import Button from "../../components/common/Button";
import Header from "../../components/common/header/Header";
import SearchField from "../../components/common/SearchField";

import Popup from "../../components/templates/Popup";
function Dialogbox() {
  const [popup, setPopup] = useState(false);
  const { theme } = React.useContext(UserContext);
  const toggleConfirm = () => setConfirm((v) => !v);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <Header name={"Dialog box"} showBackAero={true} />
      <button
        onClick={() => {
          setPopup(true);
        }}
        className="buy-btn buy-btn-text dark:buy-btn-text-dark dark:buy-btn-dark"
      >
        Click Here for Dialog box
      </button>
      <Popup
        visible={popup}
        onClose={() => {
          setPopup(false);
        }}
      >
        <div className="vote-popup vote-desktop-popup">
          <div className="flex gap-5 mb-3.5">
            <div className="w-[60px]">
              <div className="w-[60px]">
                <img
                  className="w-[60px]"
                  src={
                    theme === "dark"
                      ? "/images/icon22.svg"
                      : "/images/icon21.svg"
                  }
                  alt=""
                />
              </div>
            </div>

            <div className="flex justify-between gap-4 flex-grow">
              <div className="">
                <h4 className="vote-title dark:vote-title-dark">
                  Sure you want to proceed?
                </h4>
                <p className="mt-[8px] vote-content dark:vote-content-dark">
                  You're at the point of suspending the policy. This means that
                  the customer will not be insured for that period.You can
                  unsuspend the policy at any time after the review.
                </p>
              </div>
              <div>
                <button type="button" className="w-2.5" onClick={toggleConfirm}>
                  <img className="w-2.5" src="/images/Group 149.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-end">
            <Button
              className="w-full max-w-[160px]"
              variant="outline"
              btnText="fw-500"
              color={
                theme === "dark"
                  ? "bg-light-800 bor dark:box-border hover:bg-light-1200 hover:dark:border1x"
                  : "dark"
              }
              text="No, cancel"
            />
            <Button
              className="w-full max-w-[160px]"
              btnText="fw-500"
              color={
                theme === "dark"
                  ? "bg-light-800 bor dark:box-border hover:bg-light-1200 hover:dark:border1x"
                  : "dark"
              }
              text="Yes, confirm"
            />
          </div>
        </div>

        <div className="sm:hidden vote-popup ">
          <div className="flex flex-col">
            <div className="flex justify-center">
              {" "}
              <h4 className="vote-title dark:vote-title-dark">
                Sure you want to proceed?
              </h4>
            </div>
            <div className="mt-[20px] flex justify-center">
              <img
                className="w-[100px] "
                src={
                  theme === "dark" ? "/images/icon22.svg" : "/images/icon21.svg"
                }
                alt=""
              />
            </div>
            <div className="px-4 mt-[20px]">
              <p className="vote-content dark:vote-content-dark">
                You're at the point of suspending the policy. This means that
                the customer will not be insured for that period.You can
                unsuspend the policy at any time after the review.
              </p>
            </div>
            <div className="mt-[20px] mb-[30px] flex justify-center">
              <img src="/images/hr_svg.svg" alt="hr" />
            </div>
            <div className="flex gap-5 justify-center">
              <Button
                className="w-full max-w-[160px]"
                variant="outline"
                color={
                  theme === "dark"
                    ? "bg-light-800 bor dark:box-border hover:bg-light-1200 hover:dark:border1x"
                    : "dark"
                }
                text="No, cancel"
              />
              <Button
                className="w-full max-w-[160px]"
                color={
                  theme === "dark"
                    ? "bg-light-800 bor dark:box-border hover:bg-light-1200 hover:dark:border1x"
                    : "dark"
                }
                text="Yes, confirm"
              />
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default Dialogbox;
