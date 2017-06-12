var React = require("react");
var reactNative = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} = reactNative;

//本地数据
var movieData = require('./data.json');
var movies = movieData.movies;

var MovieListView = React.createClass({
	getInitialState:function(){
		var ds = new ListView.DataSource({
			rowHasChanged:(oldRow,newRow) => oldRow!==newRow
		});
		return {
			dataSource:ds.cloneWithRows(movies)
		};
	},
	//渲染行
	_renderRow:function(movie){
		return (
			<View style={styles.row}>
				<Image
					source={{uri:movie.posters.thumbnail}}
					style={styles.thumbnail}
				/>
				<View style={styles.rightContainer}>
					<Text style={styles.title}>{movie.title}</Text>
					<Text style={styles.year}>{movie.year}</Text>
				</View>
			</View>
		)
	},
	//渲染头部
	_renderHeader:function(){
		return (
			<View style={styles.header}>
				<Text style={styles.header_text}>我的列表</Text>
				<View style={styles.header_line}></View>
			</View>
		);
	},
	//渲染分割线
	_renderSeparator:function(sectionID:number,rowID:number){
		return (
			<View style={styles.separator} key={sectionID+rowID}></View>
		);
	},
	render:function(){
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderRow}
				renderHeader={this._renderHeader}
				renderSeparator={this._renderSeparator}
				initialListSize={5}
				style={styles.listView}
			/>
		);
	}
	
});

var styles = StyleSheet.create({
	listView:{
		marginTop:25,
		flex:1,
		backgroundColor:'#F5FCFF'
	},
	row:{
		flexDirection:'row',
		padding:5,
		backgroundColor:'#F5FCFF',
		alignItems:'center',
		flexDirection:'row',
	    borderRadius:5
	},
	thumbnail:{
		width:53,
		height:81,
		backgroundColor:'gray'
	},
	rightContainer:{
		marginLeft:10,
		flex:1,
	},
	title:{
		fontSize:18,
		marginTop:3,
		marginBottom:3,
		textAlign:'center'
	},
	year:{
		marginBottom:3,
		textAlign:'center',
		color:'green'
	},
	header:{
		height:44,
		backgroundColor:'#ddd'
	},
	header_text:{
		flex:1,
		fontSize:20,
		fontWeight:'bold',
		textAlign:'center',
		lineHeight:38
	},
	header_line:{
		height:1,
		backgroundColor:'#ccc'
	},
	separator:{
		height:1,
		backgroundColor:'#ccc'
	}
});

module.exports = MovieListView;