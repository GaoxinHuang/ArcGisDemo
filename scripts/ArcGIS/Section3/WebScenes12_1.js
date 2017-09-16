//ArcGIS的链接:https://developers.arcgis.com/web-scene-specification/objects/baseMap/
var scene, view;
require([
    "esri/Map",
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/layers/SceneLayer",
    "esri/core/watchUtils"
], function (
    EsriMap,
    WebScene,
    SceneView,
    FeatureLayer, SceneLayer,
    watchUtils
) {
        window.EsriMap = EsriMap;
        window.WebScene = WebScene;
        window.watchUtils = watchUtils;
        window.SceneView = SceneView;
        window.SceneLayer = SceneLayer;



        // 基本的成功了
        view = new SceneView({
            container: "viewDiv"
        });

        scene = new WebScene({
            portalItem: {
                id: "e18d908bacd440f6ab15b75e85f637b4"
            }
        });

        view.map = scene;

        //高级的资源
        // scene2 = new WebScene({
        //     portalItem: {
        //         id: "082c4fd545104f159db39da11ea1e675"
        //     }
        // });
        // view.map=scene2
        //end


        //设置3d影子
        view.environment = {
            lighting: { //可以更新太阳光的照射
                directShadowsEnabled: true,
                date: new Date("Mon May 15 2017 07:00:00 GMT-0700 (Pacific Daylight Time)") //更改时间去改变,建筑阴影
            }
        };


        //修改 View


        losAngelesExtent={
            xmax:-13152599.078930814,
            xmin:-13170064.939893954,
            ymax:4002498.9647571286,
            ymin:3987784.836812252,
            spatialReference:{
                wkid:102100
            }
        }

        map = new Map({
            basemap: "topo",
            layers:
            [
                wellsLyr,
                wellsSurfaceLyr
            ]
        });

        var view = new SceneView({
            container: "viewDiv",
            viewwingMode:"local",
            clippingArea:losAngelesExtent,
            extent:losAngelesExtent,
            constraints:{
                collision:{
                    enabled:false
                },
                title:{
                    
                }
            }
        });

        // sceneLayer = new SceneLayer({
        //   url: "https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/New_York_LoD2_3D_Buildings/SceneServer/layers/0"
        // });


        // map = new Map({
        //     basemap: "topo",
        //     ground: "world-elevation",
        //     layers: [sceneLayer]
        // });




        // {
        //     position: {
        //     x: -8241580,
        //     y: 4964925,
        //     z: 2311,
        //     spatialReference: 3857
        //     },
        //     heading: 32.5,
        //     tilt: 64.9
        // }


    });

