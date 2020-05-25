import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';

import MeetingsList from './MeetingsList';
import { MeetingsStoreContext } from '../../Store/MeetingsStore';

const Meetings = observer(() => {
  const meetingsStore = useContext(MeetingsStoreContext);

  const queryAPI = async () => {
    await meetingsStore.getMeetings();
  };

  useEffect(() => {
    queryAPI();
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <MeetingsList meetings={meetingsStore.meetings} />
    </View>
  );
});

export default Meetings;
