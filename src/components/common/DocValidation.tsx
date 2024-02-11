import React from "react";
import { UserContext } from "../../App";
function DocValidation() {
    const { theme } = React.useContext(UserContext);
    return (
        <>
            <div className="p-4 border dark:dark-light-box-border">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <img src={theme === "dark" ? "/images/008.svg" : "/images/004.svg"} />
                        <span className="text-dark-650 text-base dark:text-dark-600">Documents should be in good condition</span>
                    </div>
                    <div className="flex gap-4">
                        <img src={theme === "dark" ? "/images/008.svg" : "/images/004.svg"} />
                        <span className="text-dark-650 text-base dark:text-dark-600">Documents should be in good condition</span>
                    </div>
                    <div className="flex gap-4">
                        <img src={theme === "dark" ? "/images/008.svg" : "/images/004.svg"} />
                        <span className="text-dark-650 text-base dark:text-dark-600">Not has today’s date</span>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DocValidation;
