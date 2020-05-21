import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import StartScreen from '../Screens/Start';
import LoginScreen from '../Screens/Login';

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

const startScreenStack = createStackNavigator(
  {
    StartScreen: {
      screen: StartScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: 'Meetings Portal',
        headerLeft: leftIcon(navigation, 'bars'),
      }),
    },
  },
  navigationOptions
);

const loginScreenStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Login or Sign Up',
        headerRight: rightIcon(navigation, 'home'),
        headerLeft: leftIcon(navigation, 'bars'),
      }),
    },
  },
  navigationOptions
);

const RootStack = createDrawerNavigator(
  {
    StartScreen: {
      screen: startScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Meetings Portal',
        drawerIcon: ({ tintColor }) => {
          <Icon name="home" size={30} style={{ color: tintColor }} />;
        },
      }),
    },
    LoginScreen: {
      screen: loginScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'LogIn - SignUp',
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
