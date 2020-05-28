import { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import Toast from 'react-native-simple-toast';
import { UserStoreContext } from '../../Store/UserStore';

const Logout = observer(() => {
  const userStore = useContext(UserStoreContext);

  useEffect(() => {
    userStore.user = {};

    Toast.showWithGravity('Logged out Succesful', Toast.LONG, Toast.BOTTOM);
  }, []);

  return null;
});

export default Logout;
