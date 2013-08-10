//UTILS
C.Utils.GetMaxOrder = function (items) {
    return items.max(function(m){
        return m.get('order');
    });
}

