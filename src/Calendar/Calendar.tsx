import React, { FC } from 'react';

import { Header } from './Header';
import { CalendarProvider } from './CalendarContext';

import './Calendar.css';

interface CalendarProps {
    date?: Date;
}

const Calendar: FC<CalendarProps> = ({ date }) => {
    return (
        <CalendarProvider>
            <div className="calendar">
                <Header />
                <div className="body"></div>
            </div>
        </CalendarProvider>
    )
}

export default Calendar;