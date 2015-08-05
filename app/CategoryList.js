/**
 * Created by hujianmeng on 15/7/28.
 */

'use strict';

var React = require('react-native');

var windowSize = require('./util/tools').windowSize;

var {
    Component,
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableHighlight
    } = React;

//var homeUrl = 'http://hujianmengdemacbook-pro-2.local/letv/home.json';
//var homeUrl = 'http://10.58.104.59/letv/home.json';

var homeUrl = 'http://tuhuangzhe.u.qiniudn.com/letv/home.json';

var HotList = React.createClass({
    getInitialState: function () {
        return {
            title: null,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false
        };
    },

    componentDidMount: function () {
        fetch(homeUrl)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    title: responseData.body.block[this.props.props.category].blockname,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.body.block[this.props.props.category].list),
                    loaded: true
                })
            });
    },

    render: function () {
        if (this.state.loaded) {
            return this.renderList();
        } else {
            return this.renderLoading();
        }
    },

    renderList: function () {
        return (
            <View>
                <Text style={styles.listTitle}>{this.state.title}></Text>
                <ListView ref='list'
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderItem(rowData)}
                    scrollEnabled={false}
                    contentInset={{top: -65}}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        );
    },

    renderItem: function (rowData) {
        return (
            <TouchableHighlight style={styles.item} onPress={()=>this.props.onPress(rowData)}>
                <View>
                    <Image style={styles.itemImage} source={{uri: rowData.mobilePic}}/>
                    <View style={styles.itemBottom}>
                        <Text numberOfLines={1} style={styles.itemTitle}>{rowData.nameCn}</Text>
                        <Text numberOfLines={1} style={styles.itemDesc}>{rowData.subTitle}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    },

    renderLoading: function () {
        return (
            <View>
                <Text style={styles.loading}>loading</Text>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    loading: {
        flex: 1,
        textAlign: 'center',
        marginTop: 200
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 15,
        marginBottom: 10,
        color: 'rgb(60,123,231)'
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    item: {
        position: 'relative',
        marginBottom: 2
    },
    itemImage: {
        width: windowSize.width / 2 - 1,
        height: windowSize.width / 2 - 1 - 70
    },
    itemBottom: {
        position: 'absolute',
        bottom: 0,
        width: windowSize.width / 2 - 1,
        height: 40,
        paddingLeft: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    itemTitle: {
        fontSize: 14,
        color: '#FFF',
        lineHeight: 20
    },
    itemDesc: {
        fontSize: 12,
        color: '#FFF',
        lineHeight: 15
    }
});

module.exports = HotList;