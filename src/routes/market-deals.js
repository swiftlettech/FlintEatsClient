import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';

import FeedList from './feed-list';

import MSU from '../msu';

export default class MarketDealsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      title: `Deals at ${params.name}`
    };
  }

  render() {
    const { id } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <FeedList feedKey={id} navigation={this.props.navigation} />
      </View>
    );
  }
}
