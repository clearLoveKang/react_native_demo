import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
Image,
TouchableOpacity,
ListView,
ScrollView
} from 'react-native';

var Util = require('./../common/util');
var SearchBar = require('./../common/searchBar');
var ServerUrl = require('./../common/service');

var MovieItem = require('./movie_item')
var CustomWebView = require('./../common/customWebView')



var MovieList = React.createClass({
	getInitialState:function(){
		var ds = new ListView.DataSource({
			rowHasChanged:(oldRow,newRow) => oldRow!==newRow
		});
		
		return {
			dataSource:ds,
			show:false,
			keywords:'哈利波特'
		}
		
	},
	getData:function(){
		this.setState({
			show:false
		});
		
		var that = this;
		var url = ServerUrl.movie_search+'?count=20&q='+this.state.keywords;
		Util.getRequest(url,function(data){
			console.info(data)
			//请求成功回调
			//{'count:0','start':0,'total':0,books:[]}
			if(!data.subjects||data.subjects.length==0){
				return alert('未找到相关电影')
			}
			//设置下载状态和显示数据
			var ds = new ListView.DataSource({
				rowHasChanged:(oldRow,newRow) => oldRow!==newRow
			});
			var movies = data.subjects;
			that.setState({
				show:true,
				dataSource:ds.cloneWithRows(movies)
			});
				
		},function(error){
			//请求失败回调
			alert(error+'你麻痹')
		})
	},
	_renderRow:function(movie){
		return <MovieItem movie={movie} onPress={this._showDetail.bind(this,movie.title,movie.alt)}/>
	},
	_renderSeparator:function(sectionID:number,rowID:number){
		var style = {
			height:1,
			backgroundColor:'#CCC'
		}
		return <View style={style} key={sectionID,rowID}></View>
	},
	_changeText:function(txt){
		this.setState({
			keywords:txt
		});
	},
	_searchPress:function(){
		//点击搜索请求数据
		this.getData();
	},
	_showDetail:function(title,url){
		var detailRoute = {
			component:CustomWebView,
			passProps:{
				backName:'电影',
				title:title,
				url:url
			}
		}
		
		this.props.navigator.push(detailRoute);
		
	},
	render:function(){
		return (
			<ScrollView>
				<SearchBar
					placeholder="请输入电影名称"
					onPress={this._searchPress}
					onChangeText={this._changeText}
				/>
				{
					this.state.show?
					<ListView
						dataSource={this.state.dataSource}
						initialListSize={10}
						renderRow={this._renderRow}
						renderSeparator={this._renderSeparator}
					/>
					:Util.loading
				}
			</ScrollView>
		)
	},
	componentDidMount:function(){
		this.getData();
	}
	
	
	
});

var styles = StyleSheet.create({
	
});

module.exports = MovieList;
