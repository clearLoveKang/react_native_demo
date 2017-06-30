/**
 * Created by DELL on 2017/6/28.
 */
import React, { Component } from 'react'
import { Navigator, View } from 'react-native'

var TabView = require('./tabView');
var Wrapper = React.createClass({
    render:function(){
        return(
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TabView navigator={this.props.navigator}/>
            </View>
        )
    }
});
module.exports = Wrapper;