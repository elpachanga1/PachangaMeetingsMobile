import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

import MeetingsList from './MeetingsList';
import { MeetingsStoreContext } from '../../Store/MeetingsStore';
import { UserStoreContext } from '../../Store/UserStore';
import Preloader from '../General/PreLoader';

const Meetings = observer((props) => {
  const meetingsStore = useContext(MeetingsStoreContext);
  const userStore = useContext(UserStoreContext);
  //sconsole.log(userStore);

  //request to get meetings
  const queryAPI = async () => {
    await meetingsStore.getMeetings();
  };

  //lifecicle event
  useEffect(() => {
    queryAPI();
  }, []);

  //loading meetings (render logic)
  const LoadMeetings = () => {
    if (meetingsStore.state === 'pending') return <Preloader />;
    else if (meetingsStore.state === 'error')
      return (
        <Text style={styles.title}>Meetings Not Available, Try Again !!!</Text>
      );
    else
      return (
        <MeetingsList
          meetings={meetingsStore.meetings}
          navigation={props.navigation}
        />
      );
  };

  //final return (render)
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
      }}
    >
      {LoadMeetings()}
    </View>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default Meetings;
