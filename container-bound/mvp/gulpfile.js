const { series, watch } = require('gulp');
const { exec } = require('child_process');

function push(done) {
    exec('clasp push', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
      });
}

function watchPush() {
    return watch(['**/*.gs', '**/*.js','**/*.html'], push);
}

exports.push = push;
exports.default = exports.watch = series(push, watchPush);