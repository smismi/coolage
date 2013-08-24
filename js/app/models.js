//MODELS


C.Models.Item = Backbone.Model.extend({
    defaults: {
        "src" : null,
        "selected": false,
        "xyz" : {},
		"flattenObject": function() {
			return JSON.stringify(this.xyz)
		}
	}
})



