// Generated on 2015-01-18 using generator-browserify 0.4.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowerrc: grunt.file.readJSON('.bowerrc'),
    // configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist',
      vendor: '<%= bowerrc.directory %>',
      node: 'node_modules'
    },
    banner: '/*!\n' +
            ' * <%= pkg.name %>-<%= pkg.version %>\n' +
            ' * <%= pkg.author %>\n' +
            ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' */\n\n',
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.scss'],
        tasks: ['sass:dev', 'autoprefixer']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      jade: {
        files: ['<%= yeoman.app %>/**/*.jade'],
        options: {
          // nospawn: false
        },
        tasks: ['jade:dev', 'browserify:dev']
      },
      browserify: {
        files: ['<%= yeoman.app %>/scripts/**/*.{js,jade}'],
        tasks: ['browserify:dev', 'concat:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.{html,jade}',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '',
          livereload: false
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*'
      ]
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    browserify: {
      //vendor: {
      //  src: [],
      //  dest: '.tmp/scripts/vendor.js',
      //  options: {
      //    debug: true,
      //    //require: ['jquery', 'lodash', 'backbone'],
      //    require: ['jquery'],
      //    alias: [
      //      'lodash:underscore'
      //    ]
      //  }
      //},
      dev: {
        files: {
          '.tmp/scripts/main.js': '<%= yeoman.app %>/scripts/main.js',
          '.tmp/scripts/form.js': '<%= yeoman.app %>/scripts/form.js'
        },
        //src: ['<%= yeoman.app %>/scripts/main.js'],
        //dest: '.tmp/scripts/main.js',
        options: {
          debug: true,
          //external: ['jquery', 'lodash', 'backbone'],
          external: [],
          transform: ['browserify-jade']
        }
      }
    },

    jade: {
      dev: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },
        files: {
          '.tmp/index.html': '<%= yeoman.app %>/jade/index.jade',
          '.tmp/form.html': '<%= yeoman.app %>/jade/form.jade'
        }
      },

      compile: {
        options: {
          data: {
            debug: true
          }
        },
        files: {
          '<%= yeoman.app %>/index.html': '<%= yeoman.app %>/jade/index.jade'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>'
      },
      dev: {
        src: ['.tmp/scripts/main.js'],
        dest: '.tmp/scripts/main.js'
      },
      dist: {
        src: ['.tmp/scripts/main.js'],
        dest: '.tmp/scripts/main.js'
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/main.js': [
            '.tmp/scripts/main.js'
          ]
        }
      }
    },

    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'index.html',
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            'styles/fonts/{,*/}*.*',
            'audio/*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    //modernizr: {
    //  devFile: '<%= yeoman.vendor %>/modernizr/modernizr.js',
    //  outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
    //  files: [
    //    '<%= yeoman.dist %>/scripts/{,*/}*.js',
    //    '<%= yeoman.dist %>/styles/{,*/}*.css',
    //    '!<%= yeoman.dist %>/scripts/vendor/*'
    //  ],
    //  uglify: true
    //},
    concurrent: {
      server: [
        'sass:dev',
        'browserify:dev',
        'jade:dev',
        'copy:styles'
      ],
      dist: [
        'sass:dist',
        'browserify',
        'jade',
        'copy:styles'
      ]
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'concat:dev',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    //'modernizr',
    'copy:dist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);
};
