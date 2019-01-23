import React from 'react';
import { WebView } from 'react-native';

export default class HelpScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Help & Feedback'
  });

  render() {
    return (
      <WebView
          source={{uri: 'http://flinteats.org/application/frequently-asked-questions/'}}
      />
    );
  }
}
