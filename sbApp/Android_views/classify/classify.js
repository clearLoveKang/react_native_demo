import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
// import WeixinTabBar from './classifyTab.js';
import BaiduMap from './BaiduMap';
var Navigation = require('./../common/navigation.js')
var Movie = require('./../movie/movie_list.js')
var Book = require('./../book/book_list.js')
var ShareWithWeixin = require('./../classify/ShareWithWeixin.js')

var Classify = React.createClass({
  render:function () {
    return (
      <ScrollableTabView
        renderTabBar={() => <ScrollableTabBar/>}
        tabBarUnderlineColor='#ff7419'
        tabBarBackgroundColor='#FFFFFF'
        tabBarActiveTextColor='#ff7419'
        tabBarInactiveTextColor='#CCC'
        tabBarTextStyle={{fontSize: 15}}
        >
        <Book {...this.props} tabLabel='图书'/>
				<Movie {...this.props} tabLabel='电影'/>
				<BaiduMap tabLabel='地图'/>
				<ShareWithWeixin tabLabel='分享'/>
        <Text style={styles.content} tabLabel='手游'/>
        <Text style={styles.content} tabLabel='主机'/>
        <Text style={styles.content} tabLabel='网游'/>
        <Text style={styles.content} tabLabel='LOL'/>
        <Text style={styles.content} tabLabel='DNF'/>
        <Text style={styles.content} tabLabel='WOW'/>
        <Text style={styles.content} tabLabel='C9'/>
      </ScrollableTabView>
    );
}

})

var styles = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EBEBEB',
		flex: 1
	}
});

module.exports = Classify;
