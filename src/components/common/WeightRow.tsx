import React from "react";
import { Link } from "react-router-dom";
import InfoText from "./InfoText";

interface WeightRowProps {
  name: string;
  value?: string;
  valuePrefix?:String;
  className?: string;
  valueStyle?: {
    color: string;
  };
  withInfo?: boolean;
  textclassname?: string;
  titleclassname?: string;
  valuePrefixClassName?: string;
}

function WeightRow({ valueStyle, withInfo, name, value,valuePrefix, className, textclassname, titleclassname, valuePrefixClassName }: WeightRowProps) {
  return (
    <div className={`flex items-center justify-between  ${className || ""}`}>
      <InfoText
        text={name }
        variant="semi"
        icon={withInfo === undefined ? false : withInfo === false ? undefined : true}
        color="dark-650"
        titleclassname={titleclassname}
      />
      <Link to="" className="hover:no-underline no-underline">
        <span className={valuePrefixClassName} >{valuePrefix}</span><span className={`${valueStyle?.color || "text-dark-10 dark:text-dark-600"}  ${textclassname || "font-medium text-xl"}`}>{value}</span> 
      </Link>
    </div>
  );
}

export default WeightRow;
