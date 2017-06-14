import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, } from 'react-native'
import PageControl from './PageControl'
var HomeMenuItem = require('./HomeMenuItem')
var Util = require('./../common/util');
var HomeMenuView = React.createClass({
  getInitialState:function () {
      return {
        currentPage: 0
      }
  },
  onMenuSelected:function (i) {
    alert(i)
  },
  render:function () {
    var menuItems = this.props.menuInfos.map(
            (info, i) => (
                <HomeMenuItem
                    key={info.title}
                    title={info.title}
                    icon={info.icon}
                    onPress={this.onMenuSelected.bind(this,i)} />
            )
        )
        var menuViews = []
        var pageCount = Math.ceil(menuItems.length / 10)

        for (var i = 0; i < pageCount; i++) {
            var length = menuItems.length < (i * 10) ? menuItems.length - (i * 10) : 10
            var items = menuItems.slice(i * 10, i * 10 + length)

            var menuView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            )
            menuViews.push(menuView)
        }
        return (
           <View style={styles.container}>
               <ScrollView contentContainerStyle={styles.contentContainer}
                   horizontal
                   showsHorizontalScrollIndicator={false}
                   pagingEnabled
                   onScroll={(e) => this.onScroll(e)}
               >
                   <View style={styles.menuContainer}>
                       {menuViews}
                   </View>
               </ScrollView>
               <PageControl
                    style={styles.pageControl}
                    numberOfPages={pageCount}
                    currentPage={this.state.currentPage}
                    hidesForSinglePage
                    pageIndicatorTintColor='gray'
                    currentPageIndicatorTintColor='#06C1AE'
                    indicatorSize={{ width: 8, height: 8 }}
                />

           </View>

       );
  },
  onScroll:function(e: any) {
        var x = e.nativeEvent.contentOffset.x
        var currentPage = Math.round(x / Util.windowSize.width)

        console.log('onScroll  ' + e.nativeEvent.contentOffset.x + '  page ' + currentPage + '  current ' + this.state.currentPage)
        if (this.state.currentPage != currentPage) {
            this.setState({
                currentPage: currentPage
            })
        }
    }
})
// define your styles
var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    contentContainer: {
    },
    menuContainer: {
        flexDirection: 'row',
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Util.windowSize.width,
    },
    pageControl: {
        margin: 10,
    }
});

//make this component available to the app
module.exports = HomeMenuView;
