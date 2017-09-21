require([
    "esri/Map",
    "esri/layers/VectorTileLayer",
    "esri/layers/FeatureLayer",
    "esri/PopupTemplate",
    "esri/views/MapView",
    "esri/widgets/Expand",
    "esri/widgets/Print",
    // "esri/dijit/Print",
    "esri/tasks/PrintTask",
    "esri/tasks/PrintTemplate",  
], function (
    EsriMap,
    VectorTileLayer,
    FeatureLayer,
    PopupTemplate,
    MapView,
    Expand,
    Search,
    Legend,
    Home,
    Locate,
    BasemapToggle,
    Print,
    LayerList,
    ZoomViewModel //加个用ViewModel, 后面是react 有点听不懂, 可以去下载code研究下
) {

        const fLayer = new FeatureLayer({
            url: "http://services.arcgis.com/p3UBboyC0NH1uCie/arcgis/rest/services/LA_Crime_WebMap/FeatureServer/0",
            definitionExpression: "GANG_RELATED = 'YES'",
            outFields: ["*"]
        });

        const template = new PopupTemplate({
            title: "{TYPE}",
            content: "<p>{CATEGORY}</p>" +
            "<ul><li>Description: {STAT_DESC}</li>" +
            "<li>City: {CITY}</li><ul>"
        });
        fLayer.popupTemplate = template;

        const map = new EsriMap({
            basemap: "dark-gray",
            layers: [fLayer]
        });

        const view = new MapView({
            center: [-118.174, 34.024],
            zoom: 14,
            container: "viewDiv",
            map: map,
            ui: {
                components: ["zoom", "compass", "attribution"]
            }
        });

        view.then(() => {
            const print = new Print({
                view: view,
                container: document.createElement("div"),
                printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
            });

            const printExpand = new Expand({
                view: view,
                content: print.domNode,
                expandIconClass: "esri-icon-printer"
            });



            view.ui.add(printExpand, "top-right");
        });
    });