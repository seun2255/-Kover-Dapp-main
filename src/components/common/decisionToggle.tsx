import React, { useState } from 'react'
import Switch from '@mui/material/Switch'
import { Box } from '@mui/material'

interface DecisionToggleProps {
  acceptFunction: (address: string) => void
  rejectFunction: (address: string) => void
  makeDecision: (decison: any) => void
}
function DecisionToggle({
  acceptFunction,
  rejectFunction,
  makeDecision,
}: DecisionToggleProps) {
  const [accepted, setAccepted] = useState(true)
  const [active, setActive] = useState(false)

  const handleClick = () => {
    !accepted ? makeDecision(rejectFunction) : makeDecision(acceptFunction)
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
        onClick={handleClick}
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
        onClick={() => setActive(true)}
        className="convert-switch"
        id="1"
      />
    </Box>
  )
}
export default DecisionToggle
