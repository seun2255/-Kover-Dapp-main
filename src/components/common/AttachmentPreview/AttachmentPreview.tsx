import React, { useState, useEffect } from 'react'
import { UserContext } from '../../../App'
import Button from '../Button'
import { useWeb3React } from '@web3-react/core'
import { useContext } from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

interface AttachmentPreviewProps {
  attachmentName: any
  attachmentLink: string
  onClose?: () => void
}

function AttachmentPreview(
  { attachmentName, attachmentLink, onClose }: AttachmentPreviewProps,
  props: any
) {
  const docs = [
    {
      uri: attachmentLink,
    },
  ]
  const { theme } = React.useContext(UserContext)
  return (
    <div className="attachments-prev-popup">
      <div className="bg-dark-800 py-[20px] px-[30px] sm:px-[20px] h-[74px] dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 bg-dark-800 box-border-2x-light dark:box-border-2x-dark">
        <div className="flex justify-between">
          <div className="flex gap-[10px] items-center">
            <span className="attachment-name">{attachmentName}</span>
          </div>
          <div className="flex items-center">
            <div className="flex justify-end">
              <button type="button" onClick={onClose}>
                <img
                  className="w-2.5 h-2.5"
                  src="/images/Group 144.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="style-1"
        className="scrollbar-customise bg-opacity-20 bg-dark dark:box-border dark:borderLight-border dark:borderLightColor-color dark:text-dark-800 dark:text-primary-100 dark:bg-light-1100 box-border-2x-light dark:box-border-2x-dark p-0"
      >
        <div className="force-overflow">
          <div
            className="flex justify-between"
            style={{
              width: '824px',
              height: '787px',
              padding: '20px 50px',
              boxSizing: 'border-box',
            }}
          >
            <DocViewer
              documents={docs}
              config={{
                header: {
                  disableHeader: true,
                  disableFileName: true,
                  retainURLParams: true,
                },
              }}
              pluginRenderers={DocViewerRenderers}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttachmentPreview
