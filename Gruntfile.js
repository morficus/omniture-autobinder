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

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            ci: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            deploy: {
                singleRun: true,
                browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari']
                // for IE on windows support checkout https://github.com/karma-runner/karma-ie-launcher
            }
        },

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
                    'dist/omniture-autobinder.min.js': ['src/omniture-autobinder.js'],
                    'dist/omniture-facade.min.js': ['src/omniture-facade.js']
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


    //load all installed tasks
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('release', ['test:deploy', 'clean', 'uglify']);
    grunt.registerTask('test', ['karma:ci']);

};
