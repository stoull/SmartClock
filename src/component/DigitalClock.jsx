import React, {useState, useEffect} from 'react';
import '../App.css'

function DigitalClock({ fontSize }){

    const [time, setTime] = useState(new Date());
    const [timeInfo, setTimeInfo] = useState({});
    const [titleFontSize, setTitleFontSize] = useState(fontSize);
    const [dayFontSize, setDayFontSize] = useState(fontSize);

    useEffect(() => {
        setTitleFontSize(preSize => {
            return fontSize
        })

        setDayFontSize( preSize => {
            let preInt = parseInt(fontSize)
            preInt = preInt > 1 ? preInt : 1;
            return `${preInt-1}rem`
        })

    }, [fontSize])

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeInfo = formatTimeInfo(new Date());
            const pad_hours = padZero(timeInfo.hours);
            const pad_minutes = padZero(timeInfo.minutes);
            const pad_seconds = padZero(timeInfo.seconds);
            const dayOfWeekDay = timeInfo.dayOfWeekDay;
            setTimeInfo( (prev) => ({
                ...prev,
                hours: pad_hours,
                minutes: pad_minutes,
                seconds: pad_seconds,
                dayOfWeekDay: dayOfWeekDay
            }))
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function formatTime(date, is24Hrs = false){
        const timeInfo = formatTimeInfo(date);
        let hours = timeInfo.hours;
        const minutes = timeInfo.minutes;
        const seconds = timeInfo.seconds;
        const meridiem = timeInfo.meridiem
        hours = is24Hrs ? hours : hours % 12 || 12;
        if (is24Hrs) {
            return `${padZero(hours)}:${padZero(minutes)}`;
        } else {
            return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
        }
    }

    function formatTimeInfo(date){
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";
        const dayOfWeek = date.getDay();
        const days = ["日", "一", "二", "三", "四", "五", "六"];
        const dayOfWeekDay = days[dayOfWeek]
        // hours = hours % 12 || 12;
        return {
            meridiem,
            hours,
            minutes,
            seconds,
            dayOfWeekDay
        }
    }
    
    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span className='clock' style={{ fontSize: titleFontSize }}>{timeInfo.hours}</span>
                <span className='clock-dot' style={{ fontSize: titleFontSize }}>:</span>
                <span className='clock' style={{ fontSize: titleFontSize }}>{timeInfo.minutes}</span>
                <span className='clock' style={{ fontSize: dayFontSize, margin: 'auto 0 auto 120px'}}>{timeInfo.dayOfWeekDay}</span>
            </div>
        </div>
    );
}
export default DigitalClock;