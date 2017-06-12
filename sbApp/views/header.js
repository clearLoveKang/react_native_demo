var React = require("react");
var reactNative = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = reactNative;

//定义组件
var Header = React.createClass({
    render:function () {
      return (
        <View style={styles.flex}>
            <Text style={styles.font}>
              <Text style={styles.font1}>康神</Text>
              <Text style={styles.font2}>实力</Text>
              <Text>杠杠滴</Text>
            </Text>
        </View>
      );
    }
});

//定义样式
var styles = StyleSheet.create({
  flex:{
    marginTop:25,
    height:40,
    borderBottomWidth:2,
    borderBottomColor:'red',
    alignItems:'center'
  },
  //字体共用部分
  font:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center'
  },
  font1:{
    color:'#CD1D1C'
  },
  font2:{
    color:"#fff",
    backgroundColor:"#CD1D1C"

  }
});


//导出模块
module.exports = Header;
