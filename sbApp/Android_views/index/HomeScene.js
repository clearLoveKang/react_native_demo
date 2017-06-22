import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar ,Animated} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
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
var LbsModal = require('./Locatin')

var HomeScene = React.createClass({
    mixins: [TimerMixin],
    getInitialState:function () {
      var ds = new ListView.DataSource({
  			rowHasChanged:(oldRow,newRow) => oldRow!==newRow
  		});
      return{
        discounts: [],
        show:false,
        dataSource:ds,
        scrollY: new Animated.Value(0),
        location: "北新泾",
        modalVisible: false,
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
              {this._AnimatHeader()}
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
    openLbs:function(){
      this.setState({modalVisible: true})
    },
    changeLocation:function(location){
      this.setState({location})
    },
    _AnimatHeader:function () {
        var searchY = this.state.scrollY.interpolate({
          inputRange: [0, 43, 76, 76],
          outputRange: [0, 0, 33, 33]
        })
        var lbsOpaticy = this.state.scrollY.interpolate({
          inputRange: [0, 43],
          outputRange: [1, 0]
        })
        var keyOpaticy = this.state.scrollY.interpolate({
          inputRange: [0, 43, 58],
          outputRange: [1, 1, 0]
        })
      return (
        <View style={styles.header}>
          <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]}>
            <TouchableOpacity onPress={this.openLbs}>
              <View style={styles.lbs}>
                <Icon name="ios-pin" size={18} color="#fff" />
                <Text style={{fontSize: 18, fontWeight: 'bold', color:"#fff", paddingHorizontal: 5}}>{this.state.location}</Text>
                <Icon name="md-arrow-dropdown" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
            <View style={styles.weather}>
              <View style={{marginRight: 5}}>
                <Text style={{color: "#fff", fontSize: 11, textAlign: "center"}}>{"3°"}</Text>
                <Text style={{color: "#fff", fontSize: 11}}>{"阵雨"}</Text>
              </View>
              <Icon name="ios-flash-outline" size={25} color="#fff" />
            </View>
          </Animated.View>
          <Animated.View style={{
            marginTop: 15,

          }}>
            <TouchableOpacity onPress={()=>{}}>
              <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
                <Image source={require('../img/Home/search_icon.png')} style={styles.searchIcon} />
                <Text style={{fontSize: 13, color:"#666", marginLeft: 5}}>{"输入商家，商品名称"}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.keywords, {opacity: keyOpaticy}]}>
            {
              ['肯德基','烤肉','吉野家','粥','必胜客','一品生煎','星巴克'].map((item, i) => {
                return (
                  <TouchableOpacity key={i}>
                    <View style={{marginRight: 12}}>
                      <Text style={{fontSize: 12, color:"#fff"}}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </Animated.View>
        </View>
      )
    },
    _AnimatFixHeader:function(){
        var showY = this.state.scrollY.interpolate({
          inputRange: [0, 43, 76, 76],
          outputRange: [-9999, 0, 0, 0]
        })
        return (
          <Animated.View style={[styles.header, {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom:0,
            height: 43,
            paddingTop:10,
            transform: [
              {translateY: showY}
            ]
          }]}>
            <TouchableOpacity onPress={()=>{}}>
              <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
                <Image source={require('../img/Home/search_icon.png')} style={styles.searchIcon} />
                <Text style={{fontSize: 13, color:"#666", marginLeft: 5}}>{"输入商家，商品名称"}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )
      },
      render:function () {
         return (
            <View style={styles.container}>

                <View>
                  {
                    //请求数据显示loading，数据请求成功显示ListView
                    this.state.show?
                    <RefreshListView
                        onScroll={Animated.event(
                          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                        )}
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
                {this._AnimatFixHeader()}
                <LbsModal
                  modalVisible={this.state.modalVisible}
                  location={this.state.location}
                  setLocation={this.changeLocation}
                  closeModal={(()=>this.setState({modalVisible: false}))}
                />
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
     width: 15,
     height: 15,
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
  header: {
    backgroundColor: "#ff7419",
    height: 120,
    paddingTop: 10,
    paddingHorizontal: 16
  },
  lbsWeather: {
    height: 28,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeholder: {
    height: 28,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    borderRadius: 14,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  lbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  weather: {
    flexDirection: "row",
    alignItems: "center"
  },
  textInput:{
    flex: 1,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff"
  },
  searchHeadBox: {
    height: 28,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBtn: {
    borderRadius: 28,
    height: 28,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  keywords: {
    marginTop: 14,
    flexDirection: "row"
  },
})

module.exports = HomeScene;
