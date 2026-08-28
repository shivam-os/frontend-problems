import { useState } from "react";
import usePrevious from "../hooks/usePrevious";
import StarRating from "./StarRating/StarRating";

export default function Dummy() {
    const [count, setCount] = useState(0);
    const [rating, setRating] = useState(2);
    const prevCount = usePrevious(count);

    return (
        <div>
            {/* <h2>Count: {count}</h2>
            <button onClick={() => setCount((prev) => prev + 1)}>Increment</button> */}
            <StarRating value={rating} onChange={setRating} />
            <p>Current rating: {rating}</p>
        </div>
    );
}
