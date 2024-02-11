// // import React, { useState, useEffect } from 'react'
// // import { useWeb3React } from '@web3-react/core'
// // import { Web3Provider } from '@ethersproject/providers'
// // import { InjectedConnector } from '@web3-react/injected-connector'
// // import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// // import { WalletLinkConnector } from '@web3-react/walletlink-connector'
// // import { AbstractConnector } from '@web3-react/abstract-connector'
// // import WalletConnectProvider from '@walletconnect/web3-provider'
// // import { BscConnector } from '@binance-chain/bsc-connector'
// // import Portis from '@portis/web3'
// // import { PortisConnector } from '@web3-react/portis-connector'
// // import { toHex, truncateAddress } from './utils'
// // import Select from 'react-select'
// // import { connectors } from './connectors'
// // import Web3 from 'web3'
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { InjectedConnector } from "@web3-react/injected-connector";
// import { useWeb3React } from '@web3-react/core'
// import { BscConnector } from '@binance-chain/bsc-connector'
// import { PortisConnector } from '@web3-react/portis-connector'

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// const networks = [
//   {
//     id: 34523,
//     icon: '/images/bsc.svg',
//     text: 'BSC',
//     chainId: '0x38',
//     rpcUrl: 'https://bsc-dataseed1.ninicoin.io/',
//   },
//   {
//     id: 34524,
//     icon: '/images/Group.svg',
//     text: 'AVAX',
//     chainId: '0xa86a',
//     rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',

//   },
//   // {
//   //   id: 34525,
//   //   icon: '/images/Group-29.svg',
//   //   text: 'HAR',
//   //   chainId: '0x63564c40',
//   // },
//   {
//     id: 34526,
//     icon: '/images/Group-29.svg',
//     text: 'ETH',
//     chainId: '0x01',
//     rpcUrl:'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
//   },
//   {
//     id: 34527,
//     icon: '/images/Group (1).svg',
//     text: 'MATIC',
//     chainId: '0x89',
//     rpcUrl:'https://polygon-rpc.com',
//   },
//   // {
//   //   id: 34528,
//   //   icon: '/images/Group-29.svg',
//   //   text: 'RIN',
//   //   chainId: '0x4',
//   // },
// ]

// const CoinbaseWallet = new WalletLinkConnector({
//   url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//   appName: "Web3-react Demo",

//  });

//  const WalletConnect = new WalletConnectConnector({
//   rpc: {1:`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`},
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,

//  });

//  const Injected = new InjectedConnector({
//   supportedChainIds: [1, 3, 4, 5, 42]
//  });

//  const binance = new BscConnector({
//   supportedChainIds: [56, 97, 1, 137],
// })

// const PORTIS_DAPP_ID = '44f6086b-d6b7-4aee-a2ed-e92cfb138631'

// const portisConnector = new PortisConnector({
//   dAppId: PORTIS_DAPP_ID,
//   networks: [1, 100], // mainnet and rinkeby
// })

// import { useEffect } from 'react';

//   useEffect(() => {
//     const binanceChain = new BinanceChain();

//     const avaxNetwork = {
//       name: 'AVAX',
//       chainId: '0xa86a',
//       networkId: '0xa86a',
//       rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
//       nativeCurrency: {
//         name: 'AVAX',
//         symbol: 'AVAX',
//         decimals: 18,
//       },
//     };

//     binanceChain.addNetwork(avaxNetwork)
//       .then(() => console.log('AVAX network added'))
//       .catch((err) => console.error('Failed to add AVAX network:', err));
//   }, []);

// //  import { TrustWallet } from '@trustwallet/web3-react-trust-wallet';

// // const portis = new Portis(process.env.PORTIS_DAPP_ID!, "mainnet");
// const PORTIS_DAPP_ID = '44f6086b-d6b7-4aee-a2ed-e92cfb138631'

// // const trustwallet = new TrustWallet({
// //     infuraId: `${process.env.INFURA_KEY}`,
// //     bridge: "https://bridge.walletconnect.org",
// //     qrcode: true,

// //     supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 128, 256, 1337, 20000714] // add Trust Wallet's chain ID, which is 20000714
// //   });

// const portisConnector = new PortisConnector({
//   dAppId: PORTIS_DAPP_ID,
//   networks: [1, 4], // mainnet and rinkeby
// })

// const injected = new InjectedConnector({
//   supportedChainIds: [1, 3, 4, 5, 47, 137],
// })

// const walletlink = new WalletLinkConnector({
//   url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//   appName: 'Web3-react-Demo',
// })
// const walletconnect = new WalletConnectConnector({
//   infuraId: `${process.env.INFURA_KEY}`,
//   bridge: 'https://bridge.walletconnect.org',
//   qrcode: true,
// })

// const binance = new BscConnector({
//   supportedChainIds: [56, 97, 1, 137],
// })

