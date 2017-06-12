var React = require("react");
var reactNative = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  TextInput
} = reactNative;

var InputPage = React.createClass({
//	getInitialState:function(){
//		return {
//			centent:''
//		}
//	},
//	getInputContent:function(inputText){
//		this.setState({
//			centent:inputText
//		});
//	},
	pushNextPage:function(){
		//退出下级页面并传值
		var route = {
			component:DetailPage,
			//将输入框的内容传递给下一级页面
//			passProps:{
//				showText:this.state.centent
//			}
		}
		this.props.navigator.push(route)
	},
	render:function(){
		return (
			<View style={inputStyle.container}>  
				<TextInput
					style={inputStyle.input}
					placeholder='请输入BBB'
					onChangeText={this.getInputContent}
				/>
				<TouchableOpacity style={inputStyle.btn} onPress={this.pushNextPage}>
					<Text>点击进入下一页</Text>
				</TouchableOpacity>
			</View>
		)
		
	}
	
});


var inputStyle = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'white'
	},
	input:{
		height:45,
		marginLeft:5,
		marginRight:5,
		paddingLeft:5,
		borderWidth:2,
		borderColor:'black',
		borderRadius:5
	},
	btn:{
		marginTop:20,
		height:30,
		borderWidth:2,
		borderRadius:5,
		borderColor:'black',
		padding:5,
		justifyContent:'center',
		alignItems:'center'
	},
	
})


var DetailPage = React.createClass({
	popFromPage:function(){
		this.props.navigator.pop();
	},
	
	render:function(){
		return (
			<View style={detailStyle.container}>
				<Text style={detailStyle.text}>
//					{this.props.showText}
				</Text>
				<TouchableOpacity style={detailStyle.btn} onPress={this.popFromPage}>
					<Text>点击返回上级页面</Text>
				</TouchableOpacity>
			</View>
		)
	}
});

var detailStyle = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'white'
	},
	text:{
		marginLeft:25,
		marginRight:25,
		padding:25,
		backgroundColor:'cyan',
		fontSize:20,
		textAlign:'center'
	},
	btn:{
		marginTop:20,
		height:30,
		borderWidth:2,
		borderRadius:5,
		borderColor:'black',
		padding:5,
		justifyContent:'center',
		alignItems:'center'
	},
});


var LessonNavigator = React.createClass({
	render:function(){
		var rootRoute = {
			compontent:InputPage,
			//存储需要传递的内容
//			passProps:{
//				
//			}
		}
		
		return (
			<View style={{flex:1}}>
				<Navigator
					initialRoute={rootRoute}
					configureScene = {(route) => {
						return Navigator.SceneConfigs.FloatFromBottomAndroid;
					}}
					renderScene={(route,navigator) => {
						var Component = route.compontent;
						return (
							<Component
								navigator={navigator}
								route={route}
//								{...route.passProps}
							/>
						);
					}}
				/>
			</View>
			
		);
		
	}
	
});

//var styles = StyleSheet.create({
//	
//	
//});

module.exports = LessonNavigator;