import React, { Component } from 'react';
import * as Expo from 'expo';
import App from './app/App';

export default class AppWrapper extends Component {
  render = () => <App />
}

Expo.registerRootComponent(AppWrapper);