function Extrapage() {
  //   const { activate, deactivate,active, chainId, account,connector } = useWeb3React();
  //   const { library } = useWeb3React();

  //   const switchNetwork1 = async () => {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{
  //           chainId: '0x63564c40',
  //         }]
  //       });
  //       console.log('Network switched successfully');
  //     } catch (error) {
  //       console.log(window.ethereum)
  //       console.error('Failed to switch network:', error);
  //       try {
  //         console.log(library)

  //         await library.provider.request({
  //           method: "wallet_addEthereumChain",
  //           params: [
  //             {
  //               chainId: "0x63564c40",
  //               rpcUrls: ["https://api.harmony.one"],
  //               chainName: "Harmony Mainnet",
  //               nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
  //               blockExplorerUrls: ["https://explorer.harmony.one"],
  //               iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
  //             }
  //           ],
  //         });
  //       } catch (error) {
  //          console.error("not connected "+error)
  //       }
  //     }
  //   }

  //   const switchNetwork = async () => {
  //     try {
  //       await library.provider.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: "0x63564c40" }],
  //       });
  //       console.log(library)
  //     } catch (switchError:any) {
  //       // 4902 error code indicates the chain is missing on the wallet
  //       if (switchError.code === 4902) {
  //         console.log(switchError.code)
  //         try {
  //           console.log(library)

  //           await library.provider.request({
  //             method: "wallet_addEthereumChain",
  //             params: [
  //               {
  //                 chainId: "0x63564c40",
  //                 rpcUrls: ["https://api.harmony.one"],
  //                 chainName: "Harmony Mainnet",
  //                 nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
  //                 blockExplorerUrls: ["https://explorer.harmony.one"],
  //                 iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
  //               }
  //             ],
  //           });
  //         } catch (error) {
  //            console.error("not connected "+error)
  //         }
  //       }
  //     }
  //   };

  // //   const { activate, deactivate, active, connector, library, account } =
  // //     useWeb3React()
  // //   const [error, setError] = useState('')
  // //   const ethereum = (window as any).ethereum;
  // //   // const [network, setNetwork] = useState(undefined);

  // //   // const handleNetwork = (e) =>  {
  // //   //   const id = e.target.value;
  // //   //   setNetwork((id));
  // //   // };

  // //   const handleConnect = async () => {
  // //     await activate(connectors.injected)
  // //   }

  // //   const handleNetworkSwitch = async () => {
  // //     await changeNetwork();
  // //   };
  // //   // const switchNetwork = async () => {
  // //   //     console.log("hiiiiiiiiiiii")
  // //   //     try{
  // //   //         console.log("iiiiiiiiiiiiiiiiiiiiii")
  // //   //         await library.provider.request({
  // //   //             method:"wallet_switchEtherumChain",
  // //   //             params: [{ chainId: 137 }],

  // //   //         });

  // //   //     } catch(switchError){
  // //   //         console.log(switchError)
  // //   //         console.log("jjjjjjjjjjjjjjjjjjjj")
  // //   //     }
  // //   // }
  // //   const networks = {
  // //     polygon: {
  // //       chainId: `0x${Number(137).toString(16)}`,
  // //       chainName: "Polygon Mainnet",
  // //       nativeCurrency: {
  // //         name: "MATIC",
  // //         symbol: "MATIC",
  // //         decimals: 18
  // //       },
  // //       rpcUrls: ["https://polygon-rpc.com/"],
  // //       blockExplorerUrls: ["https://polygonscan.com/"]
  // //     },
  // //     bsc: {
  // //       chainId: `0x${Number(56).toString(16)}`,
  // //       chainName: "Binance Smart Chain Mainnet",
  // //       nativeCurrency: {
  // //         name: "Binance Chain Native Token",
  // //         symbol: "BNB",
  // //         decimals: 18
  // //       },
  // //       rpcUrls: [
  // //         "https://bsc-dataseed1.binance.org",
  // //         "https://bsc-dataseed2.binance.org",
  // //         "https://bsc-dataseed3.binance.org",
  // //         "https://bsc-dataseed4.binance.org",
  // //         "https://bsc-dataseed1.defibit.io",
  // //         "https://bsc-dataseed2.defibit.io",
  // //         "https://bsc-dataseed3.defibit.io",
  // //         "https://bsc-dataseed4.defibit.io",
  // //         "https://bsc-dataseed1.ninicoin.io",
  // //         "https://bsc-dataseed2.ninicoin.io",
  // //         "https://bsc-dataseed3.ninicoin.io",
  // //         "https://bsc-dataseed4.ninicoin.io",
  // //         "wss://bsc-ws-node.nariox.org"
  // //       ],
  // //       blockExplorerUrls: ["https://bscscan.com"]
  // //     }
  // //   };

  // //   const changeNetwork = async () => {

  // //     try {

  // //       if (ethereum!) throw new Error("No crypto wallet found");
  // //       await ethereum.request({
  // //         method: "wallet_addEthereumChain",
  // //         params: [
  // //           {
  // //             polygon: {
  // //               chainId: `0x${Number(137).toString(16)}`,
  // //               chainName: "Polygon Mainnet",
  // //               nativeCurrency: {
  // //                 name: "MATIC",
  // //                 symbol: "MATIC",
  // //                 decimals: 18
  // //               },
  // //               rpcUrls: ["https://polygon-rpc.com/"],
  // //               blockExplorerUrls: ["https://polygonscan.com/"]
  // //             },
  // //           }
  // //         ]
  // //       });
  // //     } catch (err) {
  // //       console.log("err.message");
  // //     }
  // //   };

  // // interface NetworkDetails {
  // //   chainId: number;
  // //   chainName: string;
  // //   nativeCurrency: {
  // //     name: string;
  // //     symbol: string;
  // //     decimals: number;
  // //   };
  // //   rpcUrls: string[];
  // //   blockExplorerUrls: string[];
  // // }

  // // const polygonNetwork={
  // //   chainId:137,
  // //   chainName:"MATIC",
  // //   nativeCurrency:{
  // //     name:"MATIC",
  // //     symbol:"MATIC",
  // //     decimals:18
  // //   },
  // //   rpcUrls:["https://polygon-rpc.com/"],
  // //   blockExplorerUrls:["https://polygonscan.com/"]

  // // }

  // //   const switchNetwork = async (networkDetails:NetworkDetails) => {
  // //     console.log(networkDetails)
  // //     try {
  // //       console.log('error in switch network')
  // //       console.log(library)
  // //       await library.provider.request({
  // //         method: 'wallet_switchEthereumChain',
  // //         params: [{ chainId: `0x${(56).toString(16)}` }],
  // //       })
  // //     } catch (switchError) {
  // //       console.log('switchError'+switchError)
  // //         console.log('error in swirtch error ')
  // //         try {
  // //           console.log("rooor in the add network")
  // //           console.log(networkDetails)
  // //           console.log(library)
  // //           await library.provider.request({
  // //             method: 'wallet_addEthereumChain',
  // //             params: [
  // //               {
  // //                 chainId: 56,
  // //                 rpcUrls:["https://polygon-rpc.com/"],
  // //                 chainName: "MATIC",
  // //                 nativeCurrency:{
  // //                   name:"MATIC",
  // //                   symbol:"MATIC",
  // //                   decimals:18
  // //                 },
  // //                 blockExplorerUrls:["https://polygonscan.com/"]
  // //               }

  // //             ],

  // //           })
  // //           console.log("error ")
  // //         } catch (error) {
  // //           ('error in catch' + error)
  // //         }

  // //     }
  // //   }

  //   //   useEffect(() => {
  //   //     const provider = window.localStorage.getItem("provider");
  //   //     if (provider) activate(connectors[provider]);
  //   //   }, []);

  //   //   const connectWalletConnect = () => {
  //   //     activate(WalletConnect);
  //   //   };

  //   const disconnect = () => {
  //     deactivate()
  //   }
  //   // console.log(library)
  //   // useEffect(() => {
  //   //   const provider = window.localStorage.getItem('provider')
  //   //   if (provider) activate(connectors.bscBinanceWallet)
  //   // }, [])

  return (
    <></>
    //     <div>
    //       {/* <button onClick={connectMetaMask}>Connect MetaMask</button> */}
    //       <button onClick={() => { activate(CoinbaseWallet) }}>[....Coinbase Wallet.....]</button>
    // <button onClick={() => { activate(WalletConnect) }}>[.......Wallet Connect......]</button>
    // <button onClick={() => { activate(binance) }}>[.......Binance Connect......]</button>
    // <button onClick={() => { activate(portisConnector) }}>[.......Portis Connect......]</button>
    // <button onClick={() => { activate(Injected) }}>[....Metamask.....]</button>

    // <button onClick={disconnect}>Disconnect</button>
    // <button onClick={  switchNetwork }>[......Metamask......]</button>
    // <button onClick={  switchNetwork1 }>[......call network......]</button>
    //       {/* <Select placeholder="Select network" onChange={handleNetwork(value)}>
    //                   <option value="3">Ropsten</option>
    //                   <option value="4">Rinkeby</option>
    //                   <option value="42">Kovan</option>
    //                   <option value="1666600000">Harmony</option>
    //                   <option value="42220">Celo</option>
    //                 </Select> */}
    //       {active && connector ? (
    //         <div>
    //           <p>Connected with {connector?.constructor.name}</p>
    //           <p>Account: {account}</p>
    //           <p>Chain id: {chainId}</p>
    //         </div>
    //       ) : (
    //         <p>Not connected</p>
    //       )}

    // <div  className="popup-card"  >
    //   <h1>Welcome to our site!</h1>
    //   <p>Thank you for visiting us. Please sign up to get started.</p>
    //   <button className="close-btn"  >Close</button>
    // </div>
    //     </div>
  )
}

