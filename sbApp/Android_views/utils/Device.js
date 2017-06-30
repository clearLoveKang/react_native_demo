/* @flow */

import React, { Component } from 'react';
var Platform = require('Platform');
export default class Device extends Component {
  constructor(props) {
    super(props);
  }
  isAndroid(){
    if (Platform.OS === 'android') {
        return true;
    }else{
        return false;
    }
  }




}
