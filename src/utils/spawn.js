/**
 * @file spawn封装，保证子进程的顺序执行
 * @author shan-er
 */
const spawn = require('child_process').spawn;
// const Promise = require('promise');

module.exports = function (command, args, options) {


    let pro = spawn(
        command,
        args,
        options || {
            stdio: [0, 1, 2],
            cwd: process.cwd(),
            env: process.env
        }
    );

    return new Promise(function (resolve, reject) {
        pro.on('close', function (code) {
            if (code !== 0) {
                error('ddkit process exited with code:' + code);
                reject();
            }
            resolve();
        });
    });
};
