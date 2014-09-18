module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'index.js', 'src/**/*.js', 'test/**/*.js']
    },

    mochaTest: {
      all: {
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          captureFile: 'coverage/index.html',
          quiet: true,
          reporter: 'html-cov',
          require: ['jscoverage']
        },
        src: '<%= mochaTest.all.src %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['jshint', 'mochaTest:all']);
  grunt.registerTask('coverage', ['mochaTest:coverage']);
};
