require([
    "esri/Map",
    "esri/Graphic",
    "esri/core/Accessor",
    "esri/views/MapView",
    "esri/geometry/Point",
    "esri/geometry/geometryEngine",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol"
], function (
    EsriMap,
    Graphic,
    Accessor,
    MapView,
    Point, geometryEngine,
    SimpleMarkerSymbol, SimpleFillSymbol
) {
        window.Graphic = Graphic;
        window.Accessor = Accessor;
        window.Point = Point;
        window.geometryEngine = geometryEngine;

        window.marker = marker = new SimpleMarkerSymbol({
            color: [0, 197, 255, 1]
        });

        window.fill = new SimpleFillSymbol();

        const map = new EsriMap({
            basemap: "topo"
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

        window.view = view;

        //1. 基本模式, 做完后, 没有任何改变.  
        // const Model = Accessor.createSubclass({
        //     properties: {
        //         feature: Graphic,
        //     }
        // });
        // let model = new Model();
        // model.feature = {
        //     symbol: marker,
        //     geometry: new Point([-118.174, 34.024]),
        //     attributes: {
        //         name: "Charlie"
        //     },
        //     popupTemplate: {
        //         title: "My Marker",
        //         content: "{*}"
        //     }

        // } 

        //2. 做一个自定替换的feature 在model
        // // autocasting
        // const Model = Accessor.createSubclass({
        //     properties: {
        //         feature: Graphic
        //     }
        // });

        // let model = new Model();

        // // 如果mode的feature改变了, 比如添加了新的， 就会移除老的, 换上新的
        // model.watch("feature", (feature, oldFeature) => {
        //     view.graphics.remove(oldFeature);
        //     view.graphics.add(feature);
        // });



        // model.feature = {
        //     symbol: marker,
        //     geometry: new Point([-118.174, 34.024]),
        //     attributes: {
        //         name: "Charlie"
        //     },
        //     popupTemplate: {
        //         title: "My Marker",
        //         content: "{*}"
        //     }
        // };

        //  3. 做一个模型会跟着feature改变而改变
        //  const Model = Accessor.createSubclass({
        //     properties: {
        //         feature: Graphic,
        //         name: {
        //             dependsOn: ["feature"], //name会根据 feature改变而改变
        //             get() {
        //                 if (this.feature) {
        //                     return this.feature.attributes.name;
        //                 }
        //                 else {
        //                     return "Unknown"
        //                 }
        //             }
        //         }
        //     }
        // });
        // let model = new Model();
        // model.watch("name", (name) => {
        //     console.log(name);
        // });

        //  4. read-only
        // const Model = Accessor.createSubclass({
        //   properties: {
        //     name: {
        //         value: "Barry",
        //         readOnly: true //设置为true， 就不能改变, 改变就会报错
        //     }
        //   }
        // });
        // let model = new Model();
    });


