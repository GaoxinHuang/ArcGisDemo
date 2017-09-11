require([ //Import Module path
    "esri/Map",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Home",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Print",
    "esri/widgets/ScaleBar",
    "esri/widgets/Search"
], function (  //Import Module
    Map,
    WebMap,
    MapView,
    Expand,
    BasemapGallery,
    BasemapToggle,
    Home,
    Legend,
    LayerList,
    Print,
    ScaleBar,
    Search
) {
        //    var map = new Map({
        //        basemap: "streets" //streets map
        //        //        basemap: "topo"
        //    });

        //var view = new MapView({
        //    map: map,
        //    container: "viewDiv", // html element id
        //    zoom: 10,
        //    center: [172.6591456, -43.584002] //和 google map相反, 这里是先经度(longitude) 再纬度(latitude)
        //    //        rotation:30
        //});

        var map = new WebMap({
            portalItem: {
                id: "b5cc864eeab34258baa30f8ff9cbfe9e" //通常是导入Id的,因为有数据
            }
        });
        var view = new MapView({
            map: map,
            container: "viewDiv", // html element id
            ui: {
                components: ["zoom", "compass", "attribution"] //设置添加不同的Widget
            }
        });

        //layer id is 'Enriched Requests_2790'
        //view.then(function() {
        //    map.layers.forEach(function (layer) { //foreach 找图层
        //        console.log("loop:",layer.id);
        //    });
        //    console.log("find by Id:",map.findLayerById("Enriched Requests_2790").id);
        //});
        //创建不同的Widget
        view.then(function () {
            var basemapGallert = new BasemapGallery({
                view: view,
                container: document.createElement("div")
            });
            var basemapToggle = new BasemapToggle({
                view: view,
                nextBasemap: "hybrid"
            });
            var home = new Home({ //
                view: view
            });
            var search = new Search({
                view: view,
                container: document.createElement("div")
            });
            var scaleBar = new ScaleBar({
                view: view,
                container: document.createElement("div")
            });
            var legend = new Legend({
                view: view,
                container: document.createElement("div")
            });
            var layerList = new LayerList({
                view: view,
                container: document.createElement("div")
            });
            var print = new Print({
                view: view,
                //printServiceUrl: "https://www.example.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task", 
                //上面那个链接是官网上的， 但是不能用,所以用下面的
                printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
                container: document.createElement("div")
            });

            //expands
            //注: 不同的expandIconClass 就是不同的图标展示而已
            //https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/index.html
            var bgExpand = new Expand({
                view: view,
                content: basemapGallert.domNode,
                expandIconClass: "esri-icon-basemap"
            });
            var searchExpand = new Expand({
                view: view,
                content: search.domNode,
                expandIconClass: "esri-icon-search"
            });
            var legendExpand = new Expand({
                view: view,
                content: legend.domNode,
                expandIconClass: "esri-icon-layers"
            });
            var listExpand = new Expand({
                view: view,
                content: layerList.domNode,
                expandIconClass: "esri-icon-layer-list"
            });
            var printExpand = new Expand({
                view: view,
                content: print.domNode,
                expandIconClass: "esri-icon-printer"
            });
            //view.ui.add(home, "top-left");
            view.ui.add(home,
                {
                    position: "top-left",
                    index: 1 //从0开始, 现在就是排第二个, 不然就是按顺序排
                });
            view.ui.add(searchExpand, "top-right");
            view.ui.add(printExpand, "top-right");
            view.ui.add(legendExpand, "top-right");
            view.ui.add(listExpand, "top-right");
            view.ui.add(scaleBar, "bottom-left");
            view.ui.add(basemapToggle, "bottom-right");
            view.ui.add(bgExpand, "bottom-right");

        });
    });