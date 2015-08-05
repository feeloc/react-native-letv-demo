/**
 * Created by hujianmeng on 15/7/29.
 */

var React = require('react-native');
var Video = require('react-native-video');
var Tabs = require('./Tabs');

var windowSize = require('./util/tools').windowSize;

var {
    StyleSheet,
    ScrollView,
    View,
    Text
    } = React;

var MovieShow = React.createClass({
    getInitialState: function () {
        return {
            selectedTab: 'blueTab',
            notifCount: 1,
            presses: 0
        };
    },
    onPress: function (data) {
        this.props.navigator.push({
            title: data.nameCn,
            component: MovieShow,
            passProps: {
                movie: data
            }
        });
    },
    render: function () {
        return (
            <View>
                <Video source={{uri: this.props.movie.video}}
                    rate={1.0}                   // 0 is paused, 1 is normal.
                    volume={1.0}                 // 0 is muted, 1 is normal.
                    muted={false}                // Mutes the audio entirely.
                    paused={false}               // Pauses playback entirely.
                    resizeMode="cover"           // Fill the whole screen at aspect ratio.
                    repeat={true}                // Repeat forever.
                    style={styles.video} />
                <Tabs onPress={(data)=>this.onPress(data)} movie={this.props.movie}/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    video: {
        width: windowSize.width,
        height: 250,
        marginTop: 64
    }
});

module.exports = MovieShow;