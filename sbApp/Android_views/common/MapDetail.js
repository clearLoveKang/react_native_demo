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
  TouchableHighlight,
    InteractionManager
} from 'react-native';

import Dimensions from 'Dimensions';
var Header = require('./header')
var mapListData = require('./mapData.json')
var Util = require('./util')
var TimerMixin = require('react-timer-mixin');
var mapList = mapListData.data;

var MapDetail = React.createClass({
    mixins: [TimerMixin],
  getInitialState:function () {
      InteractionManager.runAfterInteractions(() => {
          mapList.sort(() => { return 0.5 - Math.random() })
      });
      //mapList.sort(() => { return 0.5 - Math.random() })
      return{
          show:false,
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
    componentDidMount:function() {
        this.setTimeout(() => {
            this.setState({show:true})
        }, 1000);
    },
  render:function () {
    return(
            <View style={styles.container}>
               <Header
                 initObj={{backName:'',barTitle:this.props.info.title}}
                 navigator={this.props.navigator}
               />
               <View>
                   {
                       //请求数据显示loading，数据请求成功显示ListView
                       this.state.show?
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
                           :Util.loading
                   }
               </View>
           </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-60,
  }
});

module.exports = MapDetail;
