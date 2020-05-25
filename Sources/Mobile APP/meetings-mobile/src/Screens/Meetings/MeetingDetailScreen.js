import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView } from 'react-native';
import MeetingDetail from '../../Components/Meetings/MeetingDetail';

export default class DetailMeeting extends Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;

    this.state = {
      meeting: params.meeting,
    };
  }

  editMeeting() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'EditMeeting',
      params: { meeting: this.state.meeting },
    });
    this.props.navigation.dispatch(navigateAction);
  }

  goHome() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'StartScreen',
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { meeting } = this.state;
    return (
      <ScrollView>
        <MeetingDetail
          goHome={this.goHome.bind(this)}
          editMeeting={this.editMeeting.bind(this)}
          meeting={meeting}
        />
      </ScrollView>
    );
  }
}
