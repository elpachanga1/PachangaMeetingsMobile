import React, { useEffect } from 'react';
import Toast from 'react-native-simple-toast';

export default function Logout() {
  useEffect(() => {
    Toast.showWithGravity('Logged out Succesful', Toast.LONG, Toast.BOTTOM);
  }, []);

  return null;
}
