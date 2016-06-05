'use strict';

import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import shell from '/usr/local/lib/node_modules/gulp-shell';

class Karma extends DefaultRegistry {

  init() {
    let test = './tests/karma.conf.js';
    let src  = './tests/src';
    let spec = './tests/spec';

    gulp.task('karma', shell.task([`
      karma start ${test}
    `]));

    gulp.task('karma:build', shell.task([`
      babel ${src} --out-dir ${spec}
    `]));
  }
};

module.exports = new Karma();
