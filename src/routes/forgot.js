import React from 'react';
import { Alert, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import MSU from '../msu';
import DismissKeyboardHOC from '../dismiss-kb';
const DismissKeyboardView = DismissKeyboardHOC(KeyboardAvoidingView);

export default class ForgotScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requested: false, email: '', code: '', newPass: '', newPass2: '' };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Change Password'
  });

  requestCode = (email) => {
    MSU.post('/auth/password-reset-email', {email})
      .then(res => {
        Alert.alert('Reset Code Sent',
            'A password reset code has been sent to ' + email + '.');
        this.setState({requested: true});
      })
      .catch(err => {
        Alert.alert('Reset Code Send Failed', err.toString());
      });
  }

  submit = (email, code, password, password2) => {
    if (password !== password2) {
      Alert.alert('Password Change Failed', 'New passwords do not match.');
      return;
    }

    MSU.post('/auth/password-reset', {email, code, password})
      .then(res => {
        Alert.alert('Password Changed',
            'Please sign in with the new password.');
        this.props.navigation.goBack();
      })
      .catch(err => {
        Alert.alert('Password Change Failed', err.toString());
      });
  }

  render() {
    if (!this.state.requested) {
      return (
        <DismissKeyboardView style={styles.container}>
          <TextInput style={styles.input}
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType = 'email-address'
              onChangeText={(email) => this.setState({email})}
              onSubmitEditing={() => this.requestCode(this.state.email)}
              placeholder='Email'
              returnKeyType={'next'}
          />
          <Button style={styles.button}
              color='#00CE66'
              title='Request Code'
              onPress={() => this.requestCode(this.state.email)}
          />
          <TouchableOpacity style={{alignItems: 'center', margin: 20}}
              disabled={this.state.attempting}
              onPress={() => this.setState({requested: true})}>
            <Text style={{textDecorationLine: 'underline'}}>Already Have a Code?</Text>
          </TouchableOpacity>
        </DismissKeyboardView>
      );
    }
    return (
      <DismissKeyboardView style={styles.container}>
        <TextInput style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType = 'email-address'
            onChangeText={(email) => this.setState({email})}
            onSubmitEditing={() => this.requestCode(this.state.email)}
            placeholder='Email'
            returnKeyType={'next'}
        />
        <TextInput style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(code) => this.setState({code})}
            onSubmitEditing={() => this.refs.passwordInput.focus()}
            placeholder='Reset code'
            returnKeyType={'next'}
        />
        <TextInput style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(newPass) => this.setState({newPass})}
            onSubmitEditing={() => this.refs.password2Input.focus()}
            placeholder='New Password'
            ref='passwordInput'
            returnKeyType={'next'}
            secureTextEntry={true}
        />
        <TextInput style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(newPass2) => this.setState({newPass2})}
            placeholder='Repeat New Password'
            ref='password2Input'
            returnKeyType={'next'}
            secureTextEntry={true}
        />
        <Button style={styles.button}
            color='#00CE66'
            title='Change Password'
            onPress={() => this.submit(this.state.email, this.state.code, this.state.newPass, this.state.newPass2)}
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
    margin: 10
  },
  button: {
    margin: 20
  }
});
