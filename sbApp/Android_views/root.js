/**
 * Created by DELL on 2017/6/28.
 */
'use strict';
import React, { Component } from 'react'
import { View, Platform ,Navigator} from 'react-native'

var Navigation = require('./common/navigation');
var Wrapper = require('./wrapper');
var RootApp = React.createClass({
    render:function(){
        return(
            <View style={{ flex: 1}}>
                <Navigation  component = {Wrapper}/>
            </View>
        )
    }
})
module.exports = RootApp;