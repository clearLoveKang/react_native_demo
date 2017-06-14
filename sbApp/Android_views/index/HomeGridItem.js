import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
var Util = require('./../common/util');

// create a component
var HomeGridItem = React.createClass({
    render:function() {
        var info = this.props.info

        var title = info.maintitle
        var color = info.typeface_color
        var subtitle = info.deputytitle
        var imageUrl = info.imageurl.replace('w.h', '120.0')

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View>
                    <Text style={[styles.h1,{ color: color, marginBottom: 10 }]}>{title}</Text>
                    <Text style={styles.h2}>{subtitle}</Text>
                </View>

                <Image style={styles.icon} source={{ uri: imageUrl }} />
            </TouchableOpacity>
        );
    }
})

// define your styles
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Util.windowSize.width / 2 - Util.windowSize.onePixel,
        height: Util.windowSize.width / 4,
        backgroundColor: 'white',
        borderBottomWidth: Util.windowSize.onePixel,
        borderRightWidth: Util.windowSize.onePixel,
        borderColor: '#e0e0e0'
    },
    icon: {
        width: Util.windowSize.width / 5,
        height: Util.windowSize.width / 5,
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    h2: {
        fontSize: 14,
        color: '#222222',
    },
});

//make this component available to the app
module.exports = HomeGridItem;
