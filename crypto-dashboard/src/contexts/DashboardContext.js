import React, { createContext, useContext, useState } from "react";


const DashboardContext = React.createContext();

export const DashboardProvider = ({ children }) => {
    const [currency, setCurrency] = useState(["EUR"]);

    const changeCurrency = (currency) => {
        setCurrency(currency);
    };

    return (
        <DashboardContext.Provider value={{ currency, changeCurrency }}>
            {children}
        </DashboardContext.Provider>
    );

};

export const useDashboard = () => {
    return useContext(DashboardContext);
}