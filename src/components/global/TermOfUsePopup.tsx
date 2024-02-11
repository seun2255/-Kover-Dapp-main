import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Button from "../common/Button";
import { UserContext } from "../../App";
interface TermOfUsePopupProps {
  accept?: () => void;
  decline?: () => void;
}

function TermOfUsePopup({ accept, decline }: TermOfUsePopupProps) {
  const { theme } = React.useContext(UserContext);
  return (
    <div className="term-popup">
      <div className="mb-[20px]">
        <span className="term-title dark:term-title-dark">Terms of Use</span>
      </div>
      <div className="mb-7 term relative" style={{ maxHeight: 446, height: "100vh" }}>
        {theme === 'dark' ? "" : <div className="layer"></div>}
        <Scrollbars style={{ maxHeight: 446, height: "100vh" }}>
          <div>
            <b className="font-medium block">1. Welcome to Aave.com</b> <br />
            <div className="text-dark-200 text-lg">
              <p className="font-medium">Effective Date: March 15, 2022</p>
              <br />
              <p className="terms-content">
                Aave.com is brought to you by Avara UI Labs Ltd. (“Avara UI Labs”) and its affiliates
                (collectively, “we,” “us,” or “our”) committed to creating open-source software that
                empowers users' financial, social and cultural independence. Aave.com provides
                information and resources about.
              </p>
              <br />
              <p className="terms-content">
                ARBITRATION NOTICE: THESE TERMS (“TERMS”) CONTAIN AN ARBITRATION CLAUSE BELOW. EXCEPT
                FOR CERTAIN TYPES OF DISPUTES MENTIONED IN THAT ARBITRATION CLAUSE, YOU AND WE AGREE
                THAT ANY DISPUTES RELATING TO THE SERVICES (AS DEFINED BELOW) WILL BE RESOLVED BY
                MANDATORY BINDING ARBITRATION, AND YOU WAIVE ANY RIGHT..You are entering into a
                binding Agreement.
              </p>
              <p className="terms-content">BY ACCESSING OR USING OUR SERVICES, WHICH INCLUDE OUR VARIOUS
                WEBSITES, INCLUDING, WITHOUT LIMITATION, AAVE.COM (AND ANY RESPECTIVE SUBDOMAINS);
                APPLICATIONS (COLLECTIVELY WITH ANY MATERIALS AND SERVICES AVAILABLE THEREIN, AND
                SUCCESSOR WEBSITE(S) OR APPLICATION(S) THERETO, THE “SITE”), AND OTHER SERVICES THAT
                LINK TO THESE TERMS, AS WELL AS ANY INFORMATION, TEXT, LINKS, GRAPHICS, PHOTOS, AUDIO,
                VIDEO, OR OTHER MATERIALS STORED, RETRIEVED OR APPEARING THEREON, WHETHER ACCESSED
                THROUGH THE SITE OR OTHERWISE (COLLECTIVELY, THE “SERVICES”), YOU ARE ENTERING INTO A
                BINDING AGREEMENT WITH US THAT INCLUDES THESE TERMS, AAVE.COM - PRIVACY POLICY (FOUND
                HERE).</p>
              <p className="terms-content">
                To the extent that there is a conflict between these Terms and any applicable
                additional terms, these Terms will control unless expressly stated otherwise. If you
                don't agree with these Terms, you may not use the Services and should not visit the
                Site or otherwise engage with the Services.</p>
            </div>
            <br />
            <b className="font-medium block">Use of the Services</b>
            <br />
            <div className="text-dark-200 text-lg">
              <p className="terms-content">
                To use the Services, you must legally be able to enter into the Agreement. By using
                the Services, you represent and warrant that you meet the eligibility requirement. If
                you do not meet the requirement, you must not access or use the Site or the Services.
                By using the Services, you represent and warrant that you meet the eligibility
                requirement. If you do not meet the requirem  To use the Services, you must legally be able to enter into the Agreement. By using
                the Services, you represent and warrant that you meet the eligibility requirement. If
                you do not meet the requirement, you must not access or use the Site or the Services.
                By using the Services, you represent and warrant that you meet the eligibility
                requirement. If you do not meet the requirem
              </p>
            </div>
          </div>
        </Scrollbars>
      </div>

      <div className="grid grid-cols-2 sm:flex justify-end items-center gap-4 mr-3">
        <Button onClick={decline} btnText="" className="px-[60px] py-[10.5px] " color={`${theme === 'dark' ? "light-btn-border" : "dark"}`} variant="outline" text="Decline" />
        <Button onClick={accept} btnText="term-accept-btn dark:term-accept-btn-dark" className="px-[60px] py-[10.5px] " color={`${theme === 'dark' ? "bg-light-100" : "dark-100"}`} text="Accept" />
      </div>
    </div >
  );
}
export default TermOfUsePopup;