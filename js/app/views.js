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

		C.EventsItem.off(C.EventsItem.SELECT, this.setSelect, this);
		C.EventsItem.on(C.EventsItem.SELECT, this.setSelect, this);


		C.EventsItem.off(C.EventsItem.TOFRONT, this.toFront, this);
		C.EventsItem.on(C.EventsItem.TOFRONT, this.toFront, this);

//		C.EventsItem.off(C.EventsItem.SETMASK, this.tewrr, this);
//		C.EventsItem.on(C.EventsItem.SETMASK, this.tewrr, this);

////
		this.model.off('change:xyz', this.updateAttrs, this);
		this.model.on('change:xyz', this.updateAttrs, this);
		this.model.off('change:path', this.updatePath, this);
		this.model.on('change:path', this.updatePath, this);

////


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
				attrs: { fill: "#fff", stroke: "#333"

				},
				size: 4

			}, function (ft, events) {

				switch (events[0]) {
					case "init":

						break;
					case "apply":
						_this.updateAttrs(_this.model, this.attrs);
//						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);

						break;
					case "drag start":
//						C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);

						break;
					case "click":
//						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);
//						C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);

						break;
					case "drag":
//						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);
//						C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);
//						_this.updateAttrs(_this.model, this.attrs);
						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);

						break;
					default :

//						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);

				}


			}


		);

		this.item.hideHandles();

		var xyz = this.model.get("xyz");

		this.item.attrs = xyz;

		this._path = this.model.get("path");








		if (this._path != null) {



			var _path = $.map( this._path, function(n){
				return n;
			}).join(" ");


 			this._box = Raphael.pathBBox(_path);

			this.item.attrs.size = { x: this._box.width, y: this._box.height }
			this.item.attrs.center = { x: this._box.cx, y: this._box.cy }

			this._el.attr({"clip-path": _path})
		}




		this.item.apply();


		return this;
	},
	updateAttrs: function (model, attrs) {
		if (this._path !== null) {


		} else return;
		this._el.clip.childNodes[0].setAttribute("transform", "matrix(" + this._el.matrix.a + "," + this._el.matrix.b + "," + this._el.matrix.c + "," + this._el.matrix.d + "," + this._el.matrix.e + "," + this._el.matrix.f + ")");



	},

	updatePath: function () {
 		this._path = this.model.get("path");



		var _path = $.map( this._path, function(n){
			return n;
		}).join(" ");

		this._box = Raphael.pathBBox(_path);


		this.item.attrs.size = { x: this._box.width, y: this._box.height }
		this.item.attrs.center = { x: this._box.cx, y: this._box.cy }


		this._el.attr({"clip-path": _path})

		console.log(this._path)
		console.log(_path)

		this.item.apply();

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
	el: "#wdqwdqwd",
	template: "#image_crop",

	initialize: function () {


		this.render();
		this.$el.show();
	},
	events: {



	},
	render: function () {

//		vars
		var template = _.template($(this.template).html());

		this.$el.html(template(this.model.toJSON()));

		var _this = this;

	 	this.blockd = false;




		this._img = new Image();
		this._img.src = "/img/" + this.model.get("src");


		this.curve = null;
		this._path = this.model.get("path");
		this.controls = [];

		this._img.onload = function() {

			_this.imgOnLoad(this.width, this.height)




		}


		return this;
	},
	imgOnLoad : function (w, h) {

 		var _this = this;
		this.$el.css({"width": w, "height": h, "margin-left": -w/2, "margin-top": -h/2});


		r = Raphael("cropalka", w, h),
			discattr = {fill: "#fff", stroke: "none"};
		r.rect(0, 0, w, h, 10)
			.attr({stroke: "#666"});

		r.image("/img/" + this.model.get("src"), 0, 0, w, h)
			.click(function (event) {

//				if(_this.blockd) return;

 				_this.setPoint([event.layerX, event.layerY]);


//					redrawPoints();

			})
			.mousedown(function (event) {
				console.log("down")


			})
			.mouseup(function (event) {
				console.log("up")

			});
		this.restoreControls();
	},
	restoreControls : function () {

		this.doCurve();



	},
	createControls : function (x, y, i) {

		var _this = this;

		var _control = r.circle(x, y, 5).attr(discattr);

		if(i === 1) {

			_control.click (function() {
				if(_this.blockd) return;

				_this._path.push(["Z"]);

				_this.curve.attr({path: _this._path});

				_this.blockd = true;
				return;

			})

		}


		_control.update = function (x, y) {
			var X = this.attr("cx") + x,
				Y = this.attr("cy") + y;
			this.attr({cx: X, cy: Y});

			_this._path[i - 1][1] = X;
			_this._path[i - 1][2] = Y;

			_this.curve.attr({path: _this._path});



		};

		_control.drag(move, up);

		_control.dblclick (function() {
			_control.remove();
			_this.controlDelete(i);

		});


		function move(dx, dy) {
			this.update(dx - (this.dx || 0), dy - (this.dy || 0));
			this.dx = dx;
			this.dy = dy;




		}

		function up() {
			this.dx = this.dy = 0;
		}

		return _control;
	},
	controlDelete : function (i) {

			this._path.remove(i - 1);

			if(i === 1) {
				this._path[0][0] = "M";
			}
			this.curve.attr({path: this._path});




	},
	doCurve: function () {

		var _this = this;

		if (this._path === null) {

			this._path = [];
			return;
		}

		this.curve = r.path(this._path).attr({stroke: "hsb(0, .75, .75)" || Raphael.getColor(), "stroke-width": 4, "stroke-linecap": "round"}).click(function(e){debugger;});

		$.each(this._path, function( index, value ) {

//			debugger;
			var _i = index + 1;
			_this.controls[_i] = _this.createControls(value[1], value[2], _i);
		});


	},
	setPoint: function (__points) {



		var i = this._path.length + 1;


		var nodeType = "L";

			if (this.curve === null) {
				nodeType = "M";

				this._path.push([nodeType, __points[0], __points[1]])

				this.curve = r.path(this._path).attr({stroke: "hsb(0, .75, .75)" || Raphael.getColor(), "stroke-width": 4, "stroke-linecap": "round"}).click(function(e){debugger;});


			}  else {
				debugger;
				if (this._path[i-2] == "Z") this._path.pop();

				this._path.push([nodeType, __points[0], __points[1]])

				this.curve.attr({path: this._path});

			}


			this.controls[i] = this.createControls(__points[0], __points[1], i);



	},
	events: {
		"click .save" : "throwTo"
	},
	throwTo : function() {


 		this.model.set("path", this._path);
 		this.model.trigger('change:path');


//		C.EventsItem.trigger(C.EventsItem.SETMASK, this.model, this.attrs);
 		this.close();



	},
	close: function(){

		this.$el.html("").hide();

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
	className: "sort",
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


Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

Array.prototype.compare = function (array) {
	// if the other array is a falsy value, return
	if (!array)
		return false;

	// compare lengths - can save a lot of time
	if (this.length != array.length)
		return false;

	for (var i = 0; i < this.length; i++) {
		// Check if we have nested arrays
		if (this[i] instanceof Array && array[i] instanceof Array) {
			// recurse into the nested arrays
			if (!this[i].compare(array[i]))
				return false;
		}
		else if (this[i] != array[i]) {
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}
	return true;
}