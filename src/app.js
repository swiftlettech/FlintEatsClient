import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './reducers/index'
import AppWithNavigationState from './navigators/main';

export default class App extends React.Component {
  store = createStore(AppReducer);
  render() {
    return (
      <Provider store={this.store}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
          <AppWithNavigationState />
        </SafeAreaView>
      </Provider>
    );
  }
}
