import { useState } from "react";
import clsx from "clsx";
import styles from "./StarRating.module.css";
import { BsStarFill, BsStar } from "react-icons/bs";

interface StartRatingProps {
    value: number;
    setValue: Function;
    size?: number;
    starsCount?: number;
}

export default function StarRating(props: StartRatingProps) {
    const { value, setValue, starsCount = 5 } = props;
    const [hoverValue, setHoverValue] = useState(value);
    const starsArr = new Array(starsCount).fill(0);

    const handleStarHover = (idx: number) => {
        setHoverValue(idx + 1);
    };

    const handleStarClick = (idx: number) => {
        const updatedVal = idx + 1;
        setHoverValue(updatedVal);
        setValue(updatedVal);
    };

    return (
        <div className={styles["container"]}>
            {starsArr.map((_, idx) => {
                if (idx + 1 <= hoverValue)
                    return (
                        <BsStarFill
                            onMouseOver={() => handleStarHover(idx)}
                            onClick={() => handleStarClick(idx)}
                            className={clsx(
                                styles["container__star--active"],
                                styles["container__star"],
                            )}
                        />
                    );
                return (
                    <BsStar
                        onMouseOver={() => handleStarHover(idx)}
                        onClick={() => handleStarClick(idx)}
                        className={styles["container__star"]}
                    />
                );
            })}
        </div>
    );
}
