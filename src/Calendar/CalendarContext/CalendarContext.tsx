import React, { Dispatch, FC, ReactNode, SetStateAction, createContext, useMemo, useState } from 'react';

import { CalendarMode } from '../utils';

export interface CalendarContextProps {
    currentDate: string;
    setCurrentDate: Dispatch<SetStateAction<string>>;
    selectedDate: string | null;
    setSelectedDate: Dispatch<SetStateAction<string | null>>;
    calendarMode: CalendarMode;
    setCalendarMode: Dispatch<SetStateAction<CalendarMode>>;
}

export const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState<string>(new Date().toDateString());
    const [calendarMode, setCalendarMode] = useState<CalendarMode>(CalendarMode.DAY);
    
    const value = useMemo(() => ({
        currentDate,
        setCurrentDate,
        calendarMode,
        setCalendarMode,
        selectedDate,
        setSelectedDate,
    }), [
        currentDate,
        setCurrentDate,
        calendarMode,
        setCalendarMode,
        selectedDate,
        setSelectedDate,
    ]);

    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
}

export default CalendarProvider;
