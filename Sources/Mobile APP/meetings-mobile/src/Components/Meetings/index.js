import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

import MeetingsList from './MeetingsList';
import { MeetingsStoreContext } from '../../Store/MeetingsStore';
import { UserStoreContext } from '../../Store/UserStore';
import Preloader from '../General/PreLoader';
import AppButton from '../General/AppButton';

const Meetings = observer((props) => {
  const meetingsStore = useContext(MeetingsStoreContext);
  const userStore = useContext(UserStoreContext);

  //request to get meetings
  const getMeetingsAPI = async () => {
    await meetingsStore.getMeetings();
  };

  //lifecicle event
  useEffect(() => {
    getMeetingsAPI();
  }, []);

  //loading meetings (render logic)
  const LoadMeetings = () => {
    if (meetingsStore.state === 'pending') return <Preloader />;
    else if (meetingsStore.state === 'error')
      return (
        <View>
          <Text style={styles.title}>
            Meetings Not Available, Try Again !!!
          </Text>
          <AppButton
            bgColor="rgba(255, 38, 74, 0.6)"
            title="Tap To Retry "
            action={() => getMeetingsAPI()}
            iconName="refresh"
            iconSize={30}
            iconColor="#fff"
            setWidth={true}
          />
        </View>
      );
    else
      return (
        <MeetingsList
          meetings={meetingsStore.meetings}
          navigation={props.navigation}
          user={userStore.user}
        />
      );
  };

  //final return (render)
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        marginBottom: 10,
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
