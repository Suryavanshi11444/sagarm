import { useEffect, useState } from "react";

const Timer = ({ seconds, onTimeUp }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  return <div> {time}s left</div>;
};

export default Timer;