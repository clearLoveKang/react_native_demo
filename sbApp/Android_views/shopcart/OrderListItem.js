import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
var Util = require('./../common/util');

var count = 0;
// create a component
var OrderListItem = React.createClass({

    render:function () {
        let { info } = this.props
        let imageUrl = info.imageUrl.replace('w.h', '160.0')
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{ uri: imageUrl }} style={styles.icon} />

                <View style={styles.rightContainer}>
                    <Text style={styles.h1}>{info.title}</Text>
                    <View>
                    </View>
                    <Text numberOfLines={0} style={[styles.p,{ marginTop: 8 }]}>{info.subtitle}</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={[styles.h1,styles.price]}>{info.price}元</Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
})

// define your styles
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: Util.windowSize.onePixel,
        borderColor: '#e0e0e0',
        backgroundColor: 'white',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        color:'#06C1AE'
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
});

//make this component available to the app
module.exports = OrderListItem;
