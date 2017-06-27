/**
 * Created by DELL on 2017/6/26.
 */
import React, { Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    InteractionManager,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

var CheckBox = React.createClass({
    getInitialState:function(){
        return{
            checked: this.props.checked
        }
    },
    toggle:function(){
        this.setState({checked:!this.state.checked});
        this.props.onChange(!this.state.checked);
    },
    render:function(){
        var source = "square-o";
        if(this.state.checked){
            source = "check-square";
        }
        var container = (
            <View>
                <Icon name={source} size={20} color="#06C1AE"/>
            </View>
        );
        return (
            <TouchableHighlight ref="checkbox" onPress={this.toggle} underlayColor='white'>
                {container}
            </TouchableHighlight>
        )
    }

});

module.exports = CheckBox;
