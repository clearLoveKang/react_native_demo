/**
 * Created by DELL on 2017/5/25.
 *   Base 基类组件，所有的都继承此组件，代替继承Component
 *   页面 都放到pages文件夹下，若是不同模块可以在pages文件夹下创建模块文件夹
 */

import React ,{ Component }from 'react';
import {
    View,
    Modal,
    ActivityIndicator,

} from 'react-native';

//引入接口路径
import * as requests from '../utils/RequestConstant'
//引入字段常量;
import * as fields from '../utils/FieldConstant';
// 吐司方法
import * as toastUtil  from '../utils/ToastUtil';
//网络请求 ，工具类 ,  .js 可省略
import  Network from '../utils/Network.js' ;
import  Device from '../utils/Device.js' ;
//支付工具
import PayTool from '../utils/PayTool'
//样式控制
import  {styles,StyleConfig} from './Styles' ;




//变量区域
//倒计时
const TimerMixin = require('react-timer-mixin');
//保存本地工具类
const Store = require('react-native-simple-store');

var {
    toastShort,
    toastLong,
} = toastUtil;

var  network=new Network();//初始化完成完成网络请求对象
var  device=new Device();//初始化完成完成设备对象
var  payTool=new PayTool();//初始化完成 支付工具




export const base={
    Store,
    toastShort,
    TimerMixin,
    fields,
    requests,
    network,
    styles,
    StyleConfig,
    device,
    payTool,

}

export default class BaseComponent extends Component {



}


//加载时显示进度框
export  class AppIndictor extends BaseComponent {

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {this.props.onRequestClose
                }}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'transparent'}}>
                    <ActivityIndicator
                        color={this.props.color}
                        style={[this.props.style]}
                        animating={this.props.modalVisible}
                        size={this.props.size}/>
                </View>
            </Modal>
        )
    }
}





