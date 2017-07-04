import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Heading2, Paragraph } from '../common/someHade'
var Separator = require('./../common/Separator')
var DetailCell = React.createClass({

    render:function () {
      var icon = this.props.image && <Image style={styles.icon} source={this.props.image} />;
      return (
            <View style={styles.container}>
                <TouchableOpacity {...this.props}>
                    <View style={[styles.content, this.props.style]}>
                        {icon}
                        <Heading2>{this.props.title}</Heading2>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Paragraph style={{ color: '#999999' }}>{this.props.subtitle}</Paragraph>
                        <Image style={styles.arrow} source={require('../img/Public/cell_arrow.png')} />
                    </View>

                    <Separator />
                </TouchableOpacity>
            </View>
      );
    }

});

var styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
  },
  content: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 10,
  },
  icon: {
      width: 25,
      height: 25,
      marginRight: 10,
  },
  subtitleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  arrow: {
      width: 14,
      height: 14,
      marginLeft: 5,
  }
});

module.exports = DetailCell;
