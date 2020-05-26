import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function FollowItem({ item }) {
  return (
    <ListItem
      key={item.id}
      containerStyle={styles.item}
      titleStyle={styles.title}
      title={item.nickname}
      leftAvatar={{
        source: item.picture
          ? item.picture
          : require('../../../public/no-image-found-360x260.png'),
      }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 20,
  },
  listIconStyle: {
    marginRight: 10,
    color: 'rgba(255,38,74,0.6)',
  },
  item: {
    padding: 0,
    backgroundColor: 'white',
    marginVertical: 5,
  },
});
