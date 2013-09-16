$(document).ready(function () {


    new C.Views.Paper({collection: items});

    new C.Views.Layers({collection: items});


//
//
//	var c = document.getElementById("cnvs");
//	var paper = Raphael(c, 1000, 1000);
//	var image, image1, path;
////    var _path = 'M 0 0 l 200 0 l 0 100  l -100 0  z';
//	var _path = 'M 169.57460021972656 15.106499671936035 C 1449.57460021972656 15.106499671936035 282.8146057128906 57.446502685546875 282.8146057128906 57.446502685546875 C 282.8146057128906 57.446502685546875 234.4145965576172 186.89649963378906 234.4145965576172 186.89649963378906 C 234.4145965576172 186.89649963378906 177.79458618164062 165.72650146484375 177.79458618164062 165.72650146484375 C 177.79458618164062 165.72650146484375 169.57460021972656 15.106499671936035 169.57460021972656 15.106499671936035 Z';
//	Raphael(function () {
//
//		img = document.getElementById("photo");
//		img.style.display = "none";
//
//
//		image1 = paper.image(img.src, 0, 0, 300, 240).hover(function () {
//			console.log("ON 2");
//		}, function () {
//			console.log("OFF 2");
//		});
//
////		path = paper.path(_path);
//
////		_new = flatten_transformations(path,true)
//
//
//		_ft = paper.freeTransform(image1,
//			{
//				draw: [ 'bbox' ],
//				keepRatio: [ 'axisX', 'axisY', 'bboxCorners'],
//				scale: [ 'axisX', 'axisY', 'bboxCorners'],
//				distance: 1.1,
//				rotate: [ 'axisX', 'axisY', 'bboxSides' ],
//				attrs: { fill: "#fff", stroke: "#333",
//
//				},
//				size: 4
//
//			}, function (_ft, events) {
//
////			_new = flatten_transformations(path,true)
//
//				image1.attr({"clip-path": _path});
//
//
//			});
//
//
//
//
//	});
//
//


});

