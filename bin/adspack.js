#!/usr/bin/env node

/**
 * @file 入口文件
 * @author shan-er
 */
require('../src/utils/log');
const program = require('commander');
const package = require('../package.json');
const initFun = require('../src/commands/init');

program
  .version(package.version);

program
    .command('init')
    // .alias('i')
    .description('安装打包工具，默认单页面')
    .option('-m, --multiple', '多页面打包配置')
    // .option('-s, --single', '多页面打包配置')
    .action(function(options){
      initFun(options);
    });

program.parse(process.argv);