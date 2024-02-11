import React from "react";
import { UserContext } from "../../../../App";

interface CarInsuranceProps {
  text?: string;
  icon?: string;
  margin?: string;
}

function CarInsurance({ icon, text,margin }: CarInsuranceProps) {
  const { theme } = React.useContext(UserContext);
  return (
    <React.Fragment>
      <>
        <div className="flex">
          <div className="flex sm:flex items-center ">
            <span className="car-insurance dark:car-insurance-dark">{text || "Car insurance"} </span>
          </div>
          <div className={`${margin ||'ml-[45px]'}`}>
            <img className="w-9 h-9 min-w-[30px] min-h-[30px] car-icon" src={icon || `${theme === 'dark' ? "/images/whiteCar.svg" : "/images/logo (1).svg"}`} alt="" />
          </div>
        </div>
      </>
    </React.Fragment>
  );
}
export default CarInsurance;
