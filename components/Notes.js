import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert} from 'react-native';
import NoteRow from './NoteRow';

export default class Notes extends Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
            <View style={styles.container}>
              <SectionList
                sections={[
                  {title: '2018', data: this.props.notes, notes: this.props.notes},
                ]}
                renderItem={({section, item}) => <NoteRow section={section} item={item.title} itemObj={item} navigation={this.props.navigation}/>}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
              />
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
    flex: 1
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    }
});
