import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
Dimensions,
Platform,
PixelRatio,
ActivityIndicator
} from 'react-native';


var Util = {
	//屏幕尺寸
	windowSize:{
		width: Dimensions.get('window').width,
	  height: Dimensions.get('window').height,
	  onePixel: 1 / PixelRatio.get(),
	  statusBarHeight: (Platform.OS === 'ios' ? 20 : 0)
	},
	//get封装
	getRequest:function(url,successCallback,failCallback){
		fetch(url)
		.then((response)=>response.json())
		.then((responseData)=>successCallback(responseData))
		.catch((error)=>failCallback(error));
	},
	//post封装
	postRequest: (url, data, successCallback, failCallback) => {
			// let formData = new FormData();
			// Object.keys(data).map(function(key) {
			// 		var value = data[key];
			// 		formData.append(key, value);
			// });
			var formData = JSON.stringify(data);
			console.log(formData);
			let fetchOptions = {
					method: 'POST',
					body: formData,
					headers: {
		        'Accept': 'application/json',
		        //json形式
		        'Content-Type': 'application/json'
		      },
			};

			fetch(url, fetchOptions)
					.then((response) => response.json())
					.then((responseData) => {
							successCallback(responseData);
					})
					.catch((err) => {
							failCallback(err);
					});
	},
	//loading封装
	loading:<ActivityIndicator style={{marginTop:200}}/>

};

module.exports = Util;
