require([
    "esri/Map",
    "esri/layers/VectorTileLayer",
    "esri/layers/FeatureLayer",
    "esri/PopupTemplate",
    "esri/views/MapView",
    "esri/widgets/Expand",
    "esri/widgets/Search",
    "esri/widgets/Legend",
    "esri/widgets/Home",
    "esri/widgets/Locate",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Print",
    "esri/widgets/LayerList",
    "esri/widgets/Zoom/ZoomViewModel"//加个用ViewModel, 然后就用react, 如果学会react可以回头看看
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

        const template = new PopupTemplate({ //!!!可以改PopopTemplate
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
            const legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: fLayer,
                    title: "Crimes"
                }],
                container: document.createElement("div")
            });

            const searchWidget = new Search({
                view: view,
                container: document.createElement("div")
            });

            const homeWidget = new Home({
                view: view
            });

            const locateWidget = new Locate({
                view: view
            });

            const basemapToggle = new BasemapToggle({
                view: view,
                nextBasemap: "hybrid"
            });

            const print = new Print({
                view: view,
                container: document.createElement("div"),
                printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
            });

            const layerList = new LayerList({
                view: view,
                container: document.createElement("div"),
            });

            const lgndExpand = new Expand({
                view: view,
                content: legend.domNode,
                expandIconClass: "esri-icon-layers"
            });

            const searchExpand = new Expand({
                view: view,
                content: searchWidget.domNode,
                expandIconClass: "esri-icon-search"
            });

            const printExpand = new Expand({
                view: view,
                content: print.domNode,
                expandIconClass: "esri-icon-printer"
            });

            const listExpand = new Expand({
                view: view,
                content: layerList.domNode,
                expandIconClass: "esri-icon-layer-list"
            });

            view.ui.add(lgndExpand, "bottom-right");
            view.ui.add(searchExpand, "top-right");
            view.ui.add(printExpand, "top-right");
            view.ui.add(listExpand, "top-right");
            view.ui.add(homeWidget, "top-left");
            view.ui.add(locateWidget, "top-left");
            view.ui.add(basemapToggle, "bottom-left");
        });
    });