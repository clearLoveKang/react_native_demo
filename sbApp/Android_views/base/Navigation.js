/**
 * Created by DELL on 2017/5/25.
 *   Base 基类组件，所有的都继承此组件，代替继承Component
 */

import React ,{Component} from 'react';
import {StackNavigator,TabNavigator,TabBarBottom,TabBarTop} from 'react-navigation';

import HomePage from '../pages/Home/HomePage.js';
import MinePage from '../pages/Home/MinePage';
import LifePage from '../pages/Home/LifePage';
import MapPage from '../pages/Home/MapPage';
import TabBarItem from './TabBarItem';

import Setting from '../pages/mine/Setting';
import User from '../pages/mine/User';
import Address from '../pages/mine/Address';
import Feedback from '../pages/mine/Feedback';
import GoodsDetailPage from '../pages/goods/GoodsDetailPage';
import GoodsOrderPage from '../pages/goods/GoodsOrderPage';
import ButlerFoundHouse from '../pages/webView/ButlerFoundHouse';
import LifeServer from '../pages/webView/lifeServer/LifeServer';
import LifeServerSecondList from '../pages/webView/lifeServer/LifeServerSecondList';
import PayPage from '../pages/pay/PayPage';
import OrderDetailPage from '../pages/order/OrderDetailPage';
import OrderManager from '../pages/order/OrderManager';
import OrderListPage from '../pages/order/OrderListPage';
import OrderListUnPayPage from '../pages/order/OrderListUnPayPage';
import Login from '../pages/login/Login';
import FindArticalPage from '../pages/webView/FindArticalPage';


//底部的tab 显示 整出来的
export const Tab = TabNavigator(
    {
        // tab 切换的页面
        HomePage:{
            screen:HomePage,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'首页',
                //title:"首页title",//跟页面之间的设置是相似的
                header:null,
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../imgs/ic_tab_strip_icon_category.png')}
                        selectedImage={require('../imgs/ic_tab_strip_icon_category_selected.png')}
                    />
                )
            }),
        },

        MapPage:{
            screen:MapPage,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'百度地图',
                title:'地图title',
                header:null,
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../imgs/ic_tab_strip_icon_profile.png')}
                        selectedImage={require('../imgs/ic_tab_strip_icon_profile_selected.png')}
                    />
                )
            }),
        },
        LifePage:{
            screen:LifePage,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'生活',
                title:'生活title',
                header:null,
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../imgs/ic_tab_strip_icon_follow.png')}
                        selectedImage={require('../imgs/ic_tab_strip_icon_follow_selected.png')}
                    />
                )
            }),
        },


        MinePage:{
            screen:MinePage,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'我的',
                title:'个人中心',
                //header:null,
                // title：标题，如果设置了这个导航栏和标签栏的title就会变成一样的，不推荐使用
                // header：可以设置一些导航的属性，如果隐藏顶部导航栏只要将这个属性设置为null
                // headerTitle：设置导航栏标题，推荐
                // headerBackTitle：设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
                // headerTruncatedBackTitle：设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"
                // headerRight：设置导航条右侧。可以是按钮或者其他视图控件
                // headerLeft：设置导航条左侧。可以是按钮或者其他视图控件
                // headerStyle：设置导航条的样式。背景色，宽高等
                // headerTitleStyle：设置导航栏文字样式
                // headerBackTitleStyle：设置导航栏‘返回’文字样式
                // headerTintColor：设置导航栏颜色
                // headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0
                // gesturesEnabled：是否支持滑动返回手势，iOS默认支持，安卓默认关闭

                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../imgs/ic_tab_strip_icon_feed.png')}
                        selectedImage={require('../imgs/ic_tab_strip_icon_feed_selected.png')}
                    />
                )
            }),
        },
    },

    {
        animationEnabled: false, // 切换页面时不显示动画
        tabBarComponent:TabBarBottom,
        tabBarPosition:'bottom',//显示在底端，android 默认是显示在页面顶端的
        swipeEnabled:false,// 禁止左右滑动
        backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        lazy:true,
        tabBarOptions:{
            activeTintColor:'#06c1ae',// 文字和图片选中颜色
            inactiveTintColor:'#979797', // 文字和图片默认颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
            style:{
                backgroundColor:'#ffffff',// TabBar 背景色
            },
            labelStyle: {
                fontSize: 15, // 文字大小
            },
        }

    }

);




















/*------------------订单tab 切换------------*/



export const Tab_Order = TabNavigator(
    {
        // tab 切换的页面
        OrderListPage:{
            screen:OrderListPage,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'全部',
                title:"订单管理",//跟页面之间的设置是相似的

            }),
        },

        OrderListUnPayPage:{
            screen:OrderListUnPayPage,
            navigationOptions:({navigation}) => ({
                tabBarLabel:'待支付',
                title:"订单管理",//跟页面之间的设置是相似的
            }),
        },

    },

    {
        animationEnabled: false, // 切换页面时不显示动画
        tabBarComponent:TabBarTop,
        tabBarPosition:'top',//显示在底端，android 默认是显示在页面顶端的
        swipeEnabled:true,// 禁止左右滑动
        backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        lazy:true,
        tabBarOptions:{
            activeTintColor:'#EE7316',// 文字和图片选中颜色
            inactiveTintColor:'#212121', // 文字和图片默认颜色
            showIcon: false, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {height: 1}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
            style:{
                backgroundColor:'#ffffff',// TabBar 背景色
            },
            labelStyle: {
                fontSize: 18, // 文字大小
            },
        }

    }

);
//
// export const Navigator_Order = StackNavigator(
//
//     {
//         Tab:{screen:Tab_Order},
//     },
//
//     {
//         navigationOptions:{
//             headerBackTitle:null,
//             headerTintColor:'#333333',
//             showIcon:true,
//             swipeEnabled:false,
//             animationEnabled:false,
//         },
//
//         mode:'card',
//     });
//
//
//




// 也可做跳转 使用
export const Navigator = StackNavigator(

    {
        Tab:{screen:Tab},
        Setting: {screen: Setting,navigationOptions:{title:'设置'}},//跳转的页面---》 类名
        User: {screen: User},
        Address: {screen: Address},
        Feedback: {screen: Feedback},
        GoodsDetailPage: {screen: GoodsDetailPage},
        GoodsOrderPage: {screen: GoodsOrderPage},
        PayPage: {screen: PayPage},
        OrderDetailPage: {screen: OrderDetailPage},
        ButlerFoundHouse: {screen: ButlerFoundHouse},
        LifeServer:{screen:LifeServer},
        LifeServerSecondList:{screen:LifeServerSecondList},
        Login:{screen:Login},
        OrderManager:{screen:OrderManager},
        FindArticalPage:{screen:FindArticalPage},
        Tab_Order:{screen:Tab_Order},

        // OrderListPage:{screen:OrderListPage},
        // OrderListUnPayPage:{screen:OrderListUnPayPage},


    },

    {
        navigationOptions:{
            headerBackTitle:null,
            headerTintColor:'#333333',
            showIcon:true,
            swipeEnabled:false,
            animationEnabled:false,
        },

        mode:'card',
    });







