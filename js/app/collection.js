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
        src: "PkGAW_n7TTA.jpg",
        selected: true,
		"size": {
			"x":612,
			"y":612
		},
        xyz: {
            "x": 0,
            "y":0,
            "size": {
                "x":612,
                "y":612
            },
            "center":{
                "x":306,
                "y":306
            },
            "rotate":0,
            "scale":{
                "x":1,
                "y":1
            },
            "translate":{
                "x":0,
                "y":0
			},
            "ratio":1
        },
		path: null,
//		path: 'M 100 100,  l 200 0, l 0 300,  l -100 0,  z',
        order: 0
    }
	,
	{
		src: "1dZEEv1T.jpg",
		selected: false,
		"size": {
			"x": 604,
			"y": 402
		},
		xyz: {
			"x": 0,
			"y": 0,
			"size": {
				"x": 604,
				"y": 402
			},
			"center": {
				"x": 302,
				"y": 201
			},
			"rotate": 0,
			"scale": {
				"x": 1,
				"y": 1
			},
			"translate": {
				"x": 000,
				"y": 200
			},
			"ratio": 1
		},
		order: 1,
//		path: [
//			["M", 100, 100],
//			["L", 200, 0],
//			["L", 0, 200],
//			["Z"]
//		],
		path: [["M",267,90],["L",349,168],["L",420,80],["L",291,55],["Z"]]
	},






//	{
//		src: "animal-planet-142-20.jpg",
//		selected: false,
//		"size": {
//			"x":604,
//			"y":402
//		},
//		xyz: {
//			"x": 0,
//			"y": 0,
//			"size": {
//				"x": 604,
//				"y": 402
//			},
//			"center": {
//				"x": 302,
//				"y": 201
//			},
//			"rotate": 0,
//			"scale": {
//				"x": 1,
//				"y": 1
//			},
//			"translate": {
//				"x": 150,
//				"y": 290
//			},
//			"ratio": 1
//		},
//		order: 2,
//		path: 'M 0 0,  l 200 0, l 0 100,  l -100 0,  z'
//	},
//	{
//		src: "500.gif",
//		selected: false,
//		"size": {
//			"x":604,
//			"y":402
//		},
//		xyz: {
//			"x": 0,
//			"y": 0,
//			"size": {
//				"x": 604,
//				"y": 402
//			},
//			"center": {
//				"x": 302,
//				"y": 201
//			},
//			"rotate": 0,
//			"scale": {
//				"x": 1,
//				"y": 1
//			},
//			"translate": {
//				"x": 150,
//				"y": 290
//			},
//			"ratio": 1
//		},
//		order: 3,
//		path: 'M 0 0,  l 200 0, l 0 100,  l -100 0,  z'
//	}
	//	,
	//    {
	//        src: "animal-planet-142-20.jpg ", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
	//        order: 2
	//    }
	//	,
	//    {
	//		src: "500.gif", selected: false, xyz: {"x":100.47769732773304,"y":365.59108421206474,"size":{"x":300,"y":240},"center":{"x":250.47769732773304,"y":485.59108421206474},"rotate":0,"scale":{"x":1.0816666666666668,"y":1.0816666666666668},"translate":{"x":214.25,"y":-222.2},"ratio":1},
	//        order: 3
	//    }
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