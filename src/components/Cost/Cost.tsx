import * as React from 'react';

import { RUB_PER_HOUR } from '../../constants';

import { CostProps } from '../../types';

export const Cost: React.FunctionComponent<CostProps> = ({ startedAt, finishedAt }) => {
  if (!startedAt || !finishedAt) {
    return null;
  }

  const hours = Math.abs(finishedAt - startedAt) / 36e5;
  const costNumber = Math.floor(hours * RUB_PER_HOUR);
  const costFormatted = new Intl.NumberFormat(
    'ru-RU',
    {
      style: 'currency',
      currency: 'RUB'
    }
  ).format(costNumber);

  return (
    <small className="cost">{costFormatted}</small>
  );
};

export default Cost;
