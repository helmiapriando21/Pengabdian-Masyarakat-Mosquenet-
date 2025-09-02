import { useEffect, useState } from 'react';

export default function useCurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return {
    time,
    formatted: `${hours}:${minutes}`,
  };
}
