$(document).ready(function () {

	console.log("ready");

	var c = document.getElementById("cnvs");
	var paper = Raphael(c, 1000, 1000);
	var image, image1;

	Raphael(function () {

		alert("ready");
		img = document.getElementById("photo");
		img.style.display = "none";

		image = paper.image(img.src, 140, 140, 320, 240).hover(function () {
			console.log("ON 1");
		}, function () {
				console.log("OFF 1");
			})
		;
		image1 = paper.image(img.src, 140, 380, 320, 240).attr({
			transform: "s1-1",
			opacity: .5
		}).hover(function () {
				console.log("ON 2");
			}, function () {
				console.log("OFF 2");
			});

	});



	timerId = setTimeout(function(){
		var anim = Raphael.animation({transform: "r30,500,500s0.5,1r45"}, 2000, "linear").repeat(1);
			image.animate(anim);
		var anim = Raphael.animation({transform: "r90,100,500s0.9,1r45"}, 2000, "linear").repeat(1);
			image1.animate(anim);
 	}, 1900)




});