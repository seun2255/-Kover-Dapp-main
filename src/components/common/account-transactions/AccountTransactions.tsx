import React, { useState,useEffect } from "react";
import { UserContext } from "../../../App";
import Button from "../Button";
import IconButton from "../IconButton";
import NetworkSelect from "./NetworkSelect";
import Web3 from 'web3';

import axios from 'axios';

import { useWeb3React } from '@web3-react/core'


interface Transaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  isError: string
}

const wallet = [
  {
    id: 4534,
    icon: '/images/Group 172.svg',
    text: 'Meta Mask',
  },
  {
    id: 4535,
    icon: '/images/Group 175.svg',
    text: 'Binance Wallet',
  },
  {
    id: 4536,
    icon: '/images/Group 173.svg',
    text: 'Wallet Connect',
  },
  {
    id: 4537,
    icon: '/images/Group 176.svg',
    text: 'Portis',
  },
  {
    id: 4538,
    icon: '/images/Group 174.svg',
    text: 'Trust Wallet',
  },
  {
    id: 4539,
    icon: '/images/Group 177.svg',
    text: 'Coinbase',
  },
]
const polygonNetwork = {
  chainId: '0x89',
  chainName: 'MATIC',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com'],
  blockExplorerUrls: ['https://polygonscan.com/'],
};

const harmony = {
  chainId: '0x63564c40',
  rpcUrls: ['https://api.harmony.one'],
  chainName: 'Harmony Mainnet',
  nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
  blockExplorerUrls: ['https://explorer.harmony.one'],
  iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png'],
}

const avaxNetwork = {
  chainId: '0xa86a',
  chainName: 'Avalanche Mainnet',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
}
const binanceNetwork = {
  chainId: '0x38',
  chainName: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
}

const rinkeby = {
  chainId: '0x4',
  chainName: 'Rinkeby Test Network',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.ankr.com/eth_rinkeby'],
  blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
}

const ethereumNetwork = {
  chainId: '0x1',
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
  blockExplorerUrls: ['https://etherscan.io/'],
}
interface NetworkDetails {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}






interface AccountTransactionsProps {
  onClose: () => void;
}

const recentTransactions = [
  {
    id: 453,
    text: "Stake",
    status: "success",
  },
  {
    id: 456,
    text: "Approve DEX",
    status: "success",
  },
  {
    id: 875,
    text: "Approve DEXDLP",
    status: "error",
  },
];

