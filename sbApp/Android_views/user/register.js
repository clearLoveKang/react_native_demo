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


var Header = require('./../common/header');
var toast = require('./../common/toast.js')

var Regist = React.createClass({
    getInitialState:function () {
      return {
        mobile: '',
        password: '',
        code:''
      }
    },
    render:function(){
      return (
          <View style={styles.container}>
              <Header
                initObj={{backName:'返回',barTitle:'手机注册'}}
                navigator={this.props.navigator}
              />
              <View style={[styles.formInput, styles.formInputSplit]}>
                  <Image source={require('../images/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                  <TextInput
                      placeholder='请输入手机号'
                      style={styles.loginInput}
                      onChangeText={this._mobile}
                      />
              </View>
              <View style={[styles.formInput, styles.formInputSplit]}>
                  <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                  <TextInput
                      style={styles.loginInput}
                      secureTextEntry={true}
                      placeholder='请设置密码'
                      onChangeText={this._passWord}
                       />
              </View>
              <View style={[styles.formInput, styles.formInputSplit]}>
                  <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                  <TextInput
                      style={styles.loginInput}
                      secureTextEntry={true}
                      placeholder='请输入验证码: 8888'
                      onChangeText={this._verifyCode}
                       />
                  <TouchableOpacity style={styles.verifyCodeBtn}>
                      <Text ref="btnSendVCode" style={styles.verifyCodeText}>获取验证码</Text>
                  </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.registerBtn} onPress={this._regist}>
                  <Text style={styles.registerText}>注册</Text>
              </TouchableOpacity>
          </View>
      );
    },
    _mobile:function (txt) {
        this.setState({
            mobile:txt
        })
    },
    _passWord:function (txt) {
      this.setState({
          password:txt
      })

    },
    _verifyCode:function (txt) {
      this.setState({
          code:txt
      })
    },
    _regist:function () {
      if (!this.state.mobile.length) {
          toast.toastShort('请输入手机号');
          return;
      }
      if (!this.state.password.length) {
          toast.toastShort('请输入密码');
          return;
      }
      if (!this.state.code.length) {
          toast.toastShort('请输入验证码');
          return;
      }
      //注册巴拉巴拉

    }

})

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },

    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 17,
    },

    loginWrap: {
        backgroundColor: '#FCE9D4',
    },
    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },
    loginMain: {
        flex:1,
    },
    comCulture: {
        width:320,
        marginTop:50,
    },

    formInput:{
        flexDirection:'row',
        height: 60,
        padding: 20,
    },
    formInputSplit:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdada',
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },

    verifyCodeBtn: {
        backgroundColor: '#c5523f',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems:'center',
        width: 80,
        height: 30,
        borderRadius: 2,
    },
    verifyCodeText: {
        color: '#ffffff',
    },

    registerBtn:{
        backgroundColor: '#ff6836',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    registerText:{
        color:'#ffffff',
        fontSize: 17,
    },

    registerWrap: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
});

module.exports = Regist;
