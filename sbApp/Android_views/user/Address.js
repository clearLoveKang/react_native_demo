'use strict';

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import EditAddress from './EditAddress'
import Icon from 'react-native-vector-icons/Ionicons'
var Header = require('./../common/header');
var Address = React.createClass({
    getInitialState:function(){
        return{
            address: [
                {
                    name: "cheng",
                    phone: "13253521216",
                    tag: "公司",
                    color: "#0096ff",
                    address: "盈家生活"
                },
                {
                    name: "cheng",
                    phone: "13253521216",
                    tag: "家",
                    color: "#ff6000",
                    address: "长宁区淞虹路新泾家苑885号"
                }
            ]
        }
    },
    add:function(){
        this.props.navigator.push({
            component: EditAddress,
            passProps: {
                pageType: 0,
                title: "新增地址"
            }
        })
    },
    edit:function(data){
        this.props.navigator.push({
            component: EditAddress,
            passProps: {
                pageType: 1,
                title: "修改地址",
                data
            }
        })
    },
    render:function(){
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <Header
                    initObj={{backName:'',barTitle:this.props.title}}
                    navigator={this.props.navigator}
                />
                <ScrollView>
                    {this.state.address.map((item, i) => {
                        return (
                            <TouchableOpacity key={i} onPress={this.edit.bind(this, item)}>
                                <View style={styles.address}>
                                    <View>
                                        <Text style={{color: "#333", fontSize: 14}}>{item.name+" "+item.phone}</Text>
                                        <View style={styles.ads1List}>
                                            <Text style={[styles.tag, {backgroundColor: item.color || "#0096ff", }]}>{item.tag}</Text>
                                            <Text style={{color: "#bbb", fontSize:13}}>{item.address}</Text>
                                        </View>
                                    </View>
                                    <Icon name="md-create" size={22} color="#ccc" />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <TouchableOpacity style={{position: "absolute", bottom: 8,left:0, right:0, flex: 1}} onPress={this.add}>
                    <View style={{height: 45,flexDirection:"row", backgroundColor: "#fff", flex: 1, alignItems:"center", justifyContent: "center"}}>
                        <Icon name="ios-add-circle-outline" size={18} color="#0096ff" />
                        <Text style={{color: "#0096ff", fontSize: 14, marginLeft: 8}}>{"新增地址"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

})

var styles = StyleSheet.create({
    address: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#fbfbfb",
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        paddingVertical: 8
    },
    tag: {
        color: "#fff",
        fontSize: 12,
        minWidth: 30,
        textAlign: "center",
        paddingVertical: 1,
        paddingHorizontal: 2,
        borderRadius: 5,
        marginRight: 5
    },
    ads1List: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5
    }
})

module.exports = Address;