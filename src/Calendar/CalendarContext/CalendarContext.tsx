import React, { Dispatch, FC, ReactNode, SetStateAction, createContext, useMemo, useState } from 'react';

import { CalendarMode } from '../utils';

export interface CalendarContextProps {
    currentDate: string;
    setCurrentDate: Dispatch<SetStateAction<string>>;
    calendarMode: CalendarMode;
    setCalendarMode: Dispatch<SetStateAction<CalendarMode>>;
}

export const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [currentDate, setCurrentDate] = useState<string>(new Date().toDateString());
    const [calendarMode, setCalendarMode] = useState<CalendarMode>(CalendarMode.DAY);
    
    const value = useMemo(() => ({
        currentDate,
        setCurrentDate,
        calendarMode,
        setCalendarMode 
    }), [
        currentDate,
        setCurrentDate,
        calendarMode,
        setCalendarMode
    ]);

    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
}

export default CalendarProvider;