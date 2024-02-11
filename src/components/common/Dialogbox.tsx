import React from "react";
import Popup from "../templates/Popup";
import Button from "./Button";
import { UserContext } from "../../App";
interface DialogboxProps {
  confirm: boolean;
  toggleConfirm: () => void;
}

function Dialogbox({ confirm, toggleConfirm }: DialogboxProps) {
  const { theme } = React.useContext(UserContext);
  return (
    <Popup onClose={toggleConfirm} visible maxWidth="max-w-[692px]">
      <div className="vote-popup vote-desktop-popup">
        <div className="flex gap-5 mb-3.5">
          <div className="w-[60px]">
            <div className="w-[60px]">
              <img className="w-[60px]"
                src={theme === 'dark' ? "/images/icon22.svg" : "/images/icon21.svg"}
                alt="" />
            </div>
          </div>

          <div className="flex justify-between gap-4 flex-grow">
            <div className="">
              <h4 className="vote-title dark:vote-title-dark">Sure you want to proceed?</h4>
              <p className="mt-[8px] vote-content dark:vote-content-dark">
                You're at the point of suspending the policy. This means that the customer will not be insured
                for that period.You can unsuspend the policy at any time after the review.
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
            onClick={toggleConfirm}
            className="w-full max-w-[160px]"
            variant="outline"
            // color="dark"
            btnText="fw-500"
            color={theme === 'dark' ? "bg-light-800 bor dark:box-border hover:bg-light-1200 hover:dark:border1x" : "dark"}
            text="No, cancel"
          />
          <Button onClick={toggleConfirm} className="w-full max-w-[160px]"
            // color="dark"
            btnText="fw-500"
            color={theme === 'dark' ? "bg-light-800 bor dark:box-border hover:bg-light-1200 hover:dark:border1x" : "dark"}
            text="Yes, confirm" />
        </div>
      </div>


      <div className="sm:hidden vote-popup ">
        <div className="flex flex-col">
          <div className="flex justify-center"> <h4 className="vote-title dark:vote-title-dark">Sure you want to proceed?</h4></div>
          <div className="mt-[20px] flex justify-center">
            <img className="w-[100px] " src={theme === 'dark' ? "/images/icon22.svg" : "/images/icon21.svg"} alt="" />
          </div>
          <div className="px-4 mt-[20px]">
            <p className="vote-content dark:vote-content-dark">
              You're at the point of suspending the policy. This means that the customer will not be insured
              for that period.You can unsuspend the policy at any time after the review.
            </p>
          </div>
          <div className="mt-[20px] mb-[30px] flex justify-center"><img src="/images/hr_svg.svg" alt="hr" /></div>
          <div className="flex gap-5 justify-center">
            <Button
              onClick={toggleConfirm}
              className="w-full max-w-[160px]"
              variant="outline"
              color={theme === 'dark' ? "bg-light-800 bor dark:box-border hover:bg-light-1200 hover:dark:border1x" : "dark"}
              text="No, cancel"
            />
            <Button onClick={toggleConfirm} className="w-full max-w-[160px]"
              color={theme === 'dark' ? "bg-light-800 bor dark:box-border hover:bg-light-1200 hover:dark:border1x" : "dark"}
              text="Yes, confirm" />
          </div>
        </div>
      </div>
    </Popup >
  );
}

export default Dialogbox;
