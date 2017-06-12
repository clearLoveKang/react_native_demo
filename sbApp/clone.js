var React = require("react");
var reactNative = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
} = reactNative;
//练习一：实现fetch 的 get post请求
//练习二：实现网络请求电影列表
//引入文件

//var sbApp = require('./views/navigation')
//import sbApp from './views/passValue';
var sbApp = require('./views/getData')

//定义组件
//var MyApp = React.createClass({
//	
//});

//定义样式
//var styles = StyleSheet.create({
//	
//});



// AppRegistry.registerComponent('MyApp', () => MyApp);
AppRegistry.registerComponent('sbApp',function () {
        return sbApp
});
