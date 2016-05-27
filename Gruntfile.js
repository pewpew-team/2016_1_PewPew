module.exports = function(grunt) {

  grunt.initConfig({
    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      server: {
        command: 'node server.js'
      }
    },
    fest: {
      templates: {
        files: [{
          expand: true,
          cwd: 'templates',
          src: '*.xml',
          dest: 'public_html/js/tmpl'
        }],
        options: {
          template: function(data) {
            return grunt.template.process(
              'define(function () { return <%= contents %> ; });', {
                data: data
              }
            );
          }
        }
      }
    },
    watch: {
      fest: {
        files: ['templates/*.xml'],
        tasks: ['fest'],
        options: {
          interrupt: true,
          atBegin: true
        }
      },
      server: {
        files: [
          'public_html/js/**/*.js',
          'public_html/css/**/*.css'
        ],
        options: {
          livereload: true
        }
      }
    },
    // настройка jshint для валидации JS-файлов
    jshint: {
      options: {
        reporter: require('jshint-stylish') // используйте jshint-stylish для наглядного представления ошибок
      },
      build: ['Gruntfile.js',
        'public_html/js/*.js',
        'public_html/js/**/*.js'
      ]
    },
    concurrent: {
      target: ['watch', 'shell'],
      options: {
        logConcurrentOutput: true
      }
    },
    qunit: {
      all: ['./public_html/tests/index.html']
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "./public_html/js",
          mainConfigFile: "./public_html/js/config.js",
          include: ["../../node_modules/almond/almond.js", "index.js"],
          out: "dist/js/build.min.js",
          findNestedDependencies: true,
          wrap: true,
          insertRequire: ["index.js"],
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './public_html/css',
          src: ['*.css'],
          dest: './dist/css',
          ext: '.min.css'
        }]
      }
    },
    less: {
      development: {
        options: {
          paths: ['less'],
          plugins: [
            new(require('less-plugin-autoprefix'))({
              browsers: ["last 2 versions"]
            })
          ],
        },
        files: {
          'public_html/css/main.css': 'less/main.less'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-fest');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('compile', ['less', 'requirejs', 'cssmin']);
  grunt.registerTask('test', ['qunit:all']);
  grunt.registerTask('default', ['concurrent']);

};
