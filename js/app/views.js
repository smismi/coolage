//VIEWS



C.Views.Paper = Backbone.View.extend({
    initialize: function() {
        this.render();
        this.collection.on('reset', this.render, this);
        this.collection.on('add', this.renderEach, this);
    },
    render: function() {


//        TODO: вынести во вьюху
        c = document.getElementById("cnvs");
        paper = Raphael(c, 1000, 1000);

        this.collection.each(function(item){

            this.renderEach(item);

        }, this);


        console.log("ITEMS draw")
        return this;
    },
    renderEach: function(model){
        var day = new C.Views.Item({model: model, collection: this.collection});

    }
});

C.Views.Item = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {


        this._el = paper.image("D:/_projects/coolage/img/" + this.model.get("src"), Math.random() * 500, Math.random() * 400, 300, 240).hover(function () {
            console.log("ON 2");
        }, function () {
            console.log("OFF 2");
        });

        paper.freeTransform(this._el, {draw: [ 'bbox', 'circle' ], keepRatio:  [  'bboxCorners', 'bboxSides']  }, function(ft, events) {

		});

        console.log("ONE ITEM draw")
        return this;
    }
});

C.Views.Layers = Backbone.View.extend({
    el: "#layers",
    initialize: function() {
        console.log("C.Views.Layers INIT");
        this.render();

        this.collection.on('reset', this.render, this);
        this.collection.on('add', this.renderEach, this);
    },
    render: function() {
        console.log("C.Views.Layers RENDER");

        this.collection.each(function(item){

            this.renderEach(item);

        }, this);

        return this;
    },
    renderEach: function(model){
        var layer = new C.Views.Layer({model: model, collection: this.collection});


        this.$el.append(layer.$el);

    }
});


C.Views.Layer = Backbone.View.extend({
    tagName: "li",
    template: "#template_layer",
    initialize: function() {
        this.render();
    },
    render: function() {

        var template = _.template( $(this.template).html() );

        this.$el.html(template( this.model.toJSON() ));
        return this;
    }
});