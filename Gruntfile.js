module.exports = function (grunt) {
    grunt.initConfig({
        //Склеивание файлов javascript
        concat: {
            options: {
            
            },
            bower: {
                src: [
                    'bower_components/lscache/lscache.min.js',
                    'bower_components/json3/lib/json3.min.js',
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/moment/min/moment.min.js',
                    'bower_components/moment/locale/ru.js',
                    'bower_components/axios/dist/axios.min.js',
                    'bower_components/vue/dist/vue.js', 
                    'bower_components/vuex/dist/vuex.min.js',
                    'bower_components/vue-router/dist/vue-router.js',
                    'bower_components/vue-resource/dist/vue-resource.min.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
                    'bower_components/blueimp-file-upload/js/jquery.iframe-transport.js',
                ],
                dest: 'bower_components/bower-components.js',
            },
            core: {
                src: [
                    'javascript/core/src/**/*.js'
                ],
                dest: 'javascript/core/dist/core.es6',
            },
            mess: {
                src: ['javascript/mess/src/**/*.js'],
                dest: 'javascript/mess/dist/mess.es6',
            },
            admin: {
                src: ['javascript/admin/src/*.js'],
                dest: 'javascript/admin/dist/admin.js',
            },
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'javascript/core/dist/core.js': 'javascript/core/dist/core.es6',
                    'javascript/mess/dist/mess.js': 'javascript/mess/dist/mess.es6'
                }
            }
        },
        // Сборка исходников LESS в файлы css-style
        less: {
            dev: {
                options: { 
                  paths: ['css-styles/0_import/resourses'],
                  rootpath: 'css-styles',
                },
                files: {
                  "css-styles/admin/dist/admin.css": "css-styles/admin/src/_main.less",
                  "css-styles/core/dist/core.css":   "css-styles/core/src/_main.less",
                  "css-styles/mess/dist/mess.css":   "css-styles/mess/src/_main.less",
                  "css-styles/blog/dist/blog.css":   "css-styles/blog/src/_main.less",
                }
            }    
        },
        // Сборка файлов шаблонов
        processhtml: {
            options: { 
                environment: 'dev',
                recursive: true,
            },
            dist: {
                files: {
                    'templates/mess/dist/mess.htm':   ['templates/mess/src/_main.htm'],
                    'templates/index/dist/index.htm': ['templates/index/src/_main.htm'],
                    'templates/profile/dist/profile.htm': ['templates/profile/src/_main.htm']
                }
            }
        },
        image_resize: {
            resize: {
                options: {
                    width:  32,
                    height: 32,
                    overwrite: true
                },
                files: {
                    'images/dist/human-icon.png': 'images/src/human-icon.png',
                    'images/dist/women-icon.png': 'images/src/women-icon.png',
                },
            },
            play_btn: {
                options: {
                    width:  64,
                    height: 64,
                    overwrite: true
                },
                files: {
                    'images/dist/play.png': 'images/src/play.png',
                },
            },
        },
        uglify: {
            core: {
                src: [
                    'bower_components/bower-components.js',
                    'javascript/core/dist/core.js'
                ],
                dest: 'javascript/core/dist/core.min.js'
            },
            mess: {
                src: 'javascript/mess/dist/mess.js',
                dest: 'javascript/mess/dist/mess.min.js'
            }
        },
        // Наблюдение за изменениями в файлах исходниках
        watch: {
            options: {
                livereload: true
            },
            jscripts: {
                files: [
                    'javascript/core/src/**/*.js',
                    'javascript/mess/src/**/*.js',
                    'javascript/admin/src/*.js',
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
            cstyles: {
                files: [ 
                    'css-styles/0_import/**/*',
                    'css-styles/core/src/*', 
                    'css-styles/mess/src/*',
                    'css-styles/admin/src/*',
                    'css-styles/blog/src/*',
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
            templates: {
                files: [
                    'templates/index/src/**/*.htm',
                    'templates/mess/src/**/*.htm',
                    'templates/profile/src/*.htm',
                    'templates/_common/**/*.htm',
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
            grunt: {
                files: [
                    'Gruntfile.js', 
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // Загрузка модулей, которые предварительно установлены
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
    grunt.registerTask('default', ['concat', 'babel', 'uglify', 'less', 'processhtml']);
    grunt.registerTask('w',       ['default', 'watch']);
    grunt.registerTask('g',       ['image_resize']);
};

