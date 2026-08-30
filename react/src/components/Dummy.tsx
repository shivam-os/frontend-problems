import { useState } from "react";
import usePrevious from "../hooks/usePrevious";
import cat1 from "../assets/cat-1.jpg";
import cat2 from "../assets/cat-2.jpg";
import cat3 from "../assets/cat-3.jpg";
import cat4 from "../assets/cat-4.jpg";
import cat5 from "../assets/cat-5.jpg";
import Carousel from "./Carousel/Carousel";
import InfiniteScroll from "./InfiniteScroll/InfiniteScroll";
import ProgressBar from "./ProgressBar/ProgressBar";
import Stopwatch from "./Stopwatch/Stopwatch";
import DigitalClock from "./DigitalClock/DigitalClock";

const IMAGES = [cat1, cat2, cat3, cat4, cat5];

export default function Dummy() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    const handleStart = () => console.log("progress start");
    const handleComplete = () => console.log("progress end");

    return (
        <div>
            {/* <InfiniteScroll /> */}
            {/* <ProgressBar initial={10} max={100} onStart={handleStart} onComplete={handleComplete} /> */}
            {/* <Stopwatch /> */}
            <DigitalClock />
        </div>
    );
}
