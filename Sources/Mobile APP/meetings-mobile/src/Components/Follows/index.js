import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';

import { backendAPIURL } from '../../../config';
import FollowList from './FollowList';
import Preloader from '../General/PreLoader';

const Follows = (props) => {
  const [follows, setFollows] = useState([]);
  const [status, setStatus] = useState(''); // "pending" / "done" / "error"

  //request to get follows
  const getFollowsPerID = async (id) => {
    try {
      setStatus('pending');
      const response = await axios.get(`${backendAPIURL}/${id}/following`);

      setFollows(response.data.body);
      setStatus('done');
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  //lifecicle event
  useEffect(() => {
    getFollowsPerID(props.id);
  }, []);

  //loading follows (render logic)
  const LoadFollows = () => {
    if (status === 'pending') return <Preloader />;
    else if (status === 'error')
      return (
        <Text style={styles.title}>Follows Not Available, Try Again !!!</Text>
      );
    else return <FollowList follows={follows} />;
  };

  //final return (render)
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Text style={styles.title}>Follows</Text>
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
});

export default Follows;
