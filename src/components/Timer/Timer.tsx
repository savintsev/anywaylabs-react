import React from 'react';
import { useTimer } from '../../helpers';
import { TimerProps } from '../../type';

export const Timer: React.FunctionComponent<TimerProps> = ({ startedAt }) => {
  if (!startedAt) {
    return null;
  }

  const { seconds, minutes, hours, days } = useTimer(startedAt);

  return (
    <small className="timer">{days} days {hours}:{minutes}:{seconds}</small>
  );
};

export default Timer;
