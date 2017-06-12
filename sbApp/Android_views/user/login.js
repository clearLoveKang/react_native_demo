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
  Modal,
  TouchableOpacity,
  TextInput
} = reactNative;
var TimerMixin = require('react-timer-mixin');
// import { toastShort } from '../common/toast.js';
var Util = require('./../common/util');
var ServerUrl = require('./../common/service');
var toast = require('./../common/toast.js')
var Header = require('./../common/header');
var Regist = require('./register.js');

var SecondPage = React.createClass({
  mixins: [TimerMixin],
  getInitialState:function(){
    return {
        loginMobile:'',
        passWord:'',
        secondsElapsed:0,
        modalVisible:false
    }
  },
  _register:function(){
    var nextPage = {
      component:Regist,
      //推送给下级页面的值
      // passProps:{
      //   showText:this.state.content
      // }
    };
    this.props.navigator.push(nextPage);
  },
  tick: function() {
    var secondsElapsed = this.state.secondsElapsed-1;
    if(secondsElapsed==0){
      this.setState({secondsElapsed: 0,modalVisible:false});
      return;
    }
    var that = this;
    this.setTimeout(
        () => {
          that.setState({secondsElapsed: secondsElapsed});
          that.tick();
        },
        1000
    );
  },
  getCode: function() {
    // this.setState({modalVisible: true});
    if (!this.state.loginMobile.length) {
        toast.toastShort('请输入正确手机号');
        return;
    }
    this.setState({modalVisible: true});
    var that = this;
    var url = ServerUrl.verifiycode;
		Util.postRequest(url,{'phone':this.state.loginMobile},function(data){
      console.info(data)
    // Util.post(API.getSmsCode(),{'tel':phone,'type':'verifiycode'},function (ret){
      if(data.success==true){
        that.setState({secondsElapsed: 60});
        that.tick();
      }
    },function(error){
			//请求失败回调
      that.setState({secondsElapsed: 0});
			alert('短信'+error)
		});
  },
	render:function(){
    var getCode_text = this.state.secondsElapsed==0?'获取验证码':(this.state.secondsElapsed+'秒后重试');
		return (
      <View style={styles.container}>
          <Header
            initObj={{backName:'返回',barTitle:this.props.showText}}
            navigator={this.props.navigator}
          />
          <View style={[styles.formInput, styles.formInputSplit]}>
              <Image source={require('../images/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
              <TextInput
                  placeholder='请输入手机号'
                  style={styles.loginInput}
                  onChangeText={this.onChangeMobile.bind(this)}
                   />
          </View>
          <View style={[styles.formInput, styles.formInputSplit]}>
              <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
              <TextInput
                  style={styles.loginInput}
                  secureTextEntry={true}
                  placeholder='请输入验证码: 8888'
                  onChangeText={this.onChangePassword.bind(this)}
                   />
              <TouchableOpacity disabled={this.state.modalVisible} style={styles.verifyCodeBtn} onPress={this.getCode}>
                  <Text style={styles.verifyCodeText}>{getCode_text}</Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={this._login}>
              <Text style={styles.loginText}>登录</Text>
          </TouchableOpacity>
          <View style={styles.registerWrap}>
              <TouchableOpacity style={{alignItems:'flex-start',flex:1}}>
                  <Text style={{color:'#62a2e0'}}>忘记密码?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:'flex-end',flex:1}} onPress={this._register}>
                <Text style={{color:'#62a2e0'}}>立即注册</Text>
              </TouchableOpacity>
          </View>
      </View>
		);
	},
  onChangeMobile:function (txt) {
    this.setState({
        loginMobile:txt
    })
  },
  onChangePassword:function (txt) {
    this.setState({
        passWord:txt
    })
  },
  _login:function () {
    if (!this.state.loginMobile.length) {
        toast.toastShort('请输入正确手机号');
        return;
    }
    if (!this.state.passWord.length) {
        toast.toastShort('请输入密码');
        return;
    }
    //登录巴拉巴
      this.props.nameCallback(this.state.loginMobile);
      this.props.navigator.pop();
  }


});

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

  loginBtn:{
      backgroundColor: '#ff6836',
      padding: 10,
      alignItems: 'center',
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 3,
  },
  loginText:{
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

module.exports = SecondPage;