;<style></style>

export default Extrapage

// import React, { useState, useEffect } from 'react'
// import { UserContext } from '../../../App'
// import Agreament from '../Agreament'
// import Web3 from 'web3'
// import Button from '../Button'
// // import { WalletLinkConnector } from '@web3-react/walletlink-connector'
// // import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// // import { InjectedConnector } from '@web3-react/injected-connector'
// import { useWeb3React } from '@web3-react/core'
// // import { BscConnector } from '@binance-chain/bsc-connector'
// // import { PortisConnector } from '@web3-react/portis-connector'
// // import Onboard from "@web3-onboard/core"
// // import coinbaseWalletModule from "@web3-onboard/coinbase"
// // import trustModule from "@web3-onboard/trust"
// import { connectorsByName, Metamask } from './connectors'
// import coinbaseWalletModule from '@web3-onboard/coinbase'
// import injectedModule from '@web3-onboard/injected-wallets'
// import Alert from '../Alert'
// import { formatEther } from '@ethersproject/units'
// import { useContext } from 'react'
// import { ProviderContext } from 'ethers-react'
// import { createContext } from 'react'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// // import Portis from '@portis/web3'
// // import { Web3Provider } from '@ethersproject/providers';

// export const Web3ProviderContext = createContext<IWeb3ProviderContext>({
//   connectedAccount: '',
//   balance: '',
// })

// // const trust = trustModule()
// // const onboard = Onboard({
// //   wallets: [
// //     trust
// //   ],
// // })

// declare global {
//   interface Window {
//     ethereum?: any
//     BinanceChain?: any
//     web3?: any
//   }
// }

// // const CoinbaseWallet = new WalletLinkConnector({
// //   url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
// //   appName: 'Web3-react Demo',
// // })

// // const WalletConnect = new WalletConnectConnector({
// //   rpc: { 1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` },
// //   bridge: 'https://bridge.walletconnect.org',
// //   qrcode: true,
// // })

// // const trustWallet = new InjectedConnector({
// //   supportedChainIds: [1, 3, 4, 5, 42],
// // })

// // const Metamask = new InjectedConnector({
// //   supportedChainIds: [1, 3, 4, 5, 42],
// // })

