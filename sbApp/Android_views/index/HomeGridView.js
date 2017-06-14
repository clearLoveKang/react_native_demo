import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native'
var Util = require('./../common/util');
var HomeGridItem = require('./HomeGridItem')

var HomeGridView = React.createClass({
  render:function () {
    var grid = this.props.infos;
    return (
      <View style={styles.container}>
          {grid.map((info, index) => (
              <HomeGridItem
                  info={info}
                  key={index}
                  onPress={() => this.props.onGridSelected(index)} />
          ))}
      </View>
    )
  }
})
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderTopWidth: Util.windowSize.onePixel,
        borderLeftWidth: Util.windowSize.onePixel,
        borderColor: '#e0e0e0'
    },
});

module.exports = HomeGridView;
