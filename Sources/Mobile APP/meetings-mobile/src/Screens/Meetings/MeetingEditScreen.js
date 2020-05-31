import React, { useState, useContext, useRef } from 'react';
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

const EditMeeting = observer((props) => {
  const meetingStore = useContext(MeetingsStoreContext);
  const userStore = useContext(UserStoreContext);

  const formRef = useRef(null);
  const [picture, setPicture] = useState('');
  const [meeting, setMeeting] = useState(props.navigation.getParam('meeting'));

  const meetingListNavigation = (navigation) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'StartScreen',
    });
    navigation.dispatch(navigateAction);
  };

  const update = async () => {
    const validate = formRef.current.getValue();

    if (validate) {
      let data = Object.assign({}, validate);
      data.user_id = userStore.user.user.aud;
      data.meeting_id = meeting.id;

      if (picture) data.picture = picture;

      await meetingStore.editMeeting(userStore.user.token, data, picture);

      if (meetingStore.state === 'done') {
        Toast.showWithGravity('Meeting Editted', Toast.LONG, Toast.BOTTOM);
        meetingListNavigation(props.navigation);
      } else {
        Toast.showWithGravity(
          `Meeting Couldnt Be Editted: ${meetingStore.state}`,
          Toast.LONG,
          Toast.BOTTOM
        );
      }
    }
  };

  const onChange = (e) => {
    setMeeting(e);
  };

  return (
    <View style={styles.container}>
      <Card title="Edit Meeting">
        <View>
          <Form
            ref={formRef}
            type={Meeting}
            options={options}
            value={meeting}
            onChange={(v) => onChange(v)}
          />
          <CameraManager setPicture={setPicture} />
        </View>
        <AppButton
          bgColor="rgba(255, 38, 74, 0.9)"
          title="Update "
          action={update}
          iconName="pencil"
          iconSize={30}
          iconColor="#fff"
          setWidth={true}
        />
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(231, 228, 224, 0.8)',
    padding: 10,
  },
});

export default EditMeeting;
