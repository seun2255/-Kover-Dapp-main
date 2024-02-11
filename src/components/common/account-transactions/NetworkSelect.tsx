import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../../App'
import Button from '../Button'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

const networks = [
  {
    id: 34523,
    icon: '/images/bsc.svg',
    text: 'BSC',
    chainId: '0x38',
    blockExplorerUrls: 'https://bscscan.com/',

  
  },
  {
    id: 34524,
    icon: '/images/Group.svg',
    text: 'AVAX',
    chainId: '0xa86a',
    blockExplorerUrls: 'https://cchain.explorer.avax.network/',

  },
  // {
  //   id: 34525,
  //   icon: '/images/Group-29.svg',
  //   text: 'HAR',
  //   chainId: '0x63564c40',
  // },
  {
    id: 34526,
    icon: '/images/Group-29.svg',
    text: 'ETH',
    chainId: '0x1',
    blockExplorerUrls: 'https://etherscan.io/',

  },
  {
    id: 34527,
    icon: '/images/Group (1).svg',
    text: 'MATIC',
    chainId: '0x89',
    blockExplorerUrls: 'https://polygonscan.com/',
  },
  // {
  //   id: 34528,
  //   icon: '/images/Group-29.svg',
  //   text: 'RIN',
  //   chainId: '0x4',
  // },
]

const options = ['Ethereum', 'Avalanche', 'BSC', 'Polygon']

export interface NetworkSelect {
  networkUpdate: any
}

function NetworkSelect({ networkUpdate }: NetworkSelect) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((v) => !v)
  const { theme } = React.useContext(UserContext)
  const pushValue = (value: string,text:string,blockExplorerUrls:string) => {
    toggle()
    console.log(text)
    setSelectedNetwork(text)
    networkUpdate(value,blockExplorerUrls)
  }
  const { activate, deactivate, active, chainId, account, connector, library } =
    useWeb3React()

  const [hexChainId, setHexChainId] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("Select Network");

  const filteredNetworks = networks.filter((network) => network.chainId !== hexChainId);
   
  useEffect(() => {
    
      const web3 = new Web3(library.provider);
      web3.eth.getChainId().then((id:any) => {
        console.log(id)
        setHexChainId(`0x${id.toString(16)}`);
      });
  }, []);
  
  return (
    <div className="flex-grow flex justify-start ml-8 mr-4">
      <div className="relative z-10">
        <div
          className="items-center flex gap-1.5 cursor-pointer"
          onClick={toggle}
        >
          {/* <img src="/images/Ellipse 20.svg" alt="" /> */}
          <span className="network-ethereum">{selectedNetwork}</span>
          {open ? (
            <>
              <img src="/images/Mask (14).svg" alt="" />
            </>
          ) : (
            <>
              <img src="/images/Mask (14).svg" className="down-aero" alt="" />
            </>
          )}
        </div>
        {open && (
          <div className="absolute top-7 right-0">
            <div
              className="fixed top-0 right-0 bottom-0 left-0 -z-10 bg-transparent"
              onClick={toggle}
            />
            <div className="flex flex-col">
              {/* {options.map((value, index) => (
                <Button
                  onClick={() => pushValue(value)}
                  className="justify-start"
                  color={ theme === 'dark' ? "bg-light-1100" : "dark"}
                  text={value}
                />
              ))} */}
              {filteredNetworks.map(({ id, chainId, text,blockExplorerUrls, ...rest }) => (  
                <Button
                  onClick={() => pushValue(chainId,text,blockExplorerUrls)}
                  key={id}
                  className="justify-start"
                  color={theme === 'dark' ? 'bg-light-1100' : 'dark'}
                  text={text}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NetworkSelect
