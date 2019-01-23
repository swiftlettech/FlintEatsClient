import React from 'react';
import { BackHandler, Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Spinner } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { actions } from '../actions/index';

import MSU from '../msu';
import DismissKeyboardHOC from '../dismiss-kb';
const DismissKeyboardView = DismissKeyboardHOC(KeyboardAvoidingView);

const { width, height } = Dimensions.get('window');
const cuteFruit = require('../../res/cute-fruit.png');

class LoginScreenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', attempting: false, opac: 0 };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    // if credentials are saved, attempt login with them
    this.setState({attempting: true, opac: 0});
    MSU.checkForCredentials()
      .then(res => {
        if (res) {
          this.props.login(res);
          let av = {};
          av[res.id] = res.avatar64;
          this.props.mergeAvatars(av);
          this.props.navigation.navigate('Main');
        } else {
          this.setState({attempting: false, opac: 1});
        }
      });
      
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }

  create() {
    this.props.navigation.navigate('CreateAccount');
  }

  forgot() {
    this.props.navigation.navigate('Forgot');
  }

  login() {
    this.setState({attempting: true});
    MSU.login(this.state.username, this.state.password)
      .then(res => {
        this.setState({attempting: false});
        if (res) {
          this.props.login(res);
          this.props.navigation.navigate('Main');
        }
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    let dim = Math.min(width, height) / 2;
    return (
      <DismissKeyboardView style={styles.container}>
        <StatusBar backgroundColor='#00CE66' />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Flint Eats</Text>
          <Image
              style={{width: dim, height: dim}}
              source={cuteFruit}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={{width: 200, margin: 5, opacity: this.state.opac}}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(username) => this.setState({username})}
              onSubmitEditing={() => this.refs.passwordInput.focus()}
              placeholder='Username'
              returnKeyType={'next'} />
          <TextInput style={{width: 200, margin: 5, opacity: this.state.opac}}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(password) => this.setState({password})}
              placeholder='Password'
              ref='passwordInput'
              returnKeyType={'next'}
              secureTextEntry={true} />
          <View style={styles.buttonContainer}>
            {this.state.attempting
              ? <Spinner color='#00CE66' />
              : <Button style={{width: 200, backgroundColor: '#00CE66'}}
                    disabled={this.state.attempting}
                    onPress={() => this.login()}>
                  <Text style={{color: 'black', marginLeft: 15}}>Log In</Text>
                  <Icon style={styles.icon}
                      name='log-in' />
                </Button>
            }
          </View>
          <View style={styles.createContainer}>
            <TouchableOpacity style={{alignItems: 'center', padding: 10}}
                disabled={this.state.attempting}
                onPress={() => this.create()}>
              <Text style={{opacity: this.state.opac, textDecorationLine: 'underline'}}>
                Create Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 10}}
                disabled={this.state.attempting}
                onPress={() => this.forgot()}>
              <Text style={{opacity: this.state.opac, textDecorationLine: 'underline'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DismissKeyboardView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 45,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 40
  },
  inputContainer: {
    flex: 55,
    alignItems: 'center',
    marginTop: 10
  },
  buttonContainer: {
    alignItems: 'center',
    height: 40
  },
  createContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  title: {
    color: '#00CE66',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold'
  },
  icon: {
    color: '#000'
  }
});

const mapStateToProps = (state) => ({
  me: state.eats.me
});

const mapDispatchToProps = {
  login: actions.login,
  mergeAvatars: actions.mergeAvatars
};

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreenView);
export default LoginScreen;
