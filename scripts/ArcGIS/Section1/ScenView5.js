require([ //Import Module path
    "esri/Map",
    "esri/views/SceneView",
    "esri/WebScene"
], function (  //Import Module
    Map,
    SceneView, // Add SceneView for 3D
    WebScene
) {
        //var map = new Map({
        //    basemap: "satellite",
        //    ground: "world-elevation"
        //});
        var map = new WebScene({
            portalItem: {
                id: "e18d908bacd440f6ab15b75e85f637b4" //通常是导入Id的,因为有数据
            }
        });

        var view = new SceneView({
            map: map,
            container: "viewDiv", // html element id
            ui: {
                components: ["zoom", "compass", "attribution"] //设置添加不同的Widget
            }
        });

        view.watch("camera", function (camera) { //当
            //console.log(camera.position.x, camera.position.y);
            //console.log(camera.tilt);
        });

        //setTimeout(function () {
        //    var camera = view.camera.clone();
        //    camera.position = {
        //        x: -118,
        //        y: 34
        //    };
        //    view.goTo(camera);
        //}, 5000);

        //view.then(function () { //通常用这个, 而不用上面的那个
        //    var i = 1;
        //    setTimeout(function () {  //setTimeout是过了一定时候搞, setInterval是每过一段时间转
        //        var camera = view.camera.clone();
        //        camera.position = {
        //            x: camera.position.x+ i,
        //            y: camera.position.y+ i,
        //            z: camera.position.z + i
        //        };
        //        view.goTo(camera);
        //        i+=1;
        //    }, 3000);
        //});
    });