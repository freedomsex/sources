module.exports = function (grunt) {
    grunt.initConfig({
        //Склеивание файлов javascript
        concat: {
            options: {
            },
            core: {
                src: ['javascript/core/src/*.js'],
                dest: 'javascript/core/dist/core.js',
            },
            mess: {
                src: ['javascript/mess/src/*.js'],
                dest: 'javascript/mess/dist/mess.js',
            },
            admin: {
                src: ['javascript/admin/src/*.js'],
                dest: 'javascript/admin/dist/admin.js',
            },
        },
        // Сборка исходников LESS в файлы css-style
        less: {
            dev: {
                options: { 
                  rootpath: 'css-styles',
                },
                files: {
                  "admin/dist/admin.css": "admin/src/_main.less",
                  "core/dist/core.css":   "core/src/_main.less",
                  "mess/dist/mess.css":   "mess/src/_main.less",
                  "blog/dist/blog.css":   "blog/src/_main.less",
                }
            }    
        },
        // Наблюдение за изменениями в файлах исходниках
        watch: {
            options: {
                livereload: true
            },
            jscripts: {
                files: [
                    'javascript/core/src/*.js',
                    'javascript/mess/src/*.js',
                    'javascript/admin/src/*.js',
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
            cstyles: {
                files: [ 
                    'css-styles/0_import/*',
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

    // Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
    grunt.registerTask('default', ['concat', 'less']);
    grunt.registerTask('w',   ['default']);
};

