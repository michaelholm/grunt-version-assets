/*
 * grunt-assets-version
 * https://github.com/basti1302/grunt-assets-version
 *
 * Copyright (c) 2018 Michael Holm
 * Licensed under the MIT license.
 */

'use strict';

var Version = require("node-version-assets");

module.exports = function(grunt) {

  grunt.registerMultiTask(
  'versioning',
  'Rename static assets and update references',
  function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      grepFiles: [],
      keepOriginal: true,
      newVersion: null
    });

    Object.keys(options).forEach(function(key) {
      grunt.log.debug('Option: ' + key + ': ' + JSON.stringify(options[key]));
    });

    var grepFilesExpanded = grunt.file.expandMapping(options.grepFiles);

    grunt.log.debug('**OPTIONS.GREPFILES**');
    var grepFiles = [];
    grepFilesExpanded.forEach(function(file) {
      grepFiles.push(file.src[0]);
      grunt.log.debug(file.src[0]);
    });

    // Iterate over all specified file groups.
    grunt.log.debug('**OPTIONS.ASSETS**');
    var assets = [];
    this.filesSrc.forEach(function(file) {
      assets.push(file);
      grunt.log.debug(file);
    });

    if (options.newVersion && options.newVersion.length > 0) {
      grunt.log.debug('**OPTIONS.NEWVERSION**', options.newVersion);
    }

    var assetsVersioner = new Version({
      assets: assets,
      grepFiles: grepFiles,
      keepOriginal: options.keepOriginal,
      newVersion: options.newVersion,
    });

    assetsVersioner.run(function(err) {
      if (err) {
        return done(err);
      } else {
        return done();
      }
    });

  });

};
