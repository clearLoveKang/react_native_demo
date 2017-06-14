import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
Image,
TouchableOpacity,
ListView,
ScrollView,
Navigator
} from 'react-native';

var ServiceURL = require('./../common/service');
var Util = require('./../common/util');
var Header = require('./../common/header');
var BookItem = require('./book_item');
var SpacingView = require('./../common/Separator')

var BookDetail = React.createClass({
	getInitialState:function(){
		return {
			show:false,
			bookData:{}
		}
	},
	getData:function(){
		var that = this;
		var url = ServiceURL.book_detail_id + this.props.bookID;
		Util.getRequest(url,function(data){
			console.info(data)
			that.setState({
				show:true,
				bookData:data
			});

		},function(error){
			alert(error+'是傻逼吧');
		});

	},
	render:function(){
		return (

			<View style={styles.container}>
				<Header
					initObj={{backName:'图书',barTitle:this.state.bookData.title}}
					navigator={this.props.navigator}
				/>
				<ScrollView>
					{
						//请求数据显示loading，数据请求成功显示ListView
						this.state.show?
						<View>
							<BookItem
								book={this.state.bookData}
							/>
							<SpacingView/>
							<View>
								<Text style={styles.title}>图书简介</Text>
								<Text style={styles.text}>{this.state.bookData.summary}</Text>
							</View>
							<View style={{marginTop:10}}>
								<SpacingView/>
								<Text style={styles.title}>作者简介</Text>
								<Text style={styles.text}>{this.state.bookData.author_intro}</Text>
							</View>

							<View style={{height:55}}></View>
						</View>
						:Util.loading
					}
				</ScrollView>
			</View>
		)
	},
	componentDidMount:function(){
		this.getData();
	}

});


var styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white'
	},
	title:{
		fontSize:16,
		marginTop:10,
		marginLeft:10,
		marginBottom:10,
		fontWeight:'bold'
	},
	text:{
		marginLeft:10,
		marginRight:10,
		color:'#000D22'
	}
});

module.exports = BookDetail;
