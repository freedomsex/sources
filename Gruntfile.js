module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'Gruntfile.js',
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
            dist: {
                src: ['core/src/*.js'],
                dest: 'core/dist/js.js',
            },
        },
    });

    // Загрузка модулей, которые предварительно установлены
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
    grunt.registerTask('default', ['concat', 'watch']);
};

