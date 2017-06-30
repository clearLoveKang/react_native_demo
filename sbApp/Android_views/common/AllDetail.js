import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager,StatusBar } from 'react-native'
var TimerMixin = require('react-timer-mixin');
import Button from './Button'
var Util = require('./util')
var SpacingView = require('./Separator')
var api = require('./service')
var Header = require('./header')
var RefreshListView = require('./RefreshListView')
var OrderListItem = require('./../shopcart/OrderListItem')
var AllDetail = require('./../common/AllDetail')
var MapDetail = require('./MapDetail')
var mapListData = require('./mapData.json')
var mapList = mapListData.data;
var FirmOrder = require('./firmOrder')
var AllDetail = React.createClass({
  mixins: [TimerMixin],
  getInitialState:function () {
    var ds = new ListView.DataSource({
      rowHasChanged:(oldRow,newRow) => oldRow!==newRow
    });
    return{
      discounts: [],
      show:false,
      dataSource:ds
    }
  },
  componentDidMount:function() {
     InteractionManager.runAfterInteractions(() => {
       mapList.sort(() => { return 0.5 - Math.random() })
       this.requestData()
      });
  },
  requestData:function () {
    var url = api.recommend;
    var that = this;
    Util.getRequest(url,function(data){
      console.log(data);
      //请求成功回调
      if(!data||data.length==0){
        return alert('没有数据')
      }
      //设置下载状态和显示数据
      var ds = new ListView.DataSource({
        rowHasChanged:(oldRow,newRow) => oldRow!==newRow
      });
      var dataList = data.data.map((info) => {
                  return {
                      id: info.id,
                      imageUrl: info.squareimgurl,
                      title: info.mname,
                      subtitle: `[${info.range}]${info.title}`,
                      price: info.price
                  }
              })
      dataList.sort(() => { return 0.5 - Math.random() })
      that.setState({
        show:true,
        dataSource:ds.cloneWithRows(dataList)
      });
      that.setTimeout(() => {
                  that.listView.endRefreshing('NoMoreData')
      }, 500);

    },function(error){
      //请求失败回调
      alert(error)
    })
  },
    renderHeader:function () {
      var info = this.props.info;
      console.log(info);
      var oAdrss = mapList[0];
      return(
        <View>
          <View>
              <Image style={styles.banner} source={{ uri: info.imageUrl.replace('w.h', '480.0') }} />

              <View style={styles.topContainer}>
                  <Text style={[styles.h1,{ color:'#06C1AE'}]}>￥</Text>
                  <Text style={[styles.h0,{ marginBottom: -8 }]}>{info.price}</Text>
                  <Text style={[styles.p,{ marginLeft: 10 }]}>门市价：￥{(info.price * 1.1).toFixed(0)}</Text>
                  <View style={{ flex: 1 }} />
                  <Button
                      title='立即抢购'
                      style={{ color: 'white', fontSize: 18 }}
                      containerStyle={styles.buyButton}
                      onPress={() => {
                                   this._showOrder.bind(this,info)();
                               }}
                  />
              </View>
          </View>
          <SpacingView />
          <View>
              <View style={styles.tagContainer}>
                  <Image style={{ width: 20, height: 20 }} source={require('../img/Home/icon_deal_anytime_refund.png')} />
                  <Text style={[styles.p,{ color: '#89B24F' }]}>  随时退</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={styles.p}>已售{1234}</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.adress} onPress={this._showMap.bind(this,oAdrss)}>
              <Image style={{ width: 20, height: 20 }} resizeMode ={'contain'} source={require('../img/Public/icon_food_merchant_address@2x.png')} />
              <Text style={styles.p} numberOfLines={1}>{oAdrss.houseAddress}</Text>
          </TouchableOpacity>
          <View style={styles.tipHeader}>
              <Text style={styles.h2}>- - -看了本团购的用户还看了- - -</Text>
          </View>

      </View>
      )
    },
    render:function () {
        var info = this.props.info;
        return(
          <View style={styles.container}>
              <Header
                initObj={{backName:'',barTitle:info.title}}
                navigator={this.props.navigator}
              />
              <View style={{flex:1}}>
              {
                //请求数据显示loading，数据请求成功显示ListView
                this.state.show?
                <RefreshListView
                    ref={(e) => this.listView = e}
                    dataSource={this.state.dataSource}
                    renderHeader={() => this.renderHeader()}
                    renderRow={(rowData) =>
                        <OrderListItem
                            info={rowData}
                            onPress={() => {
                                   StatusBar.setBarStyle('default', false)
                                   this._showDetail.bind(this,rowData)();
                               }}
                        />
                    }
                    onHeaderRefresh={() => this.requestData()}
                />
                :Util.loading
              }
              </View>
          </View>

        )
    },
    _showMap:function (e) {
      var detRoute = {
        component: MapDetail,
        passProps: {
          info:e
        }
      };
      this.props.navigator.push(detRoute);

    },
    _showDetail:function(infos){
    		var detRoute = {
    			component: AllDetail,
    			passProps: {
    				info:infos
    			}
    		};
    		this.props.navigator.push(detRoute);

    	},
    _showOrder:function(infos){
        var detRoute = {
            component: FirmOrder,
            passProps: {
                info:infos
            }
        };
        this.props.navigator.push(detRoute);
    }
});

// define your styles
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    banner: {
        width: Util.windowSize.width,
        height: Util.windowSize.width * 0.5
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: Util.windowSize.onePixel,
        borderColor: '#e0e0e0',
        paddingVertical: 8,
        // paddingLeft: 20,
        backgroundColor: 'white',
    },
    adress:{
      height: 35,
      flexDirection: 'row',
      borderWidth: Util.windowSize.onePixel,
      borderColor: '#e0e0e0',
      paddingVertical: 8,
      paddingLeft: 10,
      backgroundColor: 'white',
    },
    h0: {
        fontSize: 40,
        color: '#06C1AE',
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    h2: {
        fontSize: 14,
        color: '#222222',
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
});

//make this component available to the app
module.exports = AllDetail;
