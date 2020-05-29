/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Constants from 'expo-constants';

import MeetingItem from './MeetingItem';
import AppButton from '../General/AppButton';

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

//some consts
const NUM_COLUMNS = 2;
const MARGIN_HORIZONTAL = 10;

//navigation to detailed meeting
function addMeeting(navigation) {
  const navigateAction = NavigationActions.navigate({
    routeName: 'MeetingAddScreen',
  });
  navigation.dispatch(navigateAction);
}

//default function
export default function MeetingList(props) {
  const { meetings, navigation, user } = props;
  const screenData = useScreenDimensions();

  //width equations
  let itemWidth = screenData.width / NUM_COLUMNS;
  itemWidth = itemWidth - NUM_COLUMNS * MARGIN_HORIZONTAL;
  if (screenData.isLandscape) itemWidth = itemWidth - 40;

  return (
    <SafeAreaView style={styles.container}>
      {user.user ? (
        <AppButton
          bgColor="rgba(255, 38, 74, 0.6)"
          title="Add Meeting "
          action={() => addMeeting(navigation)}
          iconName="plus"
          iconSize={30}
          iconColor="#fff"
          setWidth={true}
        />
      ) : null}
      <FlatList
        data={formatData(meetings)}
        renderItem={({ item }) => (
          <MeetingItem item={item} width={itemWidth} navigation={navigation} />
        )}
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
});
