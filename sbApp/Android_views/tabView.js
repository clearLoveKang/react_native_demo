/**
 * Created by DELL on 2017/6/28.
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
import SplashScreen from 'react-native-splash-screen';
var TimerMixin = require('react-timer-mixin');
var Navigation = require('./common/navigation')
var HomeContainer = require('./index/HomeScene.js');
var BrandContainer = require('./brand/brandScene')
var Classify = require('./classify/classify')
import {registerApp,pay} from 'react-native-wechat';
var ShopCarContainer = require('./shopcart/order')
var AboutMe = require('./user/user.js');


var TarBarView = React.createClass({
    mixins: [TimerMixin],
    getInitialState:function(){
        var tabBarItems = [
            {
                title: '首页',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_home.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_home_press.png")} /> ,
                component: <HomeContainer {...this.props}/>
            },
            {
                title: '品牌',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_fun.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_fun_press.png")} /> ,
                component: <BrandContainer {...this.props}/>
            },
            {
                title: '分类',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_category.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_category_press.png")} /> ,
                component: <Classify {...this.props}/>
            },
            {
                title: '订单',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_cart.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_cart_press.png")} /> ,
                component: <ShopCarContainer {...this.props}/>
            },
            {
                title: '我的',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_my.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_my_press.png")} /> ,
                component: <AboutMe {...this.props}/>
            },

        ];
        return {
            selectedTab:tabBarItems[0].title
        }
    },
    componentDidMount:function () {
        this.setTimeout(
            () => {
                SplashScreen.hide();
            },
            2000
        );

    },
    render:function(){
        var tabBarItems = [
            {
                title: '首页',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_home.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_home_press.png")} /> ,
                component: <HomeContainer {...this.props}/>
            },
            {
                title: '品牌',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_fun.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_fun_press.png")} /> ,
                component: <BrandContainer {...this.props}/>
            },
            {
                title: '分类',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_category.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_category_press.png")} /> ,
                component: <Classify {...this.props}/>
            },
            {
                title: '订单',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_cart.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_cart_press.png")} /> ,
                component: <ShopCarContainer {...this.props}/>
            },
            {
                title: '我的',
                icon:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_my.png")} /> ,
                icons:() => <Image style={styles.icon} source={require("./images/tab/ic_tab_my_press.png")} /> ,
                component: <AboutMe {...this.props}/>
            },

        ];
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
                                {Component}
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
    },
    base64: {
        flex: 1,
        height: 50,
        resizeMode: 'contain',
    }
});

module.exports = TarBarView;
