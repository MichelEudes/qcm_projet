// src/components/Timer.jsx
import { useEffect, useState } from "react";

export default function Timer({ startTime }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    const formatTime = (totalSeconds) => {
        const min = Math.floor(totalSeconds / 60);
        const sec = totalSeconds % 60;
        return `${min.toString().padStart(2, "0")}:${sec
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-medium">
            Temps : {formatTime(seconds)}
        </div>
    );
}
