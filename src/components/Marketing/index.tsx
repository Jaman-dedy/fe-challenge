import React, { useState } from 'react';
import Box from '@mui/material/Box';

import Sidebar from 'components/common/Sidebar'
import Card from 'components/common/Card'
import { IState } from 'types';

import Skeleton from 'components/common/Skeleton';

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

    console.log('tabState :>> ', tabState.data);

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
            {!Array.isArray(tabState.data) && Object.values(tabState.data).length === 0 && (
                <>
                <div>Please navigate with the tabs on your left</div>
                <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                </div>
                </>
             
            )}

        </Sidebar>
    )
}

export default Marketing