import React, { useEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { InitialState } from 'types'
import fetchPlugins from 'redux/actions/plugins/fetchPlugins';
import fetchTabdata from 'redux/actions/tabdata/fetchTabdata';


import MarketingComponent from 'components/Marketing'

const typedUseSelectorHook: TypedUseSelectorHook<InitialState> = useSelector;


const Finance = () => {
    const dispatch = useDispatch();

    const {
        plugins: { plugins: pluginsState },
        tabdata: { tabdata: tabdataState},
        tab: {tab: tabState}
    } = typedUseSelectorHook(({ plugins, tabdata, tab }) => ({
        plugins, tabdata, tab
    }))

    useEffect(() => {
        fetchPlugins()(dispatch)
        fetchTabdata()(dispatch)
    }, [])
    

    return (
        <MarketingComponent 
        tabdataState={tabdataState} 
        pluginsState={pluginsState} 
        tabState={tabState} 
        />
    )
}

export default Finance