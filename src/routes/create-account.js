import React from 'react';
import { Alert, AppRegistry, BackHandler, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox, Icon } from 'native-base';
import { connect } from 'react-redux';
import { actions } from '../actions/index';

import moment from 'moment';
import MSU from '../msu';
import DismissKeyboardHOC from '../dismiss-kb';
const DismissKeyboardView = DismissKeyboardHOC(KeyboardAvoidingView);

class CreateAccountScreenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			username: '',
			email: '',
      phone: '',
			password: '',
			password2: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: `New Account`,
      headerRight: (
        <View style={{marginRight: 5}}>
          <Button
              color='#00CE66'
              title='Create'
              onPress={() => params.submit()}
          />
        </View>
      )
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({submit: this.submit});
  }

  setPhone = (phone) => {
    phone = phone.replace(/[^0-9]/g, '');

    if (phone.length > 10) {
      phone = phone.substring(0, 10);
    }
    this.setState({phone});
  }

  submit = () => {
    if (this.state.password != this.state.password2) {
      Alert.alert(
        'Password Mismatch',
        'The provided passwords did not match.'
      );
      return;
    }
    let user = {
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      termsAccept: moment().unix(),
      irbAccept: moment().unix()
    };
    MSU.signup(user)
      .then(res => {
        if (res && !isNaN(res) && res != '0') {
          Alert.alert(
            'Account Creation Successful',
            'Welcome to Flint Eats!'
          );
          MSU.login(this.state.username, this.state.password)
            .then(res => {
              this.props.login(res);
              this.props.navigation.navigate('Main');
            });
        } else {
          // show error
          Alert.alert(
            'Account Creation Unsuccessful',
            res[0]
          );
        }
      })
      .catch(err => {
        Alert.alert('Could Not Create Account', err[0]);
        console.log(err[0]);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <DismissKeyboardView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText = {(username) => this.setState({username})}
                onSubmitEditing = {() => this.refs.emailInput.focus()}
                placeholder = 'Username'
                ref = 'usernameInput'
                returnKeyType = {'next'} />
            <TextInput style={styles.input}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType = 'email-address'
                onChangeText = {(email) => this.setState({email})}
                onSubmitEditing = {() => this.refs.phoneInput.focus()}
                placeholder = 'Email'
                ref = 'emailInput'
                returnKeyType = {'next'} />
            <TextInput style={styles.input}
                keyboardType = 'phone-pad'
                onChangeText = {(phone) => this.setPhone(phone)}
                onSubmitEditing = {() => this.refs.passwordInput.focus()}
                placeholder = 'Phone'
                ref = 'phoneInput'
                returnKeyType = {'next'}
                value={this.state.phone}
            />
            <TextInput style={styles.input}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText = {(password) => this.setState({password})}
                onSubmitEditing = {() => this.refs.password2Input.focus()}
                placeholder = 'Password'
                ref = 'passwordInput'
                returnKeyType = {'next'}
                secureTextEntry = {true} />
            <TextInput style={styles.input}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText = {(password2) => this.setState({password2})}
                placeholder = 'Repeat Password'
                ref = 'password2Input'
                returnKeyType = {'next'}
                secureTextEntry = {true} />
          </View>
        </DismissKeyboardView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
//    backgroundColor: '#77DD77',
    alignItems: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    marginTop: 15
  },
  input: {
    margin: 5,
    width: 250
  },
  policies: {
    marginTop: 20
  }
});

const mapStateToProps = (state) => ({
  me: state.eats.me
});

const mapDispatchToProps = {
  login: actions.login,
  mergeAvatars: actions.mergeAvatars
};

const CreateAccountScreen = connect(mapStateToProps, mapDispatchToProps)(CreateAccountScreenView);
export default CreateAccountScreen;
