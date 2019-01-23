import React from 'react';
import { Alert, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import * as Keychain from 'react-native-keychain';

import MSU from '../msu';
import DismissKeyboardHOC from '../dismiss-kb';
const DismissKeyboardView = DismissKeyboardHOC(KeyboardAvoidingView);

export default class SecurityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { oldPass: '', newPass: '', newPass2: '' };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Change Password'
  });

  submit = (oldPass, newPass, newPass2) => {
    if (newPass !== newPass2) {
      Alert.alert('Password Change Failed', 'New passwords do not match.');
      return;
    }

    if (oldPass === newPass) {
      Alert.alert('Password Change Failed', 'New password must be different from current password.');
      return;
    }

    Keychain.getGenericPassword()
      .then(creds => {
        let pw = creds.password;
        if (pw !== oldPass) {
          Alert.alert('Password Change Failed', 'Current password does not match');
        } else {
          MSU.post('/users/me/password', pw)
            .then(res => {
              console.log(res);
              if (!isNaN(res)) {
                MSU.clearCredentials()
                  .then(() =>
                    Alert.alert('Password Changed',
                        'You will be asked to sign in with the new password at next launch.')
                  );
              } else {
                Alert.alert('Password Change Failed', res.toString());
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  }

  render() {
    return (
      <DismissKeyboardView style={styles.container}>
        <TextInput style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText = {(oldPass) => this.setState({oldPass})}
            onSubmitEditing = {() => this.refs.passwordInput.focus()}
            placeholder = 'Current Password'
            returnKeyType = {'next'}
        />
        <TextInput style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText = {(newPass) => this.setState({newPass})}
            onSubmitEditing = {() => this.refs.password2Input.focus()}
            placeholder = 'New Password'
            ref = 'passwordInput'
            returnKeyType = {'next'}
            secureTextEntry = {true}
        />
        <TextInput style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText = {(newPass2) => this.setState({newPass2})}
            placeholder = 'Repeat New Password'
            ref = 'password2Input'
            returnKeyType = {'next'}
            secureTextEntry = {true}
        />
        <Button
            title={'Change Password'}
            onPress={() => this.submit(this.state.oldPass, this.state.newPass, this.state.newPass2)}
        />
      </DismissKeyboardView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  input: {
    width: 250,
  }
});
