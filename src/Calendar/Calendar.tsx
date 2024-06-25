import React, { FC } from 'react';

import { Header } from './Header';
import { Body } from './Body';
import { CalendarProvider } from './CalendarContext';

import './Calendar.css';

const Calendar: FC = () => {
    return (
        <CalendarProvider>
            <div className="calendar">
                <Header />
                <Body />
            </div>
        </CalendarProvider>
    )
}

export default Calendar;