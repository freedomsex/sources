module.exports = function (grunt) {
    grunt.initConfig({
        //Склеивание файлов javascript
        concat: {
            vue: {
                files: {
                    'javascript/core/vue-components.js': 'vue_components/**/*.js',
                    'templates/core/vue-components.htm':  'vue_components/**/*.htm',
                    'css-styles/core/vue-components.less': 'vue_components/**/*.less',
                }
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
                    'bower_components/pluralize/pluralize.js',
                ],
                dest: 'bower_components/bower-components.js',
            },
            javascript: {
                files: {
                    'javascript/core/src/1-state.js': [
                        'javascript/core/src/state/modules/*.js',
                        'javascript/core/src/state/state.js',
                        'javascript/core/src/state/api.js',
                    ],
                    'javascript/core/dist/core.es6': [
                        'javascript/core/vue-components.js',
                        'javascript/core/src/dialogs/*.js',
                        'javascript/core/src/*.js',
                    ],
                    'javascript/mess/dist/mess.es6': [
                        'javascript/mess/src/**/*.js',
                    ],
                }
            },
            admin: {
                src: ['javascript/admin/src/*.js'],
                dest: 'javascript/admin/dist/admin.js',
            },
            bundle_dev: {
                files: {
                    'javascript/core/dist/core.min.js': [
                        'bower_components/bower-components.js',
                        'javascript/core/dist/core.js'
                    ],
                    'javascript/mess/dist/mess.min.js': [
                        'javascript/mess/dist/mess.js'
                    ],
                }
            },
            bundle_prod: {
                files: {
                    'javascript/core/dist/core.min.js': [
                        'bower_components/bower-components.js',
                        'javascript/core/dist/core.min.js'
                    ]
                }
            },
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            javascript: {
                files: {
                    'javascript/core/dist/core.js': 'javascript/core/dist/core.es6',
                    'javascript/mess/dist/mess.js': 'javascript/mess/dist/mess.es6'
                }
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'javascript/core/dist/core.js': 'javascript/core/dist/core.es6'
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
                recursive: true,
            },
            dist: {
                files: {
                    'templates/mess/dist/mess.htm':   ['templates/mess/src/_main.htm'],
                    'templates/index/dist/index.htm': ['templates/index/src/_main.htm'],
                    'templates/profile/dist/profile.htm': ['templates/profile/src/_main.htm']
                }
            },
            dev: {
                files: {
                    'templates/mess/dist/mess.htm':   ['templates/mess/src/_main.htm'],
                    'templates/index/dist/index.htm': ['templates/index/src/_main.htm'],
                    'templates/profile/dist/profile.htm': ['templates/profile/src/_main.htm']
                }
            }
        }, 
        //  
        replace: {
            dist: {
                options: {
                    patterns: [
                    {
                        json: {
                            "NET-DELAY": 0,
                            "API-PHOTO": "195.154.54.70",
                            "API-SEARCH": "212.83.162.58",
                            "API-CONTACT": "212.83.134.89:9000",
                        }
                    }
                  ]
                },
                files: {
                    'javascript/core/dist/core.js':   ['javascript/core/dist/core.js'] 
                }
            },
            dev: {
                options: {
                    patterns: [
                    {
                        json: {
                            "NET-DELAY": 2,
                            "API-PHOTO": "127.0.0.1:8888",
                            "API-SEARCH": "127.0.0.1:9000",
                            "API-CONTACT": "127.0.0.1:8000",
                        }
                    }
                  ]
                },
                files: {
                    'javascript/core/dist/core.js': 'javascript/core/dist/core.js' 
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
                files: {'javascript/core/dist/core.min.js': 'javascript/core/dist/core.js'}
            },
            mess: {
                files: {'javascript/mess/dist/mess.min.js': 'javascript/mess/dist/mess.js'}
            }
        },
        // Наблюдение за изменениями в файлах исходниках
        watch: {
            options: {
                //livereload: true
            },
            vue: {
                files: [
                    'vue_components/**/*.js',
                    'vue_components/**/*.htm',
                    'vue_components/**/*.less',
                ],
                tasks: ['concat:vue'],
            },
            jscripts: {
                files: [
                    'javascript/core/vue-components.js',
                    'javascript/core/src/**/*.js',
                    'javascript/mess/src/**/*.js',
                    'javascript/admin/src/*.js',
                ],
                tasks: ['concat:javascript', 'babel:javascript', 'replace:dev', 'concat:bundle_dev'],
                options: {
                    livereload: true,
                    spawn: false,
                },
            },
            cstyles: {
                files: [
                    'css-styles/core/vue-components.less',
                    'css-styles/0_import/**/*',
                    'css-styles/core/src/*',
                    'css-styles/mess/src/*',
                    'css-styles/admin/src/*',
                    'css-styles/blog/src/*',
                ],
                tasks: ['less:dev'],
                options: {
                    spawn: false,
                },
            },
            templates: {
                files: [
                    'templates/core/vue-components.htm',
                    'templates/index/src/**/*.htm',
                    'templates/mess/src/**/*.htm',
                    'templates/profile/src/*.htm',
                    'templates/_common/**/*.htm',
                ],
                tasks: ['processhtml:dev'],
                options: {
                    livereload: true,
                    spawn: false,
                },
            },
            grunt: {
                files: [
                    'Gruntfile.js',
                ],
                tasks: ['core'],
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
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
    grunt.registerTask('core', [
        'concat:vue',
        'concat:javascript', 'babel:javascript',
        'less:dev'
    ]);
    //grunt.registerTask('default', ['concat', 'babel', 'uglify', 'less', 'processhtml']);
    grunt.registerTask('dev',  ['core', 'replace:dev', 'concat:bundle_dev', 'processhtml:dev']);
    grunt.registerTask('prod', ['core', 'replace:dist', 'uglify', 'concat:bundle_prod', 'processhtml:dist' ]);
    grunt.registerTask('p',    ['prod', 'watch']);
    grunt.registerTask('d',    ['dev', 'watch']);
    grunt.registerTask('img',  ['image_resize']);
};

