import React, { Dispatch, FC, SetStateAction, useContext, useMemo } from 'react';

import { CalendarMode, abbrDayNames, abbrMonthNames } from '../utils';
import { CalendarContext } from '../CalendarContext';

import './Body.css';

const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
}

const renderBodyContent = (
    currentDate: string,
    selectedDate: string,
    calendarMode: CalendarMode,
    setCurrentDate: Dispatch<SetStateAction<string>>,
    setSelectedDate: Dispatch<SetStateAction<string>>,
    setCalendarMode: Dispatch<SetStateAction<CalendarMode>>
) => {
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
                    {[...Array(daysInMonth)].map((___, idx) => {
                        const sTemp = new Date(selectedDate);
                        const isSelected = sTemp.getDate() === idx && sTemp.getMonth() === temp.getMonth() && sTemp.getFullYear() === temp.getFullYear();
                        const className = isSelected ? ' highlight' : '';
                        const onClick = () => {
                            const newDate = new Date(temp.getFullYear(), temp.getMonth(), idx);
                            setCurrentDate(newDate.toDateString());
                            setSelectedDate(newDate.toDateString());
                        }
                        return (
                            <span className={`day${className}`} onClick={onClick}>{idx + 1}</span>
                        )
                    })}
                    {[...Array(daysOfNextMonth)].map((___, idx) => (
                        <span className="day month-outside">{idx + 1}</span>
                    ))}
                </div>
            );
        case CalendarMode.MONTH:
            return (
                <div className="twelve-grid">
                    {abbrMonthNames.map((month: string, idx) => {
                        const temp = new Date(currentDate);
                        const sTemp = new Date(selectedDate);
                        const isSelected = sTemp.getMonth() === idx && sTemp.getFullYear() === temp.getFullYear();
                        const className = isSelected ? 'highlight' : '';
                        const onClick = () => {
                            const temp = new Date(currentDate);
                            const currentYear = temp.getFullYear();
                            const currentDateOfMonth = temp.getDate();
                            const monthDate = new Date(currentYear, idx, currentDateOfMonth);
                            setCurrentDate(monthDate.toDateString());
                            setSelectedDate(monthDate.toDateString());
                            setCalendarMode(CalendarMode.DAY);
                        }
                        return (
                            <span onClick={onClick} className={className}>{month}</span>
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
                        const sTemp = new Date(selectedDate);
                        const isSelected = sTemp.getFullYear() === currentYear + idx;
                        const className = isSelected ? 'highlight' : '';
                        const onClick = () => {
                            const currentDateOfSelected = temp.getDate();
                            const currentMonthOfSelected = temp.getMonth();
                            const newDate = new Date(currentYear + idx, currentMonthOfSelected, currentDateOfSelected);
                            setCurrentDate(newDate.toDateString());
                            setSelectedDate(newDate.toDateString());
                            setCalendarMode(CalendarMode.MONTH);
                        }
                        return (
                            <span onClick={onClick} className={className}>{currentYear + idx}</span>
                        )
                    })}
                </div>
            )
        default:
            return <></>;
    }
};

const Body: FC = () => {
    const { 
        currentDate,
        selectedDate,
        calendarMode,
        setCurrentDate,
        setSelectedDate,
        setCalendarMode
    } = useContext(CalendarContext);
    
    return (
        <div className="body">
            {
                useMemo(() => renderBodyContent(
                    currentDate,
                    selectedDate,
                    calendarMode,
                    setCurrentDate,
                    setSelectedDate,
                    setCalendarMode
                ), [currentDate, selectedDate, calendarMode])
            }
        </div>

    )
}

export default Body;