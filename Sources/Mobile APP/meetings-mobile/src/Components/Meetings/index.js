import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';

import AppButton from '../General/AppButton';
import { MeetingsStoreContext } from '../../Store/MeetingsStore';

const Meetings = observer((props) => {
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
      <AppButton
        bgColor="rgba(111,38,74,0.7)"
        title="Login "
        action={props.login}
        iconName="sign-in"
        iconSize={30}
        iconColor="#fff"
      />
    </View>
  );
});

export default Meetings;
