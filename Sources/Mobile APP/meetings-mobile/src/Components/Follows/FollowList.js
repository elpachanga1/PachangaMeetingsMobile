/* eslint-disable no-undef */
import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';

import FollowItem from './FollowItem';

//default function
export default function FollowList(props) {
  const { follows } = props;

  return follows && follows.length > 0 ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={follows}
        renderItem={({ item }) => <FollowItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  ) : (
    <Text style={styles.title}>There Are Not Followers Yet</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
