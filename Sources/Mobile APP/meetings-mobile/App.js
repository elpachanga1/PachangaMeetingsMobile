import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import GuestNavigation from './src/Navigations/Guest';
import LoggedNavigation from './src/Navigations/Logged';
import { UserStoreContext } from './src/Store/UserStore';

//Disable yellow warning messages
console.disableYellowBox = true;

const App = observer(() => {
  const userStore = useContext(UserStoreContext);

  return !userStore.user.token ? <GuestNavigation /> : <LoggedNavigation />;
});

export default App;
