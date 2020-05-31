import React, { useContext } from 'react';
import { Alert, StyleSheet, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react';

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
    <View>
      <Button
        onPress={() => editMeeting(meeting, navigation)}
        buttonStyle={styles.buttons}
        title="Edit "
        icon={<Icon name="pencil" size={15} color="#fff" />}
        text="Edit "
        iconRight={true}
      />
      <Button
        onPress={() => removeMeetingAlert(meeting, token, navigation)}
        buttonStyle={styles.buttons}
        title="Remove "
        icon={<Icon name="trash" size={15} color="#fff" />}
        text="Remove "
        iconRight={true}
      />
    </View>
  );
});

export default MeetingCommands;

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: 'rgba(255, 38, 74, 0.6)',
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 15,
    alignSelf: 'center',
    width: 150,
  },
});
