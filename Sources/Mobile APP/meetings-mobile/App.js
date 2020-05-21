import React, {
  useState
} from 'react';
import PreLoader from './src/Components/PreLoader';
import GuestNavigation from './src/Navigations/Guest';

//Disable yellow warning messages
console.disableYellowBox = true;

export default function App() {
  const [isLogged, setIsLogger] = useState(false);
  const [loaded, setLoaded] = useState(false);

  //if (!loaded) return <PreLoader />;

  return <GuestNavigation / > ;
}