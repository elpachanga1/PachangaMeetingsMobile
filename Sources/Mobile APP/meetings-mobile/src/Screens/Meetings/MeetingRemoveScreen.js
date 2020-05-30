import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';
import { MeetingStoreContext } from '../../Store/MeetingsStore';
import { UserStoreContext } from '../../Store/UserStore';
import { View } from 'react-native';

//navigation to meeting list
function meetingListNavigation(navigation) {
  const navigateAction = NavigationActions.navigate({
    routeName: 'StartScreen',
  });
  navigation.dispatch(navigateAction);
}

const RemoveMeeting = observer((props) => {
  const meetingStore = useContext(MeetingStoreContext);
  const userStore = useContext(UserStoreContext);

  useEffect(async () => {
    await meetingStore.removeMeeting(
      props.navigation.state.params.meeting,
      userStore.user.token
    );

    if (meetingStore.state === 'done') {
      Toast.showWithGravity('Meeting Deleted', Toast.LONG, Toast.BOTTOM);
    } else {
      Toast.showWithGravity(
        'Meeting Couldnt Be Deleted',
        Toast.LONG,
        Toast.BOTTOM
      );
    }

    meetingListNavigation(props.navigation);
  }, []);

  return <View />;
});

export default RemoveMeeting;
