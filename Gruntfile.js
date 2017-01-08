module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'Gruntfile.js', 
                    'src/css-styles/*',
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
        },
        less: {
            dev: {
                options: { 
                    paths: [
			'src/css-styles',
		    ] 
                },
                files: {
                  "web/static/css/style.css": "src/css-styles/source.less"
                }
            }    
        },
//        //Склеивание файлов
//        concat: {
//            options: {
//            },
//            dist: {
//                src: ['app/js/backbone/*/*.js', 'app/js/*.js', ],
//                dest: 'static/js/app.js',
//            },
//            tpl: {
//                src: ['app/templates/*.htm'],
//                dest: 'app/templ.htm',
//            },
//        },
//        connect: {
//            server: {
//                options: {
//                    hostname: 'localhost',
//                    port: 9009,
//                    debug: true,
//                    keepalive: true,
//                    livereload: true
//                }
//            }
//        },
//        processhtml: {
//            options: { 
//            },
//            dist: {
//                files: {
//                    'index.html': ['app/index.html']
//                }
//            }
//        }
    });

    //Загрузка модулей, которые предварительно установлены
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-processhtml');

    //Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
//    grunt.registerTask('default', ['concat', 'processhtml', 'less', 'watch']);
    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('le', ['less']);
};

