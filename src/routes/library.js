import React from 'react';
import { BackHandler, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import MSU from '../msu';

const icon0 = require('../../res/library0.png');
const icon1 = require('../../res/library1.png');

export default class LibraryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sections: [] };
    this.renderItem = this.renderItem.bind(this);
  }

  static navigationOptions = {
    header: null,
    tabBarLabel: 'Library',
    tabBarIcon: ({focused}) => <Image
                                style={{width: 25, height: 25}}
                                source={focused
                                          ? icon1
                                          : icon0}
                             />,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });

    let sectionData = {};
    let headers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0'.split('');
    headers.forEach(h => {
      sectionData[h] = [];
    });
      
    MSU.get('/markets/list/', {orderField: 'name'})
      .then(res => {
        res.forEach(m => { 
          let strippedName = m.name.replace(/^a |^an |^the /i, '').trim();
          let head = strippedName.charAt(0);
          if (head.match(/[a-z]/i)) {
            sectionData[head.toUpperCase()].push(m);
          } else {
            sectionData['0'].push(m);
          }
        });
        let sections = [];
        headers.forEach(h => {
          sections.push({ data: sectionData[h], title: h });
        });
        this.setState({sections});
      });
  }

  renderItem = ({item}) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
          onPress={() => navigate('Market', { market: item })}>
        <Card>
          <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <Image
                style={{margin: 4, resizeMode: 'cover', width: 36, height: 36}}
                source={{uri: 'data:image/png;base64,'+item.image64}}
            />
            <Text style={{margin: 12, fontWeight: 'bold'}}>{item.name}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  renderHeader = ({section}) => {
    return (
      <LinearGradient
          style={{borderTopWidth: 1, borderColor: '#000'}}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          colors={['#ABE894', '#54E085']}>
        <Text style={{backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 18, margin: 8}}>{'    ' + section.title}</Text>
      </LinearGradient>
    );
  }

  render() {
    if (this.state.sections.length == 0) {
      return (
        <View><Spinner /></View>
      );
    }
    let sections = []
    this.state.sections.forEach(section => {
      if (section.data.length > 0) {
        sections.push(section);
      }
    });
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#00CE66', alignItems: 'center', justifyContent: 'center', height: 50}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 22}}>
            Library
          </Text>
        </View>
        <SectionList
            renderItem={this.renderItem}
            renderSectionHeader={this.renderHeader}
            sections={sections}
            keyExtractor={(item, idx) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
