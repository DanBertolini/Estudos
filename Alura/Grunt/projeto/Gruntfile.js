module.exports = function (grunt) {
     grunt.initConfig({
          copy: {
               public: {
                    cwd: 'public',
                    src: ['**'],
                    dest: 'dist',
                    expand: true
               }
          },
          clean: {
               dist: {
                    src: ['dist']
               }
          },
          useminPrepare: {
               html: 'dist/**/*.html'
          },
          usemin: {
               html: 'dist/**/*.html'
          },
          imagemin: {
               public: {
                    cwd: 'dist/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img',
                    expand: true
               }
          },
          rev: {
               options: {
                    eenconding: 'utf8',
                    algorithm: 'md5',
                    length: 8
               },
               imagens: {
                    src: ['**/*.{png,jpg,gif}'],
               },
               minificados: {
                    src: ['**/*.min.js', '**/*.min.css'],
               }
          },

          coffee: {
               compile: {
                    cwd: 'public/coffee',
                    src: ['**/*.coffee'],
                    dest: 'public/js',
                    expand: true,
                    ext: '.js'
               }
          },
          less: {
               compile: {
                    cwd: 'public/less',
                    src: ['**/*.less'],
                    dest: 'public/css',
                    expand: true,
                    ext: '.css'
               }
          },
          watch: {

               coffee: {
                    options: {
                         event: ['added', 'changed']
                    },
                    files: 'public/coffee/**/*.coffee',
                    tasks: 'coffee:compile'
               },
               less: {
                    options: {
                         event: ['added', 'changed']
                    },
                    files: 'public/less/**/*.less',
                    tasks: 'less:compile'
               },
               js: {
                    options: {
                         event: ['changed']
                    },
                    files: 'public/js/**/*.js',
                    tasks: 'jshint'
               },
               css: {
                    options: {
                         event: ['changed']
                    },
                    files: 'public/css/**/*.css',
                    tasks: 'csslint'
               }
          },

          jshint: {
               src: ['public/js/**/*.js'],
          },

          csslint: {
               src: ['public/css/**/*.css']
          },

          browserSync: {
               public: {
                    bsFiles: {
                         watchTask: true,
                         src: ['public/**/*']
                    },
                    options: {
                         server: {
                              baseDir: 'public'
                         }
                    }
               }
          }
     });
     grunt.registerTask('default', ['dist', 'minifica', 'imagemin']);
     grunt.registerTask('dist', ['clean', 'copy']);
     grunt.registerTask('minifica', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);
     grunt.registerTask('server', ['browserSync', 'watch']);

     grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-contrib-clean');

     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-cssmin');
     grunt.loadNpmTasks('grunt-usemin');

     grunt.loadNpmTasks('grunt-contrib-imagemin');

     grunt.loadNpmTasks('grunt-rev');

     grunt.loadNpmTasks('grunt-contrib-less');
     grunt.loadNpmTasks('grunt-contrib-coffee');
     grunt.loadNpmTasks('grunt-contrib-watch');

     grunt.loadNpmTasks('grunt-contrib-jshint');
     grunt.loadNpmTasks('grunt-contrib-csslint');

     grunt.loadNpmTasks('grunt-browser-sync');
};