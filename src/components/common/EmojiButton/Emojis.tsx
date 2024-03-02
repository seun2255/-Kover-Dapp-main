import React, { useState } from 'react'
import emojis from './emojis.json'

interface EmojisProps {
  close?: () => void
  onSelect?: (id: number) => void
  addEmoji?: any
}

function Emojis({ close, onSelect, addEmoji }: EmojisProps) {
  const handleSelect = (id: number, character: string) => {
    addEmoji(character)
    close?.()
    onSelect?.(id)
  }

  return (
    <div className="z-0 relative">
      <div
        onClick={close}
        className="fixed top-0 right-0 bottom-0 left-0 bg-transparen -z-10"
      />
      <div className="absolute w-max bottom-20">
        <div className="bg-dark-800 rounded p-2.5 dark:bg-light-1100">
          <b className="font-medium mb-2.5">Emoji</b>
          <div className="grid grid-cols-6 p-1">
            {emojis.map(({ path, character }, index) => (
              <button
                key={index}
                type="button"
                className="w-[30px] h-[30px] flex items-center justify-center hover:bg-dark-100  rounded"
                onClick={() => handleSelect(index, character)}
              >
                <img className="" src={`/images/Emoji/${path}`} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Emojis
