import { useEffect, useState } from 'react';

export default function usePrayerCountdown(nextPrayerTime: string) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!nextPrayerTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const [h, m] = nextPrayerTime.split(':').map(Number);
      const target = new Date(now);
      target.setHours(h);
      target.setMinutes(m);
      target.setSeconds(0);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown('00:00');
        return;
      }

      const mins = Math.floor((diff / 1000 / 60) % 60);
      const hrs = Math.floor((diff / 1000 / 60 / 60));

      setCountdown(`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayerTime]);

  return countdown;
}
