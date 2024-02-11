import React from "react";

export interface MempershipItemProps {
  icon: string;
  title: string;
  children: string;
}

function MempershipItem({ children, icon, title }: MempershipItemProps) {
  return (
    <div className="bg-dark-800 rounded  gap-x-5 gap-y-1 grid grid-cols-[35px_auto] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-white bg-dark-800 box-border-2x-light dark:box-border-2x-dark p-[30px]">
      <img src={icon} className="row-start-1 row-end-3 block" alt="" />
      <h6 className="welcome-membership-item-title">{title}</h6>
      <p className="welcome-membership-item-subtitle">{children}</p>
    </div>
  );
}

export default MempershipItem;
