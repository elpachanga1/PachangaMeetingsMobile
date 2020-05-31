import React, { useContext } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react';
import AppButton from '../General/AppButton';

import { MeetingsStoreContext } from '../../Store/MeetingsStore';

//navigation to edit meeting
function editMeeting(meeting, navigation) {
  const navigateAction = NavigationActions.navigate({
    routeName: 'MeetingEditScreen',
    params: { meeting },
  });
  navigation.dispatch(navigateAction);
}

const MeetingCommands = observer((props) => {
  const { meeting, token, navigation } = props;
  const meetingStore = useContext(MeetingsStoreContext);

  //remove meeting
  const removeMeetingAlert = (meeting, token, navigation) => {
    console.log('eliminar reunion');
    Alert.alert(
      'Delete Meeting',
      'Do you want to delete this Meeting',
      [
        {
          text: 'Cancel',
          //onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            meetingStore.removeMeeting(meeting, token);
            navigation.navigate('StartScreen');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.row}>
      <AppButton
        bgColor="rgba(255, 38, 74, 0.9)"
        title="Edit "
        action={() => editMeeting(meeting, navigation)}
        iconName="pencil"
        iconSize={30}
        iconColor="#fff"
      />
      <View style={{ width: 50 }} />
      <AppButton
        bgColor="rgba(255, 38, 74, 0.9)"
        title="Remove "
        action={() => removeMeetingAlert(meeting, token, navigation)}
        iconName="trash"
        iconSize={30}
        iconColor="#fff"
      />
    </View>
  );
});

export default MeetingCommands;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
