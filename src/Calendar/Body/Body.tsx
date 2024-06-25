import React, { FC, useContext } from 'react';

import { CalendarMode, abbrDayNames, abbrMonthNames } from '../utils';
import { CalendarContext } from '../CalendarContext';

import './Body.css';

const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
}

const renderBodyContent = (calendarMode, currentDate, setCurrentDate, setCalendarMode) => {
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
        case CalendarMode.MONTH:
            return (
                <div className="twelve-grid">
                    {abbrMonthNames.map((month: string, idx) => {
                        const onClick = () => {
                            const temp = new Date(currentDate);
                            const currentYear = temp.getFullYear();
                            const currentDateOfMonth = temp.getDate();
                            const monthDate = new Date(currentYear, idx, currentDateOfMonth);
                            setCurrentDate(monthDate.toDateString());
                            setCalendarMode(CalendarMode.DAY);
                        }
                        return (
                            <span onClick={onClick}>{month}</span>
                        )
                    })}
                </div>
            )
        case CalendarMode.YEAR:
            return (
                <div className="twelve-grid">
                    {[...Array(12)].map((__, idx) => {
                        const temp = new Date(currentDate);
                        const currentYear = temp.getFullYear();
                        const onClick = () => {
                            const currentDateOfSelected = temp.getDate();
                            const currentMonthOfSelected = temp.getMonth();
                            const newDate = new Date(currentYear + idx, currentMonthOfSelected, currentDateOfSelected);
                            setCurrentDate(newDate.toDateString());
                            setCalendarMode(CalendarMode.MONTH);
                        }
                        return (
                            <span onClick={onClick}>{currentYear + idx}</span>
                        )
                    })}
                </div>
            )
        default:
            return <></>;
    }
};

const Body: FC = () => {
    const { calendarMode, currentDate, setCalendarMode, setCurrentDate } = useContext(CalendarContext);
    
    return (
        <div className="body">
            {renderBodyContent(calendarMode, currentDate, setCurrentDate, setCalendarMode)}
        </div>
    )
}

export default Body;