import React from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import AppButton from '../Components/AppButton';

export default function Start(props) {
  const login = () => {
    const NavigateAction = NavigationActions.navigate({
      routeName: 'LoginScreen',
    });
    props.navigation.dispatch(NavigateAction);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <AppButton
        bgColor="rgba(111,38,74,0.7)"
        title="Login "
        action={login}
        iconName="sign-in"
        iconSize={30}
        iconColor="#fff"
      />
    </View>
  );
}