// // const binance = new BscConnector({
// //   supportedChainIds: [56, 97, 1, 137],
// // })

// // const PORTIS_DAPP_ID = '44f6086b-d6b7-4aee-a2ed-e92cfb138631'

// // const portisConnector = new PortisConnector({
// //   dAppId: PORTIS_DAPP_ID,
// //   networks: [1, 100], // mainnet and rinkeby
// // })

// interface NetworkDetails {
//   chainId: string
//   chainName: string
//   nativeCurrency: {
//     name: string
//     symbol: string
//     decimals: number
//   }
//   rpcUrls: string[]
//   blockExplorerUrls: string[]
// }

// interface ConnectWalletProps {
//   onClose?: () => void
// }
// const polygonNetwork = {
//   chainId: '0x89',
//   chainName: 'MATIC',
//   nativeCurrency: {
//     name: 'MATIC',
//     symbol: 'MATIC',
//     decimals: 18,
//   },
//   rpcUrls: ['https://polygon-rpc.com/'],
//   blockExplorerUrls: ['https://polygonscan.com/'],
// }

// const harmony = {
//   chainId: '0x63564c40',
//   rpcUrls: ['https://api.harmony.one'],
//   chainName: 'Harmony Mainnet',
//   nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
//   blockExplorerUrls: ['https://explorer.harmony.one'],
//   iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png'],
// }

// const avaxNetwork = {
//   chainId: '0xa86a',
//   chainName: 'Avalanche Mainnet',
//   nativeCurrency: {
//     name: 'AVAX',
//     symbol: 'AVAX',
//     decimals: 18,
//   },
//   rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
//   blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
// }
// const binanceNetwork = {
//   chainId: '0x38',
//   chainName: 'Binance Smart Chain',
//   nativeCurrency: {
//     name: 'BNB',
//     symbol: 'BNB',
//     decimals: 18,
//   },
//   rpcUrls: ['https://bsc-dataseed.binance.org/'],
//   blockExplorerUrls: ['https://bscscan.com/'],
// }

// const rinkeby = {
//   chainId: '0x4',
//   chainName: 'Rinkeby Test Network',
//   nativeCurrency: {
//     name: 'Ether',
//     symbol: 'ETH',
//     decimals: 18,
//   },
//   rpcUrls: ['https://rpc.ankr.com/eth_rinkeby'],
//   blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
// }

// const ethereumNetwork = {
//   chainId: '0x1',
//   chainName: 'Ethereum Mainnet',
//   nativeCurrency: {
//     name: 'Ether',
//     symbol: 'ETH',
//     decimals: 18,
//   },
//   rpcUrls: [`https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`],
//   blockExplorerUrls: ['https://etherscan.io/'],
// }

// const networks = [
//   {
//     id: 34523,
//     icon: '/images/bsc.svg',
//     text: 'BSC',
//     chainId: '0x38',
//   },
//   {
//     id: 34524,
//     icon: '/images/Group.svg',
//     text: 'AVAX',
//     chainId: '0xa86a',
//   },
//   // {
//   //   id: 34525,
//   //   icon: '/images/Group-29.svg',
//   //   text: 'HAR',
//   //   chainId: '0x63564c40',
//   // },
//   {
//     id: 34526,
//     icon: '/images/Group-29.svg',
//     text: 'ETH',
//     chainId: '0x01',
//   },
//   {
//     id: 34527,
//     icon: '/images/Group (1).svg',
//     text: 'MATIC',
//     chainId: '0x89',
//   },
//   // {
//   //   id: 34528,
//   //   icon: '/images/Group-29.svg',
//   //   text: 'RIN',
//   //   chainId: '0x4',
//   // },
// ]

// const wallet = [
//   {
//     id: 4534,
//     icon: '/images/Group 172.svg',
//     text: 'Meta Mask',
//   },
//   {
//     id: 4535,
//     icon: '/images/Group 175.svg',
//     text: 'Binance Wallet',
//   },
//   {
//     id: 4536,
//     icon: '/images/Group 173.svg',
//     text: 'Wallet Connect',
//   },
//   {
//     id: 4537,
//     icon: '/images/Group 176.svg',
//     text: 'Portis',
//   },
//   {
//     id: 4538,
//     icon: '/images/Group 174.svg',
//     text: 'Trust Wallet',
//   },
//   {
//     id: 4539,
//     icon: '/images/Group 177.svg',
//     text: 'Coinbase',
//   },
// ]

// interface ConnectWalletProps {
//   onClose?: () => void
// }
// interface IWeb3ProviderContext {
//   connectedAccount: string
//   balance: string
// }

// function ConnectWallet({ onClose }: ConnectWalletProps, props: any) {
//   // const [account, setAccount] = useState<string | null>(null)
//   const { activate, deactivate, active, chainId, account, connector } =
//     useWeb3React()
//   const { library } = useWeb3React()
//   const [message, setMessage] = useState('')
//   const [signedMessage, setSignedMessage] = useState('')
//   const [signature, setSignature] = useState('')
//   const [showWalletOptions, setShowWalletOptions] = useState(false)
//   const [showDisconnectWalllet, setShowDisconnectWallet] = useState(false)
//   // const [message, setMessage] = useState('');
//   // const [signature, setSignature] = useState('');
//   // const [connectorCunnected, setCurrentConnector] = useState();
//   const [web3, setWeb3] = useState(null)
//   const [currentAccount, setAccount] = useState(null)

