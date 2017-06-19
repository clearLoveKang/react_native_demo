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
       WeChat.registerApp('wx865f1046cbd0ee5b');
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
                        <Text style={{color:'blue'}}>取消</Text>
                      </View>
                      </TouchableHighlight>
                    </View>
              </Modal>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(true)
              }}>
                <Text style={{color:'red',fontSize:16}}>分享</Text>
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
                    // thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                    type: 'news',
                    title: '刘成的二维码', // WeChat app treat title as file name
                    description: '积分猫推广链接',
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
      alert(333)
      WeChat.isWXAppInstalled()
         .then((isInstalled) => {
           if (isInstalled) {
             WeChat.shareToTimeline({
               title:'积分猫',
               description: '积分猫推广',
               // thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
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

})

module.exports = ShareWithWeixin;
