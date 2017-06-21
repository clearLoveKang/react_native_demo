'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  AlertIOS,
  Dimensions,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';
import Icon from 'react-native-vector-icons/Ionicons'
let {width, height} = Dimensions.get('window')
var TimerMixin = require('react-timer-mixin');
var Util = require('./../common/util')

var LbsModal = React.createClass({
  mixins: [TimerMixin],
  getInitialState:function () {
    return{
      loading: false,
      address: [
        {
          name: "cheng",
          phone: "13253521216",
          tag: "公司",
          color: "#0096ff",
          address: "盈家生活"
        },
        {
          name: "cheng",
          phone: "13253521216",
          tag: "家",
          color: "#ff6000",
          address: "长宁区淞虹路新泾家苑885号"
        }
      ],
      near: ["外滩观景台", "豫园", "南京东路"]
    }
  },
  closeModal:function(){
    this.props.closeModal()
  },
  getLocation:function(){
    if(this.state.loading){
      return
    }
    this.setState({
      loading: true
    })
    var that = this;
    this.setTimeout(() => {
      that.setState({
        loading: false
      })
      Geolocation.getCurrentPosition()
      .then(data => {
        console.log(JSON.stringify(data));
        that.props.setLocation(data.street);
      })
      .catch(e =>{
        console.log(e, 'error');
      })

    }, 1200)
  },
  render:function(){
    return (
      <Modal
        style={styles.wrap}
        animationType={'slide'}
        onRequestClose={() => {}}
        visible={this.props.modalVisible}
      >
        <View style={styles.headers}>
          <TouchableOpacity style={styles.left_btn} onPress={this.closeModal}>
            <Icon name="ios-close" size={26} color="#fff" />
          </TouchableOpacity>
          <View style={styles.title_container}>
            <Text style={styles.titles} numberOfLines={1}>选择收货地址</Text>
          </View>
        </View>

        <View style={styles.searchView}>
          <TextInput ref="search" style={styles.textInput} underlineColorAndroid="transparent" placeholder="请输入地址" placeholderTextColor="#666"/>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{"当前地址"}</Text>
          <View style={styles.address}>
            <Text>{this.props.location}</Text>
            <TouchableOpacity onPress={this.getLocation}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              {this.state.loading?<ActivityIndicator style={styles.aior}/>:<Icon name="ios-locate-outline" size={22} color="#0398ff" />}
              <Text style={{color: "#0398ff", fontSize: 13, marginLeft: 5}}>{"重新定位"}</Text>
            </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{"收货地址"}</Text>
          {
            this.state.address.map((item, i) => {
              return (
                <TouchableOpacity key={i} onPress={()=>{}}>
                  <View style={styles.address1}>
                    <Text style={{color: "#333", fontSize: 14}}>{item.name+" "+item.phone}</Text>
                    <View style={styles.ads1List}>
                      <Text style={[styles.tag, {backgroundColor: item.color || "#0096ff", }]}>{item.tag}</Text>
                      <Text style={{color: "#bbb", fontSize: 13}}>{item.address}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          <Text style={styles.title}>{"附近地址"}</Text>
          {
            this.state.near.map((item, i) => {
              return (
                <TouchableOpacity key={i} onPress={()=>{}}>
                  <View style={[styles.address, {borderBottomWidth: 1, borderBottomColor: "#f5f5f5"}]}>
                    <Text>{item}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </Modal>
    )
  }

})

var styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 13,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    color: "#666"
  },
  scrollView: {
    backgroundColor: "#f3f3f3"
  },
  tag: {
    color: "#fff",
    fontSize: 12,
    minWidth: 30,
    textAlign: "center",
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginRight: 5
  },
  ads1List: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5
  },
  searchView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ff7419"
  },
  textInput: {
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 0,
    height: 28,
    borderRadius:6,
    backgroundColor: "#fff"
  },
  address: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    height: 45,
    backgroundColor: "#fff"
  },
  address1: {
    borderBottomWidth: 1,
    borderBottomColor: "#fbfbfb",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 8
  },
  headers:{
		height:43,
		backgroundColor:'#ff7419',
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	left_btn:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
    marginLeft:10
	},
	title_container:{
		flex:1,
		width: Util.windowSize.width * 0.7,
		justifyContent:'center',
		alignItems:'center',
		alignSelf: 'center',
	},
	titles:{
		color:'#fff',
		fontSize:18,
		fontWeight:'bold',
		lineHeight:18,

	}
})

module.exports = LbsModal;
