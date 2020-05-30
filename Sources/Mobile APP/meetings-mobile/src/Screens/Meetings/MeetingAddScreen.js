/* eslint-disable react/no-string-refs */
import React, { useState, useContext, useRef } from 'react';
import t from 'tcomb-form-native';
import { Card } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { observer } from 'mobx-react';
import moment from 'moment';

import AppButton from '../../Components/General/AppButton';
import { options, Meeting } from '../../Forms/MeetingForm';
import { MeetingsStoreContext } from '../../Store/MeetingsStore';
import { UserStoreContext } from '../../Store/UserStore';

const Form = t.form.Form;

const AddMeeting = observer((props) => {
  const meetingStore = useContext(MeetingsStoreContext);
  const userStore = useContext(UserStoreContext);

  const [meeting, setMeeting] = useState({
    title: '',
    description: '',
  });

  const formRef = useRef(null);

  const meetingListNavigation = (navigation) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'StartScreen',
    });
    navigation.dispatch(navigateAction);
  };

  const save = async () => {
    const validate = formRef.current.getValue();

    if (validate) {
      let data = Object.assign({}, validate);

      data.user_id = userStore.user.user.aud;

      await meetingStore.addMeeting(data, userStore.user.token);

      if (meetingStore.state === 'done') {
        Toast.showWithGravity('Meeting Created', Toast.LONG, Toast.BOTTOM);
        meetingListNavigation(props.navigation);
      } else {
        Toast.showWithGravity(
          'Meeting Couldnt Be Created',
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
        <AppButton
          bgColor="rgba(255, 38, 74, 0.9)"
          title="Add "
          action={save}
          iconName="plus"
          iconSize={30}
          iconColor="#fff"
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

export default AddMeeting;
