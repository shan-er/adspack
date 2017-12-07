# adspack
## 基于webpack的单页/多页打包工具脚手架
#### webpack
#### 用node编写命令行工具

### 开发过程
1. 新建项目文件夹 `adspack`
2. 初始化：`npm init`
3. 新建文件：`./bin/adspack.js`
4. 在package.json中配置自定义命令：即在package.json中可以配置bin节点。
5. 测试命令


### 生成系统命令
	`npm i -g`

### 使用过程
1. 新建项目文件夹：如test，输入一下命令
	`mkdir test && cd test`
2. 生成，默认是基于vue的单页面应用
	`adspack init` 
	如若生成多页面应用，加参数 -m，即输入命令`adspack init -m`