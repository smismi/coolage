var C = {
    Models: {},
    Views: {},
    Events: {},
    Collections: {},
    Utils: {}
}


C.EventsItem = _.extend({
    // locals
    CHANGE:     "change",
    SELECT:     "select",
	TOFRONT:    "tofront",
    LAYERSORT:  "layersort",
    SETMASK:    "setmask"
}, Backbone.Events);

