//COLLECTIONS


C.Collections.Items = Backbone.Collection.extend({
    model: C.Models.Item
})

var items = new C.Collections.Items([
    {
        src: "test.jpg",
        selected: true,
        xyz: {
            "x": 201.96381770074368,
            "y":318.59549758955836,
            "size": {
                "x":300,
                "y":240
            },
            "center":{
                "x":351.9638177007437,
                "y":438.59549758955836
            },
            "rotate":90,
            "scale":{
                "x":1,
                "y":1
            },
            "translate":{
                "x":-38,
                "y":-170},
            "ratio":1
        },
        order: 0
    },
    {
        src: "1dZEEv1T.jpg", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":0.64,"y":0.64},"translate":{"x":-153,"y":-290.2},"ratio":1},
        order: 1
    }
])

items.comparator = function(item) {
    return item.get("order");
};