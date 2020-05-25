/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

//item render
function Item({ title, width }) {
  const styleWidth = {
    width,
  };

  if (!title)
    return <View style={[styles.item, styles.itemInvisible, styleWidth]} />;

  return (
    <View style={[styles.item, styleWidth]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

//function to manage order of boxes in FlatList
function formatData(data) {
  const numberOfFullRows = Math.floor(data.length / NUM_COLUMNS);
  let numberOfElementsLastRow = data.length - numberOfFullRows * NUM_COLUMNS;

  while (
    numberOfElementsLastRow !== NUM_COLUMNS &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, title: null });
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }

  return data;
}

//custom hooks to change dimensions according to screen orientation
const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};

const NUM_COLUMNS = 2;
const MARGIN_HORIZONTAL = 16;

export default function MeetingList(props) {
  const { meetings } = props;
  const screenData = useScreenDimensions();

  //width equations
  let itemWidth = screenData.width / NUM_COLUMNS;
  itemWidth = itemWidth - NUM_COLUMNS * MARGIN_HORIZONTAL;
  if (screenData.isLandscape) itemWidth = itemWidth - 40;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={formatData(meetings)}
        renderItem={({ item }) => <Item title={item.title} width={itemWidth} />}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: MARGIN_HORIZONTAL,
    height: 250,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
  },
});
