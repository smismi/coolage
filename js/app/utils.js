//UTILS
C.Utils.GetMaxOrder = function (items) {
    return items.max(function(m){
        return m.get('order');
    });
}


C.Utils.layerSort = function () {
     debugger;
}


C.Utils.flattenObject = function (obj) {
	var toReturn = {};


	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;

		if ((typeof obj[i]) == 'object') {
			var flatObject = C.Utils.flattenObject(obj[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;

				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = obj[i];
		}
	}
	return toReturn;
}


jQuery.fn.shake = function (intShakes, intDistance, intDuration) {
    this.each(function () {
        $(this).css("position", "relative");
        for (var x = 1; x <= intShakes; x++) {
            $(this).animate({left: (intDistance * -1)}, (((intDuration / intShakes) / 4)))
                .animate({left: intDistance}, ((intDuration / intShakes) / 2))
                .animate({left: 0}, (((intDuration / intShakes) / 4)));
        }
    });
    return this;
};
