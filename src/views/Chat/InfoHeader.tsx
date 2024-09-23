import React from 'react'
import HeadOptions from './HeadOptions'
import { convertLinkToText } from '../../utils/helpers'
import { useEffect, useState } from 'react'
import { getUserDetails } from '../../database'
import Blockies from 'react-blockies'

interface HeaderProps {
  roomId: any
  users: any
}

function InfoHeader({ roomId, users }: HeaderProps) {
  const header = convertLinkToText(`/chat/${roomId}`)
  const [addresses, setAddresses] = useState(['', ''])
  const [pics, setPics] = useState(['default', 'default'])
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    const keys = Object.keys(users)
    var pics: string[] = []
    var userAddresses: string[] = []
    keys.map((address) => {
      userAddresses.push(address)
    })
    setAddresses(userAddresses)
    console.log(userAddresses)

    keys.map(async (address) => {
      const details = await getUserDetails(address)
      pics.push(details.dp)
      setPics(pics)
    })
    if (userAddresses.length !== 0) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [users])

  return (
    <div
      aria-label="chat header"
      className="rounded bg-dark-800 rounded-t flex items-center justify-between px-[20px] md:px-16 py-[16px] dark:bg-light-1100"
    >
      <div>
        {!loading && (
          <div className="flex">
            {pics.map((pic, i) =>
              pic === 'default' ? (
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ transform: `translateX(-${i * 6}px)` }}
                >
                  <Blockies
                    seed={addresses[i].toLowerCase()}
                    size={25}
                    scale={1}
                    className="identicon wallet-icon"
                  />
                </div>
              ) : (
                <img
                  width={6}
                  height={6}
                  src={pic}
                  alt=""
                  className="rounded-full w-[27px] h-[27px]"
                  object-fit="cover"
                  style={{ transform: `translateX(-${i * 6}px)` }}
                />
              )
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-1 text-center ">
        <span className="font-medium">🦄 {header}</span>
        <span className="text-lg"></span>
      </div>
      <div className="flex justify-end">
        <HeadOptions roomID={roomId} />
      </div>
    </div>
  )
}

export default InfoHeader
