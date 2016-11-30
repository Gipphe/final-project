module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'
		secret: grunt.file.readJSON 'secret.json'

		shell:
			options:
				stderr: false
			#push: 'pscp -r -pw <%= secret.pw %> src\\ foobar-s237590@studssh.cs.hioa.no:www/final/'
			makeLangs: 'node makeLangs'

	grunt.loadNpmTasks 'grunt-shell'
	grunt.registerTask 'default', [] #['shell:makeLangs', 'shell:push']
