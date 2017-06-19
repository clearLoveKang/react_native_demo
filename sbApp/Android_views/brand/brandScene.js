import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';
var BrandListScene = require('./BrandListScene');
var Util = require('./../common/util')

var BrandScene = React.createClass({
  getInitialState:function () {
    return{
      adress:'上海'
    }
  },
  location:function () {
    Geolocation.getCurrentPosition()
      .then(data => {
        console.log(JSON.stringify(data));
        this.setState({
          adress:data.street
        });
      })
      .catch(e =>{
        console.log(e, 'error');
      })
  },
    render:function () {
        var titles = ['享美食', '住酒店', '爱玩乐', '全部']
        var types = [
            ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
            ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠', '成人情趣'],
            ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '大宝剑', '电影院', '美发', '美甲'],
            []
        ]
       return(
         <View style={styles.container}>
             <View style={{flexDirection: 'row',backgroundColor:"#ff7419",height:43}}>
               <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}
                 onPress={this.location}
               >
                    <Image style={{ width: 20, height: 20 }} source={require('../img/Home/icon_homepage_map_old.png')} />
                    <Text style={{ fontSize: 15, color: 'white' }}>{this.state.adress}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchBar}>
                    <Image source={require('../img/Home/search_icon.png')} style={styles.searchIcon} />
                    <Text style={styles.p}>找附近的吃喝玩乐</Text>
                </TouchableOpacity>
             </View>
             <ScrollableTabView
                style={styles.container}
                tabBarUnderlineColor='#FE566D'
                tabBarBackgroundColor='white'
                tabBarActiveTextColor='#FE566D'
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle={styles.tabBarText}
                tabBarUnderlineStyle={styles.tabBarUnderline}
              // renderTabBar={() => <DefaultTabBar style={styles.tabBar}/>}
              >
                {titles.map((title, i) => (
                    <BrandListScene
                        tabLabel={titles[i]}
                        key={i}
                        types={types[i]}
                        {...this.props}
                    />
                ))}
            </ScrollableTabView>

          </View>
       )
    }
});

var styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    searchBar: {
        width: Util.windowSize.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',

    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: '#FE566D'
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
});

module.exports = BrandScene;
