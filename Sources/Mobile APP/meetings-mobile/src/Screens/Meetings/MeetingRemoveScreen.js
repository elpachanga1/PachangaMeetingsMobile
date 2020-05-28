import { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';
import { MeetingStoreContext } from '../../Store/MeetingsStore';
import { UserStoreContext } from '../../Store/UserStore';

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

  useEffect(() => {
    meetingStore.meetings = meetingStore.meetings.filter(
      (x) => x.id !== props.meeting.id
    );

    Toast.showWithGravity(
      'Meeting Succesfully Deleted',
      Toast.LONG,
      Toast.BOTTOM
    );
    meetingListNavigation(props.navigation);
  }, []);

  return null;
});

export default RemoveMeeting;
