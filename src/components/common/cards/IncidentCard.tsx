import React from "react";

function IncidentCard() {
  return (
    <>
      <div className="bg-dark-600 rounded incident-details dark:bg-white box-border-2x-light dark:box-border-2x-dark">

        {/* PC */}
        <div className="sm:flex items-center font-medium gap-[8px] hidden">
          <img src="/images/__avatar_url.png" alt="" />
          <span className="ml-[11px]">BY: 0x95e441... </span>
          <img  width={6} height={6} src="/images/Ellipse 21.svg" alt="" />
          <span className="text-brand-400 dark:text-dark-800 dark:font-semibold font-normal fw-500 fs-14 lh-16">Created</span>
          <span className="fw-500 fs-14 lh-16">on April 23rd, 2022</span>
        </div>

        {/* Moblie */}
        <div className="flex gap-3 sm:hidden">
          <img width={40} height={40} src="/images/__avatar_url.png" alt="" />
          <div className="flex flex-col justify-center">
            <span>BY: 0x95e441... </span>
            <div>
              <span className="text-brand-400 dark:text-dark-800 dark:font-semibold font-normal fw-500 fs-14 lh-16">Created</span>
              <span className="fw-500 fs-14 lh-16"> on April 23rd, 2022</span>
            </div>
          </div>
        </div>

        <p className="  incident-text">
          Distracted by the readable content of a page when looking at its layout. The point of using
          Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
          using 'Content here, content here', making it look like readable English. Many desktop
          publishing packages and web page editors now use Lorem Ipsum as their default model text,
          and a search for 'lorem ipsum' will uncover Many web sites still in their infancy. Various
          versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
          humour and the like).
          <br />
          <br />
          Distracted by the readable content of a page when looking at its layout. The point of using
          Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
          using 'Content here, content here', making it look.
        </p>
      </div>
    </>
  );
}

export default IncidentCard;