function AccountTransactions({ onClose }: AccountTransactionsProps) {
  const { theme } = React.useContext(UserContext);
  const [updatedNetwork,setNetwork]=useState('')
  const [etherBalance,setBalance]=useState('')
  const [blockExplorerUrl,setBlockUrl]=useState('')

  const { activate, deactivate, active, chainId, account, connector,library } =
  useWeb3React()

  const [copySuccess, setCopySuccess] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const clearTransactions = () => setTransactions([]);

  //const [transactions, setTransactions] = useState([]);


  const handleCopyClick = async () => {
    try {
      if(account){
        await navigator.clipboard.writeText(account);
        setCopySuccess(true);
      }
    } catch (error) {
      console.error('Error copying wallet address to clipboard:', error);
    }
  };
  let currentBlockExplorerUrl = '';

  switch (chainId) {
    case 1: // Mainnet
      currentBlockExplorerUrl = 'https://etherscan.io';
      break;
    case 56: // binance
      currentBlockExplorerUrl = 'https://bscscan.com/';
      break;
    case 137: // polygon
      currentBlockExplorerUrl = 'https://polygonscan.com/';
      break;
    case 43114: // avax
      currentBlockExplorerUrl = 'https://cchain.explorer.avax.network/';
      break;
    case 80001:
      currentBlockExplorerUrl = 'https://mumbai.polygonscan.com/';
      break;
    default:
      currentBlockExplorerUrl = '';
  }

  useEffect(() => {
    if (account && library) {
      const web3 = new Web3(library.provider);
      web3.eth.getBalance(account).then((balance:any) => {
        const etherBalance = web3.utils.fromWei(balance, 'ether');
        setBalance(etherBalance);
      });



     
        const getTopTransactions = async () => {
          
          if(chainId === 137)
          {
            const response = await axios.get(
              `https://api.polygonscan.com/api/?module=account&action=txlist&address=${account}&sort=desc&apikey=Z27QZ6ADNXRU36EJAFJ8VHGVV51J1D7PFY`
            );
            console.log(response)
            setTransactions(response.data.result.slice(0, 3));
          }
          else if(chainId === 43114){
            const response = await axios.get(
              `https://api.snowtrace.io/api?module=account&action=txlist&address=${account}&sort=desc&apikey=P9Q38439P9ZF9DHJ2PAYEHNYRC3FZVTNKM`
            );
            console.log(response)
            setTransactions(response.data.result.slice(0, 3));
          }
          else if(chainId === 1) {
            console.log("inn")
            const response = await axios.get(
              `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&sort=desc&apikey=X32HI1T5UCNXKNNGAUSDF6TS9XGAC18HM4`
            );
            console.log(response)
            setTransactions(response.data.result.slice(0, 3));
          }
          else if(chainId === 56) {
            const response = await axios.get(
              `https://api.bscscan.com/api?module=account&action=txlist&address=${account}&startblock=1&endblock=99999999&sort=desc&apikey=VU1DQXAN9KFFX1AIDV7MH1Z5H9G8Z3Q7TI`
            );
            console.log(response)
            setTransactions(response.data.result.slice(0, 3));
          }
          else {
            const response = await axios.get(
              `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${account}&startblock=1&endblock=99999999&sort=desc&apikey=77825900f4c54df09ea04e59a63d8088`
            );
            console.log(response)
            setTransactions(response.data.result.slice(0, 3));
          }

        }

      
      getTopTransactions()

      
      // web3.eth
      // .getTransactionCount(account)
      // .then((count) => {
      //   console.log("count"+ count)
      //   const promises = [];
      //   for (let i = 0; i < 3; i++) {
      //     const index = count - i - 1;
      //     if(index >= 0)
      //     {
            
      //     console.log(index)
      //       promises.push(web3.eth.getTransactionFromBlock("latest", index));
      //     }
      //   }
      //   return Promise.all(promises);
      // })
      // .then((txs) => {
      //   console.log("txs" + JSON.stringify(txs))
      //   const transactions = txs.map((tx) => ({
      //     hash: tx.hash,
      //     from: tx.from,
      //     to: tx.to,
      //     value: web3.utils.fromWei(tx.value, "ether"),
      //   }));
      //   setTransactions(transactions);
      // });
      // console.log("trasaction " + transactions);
    }
  }, [account, library]);
  const handleClickNetwork = (newNetwok:any) => {
    switchToNewNetworkDrop(newNetwok);

    onClose?.() // assuming this function is defined elsewhere
  };
  
  

  const handleWalletDisconnect = () => {

    deactivate()
  
    onClose?.()
  };

  const networkUpdate=(newNetworkUpdate:any,blockExplorerUrls:any)=>{
    console.log(newNetworkUpdate)
    setNetwork(newNetworkUpdate)
    console.log(blockExplorerUrls)
    setBlockUrl(blockExplorerUrls)


  }

  const switchNetworkDrop = async (networkDetails: NetworkDetails) => {
    try {
      if(active && library){
        await library.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networkDetails.chainId }],
        })
      }
      
      
    } catch (switchError: any) {
      // 4902 error code indicates the chain is missing on the wallet
      console.log('switch error' + switchError.message +switchError.code)
      if (switchError.code === 4902 || switchError.code === -32603 ||switchError.code ===-32000
        ) {
        console.log(switchError.code)
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkDetails],
          })
        } catch (error: any) {
          console.error('not connected ' + error.message)
          
        }
      }
    }
  }

  async function switchToNewNetworkDrop(chainId: string) {
    console.log(chainId)
    switch (chainId) {
      case '0x63564c40':
        switchNetworkDrop(harmony)

        console.log(chainId)
        console.log(window.ethereum.providerMap)
        break
      case '0x89':
        switchNetworkDrop(polygonNetwork)
        console.log(account)
        break
      case '0x38':
        switchNetworkDrop(binanceNetwork)
        console.log(account)
        console.log(library)
        break
      case '0xa86a':
        switchNetworkDrop(avaxNetwork)
        console.log(account)
        break
      case '0x1':
        switchNetworkDrop(ethereumNetwork)
        console.log(account)
        break
      case '0x4':
        switchNetworkDrop(rinkeby)
        break

      default:
        throw new Error(`Unsupported wallet "${wallet}"`)
    }
  }
  function truncateAddress(address:any) {
    const prefixLength = 6;
    const suffixLength = 4;
    const truncated = `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
    return truncated;
  }

  
  const truncatedAddress = truncateAddress(`${account}`);

  





  return (
    <div className="flex flex-col pt-[30px] pb-[35px] px-[15px] sm:px-[30px] sm:pt-[30px] sm:pb-[40px]">
      <div className="flex justify-between mb-[26px]">
        <h6 className="popup-account-title">Account</h6>
        <button type="button" onClick={onClose}>
          <img className="w-2.5 h-2.5" src="/images/Group 144.svg" alt="" />
        </button>
      </div>
      <div className="text-end mb-[7px]">
        {copySuccess && 'Copied!' }
      </div>
      <div className="items-center justify-between flex mb-[7px]">
        <span className="popup-account-value">{truncatedAddress}</span>
        <div className="flex items-center gap-2">
          <a href={`${currentBlockExplorerUrl}/address/${account}`} target="_blank" rel="noreferrer" ><IconButton className="bg-dark-800 dark:bg-dark-100"  icon="/images/direct.svg" /></a>
          <IconButton className="bg-dark-800 dark:bg-dark-100" icon="/images/copy.svg" onClick={handleCopyClick} />
        </div>
      </div>
      <div className="items-center flex justify-between mb-[15px]">
        <span className="network">Network</span>
        <NetworkSelect  networkUpdate={networkUpdate} />
        <div className="flex items-center gap-2.5">
          {/* <img className="" src="/images/Mask (15).svg" alt="" />
          <span className="font-medium text-dark-500 text-md">Wrong Network</span> */}
        </div>
      </div>
      <div className="flex justify-between items-center mb-[15px]">
        <Button 
          icon={theme === 'dark' ? "/images/switch-network.svg" : "/images/switch-exchange.svg"}
          text="Switch Network"
          color= { theme === 'dark' ? "dark:bg-light-1100" : "switch-network-btn" }
          btnText={theme === "dark" ? "switch-network-dark" : "switch-network"}
          onClick={()=>{handleClickNetwork(updatedNetwork)}}
        />

         <Button
            className="gap-2.5 dark:bg-white dark:box-border "
            text="Disconnect" 
            color={
              theme === 'dark' ? "whiteBgBtn" : "greenGradient"
          }
          onClick={()=>{handleWalletDisconnect()}}
          btnText="disconnect-btn "
         />
      </div>
      <div className="flex items-center justify-between mb-[20px]">
        <span className="recent-transactions">Recent Transactions</span>
        <button
          onClick={clearTransactions}
          type="button"
          className="text-dark-500 font-medium text-lg recent-transactions-clear-all"
        >
          Clear All
        </button>
      </div>
  
      {transactions.length <= 0 ? (
        <div className="mt-2.5 flex items-center flex-col">
          <img src="/images/Group 178 (1).svg" alt="" className="mb-4" />
          <p className="text-dark-500 text-3xl font-amaranth mb-5">Oops ! No results found</p>
          <p className="mb-5">New Wallet, no transactions were found.</p>
        </div>      
      ) : (
        <div className="flex flex-col gap-5 ">
          {transactions.map((tx) => (
            <a href={`${currentBlockExplorerUrl}/tx/${tx.hash}`} target="_blank" rel="noreferrer"
              className="flex items-center px-[20px] py-[19px] bg-dark-800 rounded justify-between cursor-pointer hover:bg-dark-100 duration-150 dark:bg-white box-border-2x-light dark:box-border-2x-dark"
              key={tx.hash}
            >
              <div className="flex items-center gap-[5px]">
                <span className="recent-transactions-item">{truncateAddress(tx.hash)}</span>
                <img src="/images/Group 178.svg" alt="" />
              </div>
              {tx.isError === "0" && <img src="/images/Group 179.svg" alt="" />}
              {tx.isError === "1" && <img src="/images/Group 180.svg" alt="" />}
            </a>
          ))}
        </div>
      )
  }
    </div>
  );
}

export default AccountTransactions;
