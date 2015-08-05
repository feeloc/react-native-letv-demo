/**
 * Created by hujianmeng on 15/7/28.
 */

'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var Carousel = require('./components/Carousel');

let {
    width,
    height
    } = Dimensions.get('window');

let {
    AppRegistry,
    Component,
    StyleSheet,
    Image,
    View,
    AlertIOS,
    TouchableHighlight
    } = React;

let setting = {
    headerImage: [
        'http://i3.letvimg.com/lc01_iscms/201507/09/10/16/7e6eb915f6804dc39b16bdd5c6b1f0fb.jpg',
        'http://i1.letvimg.com/lc03_user/201507/14/10/45/416accb50e0846fb832f7533fcef8fd8.jpg',
        'http://i0.letvimg.com/lc03_user/201507/14/10/45/b02123daf42c4dee9a3469cc23db9b30.jpg'
    ],
    movies: [
        {
            "nameCn": "乐1 pro 发售",
            "subTitle": "乐1 pro 真好",
            "video": "http://www.lemall.com/le_1pro.html"
        },
        {
            "nameCn": "贾乃亮",
            "subTitle": "逗比 贾乃亮",
            "video": "http://hujianmengdemacbook-pro-2.local/letv/movies/13.mp4"
        },
        {
            "nameCn": "屠魔战战士",
            "subTitle": "屠魔战战士 真好看",
            "video": "http://hujianmengdemacbook-pro-2.local/letv/movies/14.mp4"
        }
    ],
    width: 640,
    height: 274,
    marginTop: 65
};

class Banner extends Component {
    alert(index) {
        AlertIOS.alert(
            '提示',
            '乐视网' + index,
            [
                {text: '确定', onPress: () => console.log('ok!')},
                {text: '取消', onPress: () => console.log('no!')}
            ]
        )
    }

    render() {
        return (
            <View>
                <Carousel autoplay={true} showsButtons={true} height={width / setting.width * setting.height}>
                    <TouchableHighlight onPress={()=>this.props.onPress(setting.movies[0])}>
                        <Image style={styles.BannerImage} source={{uri: setting.headerImage[0]}} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.props.onPress(setting.movies[1])}>
                        <Image style={styles.BannerImage} source={{uri: setting.headerImage[1]}} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.props.onPress(setting.movies[2])}>
                        <Image style={styles.BannerImage} source={{uri: setting.headerImage[2]}} />
                    </TouchableHighlight>
                </Carousel>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    BannerImage: {
        width: width,
        height: width / setting.width * setting.height,
        resizeMode: Image.resizeMode.contain
    }
});

module.exports = Banner;
