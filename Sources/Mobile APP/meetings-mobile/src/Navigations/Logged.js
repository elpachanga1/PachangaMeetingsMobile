import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import StartScreen from '../Screens/Meetings/MeetingListScreen';
import LogoutScreen from '../Screens/Authentication/LogoutScreen';
import MeetingDetailScreen from '../Screens/Meetings/MeetingDetailScreen';
import MeetingEditScreen from '../Screens/Meetings/MeetingEditScreen';
import MeetingAddScreen from '../Screens/Meetings/MeetingAddScreen';
import MeetingRemoveScreen from '../Screens/Meetings/MeetingRemoveScreen';

//navigation options (some default styles)
const navigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'rgba(200, 38, 74, 1)',
    },
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold',
      flex: 1,
    },
  },
};

//navigation buttons
const leftIcon = (navigation, icon) => (
  <Icon
    name={icon}
    style={{ marginLeft: 20 }}
    size={20}
    color="white"
    onPress={() => navigation.openDrawer()}
  />
);

const rightIcon = (navigation, icon) => (
  <Icon
    name={icon}
    style={{ marginLeft: 20 }}
    size={30}
    color="white"
    onPress={() => navigation.navigate('StartScreen')}
  />
);

//navigation section meetings
const MeetingScreenStack = createStackNavigator(
  {
    StartScreen: {
      screen: StartScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: 'Meetings Portal',
        headerLeft: leftIcon(navigation, 'bars'),
      }),
    },
    MeetingDetailScreen: {
      screen: MeetingDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Meeting',
        headerLeft: rightIcon(navigation, 'arrow-left'),
      }),
    },
    MeetingEditScreen: {
      screen: MeetingEditScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Meeting',
        headerLeft: rightIcon(navigation, 'arrow-left'),
      }),
    },
    MeetingAddScreen: {
      screen: MeetingAddScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Add Meeting',
        headerLeft: rightIcon(navigation, 'arrow-left'),
      }),
    },
    MeetingRemoveScreen: {
      screen: MeetingRemoveScreen,
      navigationOptions: () => ({
        title: 'Remove Meeting',
      }),
    },
  },
  navigationOptions
);

//navigation section login
const LogoutScreenStack = createStackNavigator(
  {
    LogoutScreen: {
      screen: LogoutScreen,
      navigationOptions: () => ({
        title: 'Log Out',
      }),
    },
  },
  navigationOptions
);

//navigation section rigth drop-down menu
const RootStack = createDrawerNavigator(
  {
    StartScreen: {
      screen: MeetingScreenStack,
      navigationOptions: () => ({
        drawerLabel: 'Meetings Portal',
        drawerIcon: ({ tintColor }) => {
          <Icon name="home" size={30} style={{ color: tintColor }} />;
        },
      }),
    },
    LogoutScreen: {
      screen: LogoutScreenStack,
      navigationOptions: () => ({
        drawerLabel: 'Log Out',
        drawerIcon: ({ tintColor }) => {
          <Icon name="sign-in" size={30} style={{ color: tintColor }} />;
        },
      }),
    },
  },
  {
    drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
    contentOptions: {
      activeTintColor: 'white',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: 'white',
      itemsContainerStyle: {
        marginVertical: 0,
      },
    },
    initialRouteName: 'StartScreen',
    defaultNavigationOptions: navigationOptions,
  }
);

export default createAppContainer(RootStack);
