import * as React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';

import FormControlLabel from '@mui/material/FormControlLabel';

import { useIsFirstRender } from 'hook/useIsFirstRender'
import IOSSwitch from 'components/common/Switch'

import updateTabdata from 'redux/actions/tabdata/updateTabData'


type Props = {
  isAllChecked: boolean;
  tab: any;
}

const CardComponent = ({ tab, isAllChecked }: Props) => {
  const isFirstRender = useIsFirstRender()
  const dispatch = useDispatch()

  const [isChecked, setIsChecked] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)

  React.useEffect(() => {
    if (tab.isActive) {
      setIsChecked(true)
    }
    if (tab.disabled) {
      setIsDisabled(true)
    }
    if (!tab.disabled) {
      setIsDisabled(false)
    }

  }, [tab])

  React.useEffect(() => {
    if (!isFirstRender) {
      if (isAllChecked) {
        setIsDisabled(false)
      }
      if (!isAllChecked) {
        setIsDisabled(true)
      }
    }

  }, [isAllChecked])

  const handleSwitch = (tab: any) => {
    setIsChecked(!isChecked)
    updateTabdata(tab)(dispatch)
  }

  return (

    <div style={{ padding: '20px', border: 'solid 3px #dedcdc', borderRadius: 10, width: 350, marginBottom: 40, opacity: isDisabled ? 0.5 : 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {tab?.title}
        </div>
        <div>
          <FormControlLabel
            control={<IOSSwitch disabled={isDisabled} checked={isChecked} onChange={() => handleSwitch(tab)} />}
            label=""
          />
          <div style={{ fontSize: 10, marginRight: 30, color: isChecked ? "#2ECA45" : 'red' }}>
            {isChecked ? 'Allowed' : 'Blocked'}
          </div>
        </div>

      </Box>
      <div style={{ textAlign: 'left', fontSize: '15px', marginTop: '15px', lineHeight: '1.8', width: '260px' }}>
        {tab?.description}
      </div>

    </div>

  )
}

export default CardComponent
