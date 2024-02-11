import { Icon } from "@mui/material";
import {useState} from "react";
import Button, { type ButtonProps } from "./Button";
import InfoText, { type InfoTextProps } from "./InfoText";
import { Tooltip as ReactTooltip } from "react-tooltip";
interface DecisionFieldProps {
  tildeValue: number;
  button: ButtonProps;
  infoText: InfoTextProps;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  icon:boolean;
}

function DecisionField(props: DecisionFieldProps) {
  const [value, setValue] = useState();
  const [currentIcon, setcurrentIcon] = useState(""); 
  const [icon, seticon] = useState(""); 
  
  const { button, infoText } = props;
  return (
    <div className="bg-dark-800 py-[3px] px-[20px] sm:px-[30px] h-[50px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark">
      <div className="flex justify-between">
        <div className="flex gap-[10px] items-center">
            <span className="decision-no">0.0020</span>
            <Button              
              className="px-6 h-[30px] font-medium text-3xl bg-[#3F4048] dark:bg-[#FFFFFF]"
              {...button}
            />
            {/* <InfoText {...infoText} /> */}
            <div className="flex gap-[5px]">
            <div className="flex infotext  medium dark gap-[5px]"><span className="  text-[#606166] fw-500 fs-12 lh-14 ">FEE</span></div>
            <>
              <img
                src={`${currentIcon === "test" ? "/images/info-green-icon.svg" : "/images/Maskd (2).svg"}`}
                alt=""
                width={10}
                height={10}
                id={"test"}          
                onMouseEnter={() => {
                  setcurrentIcon("test");
                } } onMouseLeave={() => {
                  setcurrentIcon("");
                } } />
                <>
                  <ReactTooltip
                    className={`my-tool-tip z-500`}
                    anchorId={"test"}
                    place="bottom"
                    content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached." />
                </>
            </>
            </div>
        </div>
        <div className="flex gap-[10px]">
            <span className="decision-amount">~</span>
            <span className="decision-amount">$3.09</span>
        </div>
      </div>
    </div>
  );
}

export default DecisionField;
