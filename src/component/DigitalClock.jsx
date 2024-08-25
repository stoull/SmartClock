import React, {useState, useEffect} from 'react';
import '../App.css'

function DigitalClock({ fontSize }){

    const [time, setTime] = useState(new Date());
    const [timeInfo, setTimeInfo] = useState({});

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeInfo = formatTimeInfo(new Date());
            const pad_hours = padZero(timeInfo.hours);
            const pad_minutes = padZero(timeInfo.minutes);
            const pad_seconds = padZero(timeInfo.seconds);
            setTimeInfo( (prev) => ({
                ...prev,
                hours: pad_hours,
                minutes: pad_minutes,
                seconds: pad_seconds
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
        // hours = hours % 12 || 12;
        return {
            meridiem,
            hours,
            minutes,
            seconds
        }
    }
    
    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span className='clock' style={{ fontSize: fontSize }}>{timeInfo.hours}</span>
                <span className='clock-dot' style={{ fontSize: fontSize }}>:</span>
                <span className='clock' style={{ fontSize: fontSize }}>{timeInfo.minutes}</span>
            </div>
        </div>
    );
}
export default DigitalClock;