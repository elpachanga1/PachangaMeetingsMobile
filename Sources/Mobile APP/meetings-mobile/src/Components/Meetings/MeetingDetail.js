import React, { Component } from 'react';
import AppButton from '../General/AppButton';
import { Card, Text } from 'react-native-elements';

export default class MeetingDetail extends Component {
  render() {
    const { editMeeting, goHome, meeting } = this.props;

    return (
      <Card
        title={meeting.name}
        image={
          meeting.picture
            ? {
                uri: meeting.picture,
              }
            : require('../../../public/no-image-found-360x260.png')
        }
      >
        <Text style={{ marginBottom: 10, marginTop: 10 }}>
          {meeting.description}
        </Text>

        <AppButton
          bgColor="rgba(255, 38, 74, 0.8)"
          title="Edit Meeting "
          action={editMeeting}
          iconName="pencil"
          iconSize={30}
          iconColor="#fff"
        />

        <AppButton
          bgColor="rgba(28, 25, 21, 0.7)"
          title="Go Back "
          action={goHome}
          iconName="arrow-left"
          iconSize={30}
          iconColor="#fff"
        />
      </Card>
    );
  }
}
