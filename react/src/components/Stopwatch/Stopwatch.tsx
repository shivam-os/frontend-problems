import { useEffect, useRef, useState } from "react";
import styles from "./Stopwatch.module.css";

const formatTime = (time: number): string => {
    const ms = Math.floor((time % 1000) / 10).toString().padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, "0");
    const hours = Math.floor((time / (1000 * 60 * 60))).toString().padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds} : ${ms}`;
}

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const timerId = useRef<number | undefined>(undefined);
    const stopwatch = useRef(0);

    const clearTimer = () => {
        if (timerId.current !== undefined) {
            clearInterval(timerId.current);
            timerId.current = undefined;
        }
    };

    const pauseTimer = () => {
        if (timerId.current === undefined) return;
        setTime(Date.now() - stopwatch.current);
        clearTimer();
    };

    const startTimer = () => {
        if (timerId.current !== undefined) return;
        stopwatch.current = Date.now() - time;
        timerId.current = window.setInterval(() => {
            setTime(Date.now() - stopwatch.current);
        }, 10);
    };

    const resetTimer = () => {
        clearTimer();
        setTime(0);
        stopwatch.current = 0;
    };

    useEffect(() => clearTimer, []);

    return (
        <div>
            <div className={styles["timer-display"]}>
                {formatTime(time)}
            </div>
            <div className={styles["timer-actions"]}>
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    )
}