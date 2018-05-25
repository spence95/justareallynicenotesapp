import { AppRegistry } from 'react-native';
import App from './App';
import Home from './components/Home';
import Note from './components/Note';
import NoteRow from './components/NoteRow';
import NewNote from './components/NewNote';
import { StackNavigator } from 'react-navigation';

const RootStack = StackNavigator(
    {
        Home: {
            screen: Home
        },
        Note: {
            screen: Note
        },
        NoteRow: {
            screen: NoteRow
        },
        NewNote: {
            screen: NewNote
        }
    },
    {
        initialRouteName: 'Home'
    }
);

var SQLite = require('react-native-sqlite-storage');

// hide isMounted deprecated warning. Open issue: https://github.com/oblador/react-native-collapsible/issues/162
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('JustAReallyNiceNotesApp', () => RootStack);
