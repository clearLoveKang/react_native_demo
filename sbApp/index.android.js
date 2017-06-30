/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
var RootApp = require('./Android_views/root');

AppRegistry.registerComponent('sbApp', () => RootApp);
