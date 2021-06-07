import * as React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('<Loading />', () => {
  it('renders count numbers from params', () => {
    const wrapper = shallow(<Loading count={5} />);

    expect(wrapper.find('div').first().children()).toHaveLength(5);
  });
});
