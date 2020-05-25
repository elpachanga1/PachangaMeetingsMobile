import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

import MeetingsList from './MeetingsList';
import { MeetingsStoreContext } from '../../Store/MeetingsStore';
import Preloader from '../General/PreLoader';

const Meetings = observer((props) => {
  const meetingsStore = useContext(MeetingsStoreContext);

  const queryAPI = async () => {
    await meetingsStore.getMeetings();
  };

  useEffect(() => {
    queryAPI();
  }, []);

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
