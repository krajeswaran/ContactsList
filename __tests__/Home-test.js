import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../src/components/Home/Home';

jest.setTimeout(15000);

it('renders correctly', () => {
  const params = {confirmed_select:{title:'abcd',phone_number:{number:123456789,label:'work'}}}
  const tree = renderer.create(<Home route={params}/>).toJSON();
  expect(tree).toMatchSnapshot();
});