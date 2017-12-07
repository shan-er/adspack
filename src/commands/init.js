/*
* @File
* @Author: shan-er
*/
const spawn = require('../utils/spawn');
const readline = require('readline');
const sysPath = require('path');
const fs = require('fs-extra');
const config = require('../template/config');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let initTmplPath = sysPath.resolve(__dirname, '../../src/template/single');
let cwd = process.cwd();

/*
 * param: options
 */
let init = function(options){

  rl.question('请先选择前端框架vue/react（默认vue）? ', (answer) => {
    answer = answer && answer.toLowerCase() || null;
    let currentFrame = answer ? answer : 'vue';
    let currentType = !options.multiple ? '单' : '多';
    let curConfig = options.multiple ? config['multiple'] : config['single'];

    options.multiple ? (initTmplPath = sysPath.resolve(__dirname, '../../src/template/multiple')) : '';

    logInfo(`将配置基于 ${currentFrame} 前端框架开发的${currentType}页面打包配置。` );

    log(process.argv[2]);
    if(answer == 'react') {

      logInfo('todo');
      rl.close();

    } else {
      logInfo('初始化 package.json 配置文件');

      spawn('npm', ['init'])
        .then(function () {
            logSuccess('package.json创建成功！');
            logInfo('开始创建项目目录结构...');

            createTmpl();
            updatePackageConf(curConfig);
        })
        // 安装项目依赖
        .then(function () {
            logSuccess('创建项目目录结构完成');
            logInfo('开始安装相关项目依赖...');
            return spawn('npm', ['install', '--save', '--registry=https://registry.npm.taobao.org'].concat(curConfig.dependencies));
        })
        // 安装环境依赖
        .then(function () {
            logSuccess('安装项目依赖完成');
            return spawn('npm', ['install', '--save-dev', '--registry=https://registry.npm.taobao.org'].concat(curConfig.devDependencies));
        })
        .then(function() {
          logSuccess('安装相关项目依赖完成');
          logSuccess('单页面应用项目创建成功！');
        });

        rl.close();
    }

  });

};

/**
 * 拷贝项目结构
 */
function createTmpl() {

  fs.copySync(sysPath.resolve(initTmplPath, './index.html'), sysPath.resolve(cwd, './index.html'));
  fs.copySync(sysPath.resolve(initTmplPath, './README.md'), sysPath.resolve(cwd, './README.md'));
  fs.copySync(sysPath.resolve(initTmplPath, './.babelrc'), sysPath.resolve(cwd, './.babelrc'));
  fs.copySync(sysPath.resolve(initTmplPath, './.eslintrc.js'), sysPath.resolve(cwd, './.eslintrc.js'));
  fs.copySync(sysPath.resolve(initTmplPath, './src'), sysPath.resolve(cwd, './src'));
  fs.copySync(sysPath.resolve(initTmplPath, './build'), sysPath.resolve(cwd, './build'));

}

/**
 * 更新项目的package.json
 */
function updatePackageConf(curConfig) {

  let packagePath = sysPath.resolve(cwd, './package.json');

  packageJSON = JSON.parse(fs.readFileSync(packagePath, 'UTF-8'));
  packageJSON.scripts = Object.assign(curConfig.scripts, packageJSON.scripts);
  packageJSON['pre-commit'] = Object.assign(curConfig['pre-commit'], packageJSON['pre-commit']);

  fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 2));

}

module.exports = init;