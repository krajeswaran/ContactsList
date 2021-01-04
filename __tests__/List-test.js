import React from 'react';
import {ActivityIndicator, FlatList, Text, TextInput} from 'react-native';
import renderer from 'react-test-renderer';
import List from '../src/components/List/List';

jest.setTimeout(15000);

it('renders correctly', () => {
  const tree = renderer.create(<List />).toJSON();
  expect(tree).toMatchSnapshot();
});