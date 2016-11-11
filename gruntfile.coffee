module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON('package.json')

		scp:
			options:
				host: 'studssh.cs.hioa.no'
				username: 's237590'
				password: 'xka3avesV'

			default:
				files: [
					expand: true
					cwd: '.'
					src: ['*.html', 'js/*', 'css/*', 'fonts/*', 'img/*']
					dest: 'www/final'
				]
		secret: grunt.file.readJSON 'secret.json'
		sshexec:
			command: 'rm -rf www/final'
			options:
				host: '<%= secret.host %>'
				username: '<%= secret.username %>'
				password: '<%= secret.password %>'

	grunt.loadNpmTasks 'grunt-ssh'
	grunt.loadNpmTasks 'grunt-scp'
	grunt.registerTask 'default', ['sshexec', 'scp']