//   const [checkboxValue, setData] = useState('')
//   const [activeButtonId, setActiveButtonId] = useState(null)
//   const [newChainId, setNewChainId] = useState('')
//   const [statusNet, setStatus] = useState(true)
//   const [newNetwork, setNetwork] = useState({})
//   const [title,setTitle]=useState(true)
//   const [errorBox,setErrorBox]=useState(false)
//   const { connectedAccount, balance } =
//     useContext<IWeb3ProviderContext>(Web3ProviderContext)

//   const handleInput = () => {
//     const msg = 'hellow World'
//     setMessage(msg)
//   }
//   console.log(balance)
//   console.log(connectedAccount)

//   console.log(active, account, library)
//   useEffect(() => {
//     setTimeout(() => {
//       setErrorBox(false);
//     }, 5000);

//     console.log('sifntureee runn ')
//     if (active && account && library) {
//       const signMessage = async () => {
//         const messageToSign = 'Hello, World!' // replace with your own message
//         setMessage(messageToSign)
//         const signer = library.getSigner(account)

//         try {

//           const signature = await signer.signMessage(messageToSign)
//            // handle signature...
//            setSignature(signature)

//          } catch (error) {
//            console.log(error);
//            // show error message...
//            setErrorBox(true)
//            deactivate()
//          }
//         const balance = await library.provider.getBalance(account)

//       }

//       signMessage()

//       onClose?.()
//     }
//     console.log(balance)
//         console.log(signature)
//   }, [active])

//   const handleButtonClick = (id: any, chainId: any) => {
//     setActiveButtonId(id)
//     switchToNewNetwork(chainId) // assuming this function is defined elsewhere
//   }

//   // useEffect(() => {
//   //   window.ethereum
//   //     .isAuthorized()
//   //     .then((isAuthorized: any) => {
//   //       console.log(isAuthorized);
//   //       if (isAuthorized) {
//   //         console.log("User is already authorized.");
//   //       } else {
//   //         console.log("User is not authorized.");
//   //       }
//   //     })
//   //     .catch((error: any) => {
//   //       console.log("Error in useEffect: " + error.message);
//   //     });
//   // }, [active]);

//   const handleWalletConnect = async (currentConnector: any) => {
//     // onClose?.()
//     setTitle(false)
//     console.log(currentConnector.name)
//     let provider
//     switch (currentConnector.name) {
//       case 'CoinBase Wallet':
//         provider = window.ethereum.providers.find(
//           ({ isCoinbaseWallet }: any) => isCoinbaseWallet
//         )
//         break
//       case 'Metamask':
//         provider = window.ethereum.providers.find(
//           ({ isMetaMask }: any) => isMetaMask
//         )
//         break
//       case 'Trust Wallet':
//         provider = window.ethereum.providers.find(({ isTrust }: any) => isTrust)
//         break
//       case 'Portis':
//         await activate(currentConnector.connector)
//         // console.log(Portis)
//         // provider = new Web3Provider(currentConnector.connector.provider);
//         break
//       case 'Wallet Connect':
//         activate(currentConnector.connector)

//         break
//       case 'Binance Wallet':
//         activate(currentConnector.connector)
//         break
//     }
//     console.log(provider)
//   //  provider=provider.provider
//     console.log(provider)
//     if (provider) {
//       window.ethereum.setSelectedProvider(provider)
//       // activate(currentConnector.connector)
//     } else {
//       console.log('provider is not there')
//     }
//     console.log(provider)

//     if (provider.chainId !== newChainId && !provider.isTrust) {
//       try {
//         await window.ethereum.request({
//           method: 'wallet_addEthereumChain',
//           params: [newNetwork],
//         })
//       } catch (error: any) {
//         console.error('not connected ' + error.message)
//       }
//       await activate(currentConnector.connector)
//     } else {
//       await activate(currentConnector.connector)
//       try {
//         await window.ethereum.request({
//           method: 'wallet_addEthereumChain',
//           params: [newNetwork],
//         })
//       } catch (error: any) {
//         console.error('not connected ' + error)
//       }
//     }

//     // activate(currentConnector.connector)

//     // if (currentConnector.name === 'Metamask' && window.ethereum.isMetaMask) {
//     //   console.log('metamask')

//     //   let provider
//     //   switch (currentConnector.name) {
//     //     case 'Metamask':
//     //       provider = window.ethereum.providers.find(
//     //         ({ isMetaMask }: any) => isMetaMask
//     //       )
//     //       break
//     //     case 'CoinBase Wallet':
//     //       provider = window.ethereum.providers.find(
//     //         ({ isCoinbaseWallet }: any) => isCoinbaseWallet
//     //       )
//     //       break
//     //   }
//     //   if (provider) {
//     //     console.log(provider)
//     //     window.ethereum.setSelectedProvider(provider)
//     //   } else {
//     //     console.log('provider not found')
//     //   }
//     //   console.log(window.ethereum.chainId)
//     //   if (window.ethereum.chainId !== newChainId) {
//     //     console.log('activate se pehle')

//     //     try {
//     //       let a
//     //       switch (newChainId) {
//     //         case '0x63564c40':
//     //           a = harmony
//     //           break
//     //         case '0x89':
//     //           a = polygonNetwork
//     //           break
//     //         case '0x38':
//     //           a = binanceNetwork
//     //           break
//     //         case '0xa86a':
//     //           a = avaxNetwork
//     //           break
//     //         case '0x01':
//     //           a = ethereumNetwork

//     //           break
//     //         case '0x4':
//     //           a = rinkeby
//     //           break

//     //         default:
//     //           throw new Error(`Unsupported wallet "${wallet}"`)
//     //       }
//     //       const newNetworkDetails = a

//     //       //

