import React, { Component, createRef } from 'react';
import { View, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import { Card } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import AppButton from '../../Components/General/AppButton';
import { options, Meeting } from '../../Forms/MeetingForm';

const Form = t.form.Form;

export default class EditMeeting extends Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.formRef = createRef();
    this.state = {
      meeting: params.meeting,
    };
  }

  update() {
    const validate = this.formRef.current.value;
    if (validate) {
      let data = Object.assign({}, validate);
      //aqui va la peticion de actualizacion
      this.meetingDetailNavigation(this.state.meeting, this.props.navigation);
    }
  }

  //navigation to detailed meeting
  meetingDetailNavigation(meeting, navigation) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'MeetingDetailScreen',
      params: { meeting },
    });
    navigation.dispatch(navigateAction);
  }

  onChange(meeting) {
    this.setState({ meeting });
  }

  render() {
    const { meeting } = this.state;

    return (
      <View style={styles.container}>
        <Card title="Edit Meeting">
          <View>
            <Form
              ref={this.formRef}
              type={Meeting}
              options={options}
              value={meeting}
              onChange={(v) => this.onChange(v)}
            />
          </View>
          <AppButton
            bgColor="rgba(255, 38, 74, 0.9)"
            title="Update "
            action={this.update.bind(this)}
            iconName="pencil"
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
