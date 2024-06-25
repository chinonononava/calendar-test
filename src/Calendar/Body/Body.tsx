import React, { FC, useContext } from 'react';

import { CalendarMode, abbrDayNames } from '../utils';
import { CalendarContext } from '../CalendarContext';

import './Body.css';

const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
}

const renderBodyContent = (calendarMode, currentDate) => {
    switch(calendarMode) {
        case CalendarMode.DAY:
            const temp = new Date(currentDate);
            const firstDayOfTheWeek = new Date(temp.getFullYear(), temp.getMonth(), 1).getDay();
            const daysInMonth = getDaysInMonth(temp.getMonth(), temp.getFullYear());
            const lastDayOfPrevMonth = getDaysInMonth(temp.getMonth()-1, temp.getFullYear());
            const daysOfNextMonth = (6 * 7) - firstDayOfTheWeek - daysInMonth;

            return (
                <div className="days">
                    {abbrDayNames.map((day: string) => (
                        <span className="day of-week">{day}</span>
                    ))}
                    {[...Array(firstDayOfTheWeek)].map((__, idx) => (
                        <span className="day month-outside">{lastDayOfPrevMonth + 1 - (firstDayOfTheWeek - idx)}</span>
                    ))}
                    {[...Array(daysInMonth)].map((___, idx) => (
                        <span className="day">{idx + 1}</span>
                    ))}
                    {[...Array(daysOfNextMonth)].map((___, idx) => (
                        <span className="day month-outside">{idx + 1}</span>
                    ))}
                </div>
            );
        default:
            return <></>;
    }
};

const Body: FC = () => {
    const { calendarMode, currentDate } = useContext(CalendarContext);
    
    return (
        <div className="body">
            {renderBodyContent(calendarMode, currentDate)}
        </div>
    )
}

export default Body;