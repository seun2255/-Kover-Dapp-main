import React, { useState } from 'react'
import { UserContext } from '../../App'
import EmojiButton from '../../components/common/EmojiButton/EmojiButton'
import IconButton from '../../components/common/IconButton'

function MessageType(props: any) {
  const { handleSend } = props
  const { theme } = React.useContext(UserContext)
  const [text, setText] = useState('')

  const addEmoji = (emojiCharacter: string) => {
    var temp = text
    temp = temp + emojiCharacter
    setText(temp)
  }

  return (
    <div
      aria-label="chat footer"
      className="bg-dark-800 rounded-b px-[20px] md:px-16 py-2 dark:bg-light-1100"
    >
      <div className="px-1 flex justify-between items-center gap-8">
        <div className="flex flex-grow items-center gap-2">
          <EmojiButton addEmoji={addEmoji} />
          <input
            type="text"
            className="placeholder:text-dark-200 flex-grow"
            placeholder="Start typing..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="flex items-center">
          <IconButton
            icon={
              theme === 'dark'
                ? '/images/dark-send.svg'
                : '/images/paper-airplane.svg'
            }
            onClick={() => {
              handleSend(text)
              setText('')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default MessageType
