$(document).ready(function () {

	var c = document.getElementById("cnvs");
	var paper = Raphael(c, 1000, 1000);
	var image, image1, path;
    var _path = 'M 0 0 l 200 0 l 0 100 l -100 0  z';
	Raphael(function () {

		img = document.getElementById("photo");
		img.style.display = "none";

//		image = paper.image(img.src, 140, 140, 320, 240).hover(function () {
//			console.log("ON 1");
//		}, function () {
//            console.log("OFF 1");
//        });
		image1 = paper.image(img.src, 0, 0, 320, 240).attr({"clip-path": _path}).hover(function () {
				console.log("ON 2");
			}, function () {
				console.log("OFF 2");
			});

		path = paper.path(_path);
//		image1.attr({"clip-rect": '12 21 150 150'});

//		path.attr({fill: "url('img/PkGAW_n7TTA.jpg')"});
//
		// Add freeTransform
//		var ft = paper.freeTransform(image1);
//
//		// Hide freeTransform handles
//		ft.hideHandles();
//
//		// Show hidden freeTransform handles
//		ft.showHandles();
//
//		// Apply transformations programmatically
//		ft.attrs.rotate = 45;
//
//		ft.apply();
//
//		// Remove freeTransform completely
//		ft.unplug();

		// Add freeTransform with options and callback
//		ft = paper.freeTransform(image1, { keepRatio: true }, function(ft, events) {
//			console.log(ft.attrs);
//		});
//
//		// Change options on the fly
//		ft.setOpts({ keepRatio: false });
//
//		// Add freeTransform
//		var ft = paper.freeTransform(path);
//
//		// Hide freeTransform handles
//		ft.hideHandles();
//
//		// Show hidden freeTransform handles
//		ft.showHandles();
//
//		// Apply transformations programmatically
//		ft.attrs.rotate = 45;
//
//		ft.apply();
//
//		// Remove freeTransform completely
//		ft.unplug();

		// Add freeTransform with options and callback
        _ft = paper.freeTransform(path, { keepRatio: true }, function(_ft, events) {
            console.log(_ft.attrs);
            _new = flatten_transformations(path,true)
            console.log(_new);
//ТУТ
//            image1.attr({"clip-path": _new.replace(',', ' ')});
//            image1.attr({"clip-path": 'M 0 0 l 200 0 l 0 ' + Math.random() * 100 + ' l -100 0  z'});

            ft.attrs = _ft.attrs;
            ft.apply();


//            _path = ft.subject.attrs.path.toLocaleString();
//			console.log(ft.subject.attrs.path.toLocaleString());
        });
		ft = paper.freeTransform(image1, { keepRatio: true }, function(ft, events) {

//            _path = ft.subject.attrs.path.toLocaleString();
//			console.log(ft.subject.attrs.path.toLocaleString());
		});
        ft.hideHandles();

//		// Change options on the fly
//		ft.setOpts({ keepRatio: false });

//
//
//		var anim = Raphael.animation({transform: "r30,500,500s0.5,1r45"}, 1000, "linear").repeat(1);
//		image.animate(anim);


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
    newcoords = newcoords.join(" ");
    return newcoords;
} // function flatten_transformations