import { Fragment, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import TermOfUsePopup from "../global/TermOfUsePopup";
import Popup from "../templates/Popup";
import SelectionField from "./SelectionField";
import ConnectWallet from "./connect-wallet/ConnectWallet";

export interface AgreamentProps {
  text: string;
  agree: string;
  agreeURL: string;
  checked?: boolean;
  variety?: "checkbox" | "radio";
  classname?: string;
  textClasss?: string;
  onClick?: any;
  updateData?:any;
}

function Agreament({ variety, agree, agreeURL, text, checked, classname,textClasss, onClick,updateData}: AgreamentProps,props:any) {
  const [value, setValue] = useState(checked);
  const toggleChecked = () => {const newValue = !value;
    setValue(newValue);
    updateData(newValue);};
  const [terms, setTerms] = useState<boolean>(false);
  const toggleTerms = () => setTerms((v) => !v);
  const popupTerms = ["Terms of Use"];



  // useEffect(() => {
  //   props.updateData(value);
  // }, [value,props]);

  return (
    <Fragment>
      <div className="flex sm:items-center gap-2 items-center">
        { <SelectionField variety={variety}  toggle={toggleChecked} />  }
        <span className={`${classname} agreament-text`}>
          {text}&nbsp;
          {popupTerms.indexOf(agree) >= 0 ? (
            <span
              onClick={toggleTerms}
              role="button"
              className={`text-brand-400 font-bold no-underline dark:text-dark-600 ${textClasss || ''}`}
            >
              {agree}
            </span>
          ) : (
            <Link className={`text-brand-400 dark:text-dark-800 font-bold`} to={agreeURL}>
              {agree}
            </Link>
          )}
        </span>
      </div>
      <Popup onClose={toggleTerms} visible={terms} width="w-[641px]" height="h-[616px]">
        <TermOfUsePopup accept={toggleTerms} decline={toggleTerms} />
      </Popup>
    </Fragment >
  );
}
export default Agreament;