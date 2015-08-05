/**
 * Created by hujianmeng on 15/7/29.
 */
'use strict';

var React = require('react-native');
var windowSize = require('./util/tools').windowSize;

var {
    AppRegistry,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ScrollView,
    AlertIOS,
    ListView,
    TextInput,
    Image,
    Text,
    View,
    } = React;

//var tabUrl = 'http://hujianmengdemacbook-pro-2.local/letv/tabs.json';
//var commentUrl = 'http://hujianmengdemacbook-pro-2.local/letv/comment.json';

var tabUrl = 'http://tuhuangzhe.u.qiniudn.com/letv/tabs.json';
var commentUrl = 'http://tuhuangzhe.u.qiniudn.com/letv/comment.json';

var Tabs = React.createClass({
    getDefaultProps: function () {
        return {
            tabs: [{
                name: '期数',
                index: 0
            }, {
                name: '详情·评论',
                index: 1
            }, {
                name: '相关',
                index: 2
            }]
        }
    },

    getInitialState: function () {
        return {
            bottom: 0,
            index: 0,
            tabsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            relateDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            commentDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false
        }
    },

    componentDidMount: function () {
        fetch(tabUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var relate = [];
                var temp = responseData.body.tabVideoList.data.videoList[2015][7];

                for (var i = temp.length - 1; i > 0; i--) {
                    relate.push(temp[i]);
                }

                this.setState({
                    tabsDataSource: this.state.tabsDataSource.cloneWithRows(temp),
                    relateDataSource: this.state.tabsDataSource.cloneWithRows(relate),
                    loaded: true
                })
            });
    },

    _setTab: function (i) {
        if (i == 1) {
            fetch(commentUrl)
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({
                        bottom: 0,
                        commentDataSource: this.state.commentDataSource.cloneWithRows(responseData.body.data),
                        loaded: true
                    })
                });
            this.setState({
                index: i,
                loaded: false
            });
        } else {
            this.setState({
                index: i,
                loaded: true
            });
        }
    },

    _renderTabTitle: function () {
        var _this = this;
        return this.props.tabs.map(function (item, i) {
            return (
                <TouchableWithoutFeedback onPress={()=>_this._setTab(i)}>
                    <View style={[styles.tabTitle, i == _this.state.index ? styles.tabTitleActive : {}]}>
                        <Text style={[styles.tabTitleText, i == _this.state.index ? styles.tabTitleTextActive : {}]}>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        });
    },

    _renderLoading: function () {
        return (
            <View>
                <Text style={styles.loading}>loading</Text>
            </View>
        );
    },

    renderItem: function (rowData) {
        return (
            <TouchableHighlight onPress={()=>this.props.onPress(rowData)} underlayColor={'#d2f5ff'}>
                <View style={styles.listItem}>
                    <Image source={{uri: rowData.picAll['120*90']}} style={styles.listItemImage} />
                    <View style={styles.listItemRight}>
                        <Text style={styles.listItemName}>{rowData.nameCn}</Text>
                        <Text style={styles.listItemCount}>{rowData.playCount}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },

    renderComment: function (rowData) {
        return (
            <View style={styles.listItem}>
                <Image source={{uri: rowData.user.photo}} style={styles.listCommentItemImage} />
                <View style={[styles.listItemRight, styles.listCommentItemRight]}>
                    <Text style={styles.listCommentUserName}>{rowData.user.username}</Text>
                    <Text style={styles.listItemName}>{rowData.content}</Text>
                    <Text style={styles.listItemCount}>{rowData.vtime}</Text>
                </View>
            </View>
        );
    },

    _renderList: function () {
        if (this.state.loaded) {
            switch (this.state.index) {
                case 0:
                    if (this.state.loaded) {
                        return (
                            <ScrollView style={{height: windowSize.height - 250 - 65 - 40}}
                                contentInset={{top: -60}}>
                                <ListView
                                    dataSource={this.state.tabsDataSource}
                                    renderRow={(rowData) => this.renderItem(rowData)}
                                    scrollEnabled={false}
                                    contentInset={{top: -60}}
                                    contentContainerStyle={styles.listContainer} />
                            </ScrollView>
                        );
                    } else {
                        return this._renderLoading();
                    }
                    break;
                case 1:
                    return (
                        <View style={{position: 'relative'}}>
                            <ScrollView style={{height: windowSize.height - 250 - 65 - 40}}
                                contentInset={{top: -60}}>
                                <View style={styles.movieDes}>
                                    <Text style={styles.movieTitle}>{this.props.movie.nameCn}</Text>
                                    <Text style={styles.movieCount}>播放：13.1万</Text>
                                    <Text style={styles.movieTime}>发布时间：2015-5-12</Text>
                                    <Text style={styles.movieAllDes}>详细介绍：{this.props.movie.subTitle}</Text>
                                </View>
                                <ListView
                                    dataSource={this.state.commentDataSource}
                                    renderRow={(rowData) => this.renderComment(rowData)}
                                    contentInset={{top: -60}}
                                    scrollEnabled={false}
                                    contentContainerStyle={styles.listContainer} />
                            </ScrollView>
                            <View style={[styles.commentBox, {bottom: this.state.bottom}]}>
                                <TextInput
                                    ref='comment'
                                    style={styles.commentBoxInput}
                                    onChangeText={(text) => this.setState({input: text})}
                                    onFocus={()=> {
                                        this.setState({
                                            bottom: 260
                                        });
                                    }}
                                    onBlur={()=> {
                                        this.setState({
                                            bottom: 0
                                        });
                                    }}
                                    placeholder='来一发吧'
                                />
                                <TouchableHighlight onPress={()=> {
                                    AlertIOS.alert(
                                        '提示',
                                        '请先登录吧',
                                        [
                                            {text: '确定', onPress: () => console.log('ok!')},
                                            {text: '取消', onPress: () => console.log('no!')}
                                        ]
                                    );
                                    this.setState({
                                        bottom: 0
                                    });
                                }}>
                                    <Text style={styles.commentBoxBtn}>发送</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    );
                    break;
                case 2:
                    if (this.state.loaded) {
                        return (
                            <ScrollView style={{height: windowSize.height - 250 - 65 - 40}}
                                contentInset={{top: -60}}>
                                <ListView
                                    dataSource={this.state.relateDataSource}
                                    renderRow={(rowData) => this.renderItem(rowData)}
                                    contentInset={{top: -60}}
                                    scrollEnabled={false}
                                    contentContainerStyle={styles.listContainer} />
                            </ScrollView>
                        );
                    } else {
                        return this._renderLoading();
                    }
                    break;
            }
        } else {
            return this._renderLoading();
        }
    },

    render: function () {
        return (
            <View>
                <View style={styles.tabTitleWrap}>
                    {this._renderTabTitle()}
                </View>
                <View>
                    {this._renderList()}
                </View>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    tabTitle: {
        width: windowSize.width / 3,
        height: 40
    },
    tabTitleText: {
        color: '#333',
        lineHeight: 28,
        textAlign: 'center',
        fontWeight: '800'
    },
    //选中状态，有下划线
    tabTitleActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#2766cf'
    },
    //选中状态，文字变色
    tabTitleTextActive: {
        color: '#2766cf'
    },
    tabTitleWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E9E9E9'
    },
    loading: {
        fontSize: 16,
        marginTop: 100,
        textAlign: 'center',
        flex: 1,
        color: '#CCC'
    },
    listContainer: {
        flex: 1
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E9E9E9'
    },
    listItemRight: {
        height: 90,
        position: 'relative'
    },
    listItemImage: {
        width: 120,
        height: 90,
        marginRight: 5
    },
    listItemName: {
        fontSize: 14,
        color: '#333'
    },
    listItemCount: {
        position: 'absolute',
        fontSize: 12,
        color: '#999',
        bottom: 0
    },
    listCommentItemImage: {
        width: 50,
        height: 50,
        marginRight: 5,
        marginLeft: 10,
        borderRadius: 25
    },
    listCommentUserName: {
        fontSize: 12,
        color: '#999',
        marginBottom: 5
    },
    listCommentItemRight: {
        height: 60
    },
    movieDes: {
        padding: 10,
        fontSize: 12
    },
    movieTitle: {
        fontSize: 14,
        color: '#333',
        paddingBottom: 3
    },
    movieCount: {
        fontSize: 12,
        color: '#999',
        paddingBottom: 3
    },
    movieTime: {
        fontSize: 12,
        color: '#999',
        paddingBottom: 3
    },
    movieAllDes: {
        fontSize: 13,
        color: '#333'
    },
    commentBox: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute'
    },
    commentBoxInput: {
        height: 40,
        width: windowSize.width - 50,
        borderColor: '#C9C9C9',
        borderWidth: 1,
        fontSize: 13
    },
    commentBoxBtn: {
        width: 50,
        backgroundColor: '#2766cf',
        height: 40,
        lineHeight: 26,
        textAlign: 'center',
        color: '#FFF'
    }
});

module.exports = Tabs;