/**
 * Created by DELL on 2017/7/4.
 */
/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component, PropTypes } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    AlertIOS,
    RefreshControl,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native'

import data from './data'

class Item extends Component {
    constructor(props){
        super(props)
    }
    static propTypes = {
        title: PropTypes.string.isRequired,
        logo: PropTypes.string,
        state: PropTypes.string,
        time: PropTypes.string,
        info: PropTypes.string,
        price: PropTypes.string
    }
    render(){
        const { title, logo, state, time, info, price } = this.props
        let render = (
            <View style={styles.item}>
                <Image source={{uri:logo}} style={styles.logo} />
                <View style={styles.info}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontSize: 14, color:"#333"}}>{title}</Text>
                        <Text style={{fontSize: 13, color:"#333"}}>{state}</Text>
                    </View>
                    <View style={{paddingBottom: 8,borderBottomWidth: 1,borderBottomColor: "#f9f9f9"}}>
                        <Text style={{fontSize: 12, color:"#bbb",marginTop: 5}}>{time}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16}}>
                        <Text style={{fontSize: 13, color:"#aaa"}}>{info}</Text>
                        <Text style={{fontSize: 13, color:"#333"}}>{price}</Text>
                    </View>
                </View>
            </View>
        )
        return (
            Platform.OS === 'ios'?(
                <TouchableHighlight style={{marginTop: 10}} onPress={() => {}}>{render}</TouchableHighlight>
            ):(
                <View style={{marginTop: 10}}><TouchableNativeFeedback onPress={() => {}}>{render}</TouchableNativeFeedback></View>
            )
        )
    }
}
var Breakfast = React.createClass({
    getInitialState:function(){
        return{
            data: [],
            isRefreshing: false
        }
    },
    _onRefresh:function(){
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({
                data: data.breakFastData,
                isRefreshing: false
            })
        }, 1500)
    },
    _noData:function(){
        return (
            <View style={{alignItems: "center", paddingTop: 50}}>
                <Image source={require('../img/no_log.png')} style={styles.noData} />
                <Text style={{color: "#aaa"}}>{"无订单记录"}</Text>
            </View>
        )
    },
    render:function(){
        return (
            <ScrollView
                style={{backgroundColor: "#f3f3f3"}}
                refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#bbb"
            colors={['#ddd', '#0398ff']}
            progressBackgroundColor="#ffffff"
          />
        }
            >
                {
                    (()=>{
                        return this.state.data.length?
                            [<Text key={"title"} style={{textAlign: "center", color: "#999", fontSize: 12, paddingTop: 20}}>{"早餐订单"}</Text>]
                                .concat(this.state.data.map((item, i) => {
                                    return <Item key={i} {...item} />
                                })):this._noData()
                    })()
                }
            </ScrollView>
        )
    }
})

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        paddingLeft: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingTop: 16
    },
    noData: {
        width: 80,
        height: 80,
        resizeMode: "cover",
        marginBottom: 16
    },
    logo: {
        width: 35,
        height: 35,
        marginRight: 8,
        resizeMode: "cover",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f5f5f5"
    },
    info: {
        paddingRight: 16,
        flex: 1
    }
})
module.exports = Breakfast;