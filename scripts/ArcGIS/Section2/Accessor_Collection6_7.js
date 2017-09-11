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
    "esri/widgets/Search",
    "esri/core/watchUtils",//用于watch中判断然后修改
    "esri/core/Collection",
    "esri/geometry/Point"
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
    Search,
    watchUtils,//用于watch中判断然后修改-Section 6
    //Section 7
    Collection,
    Point
) {
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
        //Section 4 - 创建不同的Widget 
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
            //End Section 4 

            //Section 6, 下面最好放在view then里面。 因为课程分开才这样
            //小功能介绍
            //view.watch("center", (value) => {//动态获取x,y
            //    console.log(value.x, value.y);
            //});
            //view.center = [-118, 36];//设置 观察点的 中心
            //map.set("basemap.title", "Mybasemap");//改变title 
            //view.set({//改变view中心和角度
            //    center: [-118, 36],
            //    rotation: 45
            //});
            //end 小功能介绍
            //如果处理这些小功能
            //let handle = view.watch("center", (value) => {//动态获取x,y
            //    console.log(value.x, value.y);
            //});
            //handle.remove();//移除这个观察状态
            //let handle = view.watch("stationary",//stationary是否是固定状态,是否在拖动地图,true不在拖动,已经停了. false还在拖动地图
            //    (value) => { console.log(value); }); 
            //当在拖地图的时候, widget消失, 等下时才显示
            //let ui = document.querySelector(".esri-ui"); //获取 widget element
            //let handlerFalse = watchUtils.whenFalse(view, "stationary",
            //    () => ui.style.display = "none");
            //let handlerTre = watchUtils.whenTrue(view, "stationary",
            //    () => ui.style.display = "block");
            //end  section6 

            //section 7
            //-基础
            //const coll = new Collection();
            //coll.add("a1");
            //coll.add("a2");
            //coll.forEach(val => console.log(val));
            //var a1 = coll.getItemAt(0);//不能用 coll[0],得用这个才能获得index底下的值
            //console.log(a1);
            ////const listener = coll.on("change",
            ////    ({added, removed, moved,target })=>console.log("added->", added, "removed->", removed, "moved->", moved)); 这样的写法,浏览器无法识别
            //const listener = coll.on("change",
            //    function (added, removed, moved, targeta) {
            //        console.log("added->", added, "removed->", removed, "moved->", moved);
            //    });
            //coll.add("a3");
            //-end 基础
            const PointCollection = Collection.ofType(Point);
            const pc = new PointCollection();
            pc.add([-120, 34]);
            var pc1 = pc.getItemAt(0);
            console.log(pc1);
            pc.addMany([[95, 34], { x: 32, y: 88 }]);
            pc.forEach(val => console.log(val));
            //view.goTo(pc.getItemAt(1));//因为有这个,必须在view.then里
            //end Section 7
        });
    });