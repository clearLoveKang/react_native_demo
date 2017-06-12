var React = require("react");
var reactNative = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity
} = reactNative;

/*
 * fetch 同XMLHttpRequest非常类似
 * 
 * Promise
 * (Pending进行中)(Resolove已完成)(Rejected失败)
 *fetch参数
 * .then(完成回调)
 * .catch(失败回调函数)
 * 
 * fetch(url,opts)
 * .then((response) =>{
 * 	//网络请求成功执行该回调，得到对象
 * 		return response.text();
 * 		return response.json();
 * })
 * .then((resonseData) =>{
 * 	//处理请求的到的数据
 * })
 * .catch((error)=>{
 * 	//网络请求失败执行回调
 * })
 */
function getRequest(url){
	var opts = {
		method:'GET'
	}
	fetch(url,opts)
	.then((response)=>{
		return response.text();
	}).then((responseText)=>{
		alert(responseText)
	})
	.catch((error)=>{
		alert(error)
	})
	
}

function postRequest(url){
	//将key vaule 封装成formData形式
	var formData = new FormData();
	formData.append('uesrname','nihaolaobiao ');
	formData.append('password','1254');
	var opts = {
		method:"POST",
		body:formData
	}
	fetch(url,opts)
	.then((response)=>{
		return response.text();
	})
	.then((responseText)=>{
		alert(responseText)
	})
	.catch((error)=>{
		alert(error)
	})
	
	
}

var GetData = React.createClass({
	render:function(){
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={getRequest.bind(this,'http://project.lanou3g.com/projects/bj/reactnative/login.php?username=nimabi&password=12345')}>
					<View style={styles.btn}>
						<Text>Get</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={postRequest.bind(this,'http://project.lanou3g.com/projects/bj/reactnative/login.php')}>
					<View style={styles.btn}>
						<Text>Post</Text>
					</View>
				</TouchableOpacity>
			</View>
			
		);
	}
});

var styles=StyleSheet.create({
	container:{
		flex:1,
		marginTop:30,
		backgroundColor:'cyan',
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center'
	},
	btn:{
		width:60,
		height:30,
		borderWidth:1,
		borderRadius:3,
		borderColor:'black',
		backgroundColor:'yellow',
		justifyContent:'center',
		alignItems:'center'
	}
	
});

module.exports = GetData;