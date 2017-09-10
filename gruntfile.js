module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      src: ['assets/js/**/*.js']
    },
    concat: {
      scripts: {
        src: ['assets/js/**/*.js'],
        dest: 'dist/js/scripts.js'
      }
    },
    uglify: {
      scripts: {
        src: ['dist/js/scripts.js'],
        dest: 'dist/js/scripts.min.js'
      }
    },
    cssmin: {
      all: {
        src: ['assets/css/**/*.css'],
        dest: 'dist/css/style.min.css'
      }
    },

    htmlmin: {
      options: {
        moveComments: true,
        collapseWhitespace: true
      },
      view: {
        expand: true,
        cwd: '',
        src: ['*.html'],
        dest: 'dist'
      }
    }

  });

  //plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('prod', [
    'jshint', 'concat', 'uglify',
    'cssmin', 'htmlmin'
  ])
};