//     //       // await library.provider.request({
//     //       await window.ethereum.request({
//     //         method: 'wallet_addEthereumChain',
//     //         params: [newNetworkDetails],
//     //       })
//     //     } catch (error: any) {
//     //       console.error('not connected ' + error.message)
//     //       console.error('not connected  add ko reject kr diya ')
//     //     }
//     //     console.log('second bar activate par chala')

//     //     activate(currentConnector.connector)
//     //     if (active && message !== '' && signature !== '') {
//     //     } else {
//     //       onClose?.()
//     //     }
//     //   } else {
//     //     console.log(
//     //       'add ko jeect kiya to abb wo kisi bhi netowk par add hone aaya '
//     //     )
//     //     activate(currentConnector.connector)
//     //   }
//     // } else {
//     //   console.log('not metamask')
//     //   let provider
//     //   switch (currentConnector.name) {
//     //     case 'Metamask':
//     //       provider = window.ethereum.providers.find(
//     //         ({ isMetaMask }: any) => isMetaMask
//     //       )
//     //       break
//     //     case 'CoinBase Wallet':
//     //       provider = window.ethereum.providers.find(
//     //         ({ isCoinbaseWallet }: any) => isCoinbaseWallet
//     //       )
//     //       break
//     //       case 'Trust Wallet':
//     //       provider = window.ethereum.providers.find(
//     //         ({ isTrust }: any) => isTrust
//     //       )
//     //       break
//     //   }
//     //   console.log(provider)
//     //   if (provider) {
//     //     window.ethereum.setSelectedProvider(provider)
//     //   } else {
//     //     console.log('provider not found')
//     //   }

//     //   if (window.ethereum.chainId !== newChainId) {
//     //     console.log('activate se pehle')

//     //     try {
//     //       let a
//     //       switch (newChainId) {
//     //         case '0x63564c40':
//     //           a = harmony
//     //           break
//     //         case '0x89':
//     //           a = polygonNetwork
//     //           break
//     //         case '0x38':
//     //           a = binanceNetwork
//     //           break
//     //         case '0xa86a':
//     //           a = avaxNetwork
//     //           break
//     //         case '0x01':
//     //           a = ethereumNetwork

//     //           break
//     //         case '0x4':
//     //           a = rinkeby
//     //           break

//     //         default:
//     //           throw new Error(`Unsupported wallet "${wallet}"`)
//     //       }
//     //       const newNetworkDetails = a

//     //       //

//     //       // await library.provider.request({
//     //       await window.ethereum.request({
//     //         method: 'wallet_addEthereumChain',
//     //         params: [newNetworkDetails],
//     //       })
//     //     } catch (error: any) {
//     //       console.error('not connected ' + error.message)
//     //       console.error('not connected  add ko reject kr diya ')
//     //     }
//     //     console.log('second bar activate par chala')
//     //     activate(currentConnector.connector)

//     //     if (active && message !== '' && signature !== '') {
//     //     } else {
//     //       onClose?.()
//     //     }
//     //   } else {
//     //     console.log(
//     //       'add ko jeect kiya to abb wo kisi bhi netowk par add hone aaya '
//     //     )
//     //     activate(currentConnector.connector)
//     //   }

//     //   console.log('after activate')
//     // }

//     // console.log(library)
//     // console.log(currentConnector.name)

//     // console.log(window.ethereum.providers)

//     // if (window.ethereum && window.ethereum.selectedAddress) {
//     //   // The user has already given permission, so you can proceed with interacting with their wallet
//     //   // For example, you can retrieve their account balance or execute a transaction
//     //   activate(currentConnector.connector, (error) => {

//     //     if (error) {
//     //       console.log('error', error)

//     //     }
//     //   })

//     // } else {
//     //   // The user has not yet given permission, so you need to request it
//     //   activate(currentConnector.connector, (error) => {

//     //     if (error) {
//     //       console.log('error', error)

//     //     }
//     //   })
//     //   console.log("alredy there so no need ")
//     // }
//     // if(active){
//     //   console.log("not active")
//     // }
//     // else{
//     //   console.log("activation")

//     // }
//     // activate(currentConnector.connector, (error) => {
//     //   console.log(error+"activate current connector")

//     //   if (error) {
//     //     console.log('error', error)

//     //   }else{
//     //     console.log("inside the sign message ")
//     //     signMessage()
//     //   }
//     // })
//     // setCurrentConnector(currentConnector)

//     //   if (currentConnector.name === 'Metamask')
//     //     localStorage.setItem('walletConnect', 'true')
//     //         setShowWalletOptions(false)
//   }
//   async function switchToNewNetwork(chainId: string) {
//     switch (chainId) {
//       case '0x63564c40':
//         switchNetwork(harmony)
//         setNetwork(harmony)
//         break
//       case '0x89':
//         switchNetwork(polygonNetwork)
//         setNetwork(polygonNetwork)
//         break
//       case '0x38':
//         switchNetwork(binanceNetwork)
//         setNetwork(binanceNetwork)
//         break
//       case '0xa86a':
//         switchNetwork(avaxNetwork)
//         setNetwork(avaxNetwork)
//         break
//       case '0x01':
//         switchNetwork(ethereumNetwork)
//         setNetwork(ethereumNetwork)
//         break
//       case '0x4':
//         switchNetwork(rinkeby)
//         setNetwork(rinkeby)
//         break

//       default:
//         throw new Error(`Unsupported wallet "${wallet}"`)
//     }
//   }

