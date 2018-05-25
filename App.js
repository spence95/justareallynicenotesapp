import React, { Component } from 'react';
import Home from './components/Home';
import Note from './components/Note';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Note: {
            screen: Note
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default class App extends Component {
    render() {
        return <RootStack />;
    }
}