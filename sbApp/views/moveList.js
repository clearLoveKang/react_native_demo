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

//导入数据源
var moveData = require('./data');
var movies = moveData.movies;


//定义组件
var MoveList = React.createClass({
	render:function(){
		//c创建电影列表组件，根据movies,创建对应组件
		//遍历数组，每当获取一个movies对象就创建一个组件对象，样式一样，显示内容不一样
		
		//定义空数组，存储现显示电影信息的组件
		var moviesRows = []
		//遍历数组
		for(var i in movies){
			//获取movies对象
			var movie = movies[i]
			//创建组件，显示信息：图{movie.posters}、电影名称{movie.title}、上映时间{movie.year}
			var row = (
				<View style={styles.row} key={i}>
					<Image style={styles.thumbnail} source={{uri:movie.posters.thumbnail}} />
					<View style={styles.rightContainer}>
						<Text style={styles.title}>
							{movie.title}
						</Text>
						<Text style={styles.year}>
							{movie.year}
						</Text>
					</View>
				</View>
			)
			//push到数组中
			moviesRows.push(row)
		}
		
		return (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView}>
					{
						//所有子组件
						moviesRows
					}
				</ScrollView>
			</View>
		)
	}
	
});


//定义样式
var styles = StyleSheet.create({
	container:{
		flex:1
	},
	scrollView:{
		flex:1,
		marginTop:25,
		backgroundColor:'red'
	},
	row:{
		flexDirection:'row',
		padding:5,
		alignItems:'center',
		backgroundColor:'#f5fcff'
	},
	thumbnail:{
		width:53,
		height:81,
		backgroundColor:'gray'
	},
	rightContainer:{
		marginLeft:10,
		flex:1
	},
	title:{
		fontSize:18,
		marginTop:3,
		marginBottom:3,
		textAlign:"center"
	},
	year:{
		marginBottom:3,
		textAlign:'center'
	}
});

//抛出组件
module.exports = MoveList;