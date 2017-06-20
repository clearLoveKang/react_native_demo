import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar } from 'react-native'

var Util = require('./../common/util');
var NavigationItem = require('./../common/NavigationItem')
var api = require('./../common/service')
var HomeMenuView = require('./HomeMenuView')
var SpacingView = require('./../common/Separator')
var HomeGridView = require('./HomeGridView')
var RefreshListView = require('./../common/RefreshListView');
var OrderListItem = require('./../shopcart/OrderListItem');
var TimerMixin = require('react-timer-mixin');
var CustomWebView = require('./../common/customWebView')
var AllDetail = require('./../common/AllDetail')

var HomeScene = React.createClass({
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
        this.requestData()
    },

    requestData:function() {
        this.requestDiscount()
        this.requestRecommend()
    },
    requestRecommend:function () {
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
    requestDiscount:function() {
      var url = api.discount;
      var that = this;
        Util.getRequest(url,function(data){
          console.log(data);
          //请求成功回调
          if(!data.data||data.data.length==0){
            return alert('没有数据')
          }
          var oData = data.data;
          that.setState({ discounts: oData })
        },function(error){
          //请求失败回调
          alert(error)
        })

    },
    renderHeader:function () {
        return(
          <View>
              <HomeMenuView menuInfos={api.menuInfo} />
              <SpacingView />
              <HomeGridView infos={this.state.discounts} onGridSelected={(this.onGridSelected)}/>
              <SpacingView />
              <View style={styles.recommendHeader}>
                  <Text style={styles.h2}>- - -猜你喜欢- - -</Text>
              </View>
              <SpacingView />
          </View>
        )
    },
      render:function () {
         return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row',backgroundColor:"#ff7419"}}>
                    <NavigationItem
                        title='上海'
                        titleStyle={{ color: 'white' }}
                        onPress={() => {  }}
                    />
                    <TouchableOpacity style={styles.searchBar}>
                        <Image source={require('../img/Home/search_icon.png')} style={styles.searchIcon} />
                        <Text style={styles.p}>搜一搜</Text>
                    </TouchableOpacity>
                    <NavigationItem
                        icon={require('../img/Home/icon_navigationItem_message_white@2x.png')}
                        onPress={() => {

                        }}
                    />
                </View>
                <View>
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
      _showDetail:function(infos){
    		var detRoute = {
    			component: AllDetail,
    			passProps: {
    				info:infos
    			}
    		};
    		console.log(detRoute)
    		this.props.navigator.push(detRoute);

    	},
      onGridSelected:function(index: number) {
        var discount = this.state.discounts[index]

        if (discount.type == 1) {
            StatusBar.setBarStyle('default', false)

            var location = discount.tplurl.indexOf('http')
            var url = discount.tplurl.slice(location)
            var title = discount.title;
            var detailRoute = {
        			component:CustomWebView,
        			passProps:{
        				backName:'活动',
        				title:title,
        				url:url
        			}
        		}

        		this.props.navigator.push(detailRoute);
        }
    }

})

var styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor:'#f3f3f3'
 },
 recommendHeader: {
     height: 35,
     justifyContent: 'center',
     alignItems:'center',
     borderWidth: Util.windowSize.onePixel,
     borderColor: '#e0e0e0',
     paddingVertical: 8,
    //  paddingLeft: 20,
     backgroundColor: 'white'
 },
 searchBar: {
     width: Util.windowSize.width * 0.7,
     height: 30,
     borderRadius: 19,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'white',
     alignSelf: 'center',
 },
 searchIcon: {
     width: 20,
     height: 20,
     margin: 5,
 },
 p: {
     fontSize: 13,
     color: '#777777',
 },
 h2: {
        fontSize: 14,
        color: '#222222',
    },
})

module.exports = HomeScene;
