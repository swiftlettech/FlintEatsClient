import React from 'react';
import { BackHandler, Button, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { Body, Card, CardItem, Icon } from 'native-base';

import MSU from '../msu';
import DismissKeyboardHOC from '../dismiss-kb';
const DismissKeyboardView = DismissKeyboardHOC(KeyboardAvoidingView);

export default class PreferencesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefsPlusPlus: [],
      prefsPlus: [],
      prefsMinus: [],
      prefPlusPlusText: '',
      prefPlusText: '',
      prefMinusText: ''
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Preferences'
  });

  componentDidMount() {
    MSU.get('/users/me/preferences')
      .then(res => {
        let prefsPlusPlus = [];
        let prefsPlus = [];
        let prefsMinus = [];
        res.forEach(pref => pref.value > 0
                                ? pref.value > 1
                                    ? prefsPlusPlus.push(pref.target)
                                    : prefsPlus.push(pref.target)
                                : prefsMinus.push(pref.target));
        this.setState({prefsPlusPlus, prefsPlus, prefsMinus});
      });
  }

  //XXX: addPref and removePref operate on the assumption
  //     that the preference is already there or not there,
  //     making the remote call more of a toggle. Perhaps
  //     the two should be separate?

  addPref = (pref, dir) => {
    if (dir > 0) {
      if (dir > 1) {
        // only add if not already added
        if (this.state.prefsPlusPlus.indexOf(pref) < 0) {
          this.setState({prefsPlusPlus: this.state.prefsPlusPlus.concat([pref]), prefPlusPlusText: ''});
          MSU.post('/preferences/create', { target: pref, value: dir })
            .then(res => console.log(res));
        } else {
          this.setState({prefPlusPlusText: ''});
        }
      } else {
        // only add if not already added
        if (this.state.prefsPlus.indexOf(pref) < 0) {
          this.setState({prefsPlus: this.state.prefsPlus.concat([pref]), prefPlusText: ''});
          MSU.post('/preferences/create', { target: pref, value: dir })
            .then(res => console.log(res));
        } else {
          this.setState({prefPlusText: ''});
        }
      }
    } else {
      // only add if not already added
      if (this.state.prefsMinus.indexOf(pref) < 0) {
        this.setState({prefsMinus: this.state.prefsMinus.concat([pref]), prefMinusText: ''});
        MSU.post('/preferences/create', { target: pref, value: dir })
          .then(res => console.log(res));
      } else {
        this.setState({prefMinusText: ''});
      }

    }
  }

  removePref = (pref, dir) => {
    if (dir > 0) {
      if (dir > 1) {
        let prefs = this.state.prefsPlusPlus;
        prefs = prefs.filter(e => e !== pref);
        this.setState({prefsPlusPlus: prefs});
        MSU.post('/preferences/create', { target: pref, value: dir })
          .then(res => console.log(res));
      } else {
        let prefs = this.state.prefsPlus;
        prefs = prefs.filter(e => e !== pref);
        this.setState({prefsPlus: prefs});
        MSU.post('/preferences/create', { target: pref, value: dir })
          .then(res => console.log(res));
      }
    } else {
      let prefs = this.state.prefsMinus;
      prefs = prefs.filter(e => e !== pref);
      this.setState({prefsMinus: prefs});
      MSU.post('/preferences/create', { target: pref, value: dir })
        .then(res => console.log(res));
    }
  }

  render() {
    let prefsPlusPlus = [];
    let prefsPlus = [];
    let prefsMinus = [];
    this.state.prefsPlusPlus.forEach((pref, idx) => {
      prefsPlusPlus.push(
        <TouchableOpacity
            key={idx}
            style={styles.pref}
            onPress={() => this.removePref(pref, 2)}>
          <Text style={{textAlign: 'center'}}>
            {' ' + pref + ' '}
          </Text>
        </TouchableOpacity>
      );
    });
    this.state.prefsPlus.forEach((pref, idx) => {
      prefsPlus.push(
        <TouchableOpacity
            key={idx}
            style={styles.pref}
            onPress={() => this.removePref(pref, 1)}>
          <Text style={{textAlign: 'center'}}>
            {' ' + pref + ' '}
          </Text>
        </TouchableOpacity>
      );
    });
    this.state.prefsMinus.forEach((pref, idx) => {
      prefsMinus.push(
        <TouchableOpacity
            key={idx}
            style={styles.pref}
            onPress={() => this.removePref(pref, -1)}>
          <Text style={{textAlign: 'center'}}>
            {' ' + pref + ' '}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <DismissKeyboardView
          style={styles.container}>
        <View style={{flex: 10}} />
        <Card style={{flex: 30}}>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={{flex: 80}}
                onChangeText={(text) => this.setState({prefPlusText: text})}
                onSubmitEditing={() => this.addPref(this.state.prefPlusText.toLowerCase(), 1)}
                placeholder='I prefer to see...'
                value={this.state.prefPlusText}
            />
            <Button style={{flex: 20}}
                title='Add'
                color='#00CE66'
                disabled={!this.state.prefPlusText}
                onPress={() => this.addPref(this.state.prefPlusText.toLowerCase(), 1)}
            />
          </View>
        </Card>
        <Card>
          <CardItem>
            <Body style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
              {prefsPlus}
            </Body>
          </CardItem>
        </Card>
        <Card style={{flex: 30}}>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={{flex: 80}}
                onChangeText={(text) => this.setState({prefMinusText: text})}
                onSubmitEditing={() => this.addPref(this.state.prefMinusText.toLowerCase(), -1)}
                placeholder='I never want to see...'
                value={this.state.prefMinusText}
            />
            <Button style={{flex: 20}}
                title='Add'
                color='#00CE66'
                disabled={!this.state.prefMinusText}
                onPress={() => this.addPref(this.state.prefMinusText.toLowerCase(), -1)}
            />
          </View>
        </Card>
        <Card>
          <CardItem>
            <Body style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
              {prefsMinus}
            </Body>
          </CardItem>
        </Card>
        <View style={{flex: 10}} />
      </DismissKeyboardView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pref: {
    margin: 2,
    borderRadius: 20,
    backgroundColor: '#00CE66',
    paddingBottom: 2
  }
});
