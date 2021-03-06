import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import AppButton from '../General/AppButton';

const CameraManager = (props) => {
  const [image, setImage] = useState(null);

  const selectPicture = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        props.setPicture(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const takePicture = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA);
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        props.setPicture(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        //<Image style={styles.image} source={{ uri: image }} />
        // eslint-disable-next-line no-useless-escape
        <Text style={styles.text}>{`Image Obtained !!!
        ${image.replace(/^.*[\\\/]/, '')} `}</Text>
      ) : (
        <Text style={styles.text}>There Is Not an Image Yet</Text>
      )}
      <View style={styles.row}>
        <AppButton
          bgColor="rgba(255, 38, 74, 0.9)"
          title="Gallery "
          action={() => selectPicture()}
          iconName="image"
          iconSize={30}
          iconColor="#fff"
        />
        <View style={{ width: 50 }} />
        <AppButton
          bgColor="rgba(255, 38, 74, 0.9)"
          title="Camera "
          action={() => takePicture()}
          iconName="camera"
          iconSize={30}
          iconColor="#fff"
        />
      </View>
    </View>
  );
};

export default CameraManager;

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    textAlign: 'center',
  },
  row: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
  },
  image: { width: 300, height: 300, backgroundColor: 'gray' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 100,
  },
});
