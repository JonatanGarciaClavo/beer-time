'use strict';
import React, { AppRegistry, Component } from 'react-native';
import configureStore from './app/configureStore';
import { Provider } from 'react-redux';
import AppView from './app/components/AppView';

const store = configureStore();

class BeerTime extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppView/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BeerTime', () => BeerTime);
