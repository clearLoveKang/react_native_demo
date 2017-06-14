import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Switch,
    ScrollView,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';

var Iconr = require('./../common/right_icon.js')
var SecondPage = require('./login.js');

//头部头像信息
var HeadView = React.createClass({
      getInitialState:function () {
          return{
              user_name:null
          }
      },

      pushLogin:function () {
        var that = this;
        var loginPage = {
          component:SecondPage,
          //推送给下级页面的值
          passProps:{
            nameCallback:function (uName) {
                  that.setState({
                    user_name:uName
                  })
            }
          }
        };
        this.props.navigator.push(loginPage);
      },
      render:function () {
        var users = this.state.user_name?this.state.user_name:'点击登录';
        return(
          <View style={styles.handleView}>
            <Image style={styles.myBgImage} source={require('./../images/img_my_bg.png')}>
                  <Image style={styles.headIcon} source={require('./../images/img_default_head.png')}/>
                  <TouchableOpacity
                      style={styles.login}
                      onPress={this.pushLogin}
                      disabled={this.state.user_name==null?false:true}
                  >
                      <Text style={{color: 'white'}}>{users}</Text>
                  </TouchableOpacity>
              </Image>
          </View>
        )
      }

});
//分类管理我的
var JurisdictionView = React.createClass({
  render:function () {
    //预留图片位置icons能用了再用
    var titles = ['我的订单','我的足迹','我的收藏'];
    var icons = [require('../img/Home/icon_homepage_shoppingCategory.png'),
                 require('../img/Home/icon_homepage_foottreatCategory.png'),
                  require('../img/Home/icon_homepage_beautyCategory.png')
                ]
    return (
      <View style={styles.jurisdictionView}>
              {
                  titles.map((title, i) => {
                      return (
                          <TouchableOpacity
                              key={i}
                              style={styles.handleView}

                          >
                              <Image source={icons[i]} style={{height: 40, width: 40 , backgroundColor:'white'}}/>
                              <Text style={{marginTop: 10}}>{title}</Text>
                          </TouchableOpacity>
                      )
                  })
              }
          </View>
    )
  }
});

var User = React.createClass({
  render:function () {

    var titles = ['清除缓存', '关于我的', '帮助中心'];
    return(
      <ScrollView style={{flex:1}}>
              <View style={styles.headerWrap}>
                  <Text style={styles.header}>我的巴拉巴拉</Text>
              </View>
              <HeadView {...this.props} />
              <JurisdictionView />
              <View style={styles.switchCell}>
                  <View style={{}}>
                      <Text>留给叼逼人士</Text>
                      <Text style={{color: 'gray', fontSize: 12, marginTop: 10}}>开启后你将跟我一样叼逼</Text>
                  </View>
                  <Switch
                      style={styles.switch}
                      // onTintColor="#ff7419"
                      // thumbTintColor="white"
                  />
              </View>
              {
                  titles.map((title) => {
                      return (
                          <TouchableOpacity
                              key={title}
                              style={styles.cell}
                          >
                              <Text>{title}</Text>
                              <View style={styles.rightIcon}>
                                  <Iconr/>
                              </View>
                          </TouchableOpacity>
                      )
                  })
              }

          </ScrollView>
    )
  }
});


var styles = StyleSheet.create({
  headerWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 44,
      backgroundColor: '#ff7419',
  },
  header: {
      color: '#fff',
      fontSize: 17,
  },

  myBgImage: {
      flex: 1,
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
  },

  headIcon: {
      height: 80,
      width: 80,
  },

  login: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 1,
      padding: 5,
      marginTop: 10,
  },

  jurisdictionView: {
      flexDirection: 'row',
      height: 100,
      borderBottomColor: 'rgb(241, 241, 241)',
      borderBottomWidth: 10
  },

  handleView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },

  switchCell: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      borderBottomColor: 'rgb(241, 241, 241)',
      borderBottomWidth: 10
  },

  switch: {
      position: 'absolute',
      right: 15,
      top: 10,
  },

  cell: {
      flexDirection: 'row',
      height: 40,
      marginLeft: 10,
      marginRight: 10,
      justifyContent: 'space-between',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
      alignItems: 'center'
  },

  rightIcon: {
      position: 'absolute',
      right: 0,
      top: 15,
      height: 20,
      width: 20
  }
});

module.exports = User;
