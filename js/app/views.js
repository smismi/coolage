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

        C.EventsItem.off(C.EventsItem.CHANGE, this.updateAttrs, this);
        C.EventsItem.on(C.EventsItem.CHANGE, this.updateAttrs, this);

        C.EventsItem.off(C.EventsItem.SELECT, this.setSelect,  this);
        C.EventsItem.on(C.EventsItem.SELECT, this.setSelect, this);


    },
    selectThis: function() {
        alert("select");
    },
    render: function() {


        this._el = paper.image("D:/_projects/coolage/img/" + this.model.get("src"), Math.random() * 500, Math.random() * 400, 300, 240);

        this._el.hover(function () {
            console.log("ON 2");
        }, function () {
            console.log("OFF 2");
        }).click(function(){
            console.log("click");
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

                        break;
                    default :


                }
//                C.EventsItem.trigger(C.EventsItem.CHANGE, _this.model, this.attrs);



            }
        );

        return this;
    },
    updateAttrs : function(model, attrs) {

        console.log("fired C.Events.CHANGE", model.get("src"), attrs)

//        model.set("attribute", attrs);
    },
    setSelect : function(modelCid, state) {
        console.log(this.model, modelCid, "setSelect", state );

        if(modelCid === this.model.cid) {
            this.model.set("selected", true);
        } else {
            this.model.set("selected", false);
        }

    }
});

C.Views.Layers = Backbone.View.extend({
    el: "#layers",
    initialize: function() {
        console.log("C.Views.Layers INIT");
        this.render();

        this.collection.on('reset', this.render, this);
        this.collection.on('add', this.renderEach, this);


        C.EventsItem.off(C.EventsItem.SELECT, this.slideTo, this);
        C.EventsItem.on(C.EventsItem.SELECT, this.slideTo, this);
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

    },
    slideTo: function(model){
        console.log(model, "scrollto");

    }
});


C.Views.Layer = Backbone.View.extend({
    tagName: "li",
    template: "#template_layer",
    initialize: function() {
        this.render();
        C.EventsItem.off(C.EventsItem.SELECT, this.selectMe,  this);
        C.EventsItem.on(C.EventsItem.SELECT, this.selectMe, this);
    },
    events: {
        "click .delete" : "delete"
    },
    render: function() {

        var template = _.template( $(this.template).html() );

        this.$el.html(template( this.model.toJSON() ));
        return this;
    },
    delete: function(){
        console.log("delete");
    },
    selectMe: function(modelCid, state){
        console.log(this.model, modelCid, "selectMe", state );

        if(modelCid === this.model.cid) {
            this.$el.css("border", "1px solid red")
        } else {
            this.$el.css("border", "1px solid green")
        }
    }

});