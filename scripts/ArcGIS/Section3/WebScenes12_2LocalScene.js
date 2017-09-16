//用于3D的地下数据
require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/ObjectSymbol3DLayer",
    "esri/symbols/IconSymbol3DLayer",
    "esri/symbols/PointSymbol3D",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/Home",
    "dojo/domReady!"
  ], function(Map, SceneView, FeatureLayer,
    SimpleRenderer, ObjectSymbol3DLayer,
    IconSymbol3DLayer, PointSymbol3D, QueryTask, Query, Home
  ) {
  
    var wellsUrl = "http://services.arcgis.com/jDGuO8tYggdCCnUJ/arcgis/rest/services/CA%20Class%20II%20Injection%20Wells/FeatureServer/6";
    var statesUrl = "http://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Counties/FeatureServer/0";
  
    var wellsTemplate = {
      title: "WELL",
      content: "<b>API No.:</b> {API_NUMBER}<br>" +
        "<b>Lease: </b> {LEASE}<br>" +
        "<b>Operator: </b> {CURR_OPERATOR} km<br>" +
        "<b>Drilled: </b> {SPUD}<br>" +
        "<b>Completed: </b> {COMPLETION}<br>" +
        "<b>Status: </b> {STATUS2}<br>" +
        "<b>Depth: </b> {DEPTH} meters<br>",
      fieldInfos: [{
        fieldName: "SPUD",
        format: {
          dateFormat: "short-date"
        }
      }, {
        fieldName: "COMPLETION",
        format: {
          dateFormat: "short-date"
        }
      }, {
        fieldName: "DEPTH",
        format: {
          places: 0,
          digitSeparator: true
        }
      }]
    };
  
    var wellsSurfaceRenderer = new SimpleRenderer({
      symbol: new PointSymbol3D({
        symbolLayers: [new IconSymbol3DLayer({
          material: {
            color: "#785226"
          },
          resource: {
            primitive: "x"
          },
          size: 4
        })]
      })
    });
  
    var wellsDepthRenderer = new SimpleRenderer({
      symbol: new PointSymbol3D({
        symbolLayers: [new ObjectSymbol3DLayer({
          resource: {
            primitive: "cylinder"
          },
          width: 50
        })]
      }),
      visualVariables: [
      {
        type: "size",
        field: "WellDepthA",
        axis: "height",
        stops: [
        {
          value: 1,
          size: -0.3048
        },
        {
          value: 10000,
          size: -3048
        }]
      }, {
        type: "size",
        axis: "width",
        useSymbolValue: true
      }
      ]
    });
  
    var statesLyr = new FeatureLayer({
      url: statesUrl,
      definitionExpression: "NAME = 'Los Angeles'",
      outFields: ["*"],
      elevationInfo: {
        mode: "on-the-ground"
      }
    });
  
    var wellsLyr = new FeatureLayer({
      url: wellsUrl,
      definitionExpression: "WellDepthA > 0",
      outFields: ["*"],
      popupTemplate: {
        title: "Well",
        content: "{*}"
      },
      renderer: wellsDepthRenderer,
      elevationInfo: {
        mode: "relative-to-ground",
        offset: -100
      }
    });
  
    var wellsSurfaceLyr = new FeatureLayer({
      url: wellsUrl,
      definitionExpression: "WellDepthA > 0",
      outFields: ["*"],
      popupTemplate: {
        title: "Well",
        content: "{*}"
      },
      renderer: wellsSurfaceRenderer,
      elevationInfo: {
        mode: "on-the-ground"
      }
    });
  
    var losAngelesExtent = {
      xmax: -13152599.078930814,
      xmin: -13170064.939893954,
      ymax: 4002498.9647571286,
      ymin: 3987784.836812252,
      spatialReference: {
        wkid: 102100
      }
    };
  
    var map = new Map({
      basemap: "topo",
      layers: [
        wellsLyr,
        wellsSurfaceLyr
      ]
    });
  
    var view = new SceneView({
      container: "viewDiv",
      map: map,
      viewingMode: "local",
      clippingArea: losAngelesExtent,
      extent: losAngelesExtent,
      constraints: {
        collision: {
          enabled: false
        },
        tilt: {
          max: 179.99
        }
      },
      environment: {
        atmosphere: null,
        starsEnabled: false
      }
    });
  
    var wellsQTask = new QueryTask({
      url: wellsUrl
    });
  
    var homeBtn = new Home({
      view: view
    }, "homeDiv");
    homeBtn.startup();
  });