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

