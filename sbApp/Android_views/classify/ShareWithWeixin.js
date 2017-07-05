import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from 'react-native';
import * as WeChat from 'react-native-wechat';
var Util = require('./../common/util');

var ShareWithWeixin = React.createClass({
    getInitialState:function(){
      return{
        modalVisible: false,
        transparent: true,
      }
    },
    componentDidMount:function () {
       WeChat.registerApp('wxdbc11db2ebd3a336');
        //wx7a7cdbe6cc609cdd
    },
    render:function () {
      var modalBackgroundStyle = {
        backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
      };
      var innerContainerTransparentStyle = this.state.transparent
        ? { backgroundColor: '#fff'}
        : null;

        return (
          <View>
                <Modal
                    animationType={"none"}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >


                    <View  style={[styles.container, modalBackgroundStyle]}>
                      <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                        <TouchableOpacity onPress={this.sharetoFrends}>
                          <View style={{alignItems:'center'}}>
                            <Image source={require('../img/Public/weixinhaoyou.png')} style={styles.bigcodeimage}/>
                            <Text>微信好友</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.sharetoPyq}>
                          <View style={{alignItems:'center'}}>
                            <Image source={require('../img/Public/weixinpengyouquan.png')} style={styles.bigcodeimage}/>
                            <Text>微信朋友圈</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <TouchableHighlight onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                      }} style={{position:'absolute',bottom:Util.windowSize.height/10,left:Util.windowSize.width/6}}>
                      <View style={styles.innerContainerCancel}>
                        <Text style={{color:'#ccc'}}>取消</Text>
                      </View>
                      </TouchableHighlight>
                    </View>
              </Modal>
              <TouchableHighlight style={styles.loginBtn} onPress={() => {
                this.setModalVisible(true)
              }}>
                <Text style={styles.loginText}>分享</Text>
              </TouchableHighlight>
        </View>
      );

    },
    setModalVisible:function(visible) {
      this.setState({modalVisible: visible});
    },
    sharetoFrends:function () {

      WeChat.isWXAppInstalled()
              .then((isInstalled) => {
                if (isInstalled) {
                  WeChat.shareToSession({
                    // thumbImage: '../images/ic_welcome.jpg',
                    type: 'news',
                    title: '程安康的作品', // WeChat app treat title as file name
                    description: '我的烧烤摊',
                    webpageUrl:'http://blog.csdn.net/liu__520/article/details/52801139',
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
              }else {
                  alert('没有安装微信软件，请您安装微信之后再试');
                }
              });
    },
    sharetoPyq:function () {
    
      WeChat.isWXAppInstalled()
         .then((isInstalled) => {
           if (isInstalled) {
             WeChat.shareToTimeline({
               title:'烧烤摊',
               description: '烧烤摊现世',
              //  thumbImage: '../images/ic_welcome.jpg',
               type: 'news',
               webpageUrl: 'http://blog.csdn.net/liu__520/article/details/52801139'
             })
             .catch((error) => {
               alert(error.message);
             });
         }else {
             alert('没有安装微信软件，请您安装微信之后再试');
           }
         });
    }
})

var styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems:'center'
 },
 innerContainer: {
   borderRadius: 10,
   justifyContent:'space-around',
   alignItems:'center',
   width:Util.windowSize.width/3*2,
   height:Util.windowSize.height/5,
   flexDirection:'row',
   position:'absolute',
   bottom:Util.windowSize.height/6,
   left:Util.windowSize.width/6
 },
 innerContainerCancel:{
   marginTop:6,
   borderRadius: 10,
   justifyContent:'center',
   alignItems:'center',
   width:Util.windowSize.width/3*2,
   height:30,
   backgroundColor: '#fff',

 },
 bigcodeimage:{
   width:Util.windowSize.width/6,
   height:Util.windowSize.width/6,
   marginBottom:6
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

})

module.exports = ShareWithWeixin;
