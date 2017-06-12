'use strict';

import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';


var propTypes = {
  goToPage: React.PropTypes.func, // 跳转到对应tab的方法
  activeTab: React.PropTypes.number, // 当前被选中的tab下标
  tabs: React.PropTypes.array, // 所有tabs集合

  tabNames: React.PropTypes.array, // 保存Tab名称
  tabIconNames: React.PropTypes.array, // 保存Tab图标
}

var WeixinTabBar = React.createClass({



	setAnimationValue({value}) {
		console.log(value);
	},

	componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		this.props.scrollValue.addListener(this.setAnimationValue);
	},

	renderTabOption(tab, i) {
		let color = this.props.activeTab == i ? "#6B8E23" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
		return (
			<TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab}>
				<View style={styles.tabItem}>
					<Text style={{color: color}}>
						{this.props.tabNames[i]}
					</Text>
				</View>
			</TouchableOpacity>
		);
	},

	render:function () {
		return (
			<View style={styles.tabs}>
				{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
			</View>
		);
	}
})

const styles = StyleSheet.create({
	tabs: {
		flexDirection: 'row',
		height: 50,
	},

	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},
});


export default WeixinTabBar;
