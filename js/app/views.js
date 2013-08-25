//VIEWS


C.Views.Paper = Backbone.View.extend({
	initialize: function () {
		this.render();
//        this.collection.on('reset', this.render, this);
		this.collection.on('add', this.renderEach, this);
		this.collection.on('sort', this.rerender, this);


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
	rerender: function (model) {
 		console.log("sort");

		paper.clear();
		this.collection.each(function (item) {

			this.renderEach(item);

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


	},
	selectThis: function () {
		alert("select");
	},
	render: function () {


		this._el = paper.image("img/" + this.model.get("src"), this.model.get("xyz").x, this.model.get("xyz").y, 300, 240);

		this._el.hover(function () {
		},function () {
		}).click(function () {
			})

		var _this = this;
		this.item = paper.freeTransform(this._el,
			{
				draw: [ 'bbox', 'circle' ],
				keepRatio: 'bboxCorners',
				scale: 'bboxCorners',
				distance: 1,
				rotate: true
			}, function (ft, events) {


				switch (events[0]) {
					case "init":

						break;
					case "apply":

						break;
					case "drag start":
						C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);

						break;
					case "drag":
						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);
						C.EventsItem.trigger(C.EventsItem.SELECT, _this.model.cid, true);

						break;
					default :

						C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);

				}


			}


		);

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
		} else {
			this.model.set("selected", false);
		}

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


//
//		C.EventsItem.off(C.EventsItem.SELECT, this.slideTo, this);
//		C.EventsItem.on(C.EventsItem.SELECT, this.slideTo, this);
//
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

			console.log(_id, index);


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
		if (modelCid === this.model.cid) {
			this.$el.css("background", "red")
		} else {
			this.$el.css("background", "green")
		}
	},
	colorMe: function (modelCid, state) {

		this.render();

	}

});