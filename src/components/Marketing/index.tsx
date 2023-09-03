import React, { useState } from 'react';
import Box from '@mui/material/Box';

import Sidebar from 'components/common/Sidebar'
import Card from 'components/common/Card'
import { IState } from 'types';

type Props = {
    tabdataState: IState;
    pluginsState: IState;
    tabState: IState;
}

const Marketing = ({ tabdataState, pluginsState, tabState }: Props) => {
    const [isAllChecked, setIsAllchecked] = useState(true)

    const handleSwhitchChange = () => {
        setIsAllchecked(!isAllChecked)
    }

    return (
        <Sidebar 
        handleSwhitchChange={handleSwhitchChange}
        isChecked={isAllChecked} 
        tabdataState={tabdataState} 
        pluginsState={pluginsState}
        >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {Array.isArray(tabState.data) && tabState.data.map((tab: any, key: number) => (
                 <Card isAllChecked={isAllChecked} key={key} tab={tab} />   
                ))}
            </Box>

        </Sidebar>
    )
}

export default Marketing