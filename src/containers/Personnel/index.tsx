import React, { useEffect } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { InitialState } from 'types'
import fetchPlugins from 'redux/actions/plugins/fetchPlugins';
import fetchTabdata from 'redux/actions/tabdata/fetchTabdata';


import PersonnelComponent from 'components/Personnel'

const typedUseSelectorHook: TypedUseSelectorHook<InitialState> = useSelector;


const Personnel = () => {
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
        <PersonnelComponent 
        tabdataState={tabdataState} 
        pluginsState={pluginsState} 
        tabState={tabState} 
        />
    )
}

export default Personnel