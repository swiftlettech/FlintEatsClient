import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';

import { version } from '../../package.json';

export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'About'
  });

  openExternal = (url) => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log('Cannot open ' + url);
        } else {
          return Linking.openURL(url);
        }
      });
  }

  render() {
    return (
      <View>
        <Text>
          Flint Eats
        </Text>
        <Text>
          Version {version}
        </Text> 
        <TouchableOpacity
            onPress={() => this.openExternal('http://flinteats.org/application/privacy/')}>
          <Text style={{textDecorationLine: 'underline'}}>Privacy Policy</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
