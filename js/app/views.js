//VIEWS


C.Views.Paper = Backbone.View.extend({
	initialize: function () {

		this.render();

		this.collection.on('add', this.renderEach, this);

		this.collection.on('sort', this.frontToEach, this);

	},
	render: function () {


//        TODO: вынести во вьюху
		c = document.getElementById("cnvs");
		paper = Raphael(c, 1000, 1000);

		this.collection.each(function (item) {

			this.renderEach(item);


		}, this);


		console.log("ITEMS draw")
		return this;
	},
	renderEach: function (model) {
		var day = new C.Views.Item({model: model, collection: this.collection});
 	},
	frontToEach: function () {

		this.collection.each(function (model) {

			C.EventsItem.trigger(C.EventsItem.TOFRONT, model.cid, true);

		}, this);


	}
});

C.Views.Item = Backbone.View.extend({
	initialize: function () {
		this.render();

		C.EventsItem.off(C.EventsItem.CHANGE, this.updateAttrs, this);
		C.EventsItem.on(C.EventsItem.CHANGE, this.updateAttrs, this);

		C.EventsItem.off(C.EventsItem.SELECT, this.setSelect, this);
		C.EventsItem.on(C.EventsItem.SELECT, this.setSelect, this);


		C.EventsItem.off(C.EventsItem.TOFRONT, this.toFront, this);
		C.EventsItem.on(C.EventsItem.TOFRONT, this.toFront, this);




	},
	render: function () {

		var _this = this;
		this._el = paper.image("img/" + this.model.get("src"), this.model.get("xyz").x, this.model.get("xyz").y, this.model.get("size").x, this.model.get("size").y);

		this._el.hover(function () {
		},function () {
		}).click(function () {
			C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);

		}).dblclick(function () {

				new C.Views.ItemCrop({model: _this.model});


			});

		this.item = paper.freeTransform(this._el,
			{
				draw: [ 'bbox' ],
				keepRatio: [ 'axisX', 'axisY', 'bboxCorners'],
				scale: [ 'axisX', 'axisY', 'bboxCorners'],
				distance: 1.1,
				rotate: [ 'axisX', 'axisY', 'bboxSides' ],
				attrs: { fill: "#fff", stroke: "#333",

				},
				size: 4

			}, function (ft, events) {
				var _path = "M  100  100  L 5 210 L  446 309 L 10  400 Z";

				_this._el.attr({"clip-path": _path});

				switch (events[0]) {
					case "init":

						break;
					case "apply":

						break;
					case "drag start":
//						C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);

						break;
					case "click":
//						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);
//						C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);

						break;
					case "drag":
						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);
//						C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);

						break;
					default :

//						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);

				}


			}


		);

		this.item.hideHandles();
		var xyz = this.model.get("xyz");

		this.item.attrs = xyz;

		this.item.apply();

		return this;
	},
	updateAttrs: function (model, attrs) {

		model.set("xyz", attrs);
	},
	setSelect: function (modelCid, state) {
		if (modelCid === this.model.cid) {
			this.model.set("selected", true);

			this.item.showHandles();
		} else {

			this.item.hideHandles();
			this.model.set("selected", false);
		}

	},
	toFront: function (modelCid) {

		if (modelCid === this.model.cid) {

			this._el.toFront();

		}


	}
});
C.Views.ItemCrop = Backbone.View.extend({
	el: "#cropalka",

	initialize: function () {
		this.render();
//
//		C.EventsItem.off(C.EventsItem.CHANGE, this.updateAttrs, this);
//		C.EventsItem.on(C.EventsItem.CHANGE, this.updateAttrs, this);
	console.log("CROP")

	},
	render: function () {

		var _this = this;
		this.$el.show();
		var _img = new Image();
			_img.src = "/img/" + this.model.get("src");

		var _imgD = {};

		var points = [];


		_img.onload = function() {

			_imgD.width = this.width;
			_imgD.height = this.height;


			_this.$el.css({"width": _imgD.width, "height": _imgD.height, "margin-left": -_imgD.width/2, "margin-top": -_imgD.height/2});


			r = Raphael("cropalka", _imgD.width, _imgD.height),
				discattr = {fill: "#fff", stroke: "none"};
			r.rect(0, 0, _imgD.width, _imgD.height, 10)
				.attr({stroke: "#666"});

			r.image("/img/" + _this.model.get("src"), 0, 0, _imgD.width, _imgD.height)
				.click(function (event) {


 						points.push([event.layerX, event.layerY]);

					console.log("click");


					redrawPoints();

				})
				.mousedown(function (event) {
						console.log("down")


				})
				.mouseup(function (event) {
					console.log("up")

				});
















		}


		function redrawPoints(){
			console.log(points);

			_curve(points, "hsb(0, .75, .75)");


		}



		function _curve(points, color) {




			var _points = $.map( points, function(n){
				return n;
			});

			console.log(points);

			var path = []
			var controls = r.set();

//
//			for (i = 0; i < controls.length; i++) {
//				if (controls[i]) {
//					delete controls[i--];
//					controls.length--;
//				}
//			}
			points.forEach(function(point, index){

				var nodeType = "L";
				if (index === 0) nodeType = "M"

				path.push([nodeType, point[0], point[1]])
				if (index === points.length-1) {

					path.push(["Z"]);
//					return;

				};


				controls.push(

					r.circle(point[0], point[1], 5).attr(discattr)

				);


				controls[index].update = function (x, y) {
					var X = this.attr("cx") + x,
						Y = this.attr("cy") + y;
					this.attr({cx: X, cy: Y});

					path[index][1] = X;
					path[index][2] = Y;

					curve.attr({path: path});

				};




			})

			console.log(controls.length);
			if (typeof curve === "undefined") {
				curve = r.path(path).attr({stroke: color || Raphael.getColor(), "stroke-width": 4, "stroke-linecap": "round"});
			} else {
				curve.attr("path", path);
			}



			controls.drag(move, up);





		}

		function move(dx, dy) {
			this.update(dx - (this.dx || 0), dy - (this.dy || 0));
			this.dx = dx;
			this.dy = dy;
		}

		function up() {
			this.dx = this.dy = 0;
		}

		return this;
	}

});

