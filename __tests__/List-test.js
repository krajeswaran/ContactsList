import React from 'react';
import renderer from 'react-test-renderer';
import List from '../src/components/List/List';

jest.setTimeout(15000);

it('renders correctly', () => {
  const tree = renderer.create(<List contacts={[{recordID:"1",phoneNumbers:[{label:"work",number:123}]}]} />).toJSON();
  expect(tree).toMatchSnapshot();
});