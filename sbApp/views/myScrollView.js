var React = require("react");
var reactNative = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl
} = reactNative;

//简单实现ScrollView监听拖拽滑动方法

//定义组件
var MyScrollView = React.createClass({
	_onScrollBeginDrag:function(){
		console.info('拖拽开始')
	},
	_onScrollEndDrag:function(){
		console.info('拖拽结束')
	},
	_onMomentumScrollBegin:function(){
		console.info('开始滑动')
	},
	_onMomentumScrollEnd:function(){
		console.info('滑动结束')
	},
	_onRefresh:function(){
		alert('shua')
	},
	render:function(){
		return (
			<View style={styles.container}>
				<ScrollView 
					style={styles.scrollView}
					showVerticalScrollIndicator={true}
					onScrollBeginDrag={this._onScrollBeginDrag}
					onScrollEndDrag = {this._onScrollEndDrag}
					onMomentumScrollBegin={this._onMomentumScrollBegin}
					onMomentumScrollEnd={this._onMomentumScrollEnd}
					refreshControl={
						<RefreshControl
							refreshing={false}
							title='Loading...'
							titleColor="green"
							onRefresh={this._onRefresh}
							/*progressBackgroundColor='blue'*/
						/>
					}
				>
					<View style={styles.view_1}></View>
					<View style={styles.view_2}></View>
					<View style={styles.view_3}></View>
					<View style={styles.view_4}></View>
				</ScrollView>
			</View>
		);
	}
	
});

//定义样式
var styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'cyan'
	},
	scrollView:{
		marginTop:25,
		backgroundColor:'#cccccc'
	},
	view_1:{
		margin:15,
		flex:1,
		height:300,
		backgroundColor:'red'
	},
	view_2:{
		margin:15,
		flex:1,
		height:300,
		backgroundColor:'yellow'
	},
	view_3:{
		margin:15,
		flex:1,
		height:300,
		backgroundColor:'green'
	},
	view_4:{
		margin:15,
		flex:1,
		height:300,
		backgroundColor:'blue'
	},
});

//抛出组件
module.exports = MyScrollView;