/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { Card } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import AppButton from '../../Components/General/AppButton';
import { options, Meeting } from '../../Forms/MeetingForm';

const Form = t.form.Form;

export default class AddMeeting extends Component {
  constructor() {
    super();
    this.state = {
      meeting: {
        title: '',
        description: '',
      },
    };
  }

  meetingListNavigation(meeting, navigation) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'StartScreen',
      params: { meeting },
    });
    navigation.dispatch(navigateAction);
  }

  save() {
    const validate = this.refs.form.getValue();

    if (validate) {
      let data = Object.assign({}, validate);
      //aqui va la peticion de actualizacion
      Toast.showWithGravity('Meeting Created', Toast.LONG, Toast.BOTTOM);
      //this.meetingListNavigation(this.state.meeting, this.props.navigation);
    }
  }

  onChange(meeting) {
    this.setState({ meeting });
  }

  render() {
    const { meeting } = this.state;

    return (
      <View style={styles.container}>
        <Card title="Add Meeting">
          <View>
            <Form
              ref="form"
              type={Meeting}
              options={options}
              value={meeting}
              onChange={(v) => this.onChange(v)}
            />
          </View>
          <AppButton
            bgColor="rgba(255, 38, 74, 0.9)"
            title="Add "
            action={this.save.bind(this)}
            iconName="plus"
            iconSize={30}
            iconColor="#fff"
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(231, 228, 224, 0.8)',
    padding: 10,
  },
});
