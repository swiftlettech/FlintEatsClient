import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Body, Card, CardItem, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { actions } from '../actions/index';

import moment from 'moment';
import MSU from '../msu';

const profile = require('../../res/me0.png');

class FollowScreenView extends React.Component {
  constructor(props) {
    super(props);
    // follows: follow(ers/ees) of target
    // followees: followees of principal
    this.state = { follows: null, followees: null, text: ''};
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let title = '';
    if (params.dir === 'ers') {
      if (params.isMe) {
        title = 'My Followers';
      } else {
        title = 'Followers of ' + params.target.username;
      }
    }
    if (params.dir === 'ees') {
      if (params.isMe) {
        title = 'I Am Following';
      } else {
        title = params.target.username + ' Is Following';
      }
    }
    return {
      title
    };
  }

  componentDidMount() {
    MSU.get('/users/me/followees')
      .then(res => {
        let followees = [];
        res.forEach(f => followees.push(f.id));
        this.setState({followees});
      })
      .catch(err => {
        console.log('error: /users/me/followees');
        console.log(err);
        this.setState({followees: []});
        
      });
    MSU.get('/users/' + this.props.navigation.state.params.target.id + '/follow' + this.props.navigation.state.params.dir)
      .then(res => {
        this.getAvatars(res);
        this.setState({follows: res});
      });
  }

  follow = (target) => {
    let followees = this.state.followees;
    followees.push(target);
    this.setState({followees});

    MSU.post('/users/follow', target)
      .then(res => {
        console.log(res);
        if (res < 0) {
          // if removing follow, remove value
          followees = followees.filter(e => e !== target);
          this.setState({followees});
        }
      })
      .catch(err => {
        console.log('error following ' + target);
        console.log(err);
      });
  }

  getAvatars = (feed) => {
    let uids = new Set();
    feed.forEach(u => {
      if (u) {
        let uid = u.id;
        if (!this.props.avatars[uid]) {
          uids.add(uid);
        }
      }
    });
    if (uids.size) {
      MSU.post('/users/avatars', [...uids])
        .then(res => {
          this.props.mergeAvatars(res);
        });
    }
  }

  goToProfile = (user) => {
    if (this.props.me
          && this.props.me.id == user.id) {
      this.props.navigation.navigate('Me');
    } else {
      this.props.navigation.navigate('Profile', {user});
    }
  }

  renderCard = ({item}) => {
    let following = false;
    if (this.state.followees.indexOf(item.id) >= 0) {
      following = true;
    }
    return (
      <Card>
        <CardItem>
          <TouchableOpacity
              onPress={() => this.goToProfile(item)}>
            <Image
                style={styles.pic}
                source={this.props.avatars[item.id]
                          ? {uri: 'data:image/png;base64,'+this.props.avatars[item.id]}
                          : profile}
            />
          </TouchableOpacity>
          <Body>
            <Text note>{item.username}</Text>
          </Body>
          <TouchableOpacity
              style={{borderRadius: 20, backgroundColor: following ? '#DDD' : '#00CE66'}}
              onPress={() => this.follow(item.id)}>
            <Text style={{textAlign: 'center'}}>
              {following
                ? '  Following  '
                : '  Follow  '}
            </Text>
          </TouchableOpacity>
        </CardItem>
      </Card>
    );
  }

  render() {
    if (!this.state.follows
          || !this.state.followees) {
      return <View><Spinner /></View>;
    }
    return (
      <View>
        <FlatList
            data={this.state.follows}
            extraData={this.state}
            keyExtractor={(item, idx) => item.id}
            renderItem={this.renderCard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    marginLeft: 10,
    marginRight: 10,
  },
  follow: {
    width: 50,
    height: 20,
    backgroundColor: '#00CE66',
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  pic: {
    width: 40,
    height: 40,
    borderColor: '#FFF',
    borderRadius: 40,
    marginRight: 15
  },
  button: {
/*
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 40,
*/
  }
});

const mapStateToProps = (state) => ({
  me: state.eats.me,
  avatars: state.eats.avatars
});

const mapDispatchToProps = {
  mergeAvatars: actions.mergeAvatars
};

const FollowScreen = connect(mapStateToProps, mapDispatchToProps)(FollowScreenView);
export default FollowScreen;
