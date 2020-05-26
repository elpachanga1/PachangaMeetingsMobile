import React, { Component } from 'react';
import { Card, Text } from 'react-native-elements';
import { StyleSheet, Dimensions, View } from 'react-native';
import Follows from '../Follows';

export default class MeetingDetail extends Component {
  render() {
    const { editMeeting, goHome, meeting } = this.props;

    return (
      <Card
        title={meeting.name}
        image={{
          uri: meeting.picture
            ? meeting.picture
            : require('../../../public/no-image-found-360x260.png'),
        }}
      >
        <Text style={styles.title}>{meeting.title}</Text>
        <Text style={styles.description}>{meeting.description}</Text>
        <Follows id={meeting.id} />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  description: {
    fontSize: 18,
    marginVertical: 15,
  },
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
