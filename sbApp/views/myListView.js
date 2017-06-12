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

//List数据列表
//ListView.DataSource给他传递一个数组，在使用DataSource对象实例化一个ListView组件
//ListView实现：row/section组件定义、数据设置
//设置ListView数据源 借助state,讲DataSource对象设置为state属性

//原始数据
var contents = [
	'发条魔灵',
	'放逐之刃瑞文文',
	'虚空恐惧科加斯',
	'奥利瑞安索尔',
	'疾风剑豪托儿索',
	'虚空行者卡萨丁',
	'卡尔萨斯裸死街头',
	'阿里斯塔半夜惨叫',
	'是人性的泯灭',
	'还是道德的沦丧',
	'且看金牌解说德莱文的BB'
];



var MyListView = React.createClass({
	//类似公式记住*********
	getInitialState:function(){
		//创建dataSource对象
		var ds = new ListView.DataSource({
			//通过判断界定渲染那些行，避免全部渲染提高效率
			rowHasChanged:(oldRow,newRow) => oldRow!==newRow
		});
		
		return {
			//设置dataSource时不直接使用提供的原始数据，使用cloneWithRows对数据元进行复制
			//使用复制后的数据源进行实例化ListView。优势：当原始数据改变时，ListView组件的dataSource不会改变
			dataSource:ds.cloneWithRows(contents)
		};
		
	},
	//渲染row组件，参数是每行需要显示的数据对象
	_renderRow:function(rowData:string){
		return (
			<View style={styles.row}>
				<Text style={styles.content}>{rowData}</Text>
			</View>
		);
	},
	
	render:function(){
		return (
			<ListView
			dataSource={this.state.dataSource}
			renderRow={this._renderRow}
			style={styles.container}
		/>
		);
	}
	
});

var styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:25
	},
	row:{
		justifyContent:'center',
		alignItems:'center',
		padding:5,
		height:100,
		borderBottomWidth:2,
		borderColor:'#ddd'
	},
	content:{
		flex:1,
		fontSize:20,
		color:'green',
		lineHeight:52
	}
	
});

module.exports = MyListView;


