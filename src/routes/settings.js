import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Left, List, ListItem, Right } from 'native-base';
import { Navigation } from 'react-navigation';

import MSU from '../msu';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Settings`
  });

  signOut() {
    MSU.clearCredentials()
      .then(this.props.navigation.navigate('Login'));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <List style={{backgroundColor: '#FFF'}}>
        <ListItem
            onPress={() => navigate('Security')}>
          <Left>
            <Text style={styles.item}>Account Security</Text>
          </Left>
          <Right>
            <Icon name='arrow-dropright' />
          </Right>
        </ListItem>
        <ListItem
            onPress={() => navigate('Preferences')}>
          <Left>
            <Text style={styles.item}>Preferences</Text>
          </Left>
          <Right>
            <Icon name='arrow-dropright' />
          </Right>
        </ListItem>
        <ListItem
            onPress={() => navigate('Help')}>
          <Left>
            <Text style={styles.item}>Help & Feedback</Text>
          </Left>
          <Right>
            <Icon name='arrow-dropright' />
          </Right>
        </ListItem>
        <ListItem
            onPress={() => navigate('About')}>
          <Left>
            <Text style={styles.item}>About</Text>
          </Left>
          <Right>
            <Icon name='arrow-dropright' />
          </Right>
        </ListItem>
        <ListItem
            onPress={() => this.signOut()}>
          <Text style={styles.item}>Sign Out</Text>
        </ListItem>
      </List>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 12,
  },
});
