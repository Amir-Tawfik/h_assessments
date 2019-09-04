
import React from 'react';
import DynamicForm from '../components/DynamicForm';
import renderer from 'react-test-renderer';


test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <DynamicForm roomsCount={6} childrenOptions={[0, 1, 2]} adultOptions={[1, 2]}> </DynamicForm>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});