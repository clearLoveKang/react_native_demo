/**
 * Created by DELL on 2017/7/4.
 */
'use strict';

import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
var Header = require('../common/header');
var TabViewBar = require('./tabViewBar');
var TakeOut = require( './takeOut');
var Breakfast = require('./breakfast');
import ScrollableTabView from 'react-native-scrollable-tab-view'

var AllOrder = React.createClass({
    render:function(){
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <Header
                    initObj={{backName:'',barTitle:'全部订单'}}
                    navigator={this.props.navigator}
                />
                <ScrollableTabView renderTabBar={() => <TabViewBar/>}>
                    <TakeOut tabLabel="外卖"/>
                    <Breakfast tabLabel="早餐"/>
                </ScrollableTabView>
            </View>
        )
    }
})

module.exports = AllOrder;