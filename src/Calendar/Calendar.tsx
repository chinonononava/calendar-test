import React, { FC, useState } from 'react';
import { abbrMonthNames, monthNames } from './utils';

import './Calendar.css';

interface CalendarProps {
    date?: Date;
}

const Calendar: FC<CalendarProps> = ({ date }) => {
    const [currentDate, setCurrentDate] = useState<string>(date?.toDateString() || new Date().toDateString());

    const onClickPrev = () => {
        const temp = new Date(currentDate)
        temp.setMonth(temp.getMonth()-1);
        const newDate = temp.toDateString();
        setCurrentDate(newDate);
    }

    const onClickNext = () => {
        const temp = new Date(currentDate)
        temp.setMonth(temp.getMonth()-1);
        const newDate = temp.toDateString();
        setCurrentDate(newDate);
    }

    const HeaderText: FC = () => {
        const currentDateSplit = currentDate.split(' ');
        const monthIndex = abbrMonthNames.findIndex((item: string) => currentDateSplit[1] == item);
        const month = monthNames[monthIndex];
        const year = currentDateSplit[3];
        
        return (
            <span>{`${month} ${year}`}</span>
        );
    };

    return (
        <div className="calendar">
            <div className="header">
                <button className="nav" onClick={onClickPrev}>{`<`}</button>
                <HeaderText />
                <button className="nav" onClick={onClickNext}>{`>`}</button>
            </div>
            <div className="body"></div>
        </div>
    )
}

export default Calendar;