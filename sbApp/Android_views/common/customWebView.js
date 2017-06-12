import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
WebView
} from 'react-native';

//根据传入的URL显示网页信息

var Header = require('./header');

var CustomWebView = React.createClass({
	render:function(){
		return (
			<View style={{backgroundColor:'white',flex:1}}>
				<Header
					navigator={this.props.navigator}
					initObj={{
						backName:this.props.backName,
						barTitle:this.props.title
					}}
				/>
				<WebView
					startInLoadingState={true}
					contentInset={{top:-44,bottom:-120}}
					source={{uri:this.props.url}}
				/>
			</View>
		)

	}

});


module.exports = CustomWebView;
