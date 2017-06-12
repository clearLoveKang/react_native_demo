var React = require("react");
var reactNative = require("react-native");

var Navigation = require('../common/navigation')
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
//登录页面
var SecondPage = require('./login.js')
//个人中心主页
var FirstPage = require('./users.js')



var LessonNavigator = React.createClass({
	render:function(){
		return (
		    <Navigation component = {FirstPage}/>
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
      position:'absolute',
      top:0,
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
