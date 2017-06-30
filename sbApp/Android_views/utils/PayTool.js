import React, {Component} from 'react';

import  {base} from '../base/Base'

import *as wechat from 'react-native-wechat'
//这个还没有引入
import Alipay from 'react-native-yunpeng-alipay'


export default class PayTool extends Component {



    /*获取支付信息的方法
     *	paragmas内需要参数:
     1.identification: wxpayTest alipay (支付渠道)
     2.total_fee: float  总金额,保留两位小数
     3.bill_no: string 订单号
     4.title: 商品名称 不超过4个中文字符
     5.quantity: 数量
     */
    startPay(paragmas) {
        paragmas.returnType = 'url'
        paragmas.appId = base.device.isAndroid() ? 'com.innjiabutler.android.chs' : 'com.innjiabutler.ios.chs';
        paragmas.version = '4.3.0'
        paragmas.appName = '盈家生活'

        let paragmasError = this._checkInfo(paragmas);

        return new Promise((resolve, reject) => {
            if (paragmasError) {
                reject({'0001': paragmasError})
            } else {
                base.network.getUipData('J002', paragmas, (responseData) => {
                    this._getPayInfo(responseData['accessToken'], paragmas['identification'], resolve, reject);

                }, err => {
                    //不会走到这
                    reject({'0001': '获取订单信息错误:J002;' + responseData['code']})
                })
            }
        });


    }

    _checkInfo(paragmas) {
        if (!(paragmas.identification == 'wxpayTest' || paragmas.identification == 'alipay')) {
            return '支付渠道选择错误';
        }
        if (!(paragmas.total_fee * 1.00 > 0.01)) {
            return '支付金额错误';
        }
        if (paragmas.bill_no.length < 32) {
            return '订单号错误';
        }
        if (paragmas.title.length > 4) {
            return "商品名称过长";
        }
        if (!(paragmas.quantity > 0)) {
            return "错误的数量";
        }
    }

    _getPayInfo(accessToken, identification, resolve, reject) {
        base.network.getUipData('J003', {'accessToken': accessToken, 'identification': identification},
            sucData => {
                if (identification == 'wxpayTest') {
                     this._callWxApp(sucData, resolve, reject);
                }
                else {
                     this._callAliApp(sucData['orderData'], resolve, reject)
                }
            },
            error => {
                reject({'0001': '理论上不会走这J003'})
            })
    }

    _callAliApp(data, resolve, reject) {
        var dict = {scheme: 'ZUHOUSHENGHUO', orderData: data}
         Alipay.pay(data)
             .then((succ)=>{resolve(succ)})
             .catch((error)=>{reject(error)})
             .done();


    }


    _callWxApp(data, resolve, reject) {
        // {
        // 	partnerId: 'asdasdasdas',  // 商家向财付通申请的商家id
        //     prepayId: 'asdasdasda',   // 预支付订单
        //     nonceStr: ' asdasdasda',   // 随机串，防重发
        // 	timeStamp: ' asdasdasda',  // 时间戳，防重发
        // 	package: ' asdasdasda',    // 商家根据财付通文档填写的数据和签名
        // 	sign: ' asdasdasda'        // 商家根据微信开放平台文档对数据做的签名
        // 			}
        wechat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    // wechat.once('PayReq.Resp',(response)=>{
                    //     if (parseInt(response.errCode) === 0) {
                    //         resolve(response)
                    //     }
                    //     else{
                    //         reject({'0004':'微信支付失败'+response.errCode})
                    //     }
                    // })
                    // wechat.pay(data);

                    wechat.pay(data)
                        .then((succ)=>{resolve(succ)})
                        .catch((error)=>{reject(error)})
                        .done();
                }
                else {
                    reject({'0002': '请先安装微信,或更新微信到最新版本'})
                }
            });
    }

}
