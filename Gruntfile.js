/**
 * This is a grunt.js (http://gruntjs.com/) configuration/build file.
 *
 * To fully understand the anatomy of this file, you can read this: http://gruntjs.com/sample-gruntfile
 * for information about settings up tasks: http://gruntjs.com/configuring-tasks
 */
'use strict';

module.exports = function(grunt)
{


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                preserveComments: false,
                marngle: {
                    except: ['jQuery', '$', '_', 's', 'define', 'require']
                },
                compress: {
                    drop_console: true
                }
            },
            default: {
                files: {
                    'dist/omniture-autobinder.min.js': ['omniture-autobinder.js'],
                    'dist/omniture-facade.min.js': ['omniture-facade.js']
                }
            }
        },

        clean: {
            default: [
                'tmp',
                'dist'
            ]
        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-mocha-chai-sinon');

    grunt.registerTask('release', ['clean', 'uglify']);

};
