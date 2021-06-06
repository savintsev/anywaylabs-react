import * as React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('<Loading />', () => {
  it('calculates hours between dates and render cost', () => {
    const wrapper = shallow(<Loading count={5} />);

    expect(wrapper.find('div').first().length).toMatch('5');
  });
});
