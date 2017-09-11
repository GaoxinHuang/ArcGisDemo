require([
    "esri/WebMap",
    "esri/views/MapView"
], function (
    WebMap,
    MapView
) {
    var webmap = new WebMap({
        portalItem: {
            id:"2dfaf8bdb45a4dcf8511a849e4583873"
        }
    });

    
    //load是arcgis的api, 可以读取重新读取GIS内容,然后再利用promises去输出
    webmap.load().then(() => {
      const layer = webmap.layers.find(({ id }) => {
        return id.indexOf("CensusTractPoliticalAffiliationTotals") > -1;
      });
        layer.definitionExpression = "TOTPOP_CY > 10000";
    });
    
    var view = new MapView({
        map: webmap,
        container: "viewDiv"
    });
    view.then(()=> { 
        setTimeout(
           () => {
                   const layer = webmap.layers.find(({ id }) => {
                       return id.indexOf("CensusTractPoliticalAffiliationTotals") > -1;
                   });
                   layer.definitionExpression = "TOTPOP_CY < 10000";
           } , 10000);
    });

});
