import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import { Database } from '../Database';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Note extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Oops Woopsy')
        }
    }

    render() {
        const { navigation } = this.props;
        const content = navigation.getParam('content', 'Yo, nothing is here dawg');
        const id = navigation.getParam('id', -1);

        return (
            <View style={styles.container}>
                <Text style={styles.content}>{content}</Text>
                <ActionButton 
                    buttonColor="rgba(119,119,119,1)"
                    onPress={() => this.deleteNote(id)}
                    hideShadow={false}
                    fixNativeFeedbackRadius={true}
                    renderIcon={(active) => {
                        return <Icon name="delete" style={styles.actionButtonIcon} />
                    }}>
                </ActionButton>
            </View>
        );
    }

    deleteNote(id) {
        let db = new Database();
        db.loadDB();
        db.deleteNoteById(id).then(() => {
            this.props.navigation.navigate('Home');
        }).catch(error => console.log(error));
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
    },
    content: {
        fontSize: 20
    },
    actionButtonIcon: {
        fontSize: 24,
        height: 22,
        color: 'white'
    }
});