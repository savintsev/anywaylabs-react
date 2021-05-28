import * as React from 'react';
import { shallow } from 'enzyme';
import Cost from './Cost';
import { RUB_PER_HOUR } from '../../constants';

describe('<Cost />', () => {
  it('calculates hours between dates and render cost', () => {
    const startDate = new Date(2021, 0, 1).getTime();
    const finishDate = new Date(2021, 0, 2).getTime();

    const wrapper = shallow(<Cost startedAt={startDate} finishedAt={finishDate} />);

    expect(wrapper.find('span').text()).toMatch(
      new Intl.NumberFormat(
        'ru-RU',
        {
          style: 'currency',
          currency: 'RUB'
        }
      ).format(24 * RUB_PER_HOUR)
    );
  });
});