import React from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import LinearGradient from 'react-native-linear-gradient';

class MapHeaderView extends React.Component {
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
          style={styles.container}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          colors={['#ABE894', '#54E085']}>
        <View style={styles.searchBar}>
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
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00CE66',
    height: 50
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 5,
    borderRadius: 5,
    height: 40
  }
});

const mapStateToProps = (state) => ({
  query: state.eats.query,
  queryText: state.eats.queryText
});

const mapDispatchToProps = {
  setQuery: actions.setQuery,
  setQueryText: actions.setQueryText
};

const MapHeader = connect(mapStateToProps, mapDispatchToProps)(MapHeaderView);
export default MapHeader;
