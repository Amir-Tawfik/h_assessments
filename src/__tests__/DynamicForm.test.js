
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import DynamicForm from '../components/DynamicForm';

configure({ adapter: new Adapter() });

describe('List of Rooms selection', () => {
  
  const TEST_ROOMS_COUNT = 5
  const TEST_ADULT_OPTIONS = [1, 2]
  const TEST_CHILDREN_OPTIONS = [0, 1, 2, 3]
  const wrapper = shallow(<DynamicForm roomsCount={TEST_ROOMS_COUNT} childrenOptions={TEST_CHILDREN_OPTIONS} adultOptions={TEST_ADULT_OPTIONS}> </DynamicForm>);

  it('It populate correct number of rooms', () => {

    expect(wrapper.find('fieldset')).toHaveLength(TEST_ROOMS_COUNT);
    expect(wrapper.find('fieldset')).toHaveLength(TEST_ROOMS_COUNT);
    expect(wrapper.find('fieldset').first().find('strong').text()).toEqual("Room 1");
    expect(wrapper.find('fieldset').last().find('strong').text()).toEqual("Room " + TEST_ROOMS_COUNT);
  })
})