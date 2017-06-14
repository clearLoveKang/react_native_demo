import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

var Util = require('./../common/util');


var OrderMenuItem = React.createClass({
    render:function () {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Text style={styles.h2}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
})

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Util.windowSize.width / 4,
        height: Util.windowSize.width / 5,
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5,
    },
    h2: {
        fontSize: 14,
        color: '#222222',
    },
});

//make this component available to the app
module.exports = OrderMenuItem;
