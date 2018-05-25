import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, TextInput} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Database } from '../Database';

export default class NewNote extends Component {
    
    static navigationOptions =  {
        title: 'New Note'
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Title"
                    onChangeText={(text) => this.setState({title: text})}
                    style={styles.title}
                />
                <TextInput 
                    placeholder="Note content"
                    onChangeText={(text) => this.setState({content: text})}
                    style={styles.content}
                    multiline={true}
                />
                <ActionButton 
                    buttonColor="rgba(92,214,92,1)"
                    onPress={() => this.saveNote()}
                    hideShadow={false}
                    fixNativeFeedbackRadius={true}
                    renderIcon={(active) => {
                        return <Icon name="save" style={styles.actionButtonIcon} />
                    }}>
                </ActionButton>
            </View>
        );
    }

    saveNote() {
        let db = new Database();
        db.loadDB();
        let saveProm = db.saveNote(this.state.title, this.state.content);
        saveProm.then(() =>  this.props.navigation.navigate('Home'))
        .catch(error => console.log(error));
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
    },
    title: {
        flex: 2,
        height:1
    },
    content: {
        flex: 20,
        height: 30,
        paddingVertical: 0
    },
    actionButtonIcon: {
        fontSize: 24,
        height: 22,
        color: 'white'
    }
});