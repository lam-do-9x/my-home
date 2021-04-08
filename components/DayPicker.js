import React, { useState } from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import CalendarIcon from "./CalendarIcon";

export default function DayPicker() {
    const [value, onChange] = useState(new Date());

    return (
        <DatePicker
            onChange={onChange}
            value={value}
            className="w-full"
            format="dd/MM/y"
            calendarIcon={<CalendarIcon />}
        />
    );
}