//   const switchNetwork = async (networkDetails: NetworkDetails) => {
//     console.log('started`')
//     try {
//       // await library.provider.request({
//       console.log(window.ethereum.selectedProvider)
//       console.log(window.ethereum.provider)
//       console.log(networkDetails.chainId)
//       window.ethereum.selectedProvider = undefined
//       if (statusNet) {
//         await window.ethereum.request({
//           method: 'wallet_switchEthereumChain',
//           params: [{ chainId: networkDetails.chainId }],
//         })
//       }

//       // .then(() => {
//       //   // Connect to the MetaMask wallet
//       //   window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts:any) => {
//       //     console.log('Connected to MetaMask wallet!'+accounts);
//       //     // Do something on the specified network...
//       //   });
//       // }).catch((error:any) => {
//       //   console.error(`Failed to switch to network: ${error}`);
//       // });
//     } catch (switchError: any) {
//       // 4902 error code indicates the chain is missing on the wallet
//       console.log('switch error' + switchError.message)
//       setStatus(false)

//       // if (switchError.code === 4902 || switchError.code === -32603  && !active) {
//       //   console.log(switchError.code)
//       //   try {
//       //     // console.log(library)

//       //     // await library.provider.request({
//       //     await window.ethereum.request({
//       //       method: 'wallet_addEthereumChain',
//       //       params: [networkDetails],
//       //     })
//       //   } catch (error: any) {
//       //     console.error('not connected ' + error.message)
//       //   }
//       // }
//     }
//     setNewChainId(networkDetails.chainId)
//   }

//   // const callfunc = async () => {
//   //   if (!library) return
//   //   try {
//   //     const haiKuchto = await library.provider
//   //       if(haiKuchto!==""){
//   //         console.log("wallet is conneted")
//   //       }

//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   //   console.log("ek bar chala")
//   // }

//   // useEffect(() => {
//   //   window.ethereum.isAuthorized()
//   //     .then((isAuthorized: any) => {
//   //       console.log(isAuthorized);
//   //       if (isAuthorized) {
//   //         console.log("User is already authorized.");
//   //       } else {
//   //         console.log("User is not authorized.");
//   //       }
//   //     })
//   //     .catch((error: any) => {
//   //       console.log("Error in useEffect: " + error.message);
//   //     });
//   // }, [active]);

//   // useEffect(()=>{
//   //   if(active==true && signature && dataValue){
//   //     onClose

//   //   }
//   // },[active])

//   // const signMessage = async () => {
//   //   if (!library) return
//   //   try {
//   //     const signature = await library.provider.request({
//   //       method: 'personal_sign',
//   //       params: [message, account],
//   //     })
//   //     setSignedMessage(message)
//   //     setSignature(signature)
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }
//   const updateData = (newData: any) => {
//     setData(newData)
//   }

//   const handleWalletDisconnect = () => {
//     console.log(connector)
//     deactivate()
//     setShowDisconnectWallet(false)
//     localStorage.setItem('walletConnect', 'false')

//     // let provider;
//     //   switch (providerName) {
//     //       case ConnectorName.CoinbaseWallet:
//     //           provider = ethereum.providers.find(({ isCoinbaseWallet }: any) => isCoinbaseWallet);
//     //           break;
//     //       case ConnectorName.Injected:
//     //           provider = ethereum.providers.find(({ isMetaMask }: any) => isMetaMask);
//     //           break;
//     //       default:
//     //           break;
//     //   }

//     // const ConnectWallet = (props: any) => {
//     //   const [showWalletOptions, setShowWalletOptions] = useState(false);
//     //   const [showDisconnectWalllet, setShowDisconnectWallet] = useState(false);

//     //   const { active, account, activate, deactivate } = useWeb3React();

//     //   useEffect(() => {
//     //     /*
//     //     Reconnect to metamask wallet after refresh if aready connected
//     //     */
//     //     const walletConnectStatus: string =
//     //       localStorage.getItem("walletConnect") || "";

//     //     try {
//     //       if (walletConnectStatus === "true")
//     //         Metamask.isAuthorized().then((isAuthorized: boolean) => {
//     //           if (isAuthorized) {
//     //             activate(Metamask, undefined, true).catch(() => {});
//     //           } else {
//     //             deactivate();
//     //           }
//     //         });
//     //     } catch (error) {
//     //       console.log(error);
//     //     }
//     //   }, []); //eslint-disable-line

//     //   const handleWalletConnect = (currentConnector: any) => {
//     //     activate(currentConnector.connector, (error) => {
//     //       if (error) {
//     //         console.log("error", error);
//     //       }
//     //     });
//     //     if (currentConnector.name === "Metamask")
//     //       localStorage.setItem("walletConnect", "true");
//     //     setShowWalletOptions(false);
//     //   };

//     //   const handleWalletDisconnect = () => {
//     //     deactivate();
//     //     setShowDisconnectWallet(false);
//     //     localStorage.setItem("walletConnect", "false");
//     //   };
//     // }

//     //   async function connectToWallet(wallet: number) {
//     //     console.log(window.ethereum)
//     //     switch (wallet) {
//     //       case 4534:
//     //         window.ethereum.setItem("isTrust",false)
//     // break
//     //       case 4535:
//     //         activate(binance)
//     //         console.log(account)
//     //         break
//     //       case 4536:
//     //         activate(WalletConnect)
//     //         console.log(account)
//     //         break
//     //       case 4537:
//     //         activate(portisConnector)
//     //         console.log(account)
//     //         break
//     //       case 4539:
//     //         activate(CoinbaseWallet)
//     //         console.log(account)
//     //         console.log(window.ethereum)
//     //         break
//     //         case 4538:
//     //             activate(trustWallet)
//     //             console.log(window.ethereum)
//     //             console.log(account)
//     //           break

