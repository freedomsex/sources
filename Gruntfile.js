module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'Gruntfile.js',
                    'core/src/*.js',
                    'mess/src/*.js',
                    'admin/src/*.js',
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
        },
        //Склеивание файлов
        concat: {
            options: {
            },
            core: {
                src: ['core/src/*.js'],
                dest: 'core/dist/core.js',
            },
            mess: {
                src: ['mess/src/*.js'],
                dest: 'mess/dist/mess.js',
            },
            admin: {
                src: ['admin/src/*.js'],
                dest: 'admin/dist/admin.js',
            },
        },
    });

    // Загрузка модулей, которые предварительно установлены
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('w',   ['concat', 'watch']);
};

