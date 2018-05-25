import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Database } from '../Database';

export default class NoteRow extends Component {
    render() {
      return (
        <View>
          <Text onPress={() => this.onNotePress()} style={styles.item}> {this.props.item}</Text>
        </View>
      )
    };

    onNotePress() {
      this.props.section.notes.forEach(n => {
        if (n.note_id === this.props.itemObj.note_id) {
          let db = new Database();
          db.loadDB();
          let contentPromise = db.getNoteById(n.note_id);
          contentPromise.then((res) => {
            this.props.navigation.navigate('Note', {id: res.note_id, title: res.title, content: res.content});
          }).catch(error => console.log(error));
        }
      });
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#f2f2f2'
    }
});