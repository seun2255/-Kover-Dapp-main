import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 8000 // frequency provider is polling
  return library
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <SkeletonTheme baseColor="#1e2024" highlightColor="#2a2b30">
        <App />
      </SkeletonTheme>
    </Web3ReactProvider>
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
