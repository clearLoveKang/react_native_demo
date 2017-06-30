/**
 * Created by DELL on 2017/5/25.
 *   Base 基类组件，所有的都继承此组件，代替继承Component
 */

import React from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';

/**
 * 总的样式，引入到Base里了，可以直接调用
 *
 * 命名规范：当前页面_当前控件_当前控件干嘛用的
 *
 * 例：login_button_jump(类似的这样)
 */


const { height, width } = Dimensions.get('window');

// ===============================================
// style config
// ===============================================

export const StyleConfig = {

    color_F2F2F2:'#F2F2F2',
    color_38434E:'#38434E',
    color_3B4652:'#3B4652',
    color_F2FF96:'#F2FF96',
    color_FFFFFF:'#FFFFFF',
    color_FF6138:'#FF6138',
    color_F5F5F5:'#F5F5F5',
    color_DEDEDE:'#DEDEDE',
    color_C0C0C0:'#C0C0C0',
    color_808080:'#808080',
    color_212121:'#212121',
    color_transparent:'#00000000',



    font_24: 24,
    font_20: 20,
    font_18: 18,
    font_16: 16,
    font_14: 14,
    font_12: 12,

    line_height_lg: 36,
    line_height_md: 26,
    line_height_sm: 24,

    space_0:   0,
    space_1:   5,
    space_2:   10,
    space_3:   15,
    space_4:   20,

    htmlRender_font: 16,
    htmlRender_color: 'rgba(48,59,71,1)',
    htmlRender_lineHeight: 28,
    htmlRender_spaceHeight: 15,

    header_height: 200,
    navbar_height: 70,
    bottomBar_height: 46,
    icon_size: 22,
    avatarSize_lg: 60,
    avatarSize_sm: 20,

    border_width: 0.5,
    border_radius: 2,
    border_color: 'rgba(0, 0, 0, 0.05)',
    panel_bg_color: 'rgba(0, 0, 0, 0.02)',
    touchable_press_color: 'rgba(0, 0, 0, 0.05)',
    touchable_press_opacity: 0.7,

    screen_width: width,//当前屏幕的宽
    screen_height: height,//当前屏幕的高

};

export const styles = StyleSheet.create({
    //总样式
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",

    },
    container_row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",

    },

    marginTop10:{
        marginTop:10

    },marginTop20:{
        marginTop:20

    },marginTop30:{
        marginTop:30

    },marginTop40:{
        marginTop:40

    },





    //-----------------HomePage 样式---------------------
    home_colum_container:{
        flex:1,
        flexDirection: "column",
    },
    home_row_container:{
        flex:1,
        flexDirection: "row",
    },
    home_row_container_color:{
        flexDirection: "row",
        backgroundColor:StyleConfig.color_FFFFFF,
        justifyContent:'center',
        marginTop:10,
    },
    home_row_container_color_margin0:{
        flexDirection: "row",
        backgroundColor:StyleConfig.color_FFFFFF,
        justifyContent:'center',
    },

    //图片banner
    home_image_banner:{
        width:StyleConfig.screen_width,
        height:200,
        justifyContent:'center',
        alignItems:'center',

    },
    //banner中的描述
    home_text_banner_desc:{
        fontSize:StyleConfig.font_20,
        color:StyleConfig.color_212121
    },
    home_text_18_212121:{
        fontSize:StyleConfig.font_18,
        color:StyleConfig.color_212121
    },
    home_text_16_212121:{
        fontSize:StyleConfig.font_16,
        color:StyleConfig.color_212121,
        padding:5,

    },
    home_text_14_212121:{
        fontSize:StyleConfig.font_14,
        color:StyleConfig.color_212121
    },
    paddingRight_10:{
        paddingRight:10,
    },
    paddingLeft_10:{
        paddingLeft:10,
    },
    paddingTop_10:{
        paddingTop:10,
    },
    paddingBottom_10:{
        paddingBottom:10,
    },
    home_navigate_container:{
        flexDirection: "row",
        backgroundColor:StyleConfig.color_FFFFFF,
        paddingLeft:50,
        paddingRight:50,

    },

    home_recommend_list:{
        marginTop:5,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom:10,

    },

    home_recommend_containter: {
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        width:StyleConfig.screen_width*0.45,
        backgroundColor: StyleConfig.color_FFFFFF,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC',


    },
    home_recommend_image: {
        width: StyleConfig.screen_width*0.4,
        height: 100
    },

    home_hot_containter: {
        flex:1,
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        width:StyleConfig.screen_width*0.45,
        backgroundColor: StyleConfig.color_FFFFFF,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC',
        marginTop:10,

    },

    home_artical_containter: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        padding: 15,
        backgroundColor: StyleConfig.color_FFFFFF,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC',
        marginTop:10,

    },

    home_artical_list:{
        marginTop:5,
        marginLeft:20,
        marginRight:20,
        marginBottom:20,
        justifyContent: 'space-around',
        // flexDirection: '',
        // flexWrap: 'wrap',
        // marginBottom:10,
    },
    home_artical_image: {
        width: 130,
        height: 100,
    },
    //-----------------HomePage 样式---------------------


    //-----------------GoodsDetailPage 样式---------------------
    //banner 图片
    detail_image:{
        height:240,
        width:130,
        marginTop:2,
    },


    //-----------------GoodsDetailPage 样式---------------------




    /*  订单 样式*/

    order_text_16_FF6138:{
        fontSize:StyleConfig.font_16,
        color:StyleConfig.color_FF6138,
        padding:5,
    },
    home_renmingbi1_image: {
        width: 10,//StyleConfig.screen_width*0.4,
        height: 10
    },

    line :{
        width:StyleConfig.screen_width,
        height:10,
        backgroundColor:StyleConfig.color_F5F5F5,
    },

    order_text_16_FF6138_border:{
        fontSize:StyleConfig.font_16,
        color:StyleConfig.color_FF6138,
        padding:5,
        borderWidth:1,
        borderColor:StyleConfig.color_808080
    },
    order_text_16_808080_border:{
        fontSize:StyleConfig.font_16,
        color:StyleConfig.color_808080,
        padding:5,
        borderWidth:1,
        borderColor:StyleConfig.color_FF6138,
    },



});
