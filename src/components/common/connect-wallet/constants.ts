export enum ConnectorNames {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect',
  WalletLink = 'CoinBase',
  BinanceWallet = 'Binance Wallet',
  Portis = 'Portis',
  TrustWallet = 'Trust Wallet',
}
export const mainNetworkChainId = {
  ethereum: 1,
  binance: 56,
  polygon: 137,
  avax: 43114,
}
export const testNetworkChainId = {
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  binance: 97,
  polygon: 80001,
  avax: 43114,
  localhost: 31337,
  sepolia: 421614,
}

export const mainNetworkRPC = {
  ethereum: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  binance: 'https://bsc-dataseed.binance.org',
  polygon: 'https://polygon-rpc.com',
  avax: 'https://api.avax.network/ext/bc/C/rpc',
}
export const testNetworkRPC = {
  binance: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  ropsten: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  rinkeby: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  georli: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  kovan: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  polygon: 'https://rpc-mumbai.matic.today',
  avax: 'https://api.avax.network/ext/bc/C/rpc',
  localhost: 'http://localhost:8545',
  goerli: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  sepolia: 'https://sepolia-rollup.arbitrum.io/rpc',
}
