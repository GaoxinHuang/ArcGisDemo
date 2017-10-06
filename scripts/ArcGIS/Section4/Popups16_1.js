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
        window.watchUtils = watchUtils;
        window.EsriMap = EsriMap;
        window.MapView = MapView;
        window.FeatureLayer = FeatureLayer;
        window.SimpleMarkerSymbol = SimpleMarkerSymbol;
        window.geometryEngine = geometryEngine;
        window.Query = Query;

        map = new EsriMap({
            basemap: "topo"
        });

        view = new MapView({
            container: "viewDiv",
            center: [-118.244, 34.052],
            zoom: 12,
            map: map
        });


        //1. 添加一个FeatureLayer-> 读取region/state边界, 当popup时,有显示地区 
        layer = new FeatureLayer({
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
            outFields: ["*"],
            popupTemplate: {
                title: "Name: {STATE_NAME}",
                content: "{*}"
            }
        });

        map.add(layer);


        // 2. 显示不同需要的 Field Info, 并且可以编辑不同的format
        // layer = new FeatureLayer({
        //   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
        //   outFields: ["*"],
        //   popupTemplate: {
        //     title: "Name: {STATE_NAME}",
        //     content: [
        //       {
        //         type: "fields",
        //         fieldInfos: [ 
        //           {
        //             fieldName: "POP2000", //获取 field name (在GIS service里)的data
        //             visible: true, //显示可见
        //             label: "Population for year 2000", //希望 field name 展示 label 
        //             format: {
        //               places: 0, //小数点后面0位.
        //               digitSeparator: true //三位数有","分开
        //             }
        //           },
        //           {
        //             fieldName: "POP2007",
        //             visible: true,
        //             label: "Population for year 2007",
        //             format: {
        //               places: 0,
        //               digitSeparator: true
        //             }
        //           }  
        //         ]
        //       }
        //     ]
        //   }
        // });
        // map.add(layer);

        //3. 自定义的FeatureLayer
        // popLayer = new FeatureLayer({
        //   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2",
        //   outFields: ["*"],
        //   popupTemplate: {
        //     title: "Name: {STATE_NAME}",
        //     content: `
        //       <section>
        //         <h4>County Code: {CNTY_FIPS}</h4>
        //         <hr />
        //         <ul>
        //           <li>Year 2000 Pop: {POP2000}</li>
        //           <li>Year 2007 Pop: {POP2007}</li>
        //           <li>Total Households: {HOUSEHOLDS}</li>
        //         </ul>
        //       </section>
        //     `
        //   }
        // });

        // map.add(popLayer);

        //4. 
        layer = new FeatureLayer({
          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
          outFields: ["*"],
          popupTemplate: {
            title: "Name: {STATE_NAME}",
            content: [
              {
                type: "media",
                mediaInfos: [
                    {
                    title: "<b>Population</b>",
                    type: "column-chart", //设置显示模式 是 chart
                    caption: "",
                    value: {
                        theme: "BlueDusk", //换颜色
                        fields: [ "POP2000", "POP2007" ]
                    }
                    }
                ]
              }
            ]
          }
        });

        map.add(layer);
    });










// // media infos


