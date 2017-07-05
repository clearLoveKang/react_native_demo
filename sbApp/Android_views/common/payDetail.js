/**
 * Created by DELL on 2017/6/27.
 */
'use strict';
import React, { Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
    ListView,
    PixelRatio,
    InteractionManager,
    TouchableHighlight
} from 'react-native';
var TimerMixin = require('react-timer-mixin');
import Swiper from 'react-native-swiper';
var Separator = require('./Separator');
import Icon from 'react-native-vector-icons/FontAwesome'
var Header = require('./header');
var Util = require('./../common/util');
var ServerUrl = require('./../common/service');
var CreateOrder = require('./createOrder');

import BaseComponent, {base} from '../base/Base' ;
import {registerApp,pay} from 'react-native-wechat';

let {
    N028_ORDERS$_GET_ORDERS,//获取订单列表
    J002_PAY$_VERIFICATION_ORDER_PAY,
    J003_PAY$_RESULT_ORDER_PAY,
    } = base.requests;

let {
    IDENTIFICATION_WXPAY_DEBUG,//微信支付 测试
    IDENTIFICATION_ALIPAY_DEBUG,//支付宝  测试
    } = base.fields;


var PayDetail = React.createClass({
    mixins: [TimerMixin],
    getInitialState:function(){
        return{
            checked: 0,
            secondsElapsed:900,
            one:1,
            two:5,
            three:0,
            four:0,
            orderData:null
        }
    },
    componentDidMount:function(){
        registerApp('wx7a7cdbe6cc609cdd')
            .then(succ=>{
                // alert('registerApp succ:'+JSON.stringify(succ))
            })
            .catch(error=>{
                // alert('registerApp error:'+error)
            })
            .done();
        this.tick();
        var that = this;
        CreateOrder._getOrderDetailInfo(this.props.orderID,function(e){
            alert(e)
            that.setState({orderData: e});
        })
    },
    tick: function() {
        var secondsElapsed = this.state.secondsElapsed-1;
        var s = secondsElapsed%60;
        var m = parseInt(secondsElapsed/60)
        this.setState({four:s%10});
        this.setState({three:parseInt(s/10)});
        this.setState({two:m%10});
        this.setState({one:parseInt(m/10)});
        if(secondsElapsed==0){
            this.setState({secondsElapsed: 0});
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
    _gotoPay:function(type){
        switch (type){
            case 0:
                //支付宝
                CreateOrder._payAlipay(this.state.orderData)
                break
            case 1:
                //微信
                CreateOrder._payWX(this.state.orderData)
                break
            default:
                break
        }
    },
    render:function(){
        var info = this.props.info;
        return(
            <View style={styles.container}>
                <Header
                    initObj={{backName:'',barTitle:'支付订单'}}
                    navigator={this.props.navigator}
                />
                <Swiper height={80}
                        loop={true}
                    // showsButtons={true}
                        index={0}
                        autoplay={true}
                        horizontal={true}
                        showsPagination={false}
                        >
                    <Image style={{height:80}} resizeMode={'stretch'} source={require('../img/1.jpg')} />

                    <Image style={{height:80}} resizeMode={'stretch'} source={require('../img/3.jpg')} />
                    <Image style={{height:80}} resizeMode={'stretch'} source={require('../img/4.jpg')} />
                </Swiper>
                <View style={styles.timeContainer}>
                    <View>
                        <Text style={{fontSize: 13}}>支付剩余时间</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.time}>{this.state.one}</Text>
                        <Text style={styles.time}>{this.state.two}</Text>
                        <Text style={{fontSize: 11}}>:</Text>
                        <Text style={styles.time}>{this.state.three}</Text>
                        <Text style={styles.time}>{this.state.four}</Text>
                    </View>
                </View>
                <Separator />
                <View style={styles.item}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: info.imageUrl.replace('w.h', '480.0') }}
                            //source={require('../img/4.jpg')}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <View>
                            <Text style={styles.price} numberOfLines={1}>￥{this.props.oPrice}</Text>
                        </View>
                        <View>
                            <Text style={styles.title} numberOfLines={1}>{info.title}</Text>
                        </View>
                    </View>
                </View>
                <Separator />
                <TouchableOpacity style={[styles.content,{marginTop:10}]}
                                  activeOpacity={0.85}
                                  onPress={()=>{this.setState({checked:0})}}
                >

                        <Image style={styles.payImg} resizeMode={'contain'} source={require('../img/zhifubao@2x.png')} />
                        <Text style={styles.h2}>支付宝支付</Text>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Icon name={this.state.checked===0?'check-circle':'circle-o'} size={20} color={this.state.checked===0?"#06C1AE":"#ccc"}/>

                </TouchableOpacity>
                <Separator />
                <TouchableOpacity style={styles.content}
                                  activeOpacity={0.85}
                                  onPress={()=>{this.setState({checked:1})}}
                >

                        <Image style={styles.payImg} resizeMode={'contain'} source={require('../img/weixin@2x.png')} />
                        <Text style={styles.h2}>微信支付</Text>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Icon name={this.state.checked===1?'check-circle':'circle-o'} size={20} color={this.state.checked===1?"#06C1AE":"#ccc"}/>

                </TouchableOpacity>
                <TouchableHighlight style={styles.loginBtn} onPress={()=>{this._gotoPay(this.state.checked)}}>
                    <Text style={styles.loginText}>确认支付￥{this.props.oPrice}</Text>
                </TouchableHighlight>
            </View>

        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f1f1f1'
    },
    timeContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        backgroundColor: "white"
    },
    time: {
        paddingHorizontal: 4,
        backgroundColor: "#666",
        fontSize: 14,
        color: "#fff",
        marginHorizontal: 3,
        borderRadius:2
    },
    item:{
        flexDirection:'row',
        height:80,
        padding:10,
        backgroundColor: "white"
    },
    imageContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:50,
        height:50,
        borderRadius:50,
    },
    contentContainer:{
        flex:1,
        marginLeft:15,
        justifyContent:'center',
    },
    price:{
        fontSize:18,

    },
    title:{
        fontSize:14,

    },
    h2: {
        fontSize: 14,
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
        backgroundColor:'white'
    },
    payImg:{
        height:20,
        width:20,
        marginRight:10
    },
    loginBtn:{
        backgroundColor: '#ff7419',
        padding: 10,
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    loginText:{
        color:'#ffffff',
        fontSize: 17,
    }
})

module.exports = PayDetail;
