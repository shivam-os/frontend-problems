import { useEffect, useRef, useState } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
    initial: number;
    max: number;
    steps?: number;
    interval?: number;
    onStart?: () => void;
    onComplete?: () => void;
}

export default function ProgressBar(props: ProgressBarProps) {
    const { initial, max, interval = 1000, steps = 10, onComplete, onStart } = props;

    const [value, setValue] = useState(initial);
    const hasOnStartRan = useRef(false);
    const hasOnCompleteRan = useRef(false);

    useEffect(() => {
        if (!hasOnStartRan.current) {
            onStart?.();
            hasOnStartRan.current = true;
        }

        const timerId = setInterval(() => {
            setValue((prev) => {
                const next = Math.min(prev + steps, max);

                if (next >= max && !hasOnCompleteRan.current) {
                    onComplete?.();
                    hasOnCompleteRan.current = true;
                    clearInterval(timerId);
                }

                return next;
            });
        }, interval);

        return () => clearInterval(timerId);
    }, [initial, max, steps, interval]);

    return (
        <div
            className={styles.bar}
            role="progressbar"
            aria-valuemin={initial}
            aria-valuemax={max}
            aria-valuenow={value}
        >
            <span className={styles["bar__value"]}>{value}%</span>
            <div
                className={styles["bar__inner"]}
                style={
                    { transform: `translateX(-${100 - value}%)` }
                    // { width: `${value}%` }
                }
            ></div>
        </div>
    );
}