C.Views.Layers = Backbone.View.extend({
	el: "#layers",
	initialize: function () {
		console.log("C.Views.Layers INIT");
		this.render();

		this.collection.on('change', this.render, this);
		this.collection.on('reset', this.render, this);
		this.collection.on('sort', this.render, this);


//		C.EventsItem.off(C.EventsItem.SELECT, this.slideTo, this);
//		C.EventsItem.on(C.EventsItem.SELECT, this.slideTo, this);

		C.EventsItem.off(C.EventsItem.LAYERSORT, this.layerSort, this);
		C.EventsItem.on(C.EventsItem.LAYERSORT, this.layerSort, this);



		new C.Views.Reset();
	},
	render: function () {

  		this.$el.html("");
		this.collection.each(function (item) {

			this.renderEach(item);

		}, this);

		this.sortable();
		return this;
	},
	renderEach: function (model) {

		var layer = new C.Views.Layer({model: model, collection: this.collection});
		this.$el.append(layer.$el);

	},
	slideTo: function (model) {

	},
	layerSort: function () {
		var _collection = [];
		$("#layers li").each(function (index) {

			var _id = $(this).data("cid");

			items.get(_id).set("order", index);

//			console.log(_id, index);


 		})

		items.sortByField("order");



//		items.reset(_collection);
	},
	sortable: function () {
		$("#layers").sortable().unbind('sortupdate').bind('sortupdate', function (e, ui) {

			var current = $("#" + ui.item.context.id)
			var index = $('#layers li').index(current);

			C.EventsItem.trigger(C.EventsItem.LAYERSORT);

		});

	}
});


C.Views.Reset = Backbone.View.extend({
	el: "#reset",
	events: {
		"click .reset" : "reset"
	},
	reset: function () {
		console.log("reset");
	}

});
C.Views.Layer = Backbone.View.extend({
	tagName: "li",
	template: "#template_layer",
	initialize: function () {
		this.render();
		C.EventsItem.off(C.EventsItem.SELECT, this.selectMe, this);
		C.EventsItem.on(C.EventsItem.SELECT, this.selectMe, this);

		C.EventsItem.off(C.EventsItem.CHANGE, this.colorMe, this);
		C.EventsItem.on(C.EventsItem.CHANGE, this.colorMe, this);

	},
	events: {
		"click .delete": "delete"
	},
	render: function () {

		var template = _.template($(this.template).html());

		this.$el.attr({"id": "layer_" + this.model.cid, "data-cid": this.model.cid}).html(template(this.model.toJSON()));
		return this;
	},
	delete: function () {
		console.log("delete");
	},
	selectMe: function (modelCid, state) {
//		if (modelCid === this.model.cid) {
//			this.$el.addClass("selected");
//		} else {
//			this.$el.removeClass("selected");
//		}
	},
	colorMe: function (modelCid, state) {

		this.render();

	}

});