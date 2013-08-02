$(document).ready(function () {

	var c = document.getElementById("cnvs");
	var paper = Raphael(c, 1000, 1000);
	var image, image1, path;

	Raphael(function () {

		img = document.getElementById("photo");
		img.style.display = "none";

		image = paper.image(img.src, 140, 140, 320, 240).hover(function () {
			console.log("ON 1");
		}, function () {
				console.log("OFF 1");
			})
		;
		image1 = paper.image(img.src, 0, 0, 320, 240).attr({
			transform: "s1-1",
			opacity: .5
		}).hover(function () {
				console.log("ON 2");
			}, function () {
				console.log("OFF 2");
			});

		path = paper.path('M 250 250 l 0 -50 l -50 0 l 0 -50 l -50 0 l 0 50 l -50 0 l 0 50 z');
//		image1.attr({"clip-path": path});

		path.attr({fill: "url('img/PkGAW_n7TTA.jpg')"});

		// Add freeTransform
		var ft = paper.freeTransform(image1);

		// Hide freeTransform handles
		ft.hideHandles();

		// Show hidden freeTransform handles
		ft.showHandles();

		// Apply transformations programmatically
		ft.attrs.rotate = 45;

		ft.apply();

		// Remove freeTransform completely
		ft.unplug();

		// Add freeTransform with options and callback
		ft = paper.freeTransform(image1, { keepRatio: true }, function(ft, events) {
			console.log(ft.attrs);
		});

		// Change options on the fly
		ft.setOpts({ keepRatio: false });

		// Add freeTransform
		var ft = paper.freeTransform(path);

		// Hide freeTransform handles
		ft.hideHandles();

		// Show hidden freeTransform handles
		ft.showHandles();

		// Apply transformations programmatically
		ft.attrs.rotate = 45;

		ft.apply();

		// Remove freeTransform completely
		ft.unplug();

		// Add freeTransform with options and callback
		ft = paper.freeTransform(path, { keepRatio: true }, function(ft, events) {
			console.log(ft.attrs);
		});

		// Change options on the fly
		ft.setOpts({ keepRatio: false });

	});


//
//	timerId = setTimeout(function(){
//		var anim = Raphael.animation({transform: "r30,500,500s0.5,1r45"}, 22000, "linear").repeat(1);
//			image.animate(anim);
//		var anim = Raphael.animation({transform: "r90,100,500s0.9,1r45"}, 42000, "linear").repeat(1);
//			image1.animate(anim);
//	}, 1900)
//



});