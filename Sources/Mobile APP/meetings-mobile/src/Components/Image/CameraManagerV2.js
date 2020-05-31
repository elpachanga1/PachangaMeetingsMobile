import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class CameraManager extends React.Component {
  state = {
    image: null,
  };

  selectPicture = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) this.setState({ image: result.uri });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  takePicture = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA);
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });
      if (!result.cancelled) this.setState({ image: result.uri });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.image && (
          <Image style={styles.image} source={{ uri: this.state.image }} />
        )}
        <View style={styles.row}>
          <Button onPress={this.selectPicture}>Gallery</Button>
          <Button onPress={this.takePicture}>Camera</Button>
        </View>
      </View>
    );
  }
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
  },
  row: { flexDirection: 'row' },
  image: { width: 300, height: 300, backgroundColor: 'gray' },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
