/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

var Navigation = require('./Android_views/common/navigation')

var HomeContainer = require('./Android_views/book/book_list');
//var HomeContainer = require('./Android_views/movie/movie_list');
var BrandContainer = require('./Android_views/movie/movie_list')
var Classify = require('./Android_views/classify/classify.js')
var ShopCarContainer = React.createClass({
	render:function(){
		return (
			<Text style={{flex:1}}>ShopCarContainer</Text>
		)
	}
})
var AboutMe = require('./Android_views/user/user.js');

var tabBarItems = [
    {
      title: '首页',
      icon:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_home.png")} /> ,
      icons:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_home_press.png")} /> ,
      component: HomeContainer
    },
    {
      title: '品牌',
      icon:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_fun.png")} /> ,
      icons:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_fun_press.png")} /> ,
      component: BrandContainer
    },
    {
      title: '分类',
      icon:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_category.png")} /> ,
      icons:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_category_press.png")} /> ,
      component: Classify
    },
    {
      title: '购物车',
      icon:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_cart.png")} /> ,
      icons:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_cart_press.png")} /> ,
      component: ShopCarContainer
    },
    {
      title: '我的',
      icon:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_my.png")} /> ,
      icons:() => <Image style={styles.icon} source={require("./Android_views/images/tab/ic_tab_my_press.png")} /> ,
      component: AboutMe
    },

];
// { title: '', icon:() => <Icon name={'md-bookmark'} size={30} />, component:  },
// { title: '', icon: () =><Icon name={'md-apps'} size={30} />, component:  },
// { title: '', icon: () =><Icon name={'md-cart'} size={30} /> , component:  },
// { title: '', icon:() => <Icon name={'md-contact'} size={30} /> , component:  },

var TarBarView = React.createClass({
	getInitialState:function(){
		return {
			 selectedTab:tabBarItems[0].title
		}
	},
	render:function(){
		return (
			<TabNavigator tabBarStyle={{ height: 60 }}>
               {
                   tabBarItems.map((controller, i) => {
                    //获取容器页面
                    //下面就讲navigation 赋值进去,这样没有容器页面就有nav
                         var Component = controller.component;
                       return (
                           <TabNavigator.Item
                               key= {i}
                               selected={this.state.selectedTab === controller.title}
                               title={controller.title}
                               titleStyle={styles.tabText}
                               selectedTitleStyle={styles.selectedTabText}
                            renderIcon={controller.icon}
                            renderSelectedIcon={controller.icons}
                               onPress={() => this.setState({ selectedTab: controller.title }) }>
							   	             <Navigation component = {Component}/>
                           </TabNavigator.Item>
                       )
                   })
               }
           </TabNavigator >
		)
	}

});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: "#CCC",
        fontSize: 14
    },
    selectedTabText: {
        color: "red",
        fontSize: 14
    },
    icon: {
        width: 25,
        height: 25
    }
});



AppRegistry.registerComponent('sbApp', () => TarBarView);