//     //       default:
//     //         throw new Error(`Unsupported wallet "${wallet}"`)
//     //     }
//     //     await window.ethereum.request({
//     //       method:"eth_requestAccounts",
//     //       params:[],
//     //     })

//     // if(wallet==4534 && window.ethereum.Provider.isMetaMask){
//     //   const provider = window.ethereum.providers.find((provider:any) => provider.isMetaMask);
//     //   window.ethereum=provider
//     //   console.log("trust wallet coonetd"+window.ethereum)
//     // }else{
//     //   console.log("not Changed"+window.ethereum)
//     // }
//     // console.log(window.ethereum)

//   }

//   const { theme } = React.useContext(UserContext)
//   const { connectwallet, connectWalletHandle } = React.useContext(UserContext)
//   return (
//     <div className="dark:text-dark-800 dark:text-primary-100 dark:bg-white wallet-popup">
//       <div className="flex justify-end mb-2.5">
//         <button type="button" onClick={onClose}>
//           <img className="w-2.5 h-2.5" src="/images/Group 144.svg" alt="" />
//         </button>
//       </div>
//       <div className="flex items-center text-center flex-col">
//         <img
//           src={
//             theme === 'dark'
//               ? '/images/blackLogo1.svg'
//               : '/images/blackLogo1.svg'
//           }
//           alt=""
//         />
//         <b className="wallet-title dark:wallet-title-dark mt-[17px]">
//           Connect Wallet
//         </b>
//         {title?<p className="wallet-sub-title mt-[2px]">To start using Kover App</p>:
//         <p className="wallet-sub-title mt-[2px]">change to Connecting.... Please Approve
//         </p>}

//       </div>
//       <div className="mt-[24px]">
//         <p className="popup-title mb-[2px]">1. Choose Network</p>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] items-center">
//           {networks.map(({ id, chainId, ...rest }) => (
//             <Button
//               onClick={() => handleButtonClick(id, chainId)}
//               key={id}
//               className={`  ${
//                 theme === 'dark'
//                   ? `${
//                       activeButtonId === id
//                         ? 'active-btn-b'
//                         : 'dark:light-btn dark:hover:light-btn-hover'
//                     }   wallet-btn-text-dark `
//                   : `${
//                       activeButtonId === id
//                         ? 'active-btn-g '
//                         : 'pop-btn-border-dark dark-btn'
//                     } wallet-btn-text  hover:dark-btn-hover `
//               }  `}
//               {...rest}
//               btnText={'wallet-btn-text dark:wallet-btn-text-dark'}
//             />
//           ))}
//         </div>
//         <p className="popup-title mt-[19px]">2. Choose WALLET</p>

//         <div className="grid grid-cols-2 max-[320px]:grid-cols-1 max-[375px]:grid-cols-1 md:grid-cols-2 gap-4 mt-[2px]">
//           {connectorsByName.map((connector: any, key: number) => {
//             const clickCallback = () => {
//               handleWalletConnect(connector)
//             }

//             // const clickDisconnet=()=> handleWalletDisconnect()

//             return checkboxValue ? (
//               <button
//                 key={key}
//                 onClick={() => clickCallback()}
//                 type="button"
//                 className="h-[50px] min-w-[100px]  break-normal general-text-12 flex justify-between gap-[10px] items-center bg-dark-800 hover:bg-dark-100  duration-100 dark:light-btn-border dark:bg-white dark:hover:bg-light-1100 border-radius-2x choose-waller-btn"
//               >
//                 <img
//                   className="w-6 md:w-auto wallet-sub-button-icon"
//                   src={connector.icon}
//                   alt={connector.name}
//                 />
//                 <span className="flex-grow wallet-sub-btn-text dark:wallet-sub-btn-text-dark text-left">
//                   {connector.name}
//                 </span>
//                 <img
//                   className="popup-icon"
//                   src={
//                     theme === 'dark'
//                       ? '/images/013.svg'
//                       : '/images/Mask (13).svg'
//                   }
//                   alt=""
//                 />
//               </button>
//             ) : (
//               <button
//                 key={key}
//                 onClick={() => clickCallback()}
//                 type="button"
//                 className="h-[50px] min-w-[100px]  break-normal general-text-12 flex justify-between gap-[10px] items-center bg-dark-800 hover:bg-dark-100  duration-100 dark:light-btn-border dark:bg-white dark:hover:bg-light-1100 border-radius-2x choose-waller-btn"
//               >
//                 <img
//                   className="w-6 md:w-auto wallet-sub-button-icon"
//                   src={connector.icon}
//                   alt={connector.name}
//                 />
//                 <span className="flex-grow wallet-sub-btn-text dark:wallet-sub-btn-text-dark text-left">
//                   {connector.name}
//                 </span>
//                 <img
//                   className="popup-icon"
//                   src={
//                     theme === 'dark'
//                       ? '/images/013.svg'
//                       : '/images/Mask (13).svg'
//                   }
//                   alt=""
//                 />
//               </button>
//             )
//           })}
//         </div>
//         <div className=" mt-[20px] term-text dark:term-text-dark text-center ">
//           {/* <Agreament
//             variety="checkbox"
//             agree="Terms of Use"
//             agreeURL="/"
//             text=" By connecting, I accept Kover's"
//             classname="term-text dark:term-text-dark"
//             updateData={updateData}
//           /> */}
//           <h3 className='text-brand-400' >Need help connecting a <a href='/app' >wallet?</a></h3>

//           <p className='fs-12'>
//             Wallets are provided by External Providers and by selecting you
//             agree to Terms of those Providers. Your access to the wallet might
//             be reliant on the External Provider being operational
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ConnectWallet
