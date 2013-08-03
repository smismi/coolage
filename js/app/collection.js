//COLLECTIONS


C.Collections.Items = Backbone.Collection.extend({
    model: C.Models.Item
})

var items = new C.Collections.Items([
    {
        src: "test.jpg",
        selected: false
    },
    {
        src: "1dZEEv1T.jpg",
        selected: false
    }
])