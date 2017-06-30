
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

var Util = require('./../common/util');
var SearchBar = require('./../common/searchBar');
var ServerUrl = require('./../common/service');
var BookItem = require('./book_item');

var BookDetail = require('./book_detail');

var BookList = React.createClass({
	getInitialState:function(){
		var ds = new ListView.DataSource({
			rowHasChanged:(oldRow,newRow) => oldRow!==newRow
		});
		return {
			//dataSource
			dataSource:ds,
			//网络请求状态表示
			show:false,
			//搜索关键字
			//作用：搜索接口需要设置搜索内容，点击搜索时修改关键字内容，重新请求数据，重新渲染
			keywords:'Angular'
		}
	},
	getData:function(){
		//开启loading每次搜索时都要从新下载显示数据
		this.setState({
			show:false
		});
		//请求数据
		var that = this;
		var url = ServerUrl.book_search+'?count=20&q='+this.state.keywords;
		Util.getRequest(url,function(data){
			//请求成功回调
			//{'count:0','start':0,'total':0,books:[]}
			if(!data.books||data.books.length==0){
				return alert('没有数据')
			}
			//设置下载状态和显示数据
			var ds = new ListView.DataSource({
				rowHasChanged:(oldRow,newRow) => oldRow!==newRow
			});
			that.setState({
				show:true,
				dataSource:ds.cloneWithRows(data.books)
			});

		},function(error){
			//请求失败回调
			alert('请求失败')
		})
	},
	//TextInput的onChangeText事件处理
	_changeText:function(txt){
		this.setState({
			keywords:txt
		});
	},
	_searchPress:function(){
		//点击搜索请求数据
		this.getData();
	},
	_showDetail:function(ID){
		var detRoute = {
			component: BookDetail,
			passProps: {
				bookID:ID
			}
		};
		console.log(detRoute)
		this.props.navigator.push(detRoute);

	},
	render:function(){
		return (
			<View style={{flex:1}}>
				<SearchBar
					placeholder="请输入图书名称"
					onPress={this._searchPress}
					onChangeText={this._changeText}
				/>
				<ScrollView>
					{
						//请求数据显示loading，数据请求成功显示ListView
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
			</View>
		)
	},
	componentDidMount:function(){
		//请求数据
		this.getData();
	},
	_renderRow:function(book){
		var oId = book.id;
		return <BookItem book={book} onPress={this._showDetail.bind(this,oId)}/>
	},
	_renderSeparator:function(sectionID:number,rowID:number){
		var style = {
			height:1,
			backgroundColor:'#CCC'
		}
		return <View style={style} key={sectionID,rowID}></View>
	}

});

module.exports = BookList;
