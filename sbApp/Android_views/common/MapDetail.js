import React, {
  Component,
  PropTypes
} from 'react';

import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';

import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Dimensions from 'Dimensions';
var Header = require('./header')
var mapListData = require('./mapData.json')
var mapList = mapListData.data;

var MapDetail = React.createClass({
  getInitialState:function () {
      mapList.sort(() => { return 0.5 - Math.random() })
      return{
        mayType: MapTypes.NORMAL,
         zoom: 16,
         center: {
           longitude: this.props.info.roomLng,
           latitude: this.props.info.roomLat
         },
         trafficEnabled: false,
         baiduHeatMapEnabled: false,
         markers: [{
           longitude: this.props.info.roomLng,
           latitude: this.props.info.roomLat,
           title: this.props.info.title
         }]
      }
  },
  render:function () {
    return(
            <View style={styles.container}>
               <Header
                 initObj={{backName:'',barTitle:this.props.info.title}}
                 navigator={this.props.navigator}
               />
               <View>
                <MapView
                     trafficEnabled={this.state.trafficEnabled}
                     baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                     zoom={this.state.zoom}
                     mapType={this.state.mapType}
                     center={this.state.center}
                     marker={this.state.marker}
                     markers={this.state.markers}
                     style={styles.map}
                     onMarkerClick={(e) => {
                      //  console.warn(JSON.stringify(e));
                     }}
                     onMapClick={(e) => {
                     }}
                   >
                   </MapView>
               </View>
           </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-60,
  }
});

module.exports = MapDetail;
