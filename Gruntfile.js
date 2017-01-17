module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            dev: {
                options: { 
                },
                files: {
                  "admin/dist/admin.css": "admin/src/_main.less",
                  "core/dist/core.css": "core/src/_main.less",
                  "mess/dist/mess.css": "mess/src/_main.less",
                  "blog/dist/blog.css": "blog/src/_main.less",
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
                    'core/src/*', 
                    'mess/src/*',
                    'admin/src/*',
                    'blog/src/*',
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

