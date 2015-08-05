/**
 * Created by hujianmeng on 15/7/29.
 */
var Dimensions = require('Dimensions');

var {
    width,
    height
    } = Dimensions.get('window');

exports.windowSize = {
    width: width,
    height: height
};