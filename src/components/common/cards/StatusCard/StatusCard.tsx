import React from "react";
import Button, { ButtonProps } from "../../Button";
import StatusCardContent, { StatusCardContentProps } from "./StatusCardContent";
import { UserContext } from "../../../../App";
interface CoverCardProps extends StatusCardContentProps {
  selectButton?: ButtonProps;
  index: number;
}

function CoverCard({ cover, table, selectButton, index}: CoverCardProps) {
  const { theme } = React.useContext(UserContext);
  return (
    <>
      <div className="rounded sm:rounded bg-dark-600 pt-[35px] px-[30px] pb-[40px] dark:text-primary-100 dark:bg-white dark:box-border dark:text-dark-800 general-box-border">
        <div className="mb-[25px]">
          <StatusCardContent cover={cover} table={table} index={index}/>
        </div>
        <Button {...selectButton} text="Select"
          className={`w-full dark:box-border border font-medium ${theme === 'dark' ? "dark:hover:bg-[#F1F1F1]" : "hover:button-hover-grey"}`}
          color={theme === 'dark' ? "" : "greenGradient"}
        />
      </div>
    </>
  );
}
export default CoverCard;