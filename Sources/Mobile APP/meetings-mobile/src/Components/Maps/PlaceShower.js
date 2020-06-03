import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, * as Maps from 'react-native-maps';

//minimap
const PlaceShower = (props) => {
  const { latitude, longitude, location_name } = props;
  console.log(props);

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  let marker = <Maps.Marker coordinate={{ latitude: lat, longitude: lon }} />;

  const view = (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.015, //zoom del mapa (valores por defecto)
          longitudeDelta: 0.0121,
        }}
      >
        {marker}
      </MapView>
      <Text>{location_name}</Text>
    </View>
  );

  return lat !== 0 && lon !== 0 && location_name ? (
    view
  ) : (
    <Text style={styles.title}>
      There Arent a Location Stored in Our Database
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  map: {
    width: 300,
    height: 300,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default PlaceShower;
