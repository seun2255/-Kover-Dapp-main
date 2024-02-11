import React from "react";
import MempershipItem from "./MempershipItem";
import mempership from "./membership.json";

function Membership() {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-1 mb-[20px]">
        <span className="welcome-main-title">Onboarding</span>
        {/* <img src="/images/Mask (4).svg" alt="" /> */}
      </div>
      <div className="flex flex-col gap-5">
        {mempership.map(({ id, icon, title, content }) => (
          <MempershipItem icon={icon} key={id} title={title}>
            {content}
          </MempershipItem>
        ))}
      </div>
    </div>
  );
}

export default Membership;
