var map, view;
require([ //Import Module path
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/core/watchUtils"//用于watch中判断然后修改
], function (  //Import Module
    Map,
    MapView,
    FeatureLayer,
    watchUtils//用于watch中判断然后修改-Section 6
) {
    window.watchUtils = watchUtils;
     map = new Map({
        basemap: "topo"
    });
     view = new MapView({
        map: map,
        container: "viewDiv", // html element id
        center: [-118.244, 34.052],
        zoom: 12
    });
    view.then(function () { //这个then就是 promise
        window.layer = new FeatureLayer({
            url: "https://services1.arcgis.com/QKasy5M2L9TAQ7gs/arcgis/rest/services/At_Risk_CT2010_pts/FeatureServer/0"
        });
        map.add(window.layer);

        //promise 每次返回都是promise,所以每次都有promise.then(),
        //然后带的参数就是上一个function return的值,最后一个是只要所有中有一个有错的解决方案, 就会catch
        const promise = view.then(() => {
                return view.whenLayerView(layer);
            })
            .then((layerView) => { //这个layerView 就是上面return的值
                return watchUtils.whenFalseOnce(layerView, "updating");
            })
            .then((features => {
                return view.goTo(features);
            }))
            .otherwise(error => {
                console.warn("Oops", error);
            });
    });


});