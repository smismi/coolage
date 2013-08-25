//COLLECTIONS


C.Collections.Items = Backbone.Collection.extend({
    model: C.Models.Item,
	sortByField: function(fieldName) {
		this.sort_key = fieldName;
		this.sort();
	}
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
    },
    {
        src: "animal-planet-142-20.jpg ", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
        order: 2
    },
    {
		src: "500.gif", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
        order: 3
    }
//	,
//    {
//        src: "animal-planet-142-20.jpg ", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
//        order: 4
//    },
//    {
//        src: "1dZEEv1T.jpg", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":0.64,"y":0.64},"translate":{"x":-153,"y":-290.2},"ratio":1},
//        order: 5
//    },
//    {
//        src: "animal-planet-142-20.jpg ", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
//        order: 6
//    },
//    {
//        src: "1dZEEv1T.jpg", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":0.64,"y":0.64},"translate":{"x":-153,"y":-290.2},"ratio":1},
//        order: 7
//    },
//    {
//        src: "animal-planet-142-20.jpg ", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
//        order: 8
//    },
//    {
//        src: "1dZEEv1T.jpg", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":0.64,"y":0.64},"translate":{"x":-153,"y":-290.2},"ratio":1},
//        order: 9
//    },
//    {
//        src: "animal-planet-142-20.jpg ", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
//        order: 10
//    },
//    {
//        src: "500.gif", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
//        order: 11
//    }
])

items.comparator = function(item) {
    return item.get("order");
};