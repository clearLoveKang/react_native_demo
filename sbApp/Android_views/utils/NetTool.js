/* @flow */

import React, {Component} from 'react';

import {base} from '../base/Base';


export default class NetTool extends Component {



    constructor(props) {
        super(props);
        lastDate = null;
        //IOS 和android 有区分
        appkey = base.device.isAndroid() ? "innjia2016111702" : "innjia2016111701";
    }

    editParams(params, api) {


        var finalParams = {};
        let radomStr = this.net_genRandomString();
        let timeStamp = this.net_getTimeStamp();
        let requestDataString = JSON.stringify(params);
        finalParams.methodId = api;
        finalParams.methodParam = requestDataString;
        finalParams.nonce = radomStr;
        finalParams.timestamp = timeStamp;
        finalParams.appid = base.device.isAndroid() ? "ANDROID" : "IOS";
        finalParams.appkey = appkey;
        var sign = this.signParama(finalParams);
        finalParams.signature = sign;
        var string = "";
        var keysArr = Object.keys(finalParams);

        for (let i = 0; i < keysArr.length; i++) {
            let key = keysArr[i];
            let value = finalParams[key];
            string += "&";
            string += key;
            string += "=";
            string += value;
        }
        string = string.substring(1);
        return string;
    }

    signParama(params) {
        var string = "";
        var keysArr = Object.keys(params).sort();
        for (var i = 0; i < keysArr.length; i++) {
            var key = keysArr[i];
            var value = params[key];
            string += "&";
            string += key;
            string += "=";
            string += value;
        }
        string += "&key=" + appkey;
        string = string.substring(1);
        var MD5 = require("crypto-js/md5");
        string = MD5(string, {asString: true});
        string += "";
        string = string.toUpperCase();
        return string;
    }

    net_genRandomString() {
        var date = new Date();
        if (date == lastDate) {

        }
        else {
            lastDate = date;
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var millisecond = date.getMilliseconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + day;
        }
        if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
        }
        if (second >= 0 && second <= 9) {
            second = "0" + second;
        }
        if (millisecond >= 0 && millisecond <= 9) {
            millisecond = "00" + millisecond;
        }
        else if (millisecond >= 10 && millisecond <= 99) {
            millisecond = "0" + millisecond;
        }
        var currentdate = year + month + day
            + hour + minute + second + millisecond;
        return currentdate;
    }

    net_getTimeStamp() {
        let ts = lastDate.valueOf();
        return ts;
    }
}