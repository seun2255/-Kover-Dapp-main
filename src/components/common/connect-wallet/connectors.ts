import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { EthereumProvider } from '@walletconnect/ethereum-provider'
// import Portis from '@portis/web3'

import {
  ConnectorNames,
  testNetworkChainId,
  testNetworkRPC,
  mainNetworkChainId,
  mainNetworkRPC,
} from './constants'

const POLLING_INTERVAL = 12000

const RPC_URLS: { [chainId: number]: string } = {
  [testNetworkChainId.binance]: testNetworkRPC.binance,
  [testNetworkChainId.polygon]: testNetworkRPC.polygon,
  [mainNetworkChainId.ethereum]: mainNetworkRPC.ethereum,
  [mainNetworkChainId.binance]: mainNetworkRPC.binance,
  [mainNetworkChainId.polygon]: mainNetworkRPC.polygon,
  [mainNetworkChainId.avax]: mainNetworkRPC.avax,
  [testNetworkChainId.avax]: testNetworkRPC.avax,
  [testNetworkChainId.localhost]: testNetworkRPC.localhost,
  [testNetworkChainId.goerli]: testNetworkRPC.georli,
  [testNetworkChainId.sepolia]: testNetworkRPC.sepolia,
}

export const Metamask = new InjectedConnector({
  supportedChainIds: [
    testNetworkChainId.binance,
    testNetworkChainId.polygon,
    testNetworkChainId.localhost,
    testNetworkChainId.goerli,
    testNetworkChainId.sepolia,
    mainNetworkChainId.ethereum,
    mainNetworkChainId.polygon,
    mainNetworkChainId.binance,
    mainNetworkChainId.avax,
  ],
})

const WalletConnect = EthereumProvider.init({
  projectId: 'dc64a653798030a6d51fed8c2acfc6f2', // Replace with your WalletConnect project ID
  chains: [
    testNetworkChainId.binance,
    testNetworkChainId.polygon,
    testNetworkChainId.rinkeby,
    mainNetworkChainId.ethereum,
    mainNetworkChainId.polygon,
    mainNetworkChainId.binance,
    testNetworkChainId.avax,
    mainNetworkChainId.avax,
  ], // Replace with the desired chain IDs
  showQrModal: true,
})

const walletLink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: 'web3-react example',
  supportedChainIds: [
    mainNetworkChainId.ethereum,
    testNetworkChainId.binance,
    testNetworkChainId.polygon,
    testNetworkChainId.rinkeby,
    mainNetworkChainId.binance,
    testNetworkChainId.avax,
    mainNetworkChainId.polygon,
    mainNetworkChainId.avax,
  ],
})

const BinanceWallet = new BscConnector({
  supportedChainIds: [
    mainNetworkChainId.ethereum,
    testNetworkChainId.binance,
    testNetworkChainId.polygon,
    mainNetworkChainId.binance,
    testNetworkChainId.avax,
  ],
})

// const portis = new Portis('98de59ed-403f-4126-b782-6861f33b17e0', 'mainnet');

const Portis = new PortisConnector({
  dAppId: '98de59ed-403f-4126-b782-6861f33b17e0',
  networks: [mainNetworkChainId.ethereum], // mainnet and rinkeby
})

export const TrustWallet = new InjectedConnector({
  supportedChainIds: [
    testNetworkChainId.binance,
    testNetworkChainId.polygon,
    mainNetworkChainId.ethereum,
    mainNetworkChainId.polygon,
    mainNetworkChainId.binance,
    mainNetworkChainId.avax,
  ],
})

export const connectorsByName: Array<Object> = [
  {
    name: ConnectorNames.Metamask,
    connector: Metamask,
    icon: '/images/Group 172.svg',
  },
  {
    name: ConnectorNames.WalletConnect,
    connector: WalletConnect,
    icon: '/images/Group 173.svg',
  },
  {
    name: ConnectorNames.WalletLink,
    connector: walletLink,
    icon: '/images/Group 177.svg',
  },
  {
    name: ConnectorNames.BinanceWallet,
    connector: BinanceWallet,
    icon: '/images/Group 175.svg',
  },
  {
    name: ConnectorNames.Portis,
    connector: Portis,
    icon: '/images/Group 176.svg',
  },
  {
    name: ConnectorNames.TrustWallet,
    connector: TrustWallet,
    icon: '/images/Group 174.svg',
  },
]
