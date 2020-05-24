import React from 'react';
import { Provider } from 'mobx-react';
import store from './src/Store';
import GuestNavigation from './src/Navigations/Guest';

//Disable yellow warning messages
console.disableYellowBox = true;

function App() {
  return (
    <Provider store={store}>
      <GuestNavigation />
    </Provider>
  );
}

export default App;
