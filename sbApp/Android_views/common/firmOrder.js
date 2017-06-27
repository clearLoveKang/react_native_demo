/**
 * Created by DELL on 2017/6/26.
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
var Separator = require('./Separator');
import Icon from 'react-native-vector-icons/FontAwesome'
var Header = require('./header')
var PayDetail = require('./payDetail');

var FirmOrder = React.createClass({
    mixins: [TimerMixin],
    getInitialState:function(){
        return {
            coupon:false,
            price:this.props.info.price,
            number:1,
            modalVisible:false,
            oPrice:null
        }
    },
    checkSelect:function(){
        this.setState({coupon:!this.state.coupon})
    },
    changeShopCount:function(cut){
        var count = this.state.number;
        if(cut){
            count++;
            this.setState({number:count})
        }else{
            count--;
            if(count<1){
                alert('最少须有一件商品')
            }else{
                this.setState({number:count})
            }
        }
    },
    setModalVisible:function(visible) {
        this.setState({modalVisible: visible});
        var that = this;
        this.setTimeout(
            () => {
                that.setState({modalVisible: false});
                that._showPay(that.props.info);
            },
            5000
        );
    },
    _showPay:function(infos){
        var detRoute = {
            component: PayDetail,
            passProps: {
                info:infos,
                oPrice:this.state.coupon?this.state.number*this.state.price-8:this.state.number*this.state.price
            }
        };
        this.props.navigator.push(detRoute);
    },
    render:function(){
        return (
            <View style={styles.container}>
                <Header
                    initObj={{backName:'',barTitle:'提交订单'}}
                    navigator={this.props.navigator}
                />
                <View style={styles.content}>
                    <Text style={styles.h2}>{this.props.info.title}</Text>
                    <View style={{ flex: 1, backgroundColor: 'blue' }} />
                    <Text style={{fontSize: 13, color: '#222222' }}>￥{this.state.price}</Text>
                </View>
                <Separator />
                <View style={[styles.content,{height:50}]}>
                    <Text style={styles.h2}>数量</Text>
                    <View style={{ flex: 1, backgroundColor: 'blue' }} />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => this.changeShopCount(false) }
                            activeOpacity={0.75}
                            style={[styles.countButton,{borderBottomLeftRadius:5,borderTopLeftRadius:5}]} >
                            <Text style={{fontSize:16, color:this.state.number !== 1?'#06C1AE':null}}>-</Text>
                        </TouchableOpacity>
                        <View style={styles.countButtonCenter} >
                            <Text >{this.state.number}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.changeShopCount(true) }
                            activeOpacity={0.75}
                            style={[styles.countButton,{borderBottomRightRadius:5,borderTopRightRadius:5}]} >
                            <Text style={{fontSize:16,color:'#06C1AE'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Separator />
                <View style={styles.content}>
                    <Text style={styles.h2}>小计</Text>
                    <View style={{ flex: 1, backgroundColor: 'blue' }} />
                    <Text style={{fontSize: 13, color: '#ff7419' }}>￥{this.state.number*this.state.price}</Text>
                </View>
                <Separator />
                <TouchableOpacity style={[styles.content,{marginTop:10,marginBottom:10}]}
                                  onPress={this.checkSelect}
                >
                    <Text style={styles.h2}>商家立减优惠，品牌新用户立减8元</Text>
                    <View style={{ flex: 1, backgroundColor: 'blue' }} />
                    {
                        this.state.coupon?
                            <Text style={{fontSize: 13, color: '#ff7419',marginRight:10}}>-￥8</Text>
                            :null
                    }
                    <Icon name={this.state.coupon?'check-square':'square-o'} size={20} color="#06C1AE"/>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.h2}>抵用券</Text>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Image style={styles.arrow} source={require('../img/Public/cell_arrow.png')} />
                    </View>
                </TouchableOpacity>
                <Separator />
                <View style={styles.content}>
                    <Text style={styles.h2}>订单总价</Text>
                    <View style={{ flex: 1, backgroundColor: 'blue' }} />
                    <View>
                        <Text style={{fontSize: 13, color: '#ff7419' ,alignSelf:'flex-end'}}>￥{this.state.coupon?this.state.number*this.state.price-8:this.state.number*this.state.price}</Text>
                        {
                            this.state.coupon?
                                <Text style={{fontSize: 10, color: '#ff7419' }}>(已优惠￥8)</Text>
                            :null
                        }
                    </View>
                </View>
                <Separator style={{marginBottom:10}}/>
                <TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.h2}>132****1216</Text>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Text style={{fontSize: 13, color: '#999999' }}>绑定新手机号</Text>
                        <Image style={styles.arrow} source={require('../img/Public/cell_arrow.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableHighlight style={styles.loginBtn}
                                    onPress={() => {this.setModalVisible(true)
                }}>
                    <Text style={styles.loginText}>提交订单</Text>
                </TouchableHighlight>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                >
                    <View style={styles.container1}>
                        <View style={styles.innerContainer}>
                            <ActivityIndicator color="#06C1AE"/>
                            <Text>正在生成订单...</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
});
var styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor:'#aaaaaaaa'
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20
    },
    container: {
        flex:1,
        backgroundColor: '#f1f1f1'
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
        backgroundColor:'white'
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    },
    countButton:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    countButtonCenter:{
        width: 40,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    h2: {
        fontSize: 14,
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
    loginBtn:{
        backgroundColor: '#ff7419',
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
});

module.exports = FirmOrder;