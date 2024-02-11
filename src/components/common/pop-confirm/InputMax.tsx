import React, { useState, useEffect } from "react";
import Button from "../Button";
import { UserContext } from "../../../App";
export interface InputMaxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> {
  action?: boolean;
}

function InputMax({ action, ...rest }: InputMaxProps) {
const [amount, setAmount] = useState(false);
useEffect(() => {
  if(rest.defaultValue === "00.00"||"50.00"){
   setAmount(true);
 }else{
   setAmount(false);
 }
},[rest.defaultValue]);

const handleChange = (e:any) => {
   if(e.target.value === amount) {
     setAmount(true);
   }else{
     setAmount(false);
   }
};

  const { theme } = React.useContext(UserContext);
  return (
    <div className="bg-dark-800 rounded py-2.5 px-5 flex justify-between gap-2 items-center mb-4 dark:bg-light-200 h-[50px]">
    <input maxLength={5} type="text" placeholder={rest.placeholder} defaultValue={rest.defaultValue}
      className={`placeholder:text-dark-300 dark:text-dark-800 text-6xl max-w-none min-w-0 w-[72px] flex-grow dark:placeholder:text-dark-300 fw-400 lh-42 input-value
      ${amount ? "text-[#42434B] dark:tex-light-800" : "text-[#FFFFFF] dark:tex-light-800"} `} onChange={handleChange} />
    <div className="flex gap-4 items-center">
      <button className="max-btn">MAX</button>
      {action && <Button color={theme === "dark" ? "dark:bg-white" : " bg-[#3F4048]"} className="h-[30px]" text="Approve" />}
    </div>
</div>
  );
}
export default InputMax;