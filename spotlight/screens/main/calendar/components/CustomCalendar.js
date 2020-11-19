import React, { useState } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CustomCalender = ({ updateSelected }) => {
    const [currSelected, setSelected] = useState(new Date().toLocaleDateString())

    return (
        <Calendar
                markedDates={{
                    [currSelected]: {selected: true, selectedColor: "#DE3535"}
                }
                }
                onDayPress={
                    (day) => {setSelected(day.dateString); updateSelected(day.dateString)}
                }
                theme={{
                    todayTextColor: "#DE3535",
                    arrowColor: "#DE3535",
                }}
            />
    )
}

export default CustomCalender;