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
var ShareWithWeixin = require('./../classify/ShareWithWeixin.js')
var Address = require('./Address');
import ImagePicker from 'react-native-image-picker' ;
var Platform = require('Platform');

var options = { // 弹出框配置
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    angle: 0,

    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
};
//头部头像信息
var HeadView = React.createClass({
      getInitialState:function () {
          return{
              user_name:null,
              avartUrl:null
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
    //选择图片
    _pickPhoto: function (){
        //base.toastShort("选择照片");
        var that = this;
        ImagePicker.showImagePicker(options,(res) => {
            console.log(res)
            if (res.didCancel) {  // 返回
                return
            } else {
                var source = 'data:image/jpeg;base64,' + res.data ;
                //if (Platform.OS === 'android') {
                //    sourc = { uri: res.uri };
                //} else {
                //    sourc = { uri: res.uri.replace('file://','') };
                //}
                that.setState({
                    avartUrl: source
            });
                console.log(source)
            }
        })
    },
      render:function () {
        var users = this.state.user_name?this.state.user_name:'点击登录';
          var icons = this.state.avartUrl ? {uri: this.state.avartUrl} : require('./../images/img_default_head.png');
        return(
          <View style={styles.handleView}>
            <Image style={styles.myBgImage} source={require('./../images/img_my_bg.png')}>
                <TouchableOpacity onPress={this._pickPhoto}>
                    <Image style={styles.headIcon} source={icons}/>
                </TouchableOpacity>

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
                ];
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
    goPage:function(page){
        if(page.component == ''){return}
        var toPage = {
            component:page.component,
            //推送给下级页面的值
            passProps:{
                title:page.title
            }
        };
        this.props.navigator.push(toPage);
    },
  render:function () {

    var titles = [
        {title:'收货地址',component:Address},
        {title:'关于我的',component:''},
        {title:'帮助中心',component:''}
    ];
    return(
      <ScrollView style={{flex:1}}>
              <View style={styles.headerWrap}>
                  <Text style={styles.header}>我的</Text>
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
                              key={title.title}
                              style={styles.cell}
                              onPress={this.goPage.bind(this, title)}
                          >
                              <Text>{title.title}</Text>
                              <View style={styles.rightIcon}>
                                  <Iconr/>
                              </View>
                          </TouchableOpacity>
                      )
                  })
              }
              <ShareWithWeixin/>
          </ScrollView>
    )
  }
});


var styles = StyleSheet.create({
  headerWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 44,
      backgroundColor: '#ff7419'
  },
  header: {
      color: '#fff',
      fontSize: 17
  },

  myBgImage: {
      flex: 1,
      height: 160,
      justifyContent: 'center',
      alignItems: 'center'
  },

  headIcon: {
      height: 80,
      width: 80,
      borderRadius:80
  },

  login: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 1,
      padding: 5,
      marginTop: 10
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
      alignItems: 'center'
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
      top: 10
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
