import { Icon } from "@mui/material";
import Button, { type ButtonProps } from "../../../components/common/Button";
import InfoText, { type InfoTextProps } from "../../../components/common/InfoText";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { Fragment, useState } from 'react';
import { UserContext } from '../../../App'
import ConnectWallet from '../../../components/common/connect-wallet/ConnectWallet'
import Popup from '../../../components/templates/Popup';

function CastVote( ) {
    const [currentIcon, setcurrentIcon] = useState(""); 
    const { theme } = React.useContext(UserContext);
    const [connectWallet, setConnectWallet] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [walletErrorMessage, setWalletErrorMessage] = useState(false)
    const toggleConnectWallet = () => setConnectWallet((v) => !v)
    const toggleErrorAlert = () => setErrorMessage((v) => !v)
    const toggleWalletErrorAlert = () => setWalletErrorMessage((v) => !v)
    const [isError, setIsError] = useState(false)
  const [isWalletError, setIsWalletError] = useState(false)
    const [walletName, setWalletName] = useState('')

    const handleChildComponentActivation = (isError: boolean) => {
        setIsError(isError)
        setErrorMessage(isError)
      }
    
      const handleWalletComponentActivation = (isWalletError: boolean) => {
        setIsWalletError(isWalletError)
        setWalletErrorMessage(isWalletError)
      }

      interface VerifyIdentityProps {
        dynamicValue: string;
      }

  return (
    <>
    <div>
      <div className="bg-dark-800 py-[3px] px-[20px] sm:px-[30px] h-[50px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark border-top-radius">
        <div className="flex justify-between items-center h-[100%]">
          <div className="flex gap-[10px] items-center">
              <span className="decision-no">Cast Your Vote</span>
              
              <div className="flex gap-[5px]">
    
                <img
                  src={`${currentIcon === "test" ? "/images/info-green-icon.svg" : "/images/Maskd (2).svg"}`}
                  alt=""
                  width={14}
                  height={14    }
                  id={"test"}          
                  onMouseEnter={() => {
                    setcurrentIcon("test");
                  } } onMouseLeave={() => {
                    setcurrentIcon("");
                  } } />
                  <>
                    <ReactTooltip
                      className={`my-tool-tip z-500`}
                      anchorId={"test"}
                      place="bottom"
                      content="This is the total amount available for  you to borrow. You can borrow based on your collateral and until the borrowcap is reached." />
                  </>
              
              </div>
          </div>
          <div className="flex items-center">
              <span className="verification-require-text">Required</span>
          </div>
        </div>
      </div>
      <div className="bg-dark py-[23px] px-[30px] sm:px-[30px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 box-border-2x-light dark:box-border-2x-dark border-top-0 border-bottom-radiu">
        
          <div className="flex justify-between">
            <div className="flex gap-[10px] items-center">
            <img
                  src={"/images/Group360Orange.svg"}
                  alt=""
            />
                <span className="credential-info">Please connect a wallet first.</span>
            </div>
            <div className="flex items-center">
            <button
                  type="button"
                  className={`${
                    theme === 'dark'
                      ? 'dark:bg-light-1100 dark:box-border'
                      : 'greenGradient'
                  } contained medium  font-medium px-8 w-full sm:w-fit square button max-w-[141px]`}
                  onClick={() => {
                      toggleConnectWallet()
                    }}
                >
                  <span>Connect to Wallet</span>
                
                </button>
          </div>
        
        </div>
      </div>
    </div>
    <Popup
    onClose={toggleConnectWallet}
    visible={connectWallet}
    maxWidth="max-w-[474px] w-full "
    >
    <ConnectWallet
    walletName={walletName}
    setWalletName={setWalletName}
    onClose={toggleConnectWallet}
    onActivationChange={handleChildComponentActivation}
    onWalletConnect={handleWalletComponentActivation}
    />
    </Popup>
  </>

    

  );
}

export default CastVote;
