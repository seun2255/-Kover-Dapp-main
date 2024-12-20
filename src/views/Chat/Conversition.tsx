import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import MessageThere from '../../components/common/Message/MessageThere'
import MyMessage from '../../components/common/Message/MyMessage'
import TextDirection from './TextDirection'
import { useWeb3React } from '@web3-react/core'

const scrollBarStyle = {
  backgroundColor: '#3F3F47 !important',
}

export interface ConversationProps {
  messages: any[]
}

const renderThumb = () => {
  const thumbStyle = {
    backgroundColor: `white`,
    opacity: 0.2,
  }

  return <div style={{ ...thumbStyle }} />
}

function Conversition(props: ConversationProps) {
  const { messages } = props
  const { account } = useWeb3React()

  return (
    <div>
      <Scrollbars
        autoHeight
        autoHeightMin={470}
        autoHeightMax={470}
        renderThumbVertical={renderThumb}
      >
        <div
          aria-label="chat body"
          className="px-[15px] md:px-16 py-1 dark:bg-white"
        >
          <div className="flex flex-col gap-5 dark:bg-white">
            {messages.map((message, index) => {
              return (
                <TextDirection
                  right={message.sender.address === account ? true : false}
                >
                  {message.sender.address === account ? (
                    <MyMessage message={message.message} />
                  ) : (
                    <MessageThere
                      message={message.message}
                      sender={message.sender}
                    />
                  )}
                </TextDirection>
              )
            })}
          </div>
        </div>
      </Scrollbars>
    </div>
  )
}

export default Conversition
