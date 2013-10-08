$(document).ready(function () {


    new C.Views.Paper({collection: items});

    new C.Views.Layers({collection: items});



	$(".login_buttons .button").on("click", function(){
		$('#myModal').modal("show");
	})

});

