import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
var Util = require('./util');

var Separator = React.createClass({
    render:function () {
        return (
            <View style={[styles.line, this.props.style]} />
        );
    }
})

var styles = StyleSheet.create({
    line: {
        width: Util.windowSize.width,
        height: Util.windowSize.onePixel,
        backgroundColor: '#e0e0e0',
    },
});

//make this component available to the app
module.exports = Separator;
