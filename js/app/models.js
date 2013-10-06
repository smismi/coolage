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



