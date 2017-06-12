
import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity
} from 'react-native';

var Iconr = React.createClass({
	render:function(){
		return (
			<View>
				<View style={styles.go}></View>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	go:{
		width:10,
		height:10,
		borderRightWidth:2,
		borderTopWidth:2,
		borderColor:'#CCC',
		transform:[{rotate:'45deg'}]
	},
});

module.exports = Iconr;
