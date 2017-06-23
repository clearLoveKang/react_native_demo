/**
 * Created by DELL on 2017/6/23.
 */
'use strict';

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
var Header = require('./../common/header');
//FontAwesome
var EditAddress = React.createClass({
    getInitialState:function(){
        return{
            name: "",
            phone: "",
            tag: null,
            gender: null,
            address: ""
        }
    },
    componentDidMount:function(){
        if(this.props.pageType == 1){
            let obj = {};
            ["name","phone","tag","gender","address","number"].forEach((item) => {
                obj[item] = this.props.data[item]
            })
            this.setState(obj)
        }
        this.refs.name.focus()
    },
    submit:function(){

    },

    render:function(){
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <Header
                    initObj={{backName:'',barTitle:this.props.title}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    <View style={{backgroundColor:"#fff",paddingLeft: 16}}>
                        <View style={styles.item}>
                            <Text style={styles.label}>{"联系人"}</Text>
                            <View style={{flex: 1}}>
                                <TextInput underlineColorAndroid="transparent" autoCapitalize={"none"} ref={"name"} style={styles.textInput} placeholder="姓名" placeholderTextColor="#aaa"/>
                                <View style={{paddingTop: 10, marginTop: 10, flexDirection:"row", borderTopWidth: 1, borderTopColor: "#f8f8f8"}}>
                                    <TouchableOpacity style={{marginLeft: 10}} onPress={()=>{this.setState({gender:0})}}>
                                        <Text style={[styles.radio, this.state.gender===0?styles.active:null]}>{"先生"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: 10}} onPress={()=>{this.setState({gender:1})}}>
                                        <Text style={[styles.radio, this.state.gender===1?styles.active:null]}>{"女士"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>{"电话"}</Text>
                            <View style={{flex: 1}}>
                                <TextInput underlineColorAndroid="transparent" keyboardType={"numeric"} style={styles.textInput} placeholder="收货人电话" placeholderTextColor="#aaa"/>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>{"地址"}</Text>
                            <View style={{flex: 1}}>
                                <TextInput underlineColorAndroid="transparent" style={styles.textInput} placeholder="小区/写字楼/学校" placeholderTextColor="#aaa"/>
                                <View style={{paddingTop: 10,marginTop: 10, flexDirection:"row", borderTopWidth: 1, borderTopColor: "#f8f8f8"}}>
                                    <TextInput underlineColorAndroid="transparent" style={styles.textInput} placeholder="详细地址" placeholderTextColor="#aaa"/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>{"门牌号"}</Text>
                            <View style={{flex: 1}}>
                                <TextInput underlineColorAndroid="transparent" style={styles.textInput} placeholder="例：2号楼6C021" placeholderTextColor="#aaa"/>
                            </View>
                        </View>
                        <View style={[styles.item, {alignItems: "center"}]}>
                            <Text style={{fontSize: 13, color:"#222", minWidth: 45}}>{"标签"}</Text>
                            <View style={{flexDirection:"row", flex: 1}}>
                                <TouchableOpacity style={{marginLeft: 10}} onPress={()=>{this.setState({tag:0})}}>
                                    <Text style={[styles.radio, this.state.tag===0?styles.active:null]}>{"家"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: 10}} onPress={()=>{this.setState({tag:1})}}>
                                    <Text style={[styles.radio, this.state.tag===1?styles.active:null]}>{"公司"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: 10}} onPress={()=>{this.setState({tag:2})}}>
                                    <Text style={[styles.radio, this.state.tag===2?styles.active:null]}>{"学校"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow:"hidden"}} onPress={this.submit}>
                        <View style={{flex: 1, height: 40, backgroundColor: "#ff6836",borderRadius: 3, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{color: "#fff"}}>{"确定"}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
})

var styles = StyleSheet.create({
    item:{
        borderBottomWidth: 1,
        borderBottomColor: "#f8f8f8",
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    active: {
        borderColor: "#81c2ff",
        color: "#0096ff"
    },
    label: {
        minWidth: 45,
        fontSize: 13,
        color:"#222",
        paddingTop: 8
    },
    textInput: {
        flex: 1,
        paddingVertical: 0,
        height: 30,
        fontSize: 13,
        paddingHorizontal: 10
    },
    radio: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: "#666",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        fontSize: 13,
        backgroundColor: "#fff"
    }
})
module.exports = EditAddress;