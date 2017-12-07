/*
 * @File
 * @Author: shan-er
 * @Date:   2017-11-28 
 */
require('colors');
let info = console.info;

global.success = function() {
    info((' √ ' + Array.prototype.join.call(arguments, ' ')).green);
};
global.error = function() {
    info((' X ' + Array.prototype.join.call(arguments, ' ')).red);
};
global.log = function() {
	info(('[log] ' + Array.prototype.join.call(arguments, ' ')).gray);
};
global.logPlain = function() {
	info(Array.prototype.join.call(arguments, ' '));
};
global.logError = function() {
	info(('[error] ' + Array.prototype.join.call(arguments, ' ')).red);
};
global.logSuccess = function() {
    info(('[success] ' + Array.prototype.join.call(arguments, ' ')).green);
};
global.logInfo = function() {
    info(('[info] ' + Array.prototype.join.call(arguments, ' ')).blue);
};