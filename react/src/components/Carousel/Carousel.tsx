import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import clsx from "clsx";

interface CarouselProps {
    slides: React.ReactNode[];
    delay?: number;
}

export default function Carousel(props: CarouselProps) {
    const { slides, delay = 2000 } = props;
    const [currentIdx, setCurrentIdx] = useState(0);
    const timerRef = useRef<number | undefined>(undefined);
    const totalSlides = slides.length;

    const startTimer = () => {
        clearTimer();
        timerRef.current = setInterval(() => {
            setCurrentIdx((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        }, delay);
    };

    const clearTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handleOnLeft = () => {
        clearTimer();
        setCurrentIdx((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
        startTimer();
    };

    const handleOnRight = () => {
        clearTimer();
        setCurrentIdx((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        startTimer();
    };

    const handleOnStepper = (index: number) => {
        clearTimer();
        setCurrentIdx(index);
        startTimer();
    };

    useEffect(() => {
        startTimer();
        return () => clearTimer();
    }, [delay, totalSlides]);

    return (
        <div className={styles["carousel"]}>
            <div
                className={styles["carousel__item-container"]}
                onMouseEnter={clearTimer}
                onMouseLeave={startTimer}
            >
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={clsx(
                            styles["carousel__item"],
                            idx === currentIdx && styles["carousel__item--active"],
                        )}
                    >
                        {slide}
                    </div>
                ))}
            </div>
            <div className={styles["carousel__actions"]}>
                <button onClick={handleOnLeft}>&larr;</button>
                <button onClick={handleOnRight}>&rarr;</button>
            </div>
            <div className={styles["carousel__stepper"]}>
                {Array.from({ length: totalSlides }, (_, index) => {
                    return (
                        <div
                            className={clsx(
                                styles["carousel__stepper-item"],
                                index === currentIdx && styles["carousel__stepper-item--active"],
                            )}
                            onClick={() => handleOnStepper(index)}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
