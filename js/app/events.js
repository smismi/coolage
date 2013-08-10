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
    LAYERSORT:  "layersort"
}, Backbone.Events);

