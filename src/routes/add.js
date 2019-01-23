import React from 'react';
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');

export default class AddScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });
  }

  static navigationOptions = {
    header: null,
    tabBarLabel: 'Add',
    tabBarIcon: ({focused}) => <Image
                                style={{width: 25, height: 25}}
                                source={focused
                                          ? icon1
                                          : icon0}
                             />,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient
          style={{flex: 1}}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          colors={['#ABE894', '#54E085']}>
        <Grid style={{flex: 1}}>
          <Row style={{flex: 1}} />
          <Row style={{flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>
              What do you want to add?
            </Text>
          </Row>
          <Row style={{flex: 1}} />
          <Row style={{flex: 1}}>
{true ? null : (<View>
            <Col style={{flex: 2}} />
            <Col style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity style={styles.button}
                  onPress={() => navigate('CreateRecipe')}>
                <Image
                    style={{width: 40, height: 40}}
                    source={require('../../res/recipe1.png')}
                />
              </TouchableOpacity>
              <Text style={styles.typeText}>Recipe</Text>
            </Col>
            <Col style={{flex: 1}}/>
            <Col style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity style={styles.button}
                  onPress={() => navigate('SelectMarket', { type: 'Review' })}>
                <Image
                    style={{width: 40, height: 40}}
                    source={require('../../res/review1.png')}
                />
              </TouchableOpacity>
              <Text style={styles.typeText}>Review</Text>
            </Col>
            <Col style={{flex: 2}} />
</View>)}
          </Row>
          <Row style={{flex: 1}}>
            <Col style={{flex: 1}} />
            <Col style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity style={styles.button}
                  onPress={() => navigate('CreateDeal')}>
                <Image
                    style={{width: 40, height: 40}}
                    source={require('../../res/deal1.png')}
                />
              </TouchableOpacity>
              <Text style={styles.typeText}>Deal</Text>
            </Col>
            <Col style={{flex: 3}} />
            <Col style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity style={styles.button}
                  onPress={() => navigate('CreateTip')}>
                <Image
                    style={{width: 40, height: 40}}
                    source={require('../../res/tip1.png')}
                />
              </TouchableOpacity>
              <Text style={styles.typeText}>Tip</Text>
            </Col>
            <Col style={{flex: 1}} />
          </Row>
          <Row style={{flex: 1}} />
        </Grid>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00CE66'
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 40,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  typeText: {
    backgroundColor: 'transparent',
    color: '#FFF'
  }
});

