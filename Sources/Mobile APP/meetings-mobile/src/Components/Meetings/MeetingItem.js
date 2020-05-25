import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

//item render
export default function Item({ item, width }) {
  const styleWidth = {
    width,
  };

  if (!item.title)
    return <View style={[styles.item, styles.itemInvisible, styleWidth]} />;

  return (
    <View style={[styles.item, styleWidth]}>
      <Image
        style={styles.image}
        source={
          item.picture
            ? {
                uri: item.picture,
              }
            : require('../../../public/no-image-found-360x260.png')
        }
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
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
