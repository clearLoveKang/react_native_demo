import React, { Component } from 'react'
import { View, Text, StyleSheet, RefreshControl, ListView, ActivityIndicator, TouchableOpacity } from 'react-native'


var RefreshListView = React.createClass({
    propTypes:{
        onHeaderRefresh: React.PropTypes.func,
        onFooterRefresh: React.PropTypes.func,
    },
    getInitialState: function() {
       return {
         headerState: 'Idle',
         footerState: 'Idle',
       };
   },
    // constructor(props: Object) {
    //     super(props)
    //
    //     this.state = {
    //         headerState: RefreshState.Idle,
    //         footerState: RefreshState.Idle,
    //     }
    // }

    startHeaderRefreshing:function() {
        this.setState({ headerState: 'Refreshing' })

        this.props.onHeaderRefresh && this.props.onHeaderRefresh()
    },

    startFooterRefreshing:function() {
        this.setState({ footerState: 'Refreshing' })

        this.props.onFooterRefresh && this.props.onFooterRefresh()
    },

    shouldStartHeaderRefreshing:function() {
        if (this.state.headerState == 'Refreshing' ||
            this.state.footerState == 'Refreshing') {
            return false
        }

        return true
    },

    shouldStartFooterRefreshing:function() {
        if (this.state.headerState == 'Refreshing' ||
            this.state.footerState == 'Refreshing') {
            return false
        }
        if (this.state.footerState == 'Failure' ||
            this.state.footerState == 'NoMoreData') {
            return false
        }
        if (this.props.dataSource.getRowCount() == 0) {
            return false
        }

        return true
    },

    endRefreshing:function(refreshState) {
        if (refreshState == 'Refreshing') {
            return
        }
        let footerState = refreshState
        if (this.props.dataSource.getRowCount() == 0) {
            footerState = 'Idle'
        }

        this.setState({
            headerState: 'Idle',
            footerState: footerState
        })
    },

    headerState:function() {
        return self.state.headerState
    },

    footerState:function() {
        return self.state.footerState
    },

    onHeaderRefresh:function() {
        if (this.shouldStartHeaderRefreshing()) {
            this.startHeaderRefreshing();
        }
    },

    onFooterRefresh:function() {
        if (this.shouldStartFooterRefreshing()) {
            this.startFooterRefreshing();
        }
    },

    render:function() {
        return (
            <ListView
                {...this.props}
                enableEmptySections
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.headerState == 'Refreshing'}
                        onRefresh={() => this.onHeaderRefresh()}
                        tintColor='gray'
                    />
                }
                renderFooter={() => this.renderFooter()}
                onEndReachedThreshold={10}
                onEndReached={() => this.onFooterRefresh()}
            />
        );
    },


    renderFooter:function() {
        let footer = null;

        switch (this.state.footerState) {
            case 'Idle':
                break;
            case 'Failure': {
                footer =
                    <TouchableOpacity style={styles.footerContainer}
                        onPress={() => this.startFooterRefreshing()}
                    >

                        <Text style={styles.footerText}>
                            数据加载中……
                        </Text>
                    </TouchableOpacity>
                break;
            }
            case 'Refreshing': {
                footer =
                    <View style={styles.footerContainer} >
                        <ActivityIndicator size="small" color="#888888" />
                        <Text style={styles.footerText}>
                            点击重新加载
                        </Text>
                    </View>
                break;
            }
            case 'NoMoreData': {
                footer =
                    <View style={styles.footerContainer} >
                        <Text style={styles.footerText}>
                            已加载全部数据
                        </Text>
                    </View>
                break;
            }
        }

        return footer;
    }

})

// define your styles
var styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    footerText: {
        fontSize: 14,
        color: '#555555'
    }
});

//make this component available to the app
module.exports = RefreshListView;
