var React = require("react");
var reactNative = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = reactNative;


//定义组件
var News = React.createClass({
	//实现点击功能
	show:function(title){
		alert(title);
	},
	
	render:function(){
		//定义数组用于存储设置好的Text组件
		var newsComponents = [];
		//遍历存储信息的数组，从外部传入
		for (var i in this.props.news){
			var text = (
				<Text
				onPress={this.show.bind(this,this.props.news[i])}
				style={styles.news_item}
				numberOfLines={2}
				key={i}>
				{this.props.news[i]}
				</Text>
			);
			//将设置好的Text存入数组
			newsComponents.push(text);
		}
		return (
			<View style={styles.flex}>
				<Text style={styles.news_title}>今日要闻</Text>
				{newsComponents}
			</View>
			
		);
	}
});

//定义样式
var styles = StyleSheet.create({
	flex:{
		flex:1,
	},
	//今日要闻标题
	news_title:{
		fontSize:20,
		fontWeight:'bold',
		color:'#CD1D1C',
		marginLeft:10,
		marginTop:15
	},
	//每条新闻
	news_item:{
		marginTop:10,
		marginLeft:10,
		marginRight:10,
		fontSize:15,
		lineHeight:30
	},
});

//导出模块
module.exports = News;

