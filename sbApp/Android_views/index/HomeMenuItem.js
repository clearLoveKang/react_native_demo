import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
var Util = require('./../common/util');

// create a component
var HomeMenuItem = React.createClass({
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

// define your styles
var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Util.windowSize.width / 5,
        height: Util.windowSize.width / 5,
    },
    icon: {
        width: Util.windowSize.width / 9,
        height: Util.windowSize.width / 9,
        margin: 5,
    },
    h2: {
        fontSize: 14,
        color: '#222222',
    },
});

//make this component available to the app
module.exports = HomeMenuItem;
