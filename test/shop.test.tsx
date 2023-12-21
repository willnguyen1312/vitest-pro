import React from 'react';
import {mount} from '@shopify/react-testing';

const ClickCounter = ({defaultCount}) => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>count: {count || defaultCount} </p>
      <button onClick={() => setCount(count + 1)}>click</button>
    </div>
  );
}

describe.only('<ClickCounter />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<ClickCounter defaultCount={0} />);
    
    expect(wrapper.props.defaultCount).toBe(0);
    expect(wrapper.text()).toBe('count: 0 click');
    wrapper.setProps({defaultCount: 1});
    expect(wrapper.props.defaultCount).toBe(1);
    expect(wrapper.text()).toBe('count: 1 click');

    wrapper.find('button').trigger('onClick');
    wrapper.find('button').trigger('onClick');
    expect(wrapper.text()).toBe('count: 2 click');
  });

  it('triggers handlers', () => {
    const wrapper = mount(<ClickCounter defaultCount={0} />);
    wrapper.find('button').trigger('onClick');
    wrapper.find('button').trigger('onClick');
    wrapper.find('button').trigger('onClick');
    expect(wrapper.text()).toBe('count: 3 click');
  });
});