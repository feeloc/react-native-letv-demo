/**
 * Created by hujianmeng on 15/7/28.
 */

'use strict';

var React = require('react-native');
var Banner = require('./Banner');
var HotList = require('./HotList');
var CategoryList = require('./CategoryList');
var MovieShow = require('./MovieShow');

var {
    Component,
    StyleSheet,
    WebView
    } = React;

class LeWebView extends Component {
    render() {
        return (
            <WebView
                style={styles.webView}
                ref={'webview'}
                automaticallyAdjustContentInsets={false}
                url={this.props.movie.video}
                startInLoadingState={true}
            />
        );
    }
}

var styles = StyleSheet.create({
    webView: {
        marginTop: 64
    }
});

module.exports = LeWebView;