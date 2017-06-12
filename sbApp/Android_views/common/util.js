import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
Dimensions,
ActivityIndicator
} from 'react-native';


var Util = {
	//屏幕尺寸
	windowSize:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height
	},
	//get封装
	getRequest:function(url,successCallback,failCallback){
		fetch(url)
		.then((response)=>response.json())
		.then((responseData)=>successCallback(responseData))
		.catch((error)=>failCallback(error));
	},
	/**
	 * http post 请求简单封装
	 * @param url 请求的URL
	 * @param data post的数据
	 * @param successCallback 请求成功回调
	 * @param failCallback failCallback 请求失败回调
	 */
	postRequest: (url, data, successCallback, failCallback) => {
			let formData = new FormData();
			Object.keys(data).map(function(key) {
					var value = data[key];
					formData.append(key, value);
			});

			let fetchOptions = {
					method: 'POST',
					body: formData
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
