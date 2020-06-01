import React, { Component, Fragment } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import axios from 'axios';
import * as Permissions from 'expo-permissions';
import Polyline from '@mapbox/polyline';
import MapView, * as Maps from 'react-native-maps';

import PlaceInput from '../../Components/Maps/PlaceInput';
import PlaceSelector from '../../Components/Maps/PlaceSelector';
import { MAPS_CLIENT_ID, MAPS_API_URL_DIRECTIONS } from '../../../config';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMapPermissions: false,
      userLatitude: 0,
      userLongitude: 0,
      destinationCoords: [],
      destinationName: '',
    };
    this.locationWatchID = null;
    this.showDirectionsOnMap = this.showDirectionsOnMap.bind(this);
    this.setDestinationName = this.setDestinationName.bind(this);
    this.map = React.createRef(); //referencia para tamaño de mapa
  }

  componentDidMount() {
    this.requestFineLocation();
  }

  //limpio cache cuando ya no necesite la vista
  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.clearWatch(this.locationWatchID);
  }

  //funcion para obtener la ruta desde el inicio (ubicacion del usuario) hasta el fin (lugar deseado)
  async showDirectionsOnMap(placeId) {
    const { userLatitude, userLongitude } = this.state;

    try {
      //peticion a Google Maps para obtener la ruta
      const result = await axios.get(
        `${MAPS_API_URL_DIRECTIONS}?origin=${userLatitude},${userLongitude}&destination=place_id:${placeId}&key=${MAPS_CLIENT_ID}`
      );
      //se decodifica el arreglo obtenido con la ruta desde el inicio hasta el fin
      const points = Polyline.decode(
        result.data.routes[0].overview_polyline.points
      );
      //se transforma array segun la necesidad del componente Polyline
      const latLong = points.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
      this.setState({ destinationCoords: latLong });
      this.map.current.fitToCoordinates(latLong, {
        edgePadding: { top: 40, bottom: 40, right: 40, left: 40 },
      });
    } catch (err) {
      console.error(err);
    }
  }

  setDestinationName(name) {
    this.setState({ destinationName: name });
  }

  //funcion para ocultar el teclado, (usar con TouchableWithoutFeedback)
  hideKeyboard() {
    Keyboard.dismiss();
  }

  //obtencion de los valores del mapa
  getUserLocation() {
    this.setState({ hasMapPermissions: true });

    //se obtienen los datos del geolocalizador y se pintan desde el componentDidMount
    // eslint-disable-next-line no-undef
    this.locationWatchID = navigator.geolocation.watchPosition(
      (pos) => {
        this.setState({
          userLatitude: pos.coords.latitude,
          userLongitude: pos.coords.longitude,
        });
      },
      (error) => console.warn(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  //funcion para preguntar si usuario da permiso de usar locacion del telefono
  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status === 'granted') {
          this.getUserLocation();
        }
      } else {
        this.getUserLocation();
      }
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    const {
      destinationCoords,
      userLatitude,
      userLongitude,
      hasMapPermissions,
    } = this.state;

    let polyline = null;
    let marker = null;

    const location =
      destinationCoords.length > 0
        ? destinationCoords[destinationCoords.length - 1]
        : null;
    if (destinationCoords.length > 0) {
      polyline = (
        <Maps.Polyline
          coordinates={destinationCoords}
          strokeWidth={6}
          strokeColor="#000"
        />
      );

      marker = <Maps.Marker coordinate={location} />;
    }

    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={styles.container}>
          {hasMapPermissions ? (
            <Fragment>
              <MapView
                ref={this.map}
                showsUserLocation //Muestra locacion del usuario
                followsUserLocation //sigue locacion del usuario (solo IOS)
                style={styles.map}
                region={{
                  latitude: userLatitude,
                  longitude: userLongitude,
                  latitudeDelta: 0.015, //zoom del mapa (valores por defecto)
                  longitudeDelta: 0.0121,
                }}
              >
                {/*polyline*/}
                {marker}
              </MapView>

              <PlaceInput
                showDirectionsOnMap={this.showDirectionsOnMap}
                userLatitude={userLatitude}
                userLongitude={userLongitude}
                setDestinationName={this.setDestinationName}
              />
              <PlaceSelector
                destinationName={this.state.destinationName}
                navigation={this.props.navigation}
                meeting={this.props.navigation.getParam('meeting')}
                location={location}
              />
            </Fragment>
          ) : (
            <Text>
              Google Maps API KEY is Outdated, Report this Issue with the
              Project Administrator
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
