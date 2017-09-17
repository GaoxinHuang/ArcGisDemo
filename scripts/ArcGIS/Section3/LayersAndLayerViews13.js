var map, view, layer;
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/core/watchUtils",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/geometryEngine",
    "esri/tasks/support/Query"
], function (
    EsriMap,
    MapView,
    FeatureLayer,
    watchUtils,
    SimpleMarkerSymbol,
    geometryEngine,
    Query
) {
        /*
        Concept:
        一. Key Layers
        2D:
        1. GraphicsLayer
        2. TileLayer
        3. FeatureLayer(最重要的)
        4. MapImageLayer:
        5. ImageryLayer:
        6. CSVLayer: 用excel 那些table类的数据
        7. GeoRSSLayer: 
        8. StreamLayer:
        9. WebTileLayer: 用于不同平台
        10.VectorTileLayer 
    
        others(3D):
        1. SceneLayer 
        2. ElevationLayer
        3. IntegratedMeshLayer
        4. PointCloudLyaer

        词汇:
        geometry: 几何结构
        */
        window.watchUtils = watchUtils;
        window.EsriMap = EsriMap;
        window.MapView = MapView;
        window.FeatureLayer = FeatureLayer;
        window.SimpleMarkerSymbol = SimpleMarkerSymbol;
        window.geometryEngine = geometryEngine;
        window.Query = Query;

        layer = new FeatureLayer({
            url: "https://services1.arcgis.com/QKasy5M2L9TAQ7gs/arcgis/rest/services/At_Risk_CT2010_pts/FeatureServer/0",
            outFields: ["*"]
        });

        map = new EsriMap({
            basemap: "topo",
            layers: [layer]
        });

        view = new MapView({
            container: "viewDiv",
            center: [-118.244, 34.052],
            zoom: 12,
            map: map
        });

        //feature layer
        view.on("click", function (evt) {
            const screenPoint = {
                x: evt.x,
                y: evt.y
            };
            const mapPoint = view.toMap(screenPoint); //通过Screen的point获取mapPoint
            const buffer = geometryEngine.buffer(mapPoint, 5000, "feet");//得到5000 feet(英寸)的所有点
            const query = layer.createQuery(); //做这个是为了以后更好的进步修改这个语句
            query.geometry = buffer;
            layer.queryFeatures(query).then((results) => { //执行这个query,得到返回值
                const features = results.features.map(graphic => {//所有的点, 都创建一个方形,size为8的蓝色点 
                    graphic.symbol = new SimpleMarkerSymbol({
                        style: "square",
                        size: 8,
                        color: "blue"
                    });
                    return graphic;
                });
                view.graphics.removeAll(); //把之前的点移除
                view.graphics.addMany(features); //添加这个features layer
            })
                .otherwise(error => console.warn(error));
        });
        //feature的执行, 不是说feature layer本身变化了, 
        //而是在layerview,又下载图片等

        //下面 大概可能是用promise, 让数据已经确定读取完了,再执行query(貌似没很懂)
        let promise = view.whenLayerView(layer);
        promise.then((layerView) => {
            watchUtils.whenFalseOnce(layerView, "updating", (val) => {//只跑一次
                layerView.queryFeatures().then((results) => {
                    console.log(results);
                    view.goTo(results);
                });
            });
        })
        .otherwise(error => console.warn(error));

    });
