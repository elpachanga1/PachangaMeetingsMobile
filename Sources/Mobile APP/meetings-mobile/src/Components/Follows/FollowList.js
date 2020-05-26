/* eslint-disable no-undef */
import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import AppButton from '../General/AppButton';

import FollowItem from './FollowItem';

//default function
export default function FollowList(props) {
  const { follows, addFollow } = props;

  return follows && follows.length > 0 ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={follows}
        renderItem={({ item }) => <FollowItem item={item} />}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.buttonContainer}>
        <AppButton
          bgColor="rgba(255, 38, 74, 0.6)"
          title="Follow "
          action={addFollow}
          iconName="plus"
          iconSize={30}
          iconColor="#fff"
          setWidth={true}
        />
      </View>
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
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
  },
});
