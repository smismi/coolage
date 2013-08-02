$(document).ready(function () {

	var c = document.getElementById("cnvs");
	var paper = Raphael(c, 1000, 1000);
	var image, image1, path;


	Raphael(function () {

		img = document.getElementById("photo");
		img.style.display = "none";

		image1 = paper.image(img.src, 0, 0, 300, 240).hover(function () {
				console.log("ON 2");
			}, function () {
				console.log("OFF 2");
			});

		ft = paper.freeTransform(image1, {draw: [ 'bbox', 'circle' ], keepRatio:  [  'bboxCorners', 'bboxSides']  }, function(ft, events) {

		});


	});




});

