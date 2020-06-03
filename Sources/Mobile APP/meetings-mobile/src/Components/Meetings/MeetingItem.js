import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { BACKEND_API_HOST } from '../../../config';

//navigation to detailed meeting
function meetingDetail(meeting, navigation) {
  const navigateAction = NavigationActions.navigate({
    routeName: 'MeetingDetailScreen',
    params: { meeting },
  });
  navigation.dispatch(navigateAction);
}

//default function
export default function Item({ item, width, navigation }) {
  const styleWidth = {
    width,
  };

  if (!item.title)
    return <View style={[styles.item, styles.itemInvisible, styleWidth]} />;

  return (
    <TouchableOpacity onPress={() => meetingDetail(item, navigation)}>
      <View style={[styles.item, styleWidth]}>
        <Image
          style={styles.image}
          source={
            item.picture
              ? { uri: `${BACKEND_API_HOST}/${item.picture}` }
              : require('../../../public/no-image-found-360x260.png')
          }
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const MARGIN_HORIZONTAL = 10;
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#db585c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: MARGIN_HORIZONTAL,
    height: 250,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  image: {
    marginTop: 2,
    padding: 5,
    backgroundColor: 'white',
    resizeMode: 'contain',
    width: 130,
    height: 130,
  },
});
