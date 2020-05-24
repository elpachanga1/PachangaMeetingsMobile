import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useContext } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Card } from 'react-native-elements';
import { observer } from 'mobx-react';
import AppButton from '../Components/AppButton';

import { auth0ClientId, authorizationEndpoint } from '../../config';
import { UserStoreContext } from '../Store';

const useProxy = Platform.select({
  web: false,
  default: true,
});

const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

const Login = observer(() => {
  const userStore = useContext(UserStoreContext);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    {
      authorizationEndpoint,
    }
  );

  useEffect(() => {
    if (result) {
      if (result.error) {
        Toast.showWithGravity(
          result.params.error_description || 'something went wrong',
          Toast.LONG,
          Toast.BOTTOM
        );

        userStore.user = {};
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const token = result.params.id_token;
        const decoded = jwtDecode(token);
        console.log(decoded);

        const { nickname } = decoded;

        userStore.user = {
          token,
          user: decoded,
        };

        Toast.showWithGravity(`Welcome ${nickname}`, Toast.LONG, Toast.BOTTOM);
      }
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Card wrapperStyle={{ paddingLeft: 10 }} title="Sign in">
        <AppButton
          bgColor="rgba(111, 38, 74, 0.7)"
          title="Log in with Auth0 "
          action={() =>
            promptAsync({
              useProxy,
            })
          }
          iconName="sign-in"
          iconSize={30}
          iconColor="#fff"
        />
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default Login;
