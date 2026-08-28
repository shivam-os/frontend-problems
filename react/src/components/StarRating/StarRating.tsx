import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import clsx from "clsx";
import styles from "./StarRating.module.css";

interface StarRatingProps {
    value: number;
    onChange: (value: number) => void;
    count?: number;
}

//TODO: Add precision prop, for fractional values

export default function StarRating(props: StarRatingProps) {
    const { value, onChange, count = 5 } = props;
    const [hoveredRating, setHoveredRating] = useState(0);
    const preferredStarRating = hoveredRating || value;

    const handleOnHover = (value: number) => {
        setHoveredRating(value);
    };

    const handleOnClick = () => {
        onChange(hoveredRating);
    };

    const handleOnLeave = () => {
        setHoveredRating(0);
    }

    return (
        <div className={styles["container"]}>
            {Array.from({ length: count }, (_, index) => {
                const starValue = index + 1;
                const isActive = starValue <= preferredStarRating;
                const Star = isActive ? BsStarFill : BsStar;

                return(
                    <Star 
                        className={clsx(styles["container__star"], isActive && styles["container__star--active"])}
                        onMouseEnter={() => handleOnHover(starValue)}
                        onMouseLeave={handleOnLeave}
                        onClick={handleOnClick} 
                    />
                )
            })}
        </div>
    );
}
