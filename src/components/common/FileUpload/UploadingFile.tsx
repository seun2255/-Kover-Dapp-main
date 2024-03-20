import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App'
interface UploadingFileProps {
  progress: number
  file?: File
}

function UploadingFile({ progress, file }: UploadingFileProps) {
  const { theme } = React.useContext(UserContext)
  return (
    <>
      <div className="flex items-center gap-5 m-0 p-0">
        {progress === 100 ? (
          <>
            <img
              className=""
              src={
                theme === 'dark'
                  ? '/images/file-black-icon.svg'
                  : '/images/Group 216.svg'
              }
              alt=""
            />
          </>
        ) : (
          <>
            <img
              className=""
              src={theme === 'dark' ? '/images/file.svg' : '/images/file.svg'}
              alt=""
            />
          </>
        )}

        {/* <Link to="/"> */}
        <span
          className={`font-medium text-lg ${
            progress < 100 ? 'text-dark-650' : ''
          }`}
        >
          {file?.name}
        </span>
        {/* </Link>  */}

        <div className="flex">
          <div>
            {' '}
            {progress < 100 ? (
              <>
                <div className="flex items-center justify-between gap-5">
                  <div
                    className={`${
                      theme === 'dark' ? 'bg-[#EAE8EB] ' : 'bg-dark-350 '
                    }basis-1/2 rounded-full w-[100px] h-1`}
                  >
                    <span
                      style={{ width: `${progress}%` }}
                      className={`h-full block w-full rounded-full ${
                        theme === 'dark' ? 'bg-dark-700' : 'bg-primary-700'
                      }`}
                    />
                  </div>
                  <button
                    title="upload"
                    type="button"
                    className="basis-1/2 ml-1"
                  >
                    <img src="/images/Remove (2).svg" alt="" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-5">
                  <div className="w-[60px]">
                    <span className="dark:text-dark-600 text-primary-700 font-medium text-lg">
                      Uploaded
                    </span>
                  </div>
                  <button
                    title="upload   "
                    type="button"
                    className="w-[100px] ml-1"
                  > 
                    <img
                      src={
                        theme === 'dark'
                          ? '/images/grey-ok-icon.svg'
                          : '/images/Remove (3).svg'
                      }
                      alt=""
                    />
                  </button>
                </div>
              </>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default UploadingFile
