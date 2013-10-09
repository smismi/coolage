//MODELS


C.Models.Item = Backbone.Model.extend({
    defaults: {
        "src" : null,
        "selected": false,
        "xyz" : {},
		"path": null,
		"flattenObject": function() {
			return JSON.stringify(this.xyz)
		}
	},
	validate: function (attrs) {
		var errors = [];
		console.log("VALIDATE!!");

		if (attrs.path === null) {

 			errors.push({name: 'path', message: 'Path is null'});

			return null


		}  else if (attrs.path.length < 3) {


			errors.push({name: 'path', message: 'Path too short'});

			return true

		}
	}
})





C.Models.User = Backbone.Model.extend({
    defaults: {
        "id" : null,
        "username": null,
        "name" : null
	},
	validate: function (attrs) {
		var errors = [];
		console.log("VALIDATE!!");

		if (attrs.username === null) {

 			errors.push({name: 'username', message: 'Pausernameth is null'});

			return null


		}  else if (attrs.username.length < 3) {


			errors.push({name: 'username', message: 'username too short'});

			return true

		}
	}
})



