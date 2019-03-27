import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import Chat from '../screens/Chat';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: TabNavigator
    },
    Chat: {
      screen: Chat
    }
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator/>;
  }
}