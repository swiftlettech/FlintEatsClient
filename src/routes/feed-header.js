import React from 'react';
import { Image, Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import LinearGradient from 'react-native-linear-gradient';

import MSU from '../msu';

const deal0 = require('../../res/deal0.png');
const deal1 = require('../../res/deal1.png');
const tip0 = require('../../res/tip0.png');
const tip1 = require('../../res/tip1.png');

class FeedHeaderView extends React.Component {
  constructor(props) {
    super(props);
  }

  clear = () => {
    this.props.setQueryText('');
    this.props.setQuery('');
  }

  search = (q) => {
    Keyboard.dismiss();
    this.props.setQuery(q);
  }

  render() {
    return (
      <LinearGradient
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          colors={['#ABE894', '#54E085']}>
        <View style={styles.searchBar}>
          <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
            <Left>
              <TouchableOpacity style={{flex: 1, margin: 6}}
                  onPress={() => this.search(this.props.queryText)}>
                <Icon name='search' />
              </TouchableOpacity>
            </Left>
            <TextInput style={{flex: 6}}
                onChangeText={(text) => this.props.setQueryText(text)}
                onSubmitEditing={() => this.search(this.props.queryText)}
                placeholder={'Search'}
                value={this.props.queryText}
            />
            <Right>
              <TouchableOpacity style={{flex: 1, margin: 6}}
                  onPress={() => this.clear()}>
                <Icon style={{paddingRight: 10}} name='close' />
              </TouchableOpacity>
            </Right>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
              accessibilityLabel='tips'
              onPress={() => this.props.setFocus('tip')}>
            <Image
                style={{width: 40, height: 40}}
                source={this.props.focus == 'tip'
                          ? tip1
                          : tip0}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
              accessibilityLabel='deals'
              onPress={() => this.props.setFocus('deal')}>
            <Image
                style={{width: 40, height: 40}}
                source={this.props.focus == 'deal'
                          ? deal1
                          : deal0}
            />
          </TouchableOpacity>
{false ? <View>
          <TouchableOpacity style={styles.button}
              accessibilityLabels='reviews'
              onPress={this.props.handler}>
            <Icon name='document' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
              accessibilityLabels='recipes'
              onPress={this.props.handler}>
            <Icon name='beaker' />
          </TouchableOpacity>
</View> : null}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00CE66',
    height: 95
  },
  searchBar: {
    backgroundColor: '#FFF',
    margin: 5,
    borderRadius: 5,
    height: 40
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 45
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 40,
  }
});

const mapStateToProps = (state) => ({
  focus: state.eats.focus,
  query: state.eats.query,
  queryText: state.eats.queryText
});

const mapDispatchToProps = {
  setFocus: actions.setFocus,
  setQuery: actions.setQuery,
  setQueryText: actions.setQueryText
};

const FeedHeader = connect(mapStateToProps, mapDispatchToProps)(FeedHeaderView);
export default FeedHeader;
