//COLLECTIONS


C.Collections.Items = Backbone.Collection.extend({
    model: C.Models.Item
})

var items = new C.Collections.Items([
    {
        src: "test1.jpg",
        selected: false
    },
    {
        src: "test2.jpg",
        selected: false
    },
    {
        src: "test3.jpg",
        selected: false
    },
    {
        src: "test.jpg",
        selected: false
    },
    {
        src: "1dZEEv1T.jpg",
        selected: false
    }
])