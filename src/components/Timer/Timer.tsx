import React from 'react';

import { useTimer } from '../../helpers';

import { TimerProps } from '../../types';

export const Timer: React.FunctionComponent<TimerProps> = ({ startedAt }) => {
  if (!startedAt) {
    return null;
  }

  const { seconds, minutes, hours, days } = useTimer(startedAt);

  return (
    <span>{days} days {hours}:{minutes}:{seconds}</span>
  );
};

export default Timer;
