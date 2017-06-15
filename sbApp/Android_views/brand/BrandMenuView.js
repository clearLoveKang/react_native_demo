import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
var Util = require('./../common/util')

var BrandMenuView = React.createClass({
      render:function () {
        return(
          <View style={styles.container}>
              {this.props.titles.map((title, i) => (
                  <TouchableOpacity
                      style={[{ backgroundColor: this.props.selectedIndex == i ? '#FE566D' : 'white' }, styles.item]}
                      key={i}
                      onPress={() => this.props.onSelected(i)}>
                      <Text
                          style={[styles.p,{ color: this.props.selectedIndex == i ? 'white' : '#555555' }]}>
                          {this.props.titles[i]}
                      </Text>
                  </TouchableOpacity>
              ))}
          </View>
        )
      }
});

var styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  item: {
      width: Util.windowSize.width / 4 - 10,
      marginLeft: 8,
      marginTop: 5,
      marginBottom: 5,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: Util.windowSize.onePixel,
      borderColor: '#e0e0e0',
  },
  p: {
        fontSize: 13,
        color: '#777777',
    },
});

module.exports = BrandMenuView;
