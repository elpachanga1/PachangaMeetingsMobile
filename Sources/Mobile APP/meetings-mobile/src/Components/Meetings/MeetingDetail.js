import React, { useContext } from 'react';
import { Card, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

import { UserStoreContext } from '../../Store/UserStore';
import Follows from '../Follows';
import MeetingCommands from './MeetingCommands';
import PlaceShower from '../Maps/PlaceShower';

const MeetingDetail = observer((props) => {
  const { meeting, navigation } = props;
  const userStore = useContext(UserStoreContext);

  let user = userStore.user.user
    ? {
        user: userStore.user.user,
        token: userStore.user.token,
      }
    : null;

  return (
    <Card
      title={meeting.name}
      image={
        meeting.picture
          ? { uri: meeting.picture }
          : require('../../../public/no-image-found-360x260.png')
      }
    >
      <Text style={styles.title}>{meeting.title}</Text>
      <Text style={styles.description}>{meeting.description}</Text>
      {user && meeting.created_by === user.user.sub ? (
        <MeetingCommands
          meeting={meeting}
          token={user.token}
          navigation={navigation}
        />
      ) : null}
      <PlaceShower
        latitude={meeting.latitude}
        longitude={meeting.longitude}
        location_name={meeting.location_name}
      />
      <Follows id={meeting.id} user={user} />
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
    marginBottom: 15,
    alignSelf: 'center',
    width: 150,
  },
});

export default MeetingDetail;
