import React, { FC, useContext } from 'react';

import { CalendarMode, abbrMonthNames, monthNames } from '../utils';
import { CalendarContext } from '../CalendarContext';

import './Header.css';

const Header: FC = () => {
    const {
        currentDate,
        setCurrentDate,
        calendarMode,
        setCalendarMode
    } = useContext(CalendarContext);

    const onClickPrev = () => {
        let temp: Date;
        let newDate: string;

        switch(calendarMode) {
            case CalendarMode.DAY:
                temp = new Date(currentDate)
                temp.setMonth(temp.getMonth()-1);
                newDate = temp.toDateString();
                setCurrentDate(newDate);
                break;
            case CalendarMode.MONTH:
                temp = new Date(currentDate)
                temp.setFullYear(temp.getFullYear()-1);
                newDate = temp.toDateString();
                setCurrentDate(newDate);
                break;
            case CalendarMode.YEAR:
            default:
                temp = new Date(currentDate)
                temp.setFullYear(temp.getFullYear()-12);
                newDate = temp.toDateString();
                setCurrentDate(newDate);
                break;
        }
    }

    const onClickNext = () => {
        let temp: Date;
        let newDate: string;

        switch(calendarMode) {
            case CalendarMode.DAY:
                temp = new Date(currentDate)
                temp.setMonth(temp.getMonth()+1);
                newDate = temp.toDateString();
                setCurrentDate(newDate);
                break;
            case CalendarMode.MONTH:
                temp = new Date(currentDate)
                temp.setFullYear(temp.getFullYear()+1);
                newDate = temp.toDateString();
                setCurrentDate(newDate);
                break;
            case CalendarMode.YEAR:
            default:
                temp = new Date(currentDate)
                temp.setFullYear(temp.getFullYear()+12);
                newDate = temp.toDateString();
                setCurrentDate(newDate);
                break;
        }
    }

    const changeMode = () => {
        switch(calendarMode) {
            case CalendarMode.DAY:
                setCalendarMode(CalendarMode.MONTH);
                break;
            case CalendarMode.MONTH:
                setCalendarMode(CalendarMode.YEAR);
                break;
        }
    };

    const HeaderText: FC = () => {
        const currentDateSplit = currentDate.split(' ');
        const monthIndex = abbrMonthNames.findIndex((item: string) => currentDateSplit[1] == item);
        const month = monthNames[monthIndex];
        const year = currentDateSplit[3];
        
        if (calendarMode === CalendarMode.DAY) {
            return (
                <button className="current clickable" onClick={changeMode}>{`${month} ${year}`}</button>
            );
        }
        if (calendarMode === CalendarMode.MONTH) {
            return (
                <button className="current clickable" onClick={changeMode}>{`${year}`}</button>
            );
        }
        return (
            <button className="current clickable" onClick={changeMode}>{`${year} - ${Number(year) + 12}`}</button>
        );
    };
    
    return (
        <div className="header">
            <button className="nav clickable" onClick={onClickPrev}>{`<`}</button>
            <HeaderText />
            <button className="nav clickable" onClick={onClickNext}>{`>`}</button>
        </div>
    )
}

export default Header;