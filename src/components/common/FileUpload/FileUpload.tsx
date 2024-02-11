import React from 'react'
import Rules from './Rules'
import UploadButton from './UploadButton'
import UploadingFile from './UploadingFile'

interface FileUpload {
  classname?: string
  btnhight?: string
  titleShow?: boolean
  uploadMargin?: string
  ruleMargin?: string
}

function FileUpload({
  classname,
  btnhight,
  titleShow,
  uploadMargin,
  ruleMargin,
}: FileUpload) {
  return (
    <div className={`${classname || ''}`}>
      <UploadButton className={`${btnhight}`} titleShow={titleShow} />
      <div className={`flex flex-col gap-2.5 mb-5 ${uploadMargin}`}>
        <UploadingFile progress={100} />
        <UploadingFile progress={45} />
      </div>
      <Rules className={`${ruleMargin || 'mx-[10px] my-[20px]'} `} />
    </div>
  )
}

export default FileUpload
