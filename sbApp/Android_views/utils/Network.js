import React, {Component} from'react';
import NetTool from './NetTool';
import {HOST} from './RequestConstant';
import {base} from  '../base/Base';


// let userInfo=base.fields.USER_INFO;

export default class Network extends Component {
    constructor(props) {
        super(props);
    }

    //methidId:N001
    //params:参数
    //successHander:成功回调 成功回传数据
    //failHander:失败回调 失败回传msg
    getUipData(methidId, params, successHander, failHander) {
        fetchData1(HOST, methidId, params, 'POST', successHander, failHander);
    }

}

const fetchData1 = (host, api, params, method, successHander, failHander) => {

    params = new NetTool().editParams(params, api);

    if (method == 'GET') {
        fetchDataGet(host, api, params, successHander, failHander);
    }
    else if (method == 'POST') {
        fetchDataPost(host, api, params, successHander, failHander);
    }
}


//host example:http://rn.innjia.com
//api example:/getHomeListData
//params 参数
//successHander 成功回调
//failHander 失败回调
const fetchDataGet = (host, api, params, successHander, failHander) => {

    var i = 0;
    for (var key in params) {
        if (i == 0) {
            host += ('?' + key + '=' + params[key]);
        }
        else {
            host += ('&' + key + '=' + params[key]);
        }
        i++;
    }
    fetch(host, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json()).then((responseData) => {
        dealWithSuccessReponse(api, responseData, successHander, failHander);
    })
        .catch((error) => {
            dealWithFailReponse(api, error, successHander, failHander);
        })
}

//host example:http://rn.innjia.com
//api example:/getHomeListData
//params 参数
//successHander 成功回调
//failHander 失败回调
const fetchDataPost = (host, api, params, successHander, failHander) => {

    //base.Store.get(base.fields.USER_INFO).then(ret => {

        fetchDataPostWithToken(host, api, "6dd05e96-0643-4b09-9825-43bddbcac3b7:9be4d8cd57464ffaacf322346a7ac0eb", params, successHander, failHander);
    //}).catch(err => {
    //    fetchDataPostWithToken(host, api, '', params, successHander, failHander);
    //})

}
const fetchDataPostWithToken = (host, api, token, params, successHander, failHander) => {
    fetch(host, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token,
        },
        body: params
    }).then((response) => {
        if (response.status == 200) {
            response.json().then((responseData) => {
                dealWithSuccessReponse(api, responseData, successHander, failHander);
            });
        }
        else {
            dealWithFailReponse(api, response.status, successHander, failHander);
        }
    })
        .catch((error) => {
            dealWithFailReponse(api, error, successHander, failHander);
        });
}
const dealWithSuccessReponse = (api, responseData, successHander, failHander) => {
    if (api.indexOf('N') == 0) {
        dealWithOldSuccessResponse(responseData, successHander, failHander);
    }
    else if (api.indexOf('J') == 0) {
        dealWithJaveSuccessResponse(responseData, successHander, failHander);
    }
    else {
        dealWithNewSuccessResponse(responseData, successHander, failHander);
    }
}
const dealWithFailReponse = (api, error, successHander, failHander) => {
    if (api.indexOf('N') == 0) {
        dealWithOldFailResponse(error, successHander, failHander);
    }
    else if(api.indexOf('J')){
        dealWithJavaFailResponse(error, successHander, failHander);
    }
    else {
        dealWithNewFailResponse(error, successHander, failHander);
    }
}
//处理成功  老接口N
const dealWithOldSuccessResponse = (responseData, successHander, failHander) => {
    var statusDic = responseData.status;

    if (statusDic) {

        var code = statusDic.code;
        var msg = statusDic.errorMessage;
        if (!msg) {
            msg = "啊哦,貌似网络出了点问题";
        }
        var returnData = responseData["data"];

        if (code == 200) {
            return successHander(returnData);
        }

        else return failHander(msg);

    } else {
        return failHander(responseData.res.msg);
    }

}
//处理失败 老接口N
const dealWithOldFailResponse = (error, successHander, failHander) => {
    var msg = "啊哦,貌似网络出了点问题" + error;
    failHander(msg);
}

//处理成功 java的接口
const dealWithJaveSuccessResponse = (responseData, successHander, failHander) => {
    var code = responseData.code;

    var returnData;
    if (code && code === '0000') {
        successHander(responseData);
    } else {
        failHander("啊哦,貌似网络出了点问题" + code)
    }

}
//处理失败 java的接口
const dealWithJavaFailResponse = (error, successHander, failHander) => {
    var msg = "啊哦,貌似网络出了点问题" + error;
    failHander(msg);
}

//处理成功 新接口
const dealWithNewSuccessResponse = (responseData, successHander, failHander) => {
    var code = responseData.code;
    var res = responseData.res;
    var msg = res.msg;
    var returnData;
    if (msg.length <= 0) {
        msg = "啊哦,貌似网络出了点问题";
    }
    if (res.data instanceof Array) {
        returnData = res.data;
    }
    else if (res.data instanceof Object) {
        var mulDict = res.data;
        mulDict.msg = res.msg;
        returnData = mulDict;
    }
    else {
        returnData = "data为空";
    }
    if (code == 0) {
        successHander(returnData);
    }
    else {
        failHander(msg);
    }
}
//处理失败 新接口
const dealWithNewFailResponse = (error, successHander, failHander) => {
    var msg = "啊哦,貌似网络出了点问题" + error;
    failHander(msg);
}
