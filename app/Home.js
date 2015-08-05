/**
 * Created by hujianmeng on 15/7/28.
 */

'use strict';

var React = require('react-native');
var Banner = require('./Banner');
var HotList = require('./HotList');
var CategoryList = require('./CategoryList');
var MovieShow = require('./MovieShow');
var LeWebView = require('./LeWebView');

var {
    Component,
    StyleSheet,
    ScrollView,
    WebView
    } = React;

class Home extends Component {
    render() {
        return (
            <ScrollView style={styles.home}>
                <Banner onPress={(data)=>this.onPress(data)}/>
                <HotList onPress={(data)=>this.onPress(data)}/>
                <CategoryList props={{category: 1}} onPress={(data)=>this.onPress(data)}/>
                <CategoryList props={{category: 2}} onPress={(data)=>this.onPress(data)}/>
                <CategoryList props={{category: 3}} onPress={(data)=>this.onPress(data)}/>
                <CategoryList props={{category: 4}} onPress={(data)=>this.onPress(data)}/>
            </ScrollView>
        );
    }

    onPress(data) {
        if (data.video.match(/mp4$/)) {
            this.props.navigator.push({
                title: data.nameCn,
                component: MovieShow,
                passProps: {
                    movie: data
                }
            });
        } else {
            this.props.navigator.push({
                title: data.nameCn,
                component: LeWebView,
                passProps: {
                    movie: data
                }
            });
        }
    }
}

var styles = StyleSheet.create({
    home: {}
});

module.exports = Home;
