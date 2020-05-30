import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import MeetingDetail from '../../Components/Meetings/MeetingDetail';

export default class DetailMeeting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meeting: props.navigation.getParam('meeting'),
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.setState(this.props.navigation.getParam('meeting'));
  }

  render() {
    return (
      <ScrollView>
        <MeetingDetail
          meeting={this.state.meeting}
          navigation={this.props.navigation}
        />
      </ScrollView>
    );
  }
}
