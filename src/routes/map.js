import React from 'react';
import { BackHandler, Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import MapView from 'react-native-maps';

import MapHeader from './map-header';

import MSU from '../msu';
import DismissKeyboardHOC from '../dismiss-kb';

const DismissKeyboardView = DismissKeyboardHOC(View)

const icon0 = require('../../res/nearby0.png');
const icon1 = require('../../res/nearby1.png');
const tomatoPos = require('../../res/tomato_pos_small.png');

class MapScreenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: 0,
      region: {
        latitude: 43.016193,
        longitude: -83.705521,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markets: [],
      queried: ''
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });

    this.fetchMarkets();
  }

  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarLabel: 'Nearby',
    tabBarIcon: ({focused}) => <Image
                                style={{width: 25, height: 25}}
                                source={focused
                                          ? icon1
                                          : icon0}
                             />,
  });

  fetchMarkets() {
/*
    if (this.props.query.length == 1 || this.props.query.length == 2) {
      // don't bother with 1- or 2-character queries
      this.setState({queried: this.props.query});
      return;
    }
*/
    let draw = this.state.draw + 1;
    this.setState({draw, queried: this.props.query});
    MSU.get('/markets/map', {draw, q: this.props.query})
      .then(res => {
        if (res.draw === this.state.draw) {
          this.setState({markets: res.markets});
        }
      })
      .catch(err => {
        console.log('err: /markets/map');
        console.log(err);
      });
  }

  onRegionChange(region) {
//    this.setState({region});
    //TODO: grab markets in radius instead of all
  }

  componentDidUpdate() {
    if (this.props.query != this.state.queried) {
      this.fetchMarkets();
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let marketMarkers = [];
    for (var m in this.state.markets) {
      let mkt = this.state.markets[m];
      let coord = false;
      if (mkt) {
        coord = {
          latitude: mkt.lat,
          longitude: mkt.lng
        };
      }
      if (coord && coord.latitude && coord.longitude) {
        marketMarkers.push(
          <MapView.Marker
              key={mkt.id}
              coordinate={coord}
              title={mkt.name}
              image={tomatoPos}
              description={mkt.description}>
            <MapView.Callout
                onPress={() => {
                  Keyboard.dismiss();
                  navigate('Market', {market: mkt});
                }}
            >
              <Text>
                {mkt.name}
              </Text>
            </MapView.Callout>
          </MapView.Marker>);
      }
    }

    return (
      <DismissKeyboardView style={styles.container}>
        <MapHeader />
        <View style={styles.mapContainer}>
          <MapView
              style={styles.map}
              initialRegion={this.state.region}
              onRegionChange={(region) => this.onRegionChange(region)}>
            {marketMarkers}
          </MapView>
        </View>
      </DismissKeyboardView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = (state) => ({
  query: state.eats.query
});

const mapDispatchToProps = {
};

const MapScreen = connect(mapStateToProps, mapDispatchToProps)(MapScreenView);
export default MapScreen;
