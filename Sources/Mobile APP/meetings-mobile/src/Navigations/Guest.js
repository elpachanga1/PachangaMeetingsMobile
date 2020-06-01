import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import StartScreen from '../Screens/Meetings/MeetingListScreen';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import MeetingDetailScreen from '../Screens/Meetings/MeetingDetailScreen';
import MapScreen from '../Screens/Map/MapScreen';

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
  },
  navigationOptions
);

//navigation section login
const LoginScreenStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Log In - Sign Up',
        headerRight: rightIcon(navigation, 'home'),
        headerLeft: leftIcon(navigation, 'bars'),
      }),
    },
  },
  navigationOptions
);

//navigation section login
const MapScreenStack = createStackNavigator(
  {
    MapScreen: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Map',
        headerRight: rightIcon(navigation, 'home'),
        headerLeft: leftIcon(navigation, 'bars'),
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
    LoginScreen: {
      screen: LoginScreenStack,
      navigationOptions: () => ({
        drawerLabel: 'Log In - Sign Up',
        drawerIcon: ({ tintColor }) => {
          <Icon name="sign-in" size={30} style={{ color: tintColor }} />;
        },
      }),
    },
    MapScreen: {
      screen: MapScreenStack,
      navigationOptions: () => ({
        drawerLabel: 'Maps',
        drawerIcon: ({ tintColor }) => {
          <Icon name="map-marker" size={30} style={{ color: tintColor }} />;
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
