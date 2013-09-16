$(document).ready(function () {

	var c = document.getElementById("cnvs");
	var paper = Raphael(c, 1000, 1000);
	var image, image1, path;
//    var _path = 'M 0 0 l 200 0 l 0 100  l -100 0  z';
    var _path = 'M 169.57460021972656 15.106499671936035 C 1449.57460021972656 15.106499671936035 282.8146057128906 57.446502685546875 282.8146057128906 57.446502685546875 C 282.8146057128906 57.446502685546875 234.4145965576172 186.89649963378906 234.4145965576172 186.89649963378906 C 234.4145965576172 186.89649963378906 177.79458618164062 165.72650146484375 177.79458618164062 165.72650146484375 C 177.79458618164062 165.72650146484375 169.57460021972656 15.106499671936035 169.57460021972656 15.106499671936035 Z';
	Raphael(function () {

		img = document.getElementById("photo");
		img.style.display = "none";


		image1 = paper.image(img.src, 0, 0, 300, 240).hover(function () {
				console.log("ON 2");
			}, function () {
				console.log("OFF 2");
			});

//		path = paper.path(_path);

//		_new = flatten_transformations(path,true)


		_ft = paper.freeTransform(image1,
			{
				draw: [ 'bbox' ],
				keepRatio: [ 'axisX', 'axisY', 'bboxCorners'],
				scale: [ 'axisX', 'axisY', 'bboxCorners'],
				distance: 1.1,
				rotate: [ 'axisX', 'axisY', 'bboxSides' ],
				attrs: { fill: "#fff", stroke: "#333",

				},
				size: 4

			}, function (_ft, events) {

//			_new = flatten_transformations(path,true)

			image1.attr({"clip-path": _path});


        });




	});



////
//	timerId = setTimeout(function(){

//		var anim = Raphael.animation({transform: "r90,100,500s0.9,1r45"}, 42000, "linear").repeat(1);
//			image1.animate(anim);
//	}, 1900)
////



});


function flatten_transformations(raphael_path_elem, normalize_path) {

    var arr, pathDOM = raphael_path_elem.node,
        d = pathDOM.getAttribute("d").trim();

    if (!normalize_path) // Set to false to prevent possible re-normalization.
        arr = Raphael.parsePathString(d);
    else arr = Raphael.path2curve(d); // mahvstcsqz -> MC
    if (d.charAt(d.length - 1).toUpperCase() == "Z" && arr[arr.length - 1][0].toUpperCase() != "Z") arr.push(["Z"]); // To fix missing Z
    var svgDOM = pathDOM.ownerSVGElement;

    // Get the matrix that converts path coordinates to SVGroot coordinate space
    var matrix = pathDOM.getTransformToElement(svgDOM);

    // The following code expects normalized path data, but tries to
    // handle also partially normalized data
    var i, j, pt, letter, x, y, point, newcoords = [],
        seg_length;
    for (i = 0; i < arr.length; i++) {
        letter = arr[i][0].toUpperCase();
        x = 0, y = 0;
        newcoords[i] = [];
        newcoords[i][0] = arr[i][0];
        if (letter != "Z" && letter != "A") {
            seg_length = arr[i].length;
            if (letter != "H" && letter != "V") {
                for (j = 1; j < arr[i].length; j = j + 2) {
                    x = arr[i][j];
                    y = arr[i][j + 1];
                    pt = svgDOM.createSVGPoint();
                    pt.x = x;
                    pt.y = y;
                    point = pt.matrixTransform(matrix);
                    newcoords[i][j] = point.x;
                    newcoords[i][j + 1] = point.y;
                }
            }
            else if (letter == "H") {
                x = arr[i][seg_length - 1];
                newcoords[i][1] = x;
            }
            else if (letter == "V") {
                y = arr[i][seg_length - 1];
                newcoords[i][1] = y;
            }
        }
    }
    newcoords = $.map(newcoords, function(n){
        return n;
    });
    newcoords = newcoords.join(" ");
    return newcoords;
} // function flatten_transformations