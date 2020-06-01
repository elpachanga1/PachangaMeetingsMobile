import React, { Component } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import { MAPS_CLIENT_ID, MAPS_API_URL_AUTOCOMPLETE } from '../../../config';

export default class PlaceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: [],
      destinationInput: '',
    };

    this.getPlaces = this.getPlaces.bind(this);
    this.setDestination = this.setDestination.bind(this);
    //esto le da un tiempo muerto para que el usuario pueda terminar de escribir la palabra a buscar y asi reducir el numero de llamados a la API de Google
    this.getPlacesDebounced = _.debounce(this.getPlaces, 1000);
  }

  async getPlaces(input) {
    const { userLatitude, userLongitude } = this.props;

    const result = await axios.get(
      `${MAPS_API_URL_AUTOCOMPLETE}?key=${MAPS_CLIENT_ID}&input=${input}&location=${userLatitude}, ${userLongitude}&radius=2000`
    );

    console.log(result.data);

    this.setState({ predictions: result.data.predictions });
  }

  setDestination(main_text, place_id) {
    Keyboard.dismiss();
    this.setState({ destinationInput: main_text, predictions: [] });
    this.props.showDirectionsOnMap(place_id);
  }

  render() {
    const predictions = this.state.predictions.map((prediction) => (
      <TouchableOpacity
        key={prediction.id}
        onPress={() =>
          this.setDestination(
            prediction.structured_formatting.main_text,
            prediction.place_id
          )
        }
      >
        <View style={styles.SuggestionStyle}>
          <Text style={styles.MainTextStyle}>
            {prediction.structured_formatting.main_text}
          </Text>
          <Text style={styles.SecondaryTextStyle}>
            {prediction.structured_formatting.secondary_text}
          </Text>
        </View>
      </TouchableOpacity>
    ));

    return (
      <View>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(input) => {
            this.setState({ destinationInput: input });
            this.getPlacesDebounced(input);
          }}
          style={styles.PlaceInputStyle}
          placeholder="Select a site"
          value={this.state.destinationInput}
        />
        {predictions}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PlaceInputStyle: {
    height: 40,
    marginTop: 50,
    padding: 5,
    backgroundColor: 'white',
  },
  SuggestionStyle: {
    backgroundColor: 'white',
    padding: 5,
    borderTopWidth: 0.5,
    borderColor: '#777',
  },
  MainTextStyle: {
    color: '#000',
  },
  SecondaryTextStyle: {
    color: '#777',
  },
});
