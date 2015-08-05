var React = require('react-native');

var Home = require('./app/Home');

var {
    Component,
    AppRegistry,
    StyleSheet,
    NavigatorIOS
    } = React;

class Letv extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    component: Home,
                    title: '乐视网 视频客户端'
                }}
            />
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('letv', () => Letv);
