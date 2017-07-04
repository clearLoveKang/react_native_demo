import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, ListView, TouchableOpacity, ScrollView, RefreshControl ,InteractionManager} from 'react-native'

var DetailCell = require('./DetailCell');
var SpacingView = require('./../common/Separator')
var OrderMenuItem = require('./OrderMenuItem')
var RefreshListView = require('./../common/RefreshListView');
var OrderListItem = require('./OrderListItem');
var Util = require('./../common/util');
var ServerUrl = require('./../common/service');
var TimerMixin = require('react-timer-mixin');
var AllDetail = require('./../common/AllDetail')
var AllOrder = require('./../allOrder/allOrder');
var Order = React.createClass({
    mixins: [TimerMixin],
  getInitialState:function(){
		var ds = new ListView.DataSource({
			rowHasChanged:(oldRow,newRow) => oldRow!==newRow
		});
		return {
			//dataSource
			dataSource:ds
		}
	},
    requestData:function () {
      var url = ServerUrl.recommend;
      var that = this;
      Util.getRequest(url,function(data){
        console.log(data);
        //请求成功回调
        //{'count:0','start':0,'total':0,books:[]}
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
    showOrder:function(){
        var detRoute = {
            component: AllOrder,
            passProps: {
            }
        };
        this.props.navigator.push(detRoute);
    },
    renderHeader:function () {
      return(
          <View style={styles.container}>
              <DetailCell title='我的订单' subtitle='全部订单' style={{ height: 38 }} onPress={this.showOrder}/>

              <View style={styles.itemContainer}>
                  <OrderMenuItem title='待付款' icon={require('../img/Order/order_tab_need_pay@2x.png')} />
                  <OrderMenuItem title='待使用' icon={require('../img/Order/order_tab_need_use@2x.png')} />
                  <OrderMenuItem title='待评价' icon={require('../img/Order/order_tab_need_review@2x.png')} />
                  <OrderMenuItem title='退款/售后' icon={require('../img/Order/order_tab_needoffer_aftersale@2x.png')} />
              </View>

              <SpacingView />

              <DetailCell title='我的收藏' subtitle='查看全部' style={{ height: 38 }} />
          </View>
        )
    },
    render:function () {
      return (
        <View style={styles.container}>
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
        </View>
    );
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
  componentDidMount:function(){
		//请求数据
    InteractionManager.runAfterInteractions(() => {
          this.requestData();
       });

	},

});

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  itemContainer: {
      flexDirection: 'row',
  },
});

module.exports = Order;
