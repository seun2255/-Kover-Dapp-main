import React, { useState } from 'react'
import Agreament from '../common/Agreament'
import Button from '../common/Button'
import Dialogbox from '../common/Dialogbox'
import SelectionField from '../common/SelectionField'
import FormAgreament from '../common/FormAgreament'
import { UserContext } from '../../App'
interface CastYourVoteProps {
  setIsYes: any
  handleSubmit: any
  headline?: boolean
  class?: String
  view?: string
  firsttext?: string
}

function CastYourVote({
  headline,
  view,
  firsttext,
  setIsYes,
  handleSubmit,
}: CastYourVoteProps) {
  const [confirm, setConfirm] = useState(false)
  const [agreamentChecked, setAgreamentChecked] = useState(false)

  const toggleConfirm = () => setConfirm((v) => !v)
  const { theme } = React.useContext(UserContext)
  return (
    <div>
      <div className="voteMainWrap rounded box-border-2x-light dark:box-border-2x-dark bg-dark-600 dark:bg-light-800 dark:text-dark-800 dark:box-border">
        <div
          className={`grid sm:grid-cols-2 grid-cols-1 sm:py-0 rounded bg-dark-800 dark:bg-light-800 dark:text-dark-800 ${
            view === 'mobile' ? 'dark:border-b-2 dark:border-white' : ''
          }`}
        >
          <div
            className={`px-7 gap-5 items-center flex py-4  dark:bg-white dark:bg-light-800 ${
              theme === 'dark' ? 'dark-field-border' : 'field-border'
            }`}
          >
            <SelectionField
              name="cast-vote"
              setIsYes={setIsYes}
              action={true}
            />
            <span className="text-light-800 dark:text-dark-600 fw-500 fs-14 lh-16 ls-35">
              Yes, I accept
            </span>
          </div>
          <div className="flex items-center gap-5 py-4 px-7 dark:bg-white dark:bg-light-800">
            <SelectionField
              name="cast-vote"
              setIsYes={setIsYes}
              action={false}
            />
            <span className="text-light-800 dark:text-dark-600 fw-500 fs-14 lh-16 ls-35">
              No, I don't
            </span>
          </div>
        </div>

        <div
          className={`castvoteAgrement pt-[25px] pr-[30px] pb-[30px] pl-[30px] dark:bg-white`}
        >
          <FormAgreament
            agreeURL="/"
            variety="checkbox"
            agree="Terms of Use"
            bntText="Submit Vote"
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      {confirm && <Dialogbox confirm={confirm} toggleConfirm={toggleConfirm} />}
    </div>
  )
}
export default CastYourVote
