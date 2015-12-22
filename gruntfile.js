/**
 * Created on 22.12.2015.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        workFiles: grunt.file.readJSON('_utils/appFiles.json'),

        concat: {
            options: {
                separator: ';\n\r\n'
            },
            js_libs: {
                src: [
                    "bower_components/jquery/dist/jquery.min.js",
                    "bower_components/jquery.loadscript/jquery.loadscript.js",
                    // angular parts
                    "bower_components/angular/angular.min.js",
                    "bower_components/angular-route/angular-route.min.js",
                ],
                dest: 'ui/libs.js'
            },
            styles: {
                options: {
                    separator: '\n\r\n'
                },
                src: [
                    "bower_components/bootstrap/dist/css/bootstrap.min.css",
                    "ui/css/custom.css"
                ],
                dest: 'ui/all.css'
            }
        },

        watch: {
            config: {
                files: 'gruntfile.js',
                tasks: ['concat:js_libs']
            },
            styles: {
                files: "ui/css/custom.css",
                tasks: 'concat:styles'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('release', ['concat']);
};