import React from 'react';
import Meetings from '../Components/Meetings';
import { NavigationActions } from 'react-navigation';

export default function Start(props) {
  const login = () => {
    const NavigateAction = NavigationActions.navigate({
      routeName: 'LoginScreen',
    });
    props.navigation.dispatch(NavigateAction);
  };

  return <Meetings login={login} />;
}
