module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            dev: {
                options: { 
                },
                files: {
                  "mess/dist/mess.css": "mess/src/_main.less"
                }
            }    
        },
        watch: {
            options: {
                livereload: true
            },
            styles: {
                files: [
                    'Gruntfile.js', 
                    'mess/src/*',
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // Загрузка модулей, которые предварительно установлены
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
    grunt.registerTask('default', ['less']);
    grunt.registerTask('w',   ['less', 'watch']);
};

