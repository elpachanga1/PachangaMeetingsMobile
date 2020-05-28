import React, { useContext } from 'react';
import { Card, Text } from 'react-native-elements';
import { StyleSheet, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react';

import { UserStoreContext } from '../../Store/UserStore';
import Follows from '../Follows';

const manageMeeting = (editMeeting, removeMeeting, meeting) => {
  return (
    <View>
      <Button
        onPress={editMeeting(meeting)}
        buttonStyle={styles.buttons}
        title="Edit "
        icon={<Icon name="pencil" size={15} color="#fff" />}
        text="Edit "
        iconRight={true}
      />
      <Button
        onPress={removeMeeting(meeting)}
        buttonStyle={styles.buttons}
        title="Remove "
        icon={<Icon name="trash" size={15} color="#fff" />}
        text="Remove "
        iconRight={true}
      />
    </View>
  );
};

const MeetingDetail = observer((props) => {
  const { editMeeting, removeMeeting, meeting, user } = props;
  const userStore = useContext(UserStoreContext);

  return (
    <Card
      title={meeting.name}
      image={{
        uri: meeting.picture
          ? meeting.picture
          : require('../../../public/no-image-found-360x260.png'),
      }}
    >
      <Text style={styles.title}>{meeting.title}</Text>
      <Text style={styles.description}>{meeting.description}</Text>
      {userStore.user.user &&
        manageMeeting(editMeeting, removeMeeting, meeting)}
      <Follows id={meeting.id} />
    </Card>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  description: {
    fontSize: 18,
    marginVertical: 15,
  },
  buttons: {
    backgroundColor: 'rgba(255, 38, 74, 0.6)',
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 5,
    alignSelf: 'center',
    width: 150,
  },
});

export default MeetingDetail;
