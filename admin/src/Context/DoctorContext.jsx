import { createContext } from "react";

export const DoctorContext = createContext();

import React from 'react'

const DoctorContextProvider = (props) => {
    const value = {}
    return (
        <>
            <DoctorContext.Provider value={value}>
                {props.children}
            </DoctorContext.Provider>
        </>
    )
}

export default DoctorContextProvider
