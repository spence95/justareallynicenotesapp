import React, { Component } from 'react';
import  Notes  from './Notes';
import Note from './Note';
import { Database } from "../Database";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false }
  }

  static navigationOptions = {
    title: 'JARNNA'
  }

  componentDidMount() {
    this.refreshNotes();
  }

  componentWillUpdate() {
    this.refreshNotes();
  }

  refreshNotes() {
    let db = new Database();
    db.loadDB();
    db.getNotes.then(_notes => {
      let _titles = []
      _notes.forEach((n) => {
        _titles.push(n.title);
      });
      this.setState({notes: _notes, titles: _titles, isLoaded: true});
    }).catch(error => console.log(error));
  }

  render() {
    const { navigate } = this.props.navigation;
    if ( this.state.isLoaded ){
      return (
        <View style={styles.container}>
          <Notes notes={this.state.notes} titles={this.state.titles} navigation={this.props.navigation}/>
            <ActionButton 
                buttonColor="rgba(231,76,60,1)"
                onPress={() => this.goToNewNoteScreen()}
                hideShadow={false}
                fixNativeFeedbackRadius={true}>
            </ActionButton>
        </View>
      );
    } else {
      return null;
    }
  }

  goToNewNoteScreen() {
    this.props.navigation.navigate('NewNote');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});
