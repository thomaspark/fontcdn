var loading = {};

module.exports = function loadScript(src, callback){
    if (typeof(window) === 'undefined') return;
    
    // we don't want duplicate script elements
    // so we use an array of callbacks instead of
    // multiple onload handlers
    if (loading[src]) {
        loading[src].push(callback);
        return;
    }

    // create the array of callbacks
    loading[src] = [callback];

    // create a script, and handle success/failure in node callback style
    var script = document.createElement('script');
    script.onload = function(){
        loading[src].forEach(function(cb){
            cb();
        });
        delete loading[src];
    };

    script.onerror = function(error){
        loading[src].forEach(function(cb){
            cb(error)
        });
        delete loading[src];
    };

    // set the src and append it to the head
    // I believe async is true by default, but there's no harm in setting it
    script.async = true;
    script.src = src;
    document.getElementsByTagName("head")[0].appendChild(script);
};
