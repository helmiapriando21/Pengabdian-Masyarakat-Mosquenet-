import { useEffect, useState } from "react";

export default function ClockElement() {
    const [now, setNow] = useState<Date>(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-2 text-6xl font-extrabold">
            <p>{String(now.getHours()).padStart(2, '0')}</p>
            <p>:</p>
            <p>{String(now.getMinutes()).padStart(2, '0')}</p>
            <p>:</p>
            <p>{String(now.getSeconds()).padStart(2, '0')}</p>
        </div>
    );
}