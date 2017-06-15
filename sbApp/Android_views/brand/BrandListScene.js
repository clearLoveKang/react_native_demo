import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar } from 'react-native'
var RefreshListView = require('./../common/RefreshListView');
var OrderListItem = require('./../shopcart/OrderListItem');
var TimerMixin = require('react-timer-mixin');
var BrandMenuView = require('./BrandMenuView');
var api = require('./../common/service');
var Util = require('./../common/util');
var AllDetail = require('./../common/AllDetail')

var BrandListScene = React.createClass({
    mixins: [TimerMixin],
    getInitialState:function () {
      var ds = new ListView.DataSource({
  			rowHasChanged:(oldRow,newRow) => oldRow!==newRow
  		});
      return{
        discounts: [],
        listView: ListView,
        show:false,
        dataSource:ds,
        typeIndex: 0,

      }
    },
    componentDidMount:function () {
        this.listView.startHeaderRefreshing();
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
    render:function () {
        return(
            <RefreshListView
                  ref={(e) => this.listView = e}
                  dataSource={this.state.dataSource}
                  renderHeader={() =>
                      <BrandMenuView
                          titles={this.props.types}
                          selectedIndex={this.state.typeIndex}
                          onSelected={(index) => {
                              if (index != this.state.typeIndex) {
                                  this.setState({ typeIndex: index })
                                  this.listView.startHeaderRefreshing()
                              }
                          }}
                      />
                  }
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
        )
    }
});

var styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});

module.exports = BrandListScene;
