import { useEffect, useRef, useState } from "react"

// This function will generate same time string format for all timezones while the toLocaleTimeString() will change accoring to the local timezone
const getDateTime = () => {
    const date = new Date();
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const hour24 = date.getHours();
    const hours = hour24 % 12 || 12;
    const amPm = hour24 >= 12 ? "PM" : "AM";
    return `${hours.toString().padStart(2, "0")} : ${minutes} : ${seconds} ${amPm}`;
}

export default function DigitalClock() {
    const [count, setCount] = useState(0);
    // const [time, setTime] = useState(new Date());
    // const requestRef = useRef<undefined | number>(undefined);

    // const updateClock = () => {
    //     setTime(new Date());
    //     requestRef.current = requestAnimationFrame(updateClock);
    // }

    // useEffect(() => {
    //     requestRef.current = requestAnimationFrame(updateClock);
    //     return () => {
    //         if (requestRef.current) cancelAnimationFrame(requestRef.current);
    //     }
    // }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div>
            <h2>Digital Clock</h2>
            {/* <div>{getDateTime()}</div> */}
            <div>{new Date().toLocaleTimeString()}</div>
            {/* <div>{time.toLocaleTimeString()}</div> */}
        </div>
    )
}