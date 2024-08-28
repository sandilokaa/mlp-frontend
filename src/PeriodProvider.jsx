import React, { createContext, useState, useContext, useMemo } from 'react';

const PeriodContext = createContext();

export const usePeriod = () => useContext(PeriodContext);

export const PeriodProvider = ({ children }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('Ganjil 2024');

    const value = useMemo(() => ({
        selectedPeriod,
        setSelectedPeriod,
    }), [selectedPeriod]);

    return (
        <PeriodContext.Provider value={value}>
            {children}
        </PeriodContext.Provider>
    );
};