import React, { useState } from 'react'
import Switch from '@mui/material/Switch'
import { Box } from '@mui/material'

interface DecisionToggleProps {
  makeDecision: (decison: any) => void
  completed?: boolean
  decision?: boolean
}
function DecisionToggle({
  makeDecision,
  completed,
  decision,
}: DecisionToggleProps) {
  const [accepted, setAccepted] = useState(!decision ? decision : true)
  const [active, setActive] = useState(completed)

  const handleClick = () => {
    makeDecision(!accepted)
    setAccepted(!accepted)
  }

  return active ? (
    <Box
      sx={{
        '.Mui-checked': {
          color: `${'#50ff7f'} !important;`,
        },
        '.MuiSwitch-track': {
          background: accepted
            ? `${'#50ff7f'} !important;`
            : `${'#BB0000'} !important;`,
        },
        '.MuiSwitch-root:not(.Mui-checked) .MuiSwitch-thumb': {
          color: accepted
            ? `${'#50ff7f'} !important;`
            : `${'#BB0000'} !important;`, // Style for not checked thumb
        },
      }}
    >
      <Switch
        checked={accepted}
        className="convert-switch"
        id="1"
        onClick={!completed ? handleClick : () => null}
      />
    </Box>
  ) : (
    <Box
      sx={{
        '.Mui-checked': {
          color: `${'#606166'} !important;`,
        },
        '.MuiSwitch-track': {
          background: `${'#606166'} !important;`,
        },
      }}
    >
      <Switch
        onClick={() => {
          setActive(true)
          setAccepted(true)
          makeDecision(true)
        }}
        className="convert-switch"
        id="1"
      />
    </Box>
  )
}
export default DecisionToggle
