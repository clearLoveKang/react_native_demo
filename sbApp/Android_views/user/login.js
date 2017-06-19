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
  TextInput,
  Keyboard
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
        Loaded:0,
        imgCode:'',
        imgCodeInput:'',
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
        that.setState({secondsElapsed: 60,Loaded:1,imgCode:'data:image/jpg;base64,'+ data.data});
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
                  underlineColorAndroid='transparent'
                  style={styles.loginInput}
                  onChangeText={this.onChangeMobile}
                   />
          </View>
          <View style={[styles.formInput, styles.formInputSplit]}>
              <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
              <TextInput
                  underlineColorAndroid='transparent'
                  style={styles.loginInput}
                  secureTextEntry={true}
                  placeholder='请输入验证码: 8888'
                  onChangeText={this.onChangePassword}
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
          {
            this.state.Loaded?
            (
            <TouchableOpacity {...this.props} onPress={this._close} style={{position: 'absolute',top:0,left:0,bottom:0,right:0,alignItems: 'center', backgroundColor:"#aaaaaaaa"}} >
              <TouchableOpacity onPress={this._keep} style={{backgroundColor: '#fefefe', marginTop:50,width: 280, height: 180, alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
                <Image source={{uri:this.state.imgCode}} style={{width:80,height:35,marginBottom:10,resizeMode: 'contain',}}/>
                <TextInput
                  style={[styles.loginInput],{width:120, height:35,borderRadius:15,borderColor:'#cccccc',padding:5,marginBottom:10,borderWidth:1,alignSelf: 'center',}}
                  //secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  placeholder='图形验证码'
                  onBlur={Keyboard.dismiss}
                  onChangeText={this.onChangeImgword}
                 />
                 <TouchableOpacity onPress={this._sendCode} style={{backgroundColor: '#c5523f', marginTop:0,width: 120, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
                  <Text style={{color:'#ffffff'}}> 确定</Text>
                 </TouchableOpacity>
               </TouchableOpacity>
            </TouchableOpacity>
           )
           :(null)
          }

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
  onChangeImgword:function (txt) {
    this.setState({
        imgCodeInput:txt
    });
  },
  _sendCode:function(){
      //this.setState({modalVisible: true});
      var that = this;
      var url = ServerUrl.verifiycode2;
     Util.postRequest(url,{'imgCode':this.state.imgCodeInput,'phone':this.state.loginMobile},function(data){
        console.info(data);
      // Util.post(API.getSmsCode(),{'tel':phone,'type':'verifiycode'},function (ret){
        if(data.success==true){
          that.setState({Loaded:0});
          // that.tick();
        }else {
            toast.toastShort(data.msg);
            return
        }
      },function(error){
       //请求失败回调
        // that.setState({secondsElapsed: 0});
       alert('短信'+error)
     });
  },
  _keep:function(){
       this.setState({
        Loaded:1
    });
  },
  _close:function(){
       this.setState({
        Loaded:!this.state.Loaded
    });
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
