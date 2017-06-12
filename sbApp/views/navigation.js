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
//1.route配置路由对象
//2.场景渲染配置。。。效果
//3.渲染场景
var FirstPage = React.createClass({
	getInitialState:function(){
		return {
			content:''
		}
	},
	getInputContent:function(text){
		this.setState({
			content:text
		});
	},
	//按钮onPress事件处理
	pressPush:function(){
		//退出下一级页面
		var nextPage = {
			component:SecondPage,
			//推送给下级页面的值
			outText:{
				showText:this.state.content
			}
		};
		this.props.navigator.push(nextPage);
	},
	render:function(){
		return (
			<View style={[styles.flex,{backgroundColor:'yellow'}]}>
				<TextInput
					style={styles.input}
					placeholder='请输入BBB'
					onChangeText={this.getInputContent}
				/>
				<TouchableOpacity style={styles.btn} onPress={this.pressPush}>
					<Text>点击推出下一级页面</Text>
				</TouchableOpacity>
			</View>
		);
	}
});

var SecondPage = React.createClass({
	pressPop:function(){
		this.props.navigator.pop();
	},
	render:function(){
		return (
			<View style={[styles.flex,{backgroundColor:'pink'}]}>
				<Text style={styles.text}>
					{this.props.showText}
				</Text>
				<TouchableOpacity style={styles.btn} onPress={this.pressPop}>
					<Text>点击返回上一级页面</Text>
				</TouchableOpacity>
			</View>
		);
	}
	
});


var LessonNavigator = React.createClass({
	render:function(){
		var rootRoute={
			component:FirstPage,
			outText:{}
		};
		
		
		return (
			<Navigator
				//第一步：initialRoute 这个制定了默认页面第一屏
				//属性是自定义的，对象内容会在renderScene中处理
				//必须包含的属性：即component需要渲染页面组件
				initialRoute={rootRoute}
				//第二部：场景渲染配置
				//configureScene
				configureScene ={(route) => {
					return Navigator.SceneConfigs.PushFromRight;
				}}
				//第三部：renderScene渲染场景
				//参数：route(第一步创建并设置给导航器的路由对象)
				//      navigator(导航器对象)
				//实现：给需要显示的组件设置属性
				renderScene={(route,navigator) => {
					//从route对象中获取页面组件
					var Component = route.component;
					return (
						<Component
							navigator={navigator}
							route={route}
							{...route.outText}
						/>
					)
				}}
				
			/>
			
		);
		
	}
	
});


var styles = StyleSheet.create({
	flex:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	input:{
			width:250,
 			height:45,
 			borderWidth:1,
 			marginLeft:5,
 			paddingLeft:5,
 			borderColor:'#CCC',
 			borderRadius:4
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
		width:150,
		height:30,
		borderColor:'#0089FF',
		borderWidth:1,
		borderRadius:3,
		justifyContent:'center',
		alignItems:'center'
	},
	
});

module.exports = LessonNavigator;