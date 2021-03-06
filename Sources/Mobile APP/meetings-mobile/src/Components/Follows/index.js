import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-simple-toast';

import { BACKEND_API_URL } from '../../../config';
import FollowList from './FollowList';
import Preloader from '../General/PreLoader';
import AppButton from '../General/AppButton';

const Follows = (props) => {
  const [follows, setFollows] = useState([]);
  const [status, setStatus] = useState(''); // "pending" / "done" / "error"

  //request to get follows
  const getFollowsPerID = async (id) => {
    try {
      setStatus('pending');
      const response = await axios.get(`${BACKEND_API_URL}/${id}/following`);

      setFollows(response.data.body);
      setStatus('done');
    } catch (error) {
      console.log(error);
      setStatus('error');
      Toast.showWithGravity('something went wrong', Toast.LONG, Toast.BOTTOM);
    }
  };

  //loading follows (render logic)
  const LoadFollows = () => {
    if (status === 'pending') return <Preloader />;
    else if (status === 'error')
      return (
        <Text style={styles.title}>Follows Not Available, Try Again !!!</Text>
      );
    else return <FollowList follows={follows} />;
  };

  //event to add a new follower
  const addFollow = async () => {
    try {
      const follow = {
        meeting_id: props.id,
        user_id: props.user.user.sub,
        picture: props.user.user.picture,
        nickname: props.user.user.nickname,
      };

      const config = {
        headers: { Authorization: `Bearer ${props.user.token}` },
      };

      await axios.post(`${BACKEND_API_URL}/follow`, follow, config);

      setFollows([...follows, follow]);

      Toast.showWithGravity(
        `User ${follow.nickname} Following This Event`,
        Toast.LONG,
        Toast.BOTTOM
      );
    } catch (error) {
      console.log(error);
      Toast.showWithGravity('something went wrong', Toast.LONG, Toast.BOTTOM);
    }
  };

  //lifecicle event
  useEffect(() => {
    getFollowsPerID(props.id);
  }, []);

  const visibilityAddButton =
    props.user &&
    follows.filter((x) => x.user_id === props.user.user.sub).length === 0;

  //final return (render)
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Text style={styles.title}>Follows</Text>

      {visibilityAddButton && (
        <View style={styles.buttonContext}>
          <AppButton
            bgColor="rgba(255, 38, 74, 0.6)"
            title="Follow "
            action={() => addFollow()}
            iconName="plus"
            iconSize={30}
            iconColor="#fff"
            setWidth={true}
          />
        </View>
      )}

      {LoadFollows()}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContext: {
    marginVertical: 10,
  },
});

export default Follows;
