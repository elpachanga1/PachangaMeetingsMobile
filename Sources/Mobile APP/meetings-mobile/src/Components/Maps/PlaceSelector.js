import React from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';

import AppButton from '../General/AppButton';

//navigation to edit meeting
function editMeeting(meeting, navigation) {
  const navigateAction = NavigationActions.navigate({
    routeName: 'MeetingEditScreen',
    params: { meeting },
  });
  navigation.dispatch(navigateAction);
}

const PlaceSelector = (props) => {
  //arrow function to validate if a valid place has been selected
  const validatePlace = () => {
    const location_name = props.destinationName;
    if (!location_name)
      return Alert.alert(
        'Select a Place',
        'You Should Select a Place Before Close This Screen',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    else {
      Toast.showWithGravity(
        `Place ${location_name} Selected`,
        Toast.LONG,
        Toast.BOTTOM
      );

      editMeeting(
        {
          ...props.meeting,
          location_name,
          latitude: props.location.latitude,
          longitude: props.location.longitude,
        },
        props.navigation
      );
    }
  };

  return (
    <AppButton
      bgColor="rgba(255, 38, 74, 0.6)"
      title="Select Place "
      action={() => validatePlace()}
      iconName="plus"
      iconSize={30}
      iconColor="#fff"
      setWidth={true}
    />
  );
};

export default PlaceSelector;
