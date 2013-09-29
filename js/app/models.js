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
	}
})



