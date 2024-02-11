import React, { useState, useEffect } from 'react'
import { UserContext } from '../../../App'
import Button from '../Button'
import { useWeb3React } from '@web3-react/core'
import { useContext } from 'react'


interface AttachmentPreviewProps {
    attachmentName: any
    onClose?: () => void
}

function AttachmentPreview(
  {
    attachmentName,
    onClose,
  }: AttachmentPreviewProps,
  props: any
) {
 
  const { theme } = React.useContext(UserContext)
  return (
    <div className="attachments-prev-popup">
        <div className="bg-dark-800 py-[20px] px-[30px] sm:px-[20px] h-[74px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark">
          <div className="flex justify-between">
              <div className="flex gap-[10px] items-center">
                  <span className="attachment-name">{attachmentName}</span>
                  
              </div>
              <div className="flex items-center">
                  <div className="flex justify-end"><button type="button" onClick={onClose} ><img className="w-2.5 h-2.5" src="/images/Group 144.svg" alt="" /></button></div>
              </div>
          </div>
        </div>
      
        <div  id="style-1" className="preview-section scrollbar-customise bg-opacity-20 bg-dark dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 box-border-2x-light dark:box-border-2x-dark">
            <div className="force-overflow">
              <div className="flex justify-between">
                <div className="flex gap-[10px] items-center">
                    <img src="/images/id_front.png" />
                </div>
              </div>
            </div>
        </div>
    </div> 
  )
}

export default AttachmentPreview
