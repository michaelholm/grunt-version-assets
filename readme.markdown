# grunt-version-assets

This Grunt plug-in renames static assets (JavaScript files, CSS, ...) and at the same time updates references to these assets in other files (for example, HTML files). This enables you to deliver static assets with HTTP caching headers telling the browser to cache them forever, so the file will only be downloaded once. If the file changes, its file name changes and the new version will be downloaded, so users never see stale JavaScript or CSS files.

* Uses [node-version-assets](https://github.com/techjacker/node-version-assets).
* The md5hash of the file content will be added to the assets's file name. (app.min.js -> app.min.44d0440440442524c6d667900275e.js).
* When using md5hash, unchanged assets will keep the same file name and not blow the browser cache.
* Optionally pass a cache-bust value. (app.min.js -> app.min.1.14.0.153.js)
* Greps your HTML and other files and updates filenames of versioned files.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-assets-version --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-assets-version');
```

## The "versioning" task

### Overview
In your project's Gruntfile, add a section named `versioning` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({

  versioning: {
    options: {
      grepFiles: [
        'src/**/*.html',
      ]
    },
    js: {
      src: [
        'src/js/app.min.js',
        'src/js/bundle.min.js',
      ]
    },
    css: {
      src: [
        'src/css/master.css',
        'src/css/bundle.min.js',
      ]
    },
  },

});
```

### Options

#### options.grepFiles
Type: An array of file names, paths and patterns.
Default value: `[]`

The list of files in which the plug-in replaces/updates the references to the asset files.

#### options.keepOriginal
Type: `boolean`
Default value: `true`

If `true`, the original source file will be kept, otherwise it will be deleted.

#### options.newVersion
Type: `string`
Default value: defaults to generating an md5 hash of the file

The cache-bust key to be used for each file, for example the current release or build number. e.g., `1.0.2.4`

### More options

[node-version-assets](https://github.com/techjacker/node-version-assets) actually offers a number of [other options](https://github.com/techjacker/node-version-assets#options), that have not been implemented in this plug-in. If you need any of these options, file an issue or better yet, a pull request (delegating options to node-version-assets is actually trivial).

### Usage Examples

#### Basic Usage

In this example, a copy of the file `src/js/app.js` is created with a versioned file name (something like `src/js/app.17781b077d5a9c60c6504e4d1467e2b0.js`). The same is done for `src/css/app.css`. The file `index.html` is searched for references to `app.js` and `app.css`. The references will be updated to match the renamed files. The original files (`app.js` and `app.css`) will not be deleted. If there are versioned asset files from a former run of this plug-in, those will be deleted.

```js
grunt.initConfig({
  versioning: {
    options: {
      grepFiles: [
        'src/index.html',
      ]
    },
    app: {
      src: [
        'src/js/app.js',
        'src/css/app.css'
      ]
    },
})
```

#### New Version

In this example, all javascript files processed the same as the above example, except that the cache-bust value is passed in via options, and the files are then renamed (something like `src/js/whatever.1.14.0.153.js`) using the `newVersion` passed in via `options`. 

```js
grunt.initConfig({
  versioning: {
    options: {
      grepFiles: [
        'src/index.html'
      ],
      newVersion: '1.14.0.153',

    },
    js: {
      src: [
        'src/js/**/*.js'
      ]
    },
    css: {
      src: [
        'src/css/**/*.css'
      ]
    },
})
```

#### Multiple Assets Sources

In this example, all JavaScript files under `src/js` are renamed to a versioned file name (something like `src/js/whatever.17781b077d5a9c60c6504e4d1467e2b0.js`). The same is done for all CSS files under `src/css`. A couple of HTML files are searched for references to the renamed asset files. The references will be updated to match the renamed files. The original asset files will be deleted. If there are versioned asset files from a former run of this plug-in, those will also be deleted.

```js
grunt.initConfig({
  versioning: {
    options: {
      grepFiles: [
        'src/index.html'
      ],
      keepOriginal: false,

    },
    js: {
      src: [
        'src/js/**/*.js'
      ]
    },
    css: {
      src: [
        'src/css/**/*.css'
      ]
    },
})
```

## Release History
* 2018-07-10: 1.0.0 - Initial Release

## License
Copyright (c) 2018 Michael Holm. Licensed under the MIT license.
