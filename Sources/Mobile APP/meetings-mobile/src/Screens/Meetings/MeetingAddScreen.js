/* eslint-disable react/no-string-refs */
import React, { useState, useContext, useRef, useEffect } from 'react';
import t from 'tcomb-form-native';
import { Card } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { observer } from 'mobx-react';

import AppButton from '../../Components/General/AppButton';
import CameraManager from '../../Components/Image/CameraManagerV2';

import { options, Meeting } from '../../Forms/MeetingForm';
import { MeetingsStoreContext } from '../../Store/MeetingsStore';
import { UserStoreContext } from '../../Store/UserStore';

const Form = t.form.Form;

const AddMeeting = observer((props) => {
  const meetingStore = useContext(MeetingsStoreContext);
  const userStore = useContext(UserStoreContext);

  const [picture, setPicture] = useState('');
  const [meeting, setMeeting] = useState({
    title: '',
    description: '',
  });

  const formRef = useRef(null);

  const meetingDetailNavigation = (meeting, navigation) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'MeetingDetailScreen',
      params: { meeting },
    });
    navigation.dispatch(navigateAction);
  };

  const mapNavigation = (meeting, navigation) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'MapScreen',
      params: { meeting },
    });
    navigation.dispatch(navigateAction);
  };

  const save = async () => {
    const validate = formRef.current.getValue();

    if (validate) {
      let request = Object.assign({}, validate);
      request.user_id = userStore.user.user.sub;

      if (meeting.location_name) request.location_name = meeting.location_name;
      if (meeting.latitude) request.latitude = meeting.latitude;
      if (meeting.longitude) request.longitude = meeting.longitude;
      if (picture) request.picture = picture;

      const newMeeting = await meetingStore.addMeeting(
        userStore.user.token,
        request
      );

      if (meetingStore.state === 'done') {
        Toast.showWithGravity('Meeting Created', Toast.LONG, Toast.BOTTOM);
        meetingDetailNavigation(newMeeting, props.navigation);
      } else {
        Toast.showWithGravity(
          `Meeting Couldnt Be Created: ${meetingStore.state}`,
          Toast.LONG,
          Toast.BOTTOM
        );
      }
    }
  };

  const onChange = (e) => {
    setMeeting(e);
  };

  //useEffect like componentDidUpdate to update meeting hook
  useEffect(() => {
    if (meeting !== props.navigation.getParam('meeting'))
      setMeeting(props.navigation.getParam('meeting'));
  }, [props.navigation.getParam('meeting')]);

  return (
    <View style={styles.container}>
      <Card title="Add Meeting">
        <View>
          <Form
            ref={formRef}
            type={Meeting}
            options={options}
            value={meeting}
            onChange={(v) => onChange(v)}
          />
        </View>
        <CameraManager setPicture={setPicture} />
      </Card>
      <AppButton
        bgColor="rgba(255, 38, 74, 0.9)"
        title="Select Map Location "
        action={() => mapNavigation(meeting, props.navigation)}
        iconName="pencil"
        iconSize={30}
        iconColor="#fff"
        setWidth={true}
      />
      <View style={{ marginVertical: 15 }} />
      <AppButton
        bgColor="rgba(255, 38, 74, 0.9)"
        title="Add "
        action={save}
        iconName="plus"
        iconSize={30}
        iconColor="#fff"
        setWidth={true}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(231, 228, 224, 0.8)',
    padding: 10,
  },
});

export default AddMeeting;
