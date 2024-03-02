import React, { useState } from 'react'
import { UserContext } from '../../../App'
import Emojis from './Emojis'

interface EmojiButtonProps {
  addEmoji?: any
}

function EmojiButton({ addEmoji }: EmojiButtonProps) {
  const [select, setSelect] = useState<number>(-1)
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((v) => !v)
  const { theme } = React.useContext(UserContext)
  return (
    <div aria-label="Emoji popup opener button" className="relative">
      <button
        type="button"
        onClick={toggle}
        className={`flex justify-center items-center w-[30px] h-[30px] ${
          open ? `${theme === 'dark' ? 'bg-[#FFFFFF]' : 'bg-[#3F4048]'}` : ''
        }`}
      >
        <img
          src={
            theme === 'dark'
              ? '/images/emoji-dark.svg'
              : '/images/emoji-icon.svg'
          }
          alt=""
        />
      </button>
      {open && (
        <Emojis
          close={toggle}
          onSelect={(id) => setSelect(id)}
          addEmoji={addEmoji}
        />
      )}
    </div>
  )
}
export default EmojiButton
