import DatePicker from 'react-date-picker/dist/entry.nostyle';
import CalendarIcon from "./CalendarIcon";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function DayPicker(props) {
    function handleOnChange(date) {
        props.onChange(date)
    }

    return (
        <DatePicker
            onChange={handleOnChange}
            value={props.publishedDate}
            className="w-full"
            format="dd-MM-yyyy"
            calendarIcon={<CalendarIcon />}
        />
    );
}
