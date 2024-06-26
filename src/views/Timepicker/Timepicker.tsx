import React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers'
import Header from '../../components/common/header/Header'
import { UserContext } from '../../App'
import { Box } from '@mui/material'
import { createTimeString } from '../../utils/dateTime'

interface timePickerProps {
  onClose: () => void
  setTime: any
}

function Timepicker({ onClose, setTime }: timePickerProps) {
  const [value, setValue] = React.useState(new Date())
  const { theme } = React.useContext(UserContext)
  function setPopup(arg0: boolean) {
    alert('Function not implemented.')
  }

  return (
    <>
      <div className="custom-time-picker">
        <div className="select-time-body px-[24px] pt-[24px] pb-[24px] dark:bg-white dark:bg-white">
          <h1 className="select-time dark:text-[#1D2024]  dark:bg-white">
            SELECT TIME
          </h1>
        </div>
        <Box
          sx={{
            '.MuiCalendarOrClockPicker-root, .MuiDialogActions-root': {
              background: `${
                theme === 'dark' ? '#FFF' : '#1D2024'
              } !important;`,
            },
            '.MuiTypography-root, .MuiInputBase-root': {
              color: `${theme === 'dark' ? '#000' : '#FFF'} !important;`,
            },
            '.MuiButtonBase-root': {
              color: `${theme === 'dark' ? '#000' : '#FFF'} !important;`,
            },
            '.MuiClock-clock': {
              background: `${theme === 'dark' ? '#F1F1F1' : '#2A2B31'}`,
            },
            '.MuiClock-pin': {
              background: `${theme === 'dark' ? '#d3d3d3' : '#42434B'}`,
            },
            '.MuiClockPointer-root': {
              background: `${theme === 'dark' ? '#d3d3d3' : '#42434B'}`,
            },
            '.MuiClockPointer-thumb': {
              background: `${
                theme === 'dark' ? '#d3d3d3' : '#42434B'
              } !important;`,
              border: ` 16px solid ${
                theme === 'dark' ? '#d3d3d3' : '#42434B'
              } !important;`,
            },
            '.MuiClockNumber-root': {
              color: `${theme === 'dark' ? '#000' : '#FFF'}`,
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: `${theme === 'dark' ? '#000' : '#FFF'}`,
            },
            '.Mui-selected': {
              color: `${theme === 'dark' ? '#000' : '#FFF'} !important`,
            },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
              displayStaticWrapperAs="mobile"
              value={value}
              onAccept={() => {
                onClose()
              }}
              onChange={(newValue: any) => {
                setValue(newValue)
                setTime(createTimeString(newValue))
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </div>
    </>
  )
}

export default Timepicker
