import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import MeetingDetail from '../../Components/Meetings/MeetingDetail';

const DetailMeeting = (props) => {
  const [meeting, setMeeting] = useState(props.navigation.getParam('meeting'));

  //useEffect like componentDidUpdate to update meeting hook
  useEffect(() => {
    if (meeting !== props.navigation.getParam('meeting'))
      setMeeting(props.navigation.getParam('meeting'));
  }, [props.navigation.getParam('meeting')]);

  return (
    <ScrollView>
      <MeetingDetail meeting={meeting} navigation={props.navigation} />
    </ScrollView>
  );
};

export default DetailMeeting;
