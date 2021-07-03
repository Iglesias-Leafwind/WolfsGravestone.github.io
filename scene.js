"use strict";

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};
var objects = [];
var materials = [];
var rotate = true;
var swing = false;
var remove = false;

//shiny Red material
var diffuse = new THREE.Color(100, 0, 0)
var specular = new THREE.Color(100, 0, 0)
var shiny = 10000000000000.0
var shinyRedMaterial = new THREE.MeshPhongMaterial({ color: diffuse, specular: specular, shininess: shiny });
materials.push(shinyRedMaterial)
//red material
diffuse = new THREE.Color(0.6, 0.0, 0.0)
specular = new THREE.Color(0.8, 0.6, 0.6)
shiny = 32.0
var redPlasticMaterial = new THREE.MeshPhongMaterial({ color: diffuse, specular: specular, shininess: shiny });
materials.push(redPlasticMaterial)
//redder material
diffuse = new THREE.Color(1, 0.0, 0.0)
specular = new THREE.Color(1, 0.6, 0.6)
shiny = 0.8
var redderPlasticMaterial = new THREE.MeshPhongMaterial({ color: diffuse, specular: specular, shininess: shiny });
materials.push(redderPlasticMaterial)
//red brown material
diffuse = new THREE.Color(0.6, 0.2, 0.2)
specular = new THREE.Color(0.63, 0.23, 0.17)
shiny = 12.0
var redBrownPlasticMaterial = new THREE.MeshPhongMaterial({ color: diffuse, specular: specular, shininess: shiny });
materials.push(redBrownPlasticMaterial)
//black material
diffuse = new THREE.Color(0.13, 0.05, 0.01)
specular = new THREE.Color(0.07, 0.01, 0.05)
shiny = 32.0
var blackMaterial = new THREE.MeshPhongMaterial({ color: diffuse, specular: specular, shininess: shiny });
materials.push(blackMaterial)
//Silver
diffuse = new THREE.Color(0.2775, 0.2775, 0.2775)
specular = new THREE.Color(0.773911, 0.773911, 0.773911)
shiny = 89.6
var ironMaterial = new THREE.MeshPhongMaterial({ color: diffuse, specular: specular, shininess: shiny });
materials.push(ironMaterial)
// Functions are called
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Animate
helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

//Textures:
/*
var texture = new THREE.TextureLoader().load("./textures/c4ee301d343a40df89ca666754d799deBig.jpeg");
var bump = new THREE.TextureLoader().load("./textures/fa25f9ebb1bb4fc497099b67dfd8b03cBig.jpeg");
var normal = new THREE.TextureLoader().load("./textures/a6e2f0b5be4e4368bff28ad4ccd117cfBig.jpeg");
var mat = new THREE.MeshStandardMaterial();
redPlasticMaterial.map = texture;
redPlasticMaterial.bumpMap = bump;
redPlasticMaterial.normalMap = normal;
ironMaterial.map = texture;
ironMaterial.bumpMap = bump;
ironMaterial.normalMap = normal;
shinyRedMaterial.map = texture;
shinyRedMaterial.bumpMap = bump;
shinyRedMaterial.normalMap = normal;
redderPlasticMaterial.map = texture;
redderPlasticMaterial.bumpMap = bump;
redderPlasticMaterial.normalMap = normal;
redBrownPlasticMaterial.map = texture;
redBrownPlasticMaterial.bumpMap = bump;
redBrownPlasticMaterial.normalMap = normal;
blackMaterial.map = texture;
blackMaterial.bumpMap = bump;
blackMaterial.normalMap = normal;
*/
// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
    }
}

// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {
    var reflectiveCenter = new THREE.Object3D();
    reflectiveCenter.add(createReflectiveFloor())
    sceneGraph.add(reflectiveCenter)

    createScene(sceneGraph)
    
    
}
function createScene(sceneGraph){
    var sceneCenter = sceneGraph.getObjectByName("centro")
    if(!sceneCenter){
        sceneCenter = new THREE.Object3D();
        sceneCenter.name = "centro";
        sceneGraph.add(sceneCenter);
    }
    sceneCenter.add(createAndCenterSword())
}

function createReflectiveFloor(){
    var plane = new THREE.Reflector( new THREE.CircleBufferGeometry(
        10000, 10000), {
			textureWidth: 1024 * window.devicePixelRatio,
			textureHeight: 1024 * window.devicePixelRatio,
    } );
    plane.rotateX(-3.14/2)
    plane.position.y -= 160
    return plane
}

function createAndCenterSword(){
    var sword = new THREE.Group()
    sword.name = "sword"
    sword.add(createBlade());
    sword.add(createHiltPlusGuard());
    sword.rotateZ(-3.14/6)
    sword.position.x -= 110
    sword.position.y -= 150
    return sword
}

function createHiltPlusGuard(){
    //Hitl and guard group
    var HG = new THREE.Group()

    HG.add(createGuard())

    //center sphere
    var geometry = new THREE.SphereGeometry( 7, 32, 32 );
    var sphere = new THREE.Mesh( geometry, shinyRedMaterial );
    sphere.position.y += 250
    sphere.position.x += 12
    sphere.position.z += 4
    objects.push(sphere)
    HG.add( sphere );

    //front
    //center spikes base
    var geometry = new THREE.BoxGeometry( 1, 2.5, 1 );
    var cube = new THREE.Mesh( geometry, blackMaterial );
    var cube2 = cube.clone()
    var cube3 = cube.clone()
    cube.position.x += 12
    cube.position.y += 243
    cube.position.z += 11
    cube.rotateY(3.14/4)
    objects.push(cube)
    HG.add( cube );
    
    cube2.rotateZ(3.14/2)
    cube2.position.x += 19
    cube2.position.y += 250
    cube2.position.z += 11
    cube2.rotateY(3.14/4)
    objects.push(cube2)
    HG.add( cube2 );
    
    cube3.rotateZ(3.14/2)
    cube3.position.x += 5
    cube3.position.y += 250
    cube3.position.z += 11
    cube3.rotateY(3.14/4)
    objects.push(cube3)
    HG.add( cube3 );

    //center spike spike
    var geometry = new THREE.ConeGeometry( 1.5, 4, 4 );
    var spike = new THREE.Mesh( geometry, blackMaterial );
    var spike2 = spike.clone()
    var spike3 = spike.clone()
    spike.position.x += 12
    spike.position.y += 246
    spike.position.z += 11
    spike.rotateY(3.14/2)
    objects.push(spike)
    HG.add( spike );
    
    
    spike2.rotateZ(3.14/2)
    spike2.position.x += 16
    spike2.position.y += 250
    spike2.position.z += 11
    spike2.rotateY(3.14/2)
    objects.push(spike2)
    HG.add( spike2 );
    
    spike3.rotateZ(-3.14/2)
    spike3.position.x += 8
    spike3.position.y += 250
    spike3.position.z += 11
    spike3.rotateY(3.14/2)
    objects.push(spike3)
    HG.add( spike3 );

    //back
    //center spikes base
    var geometry = new THREE.BoxGeometry( 1, 2.5, 1 );
    var cube = new THREE.Mesh( geometry, blackMaterial );
    var cube2 = cube.clone()
    var cube3 = cube.clone()
    cube.position.x += 12
    cube.position.y += 243
    cube.position.z -= 3
    cube.rotateY(3.14/4)
    objects.push(cube)
    HG.add( cube );
    
    cube2.rotateZ(3.14/2)
    cube2.position.x += 19
    cube2.position.y += 250
    cube2.position.z += 11
    cube2.rotateY(3.14/4)
    objects.push(cube2)
    HG.add( cube2 );
    
    cube3.rotateZ(3.14/2)
    cube3.position.x += 5
    cube3.position.y += 250
    cube3.position.z -= 3
    cube3.rotateY(3.14/4)
    objects.push(cube3)
    HG.add( cube3 );

    //center spike spike
    var geometry = new THREE.ConeGeometry( 1.5, 4, 4 );
    var spike = new THREE.Mesh( geometry, blackMaterial );
    var spike2 = spike.clone()
    var spike3 = spike.clone()
    spike.position.x += 12
    spike.position.y += 246
    spike.position.z -= 3
    spike.rotateY(3.14/2)
    objects.push(spike)
    HG.add( spike );
    
    spike2.rotateZ(3.14/2)
    spike2.position.x += 16
    spike2.position.y += 250
    spike2.position.z -= 3
    spike2.rotateY(3.14/2)
    objects.push(spike2)
    HG.add( spike2 );
    
    spike3.rotateZ(-3.14/2)
    spike3.position.x += 8
    spike3.position.y += 250
    spike3.position.z -= 3
    spike3.rotateY(3.14/2)
    objects.push(spike3)
    HG.add( spike3 );

    HG.add(createHilt())
    return HG
    
}

function createGuard(){
    var Guard = new THREE.Group();
    //guard around center
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,245);
    bladeShape.lineTo(-1,233);
    bladeShape.lineTo(-3,235);
    bladeShape.lineTo(-2,243);
    bladeShape.lineTo(-6,240);
    bladeShape.lineTo(-7,242);
    bladeShape.lineTo(-3,245);
    bladeShape.lineTo(-4,248);
    bladeShape.lineTo(-3,252);
    //pointy things
    bladeShape.lineTo(-19,258);
    bladeShape.lineTo(-15,262);
    //pointy things
    bladeShape.lineTo(-7,259);
    bladeShape.lineTo(0,260);
    bladeShape.lineTo(5,266);
    bladeShape.lineTo(6,269);
    bladeShape.lineTo(7,271);
    bladeShape.lineTo(9,275);
    bladeShape.lineTo(12,280);
    bladeShape.lineTo(12,262);
    bladeShape.lineTo(10,259);
    bladeShape.bezierCurveTo(-1.8,252,5,243,12,242)
    bladeShape.lineTo(12,237);
    bladeShape.bezierCurveTo(9,237,5,239,0,245)
    var extrudeSettings = { depth: 16, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial );
    var mesh2 = mesh.clone()
    mesh.position.z -= 4
    objects.push(mesh)
    Guard.add(mesh);
    mesh2.rotateY(3.14)
    mesh2.position.z += 12
    mesh2.position.x += 24
    objects.push(mesh2)
    Guard.add(mesh2)

    //guard blade connect
        //behind
            //right
            var bladeShape = new THREE.Shape();
            bladeShape.moveTo(9,238)
            bladeShape.lineTo(2,230)
            bladeShape.lineTo(1,231.5)
            bladeShape.lineTo(8,239.5)
            var extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
            var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
            var bl1 = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial );
            var bl2 = bl1.clone()
            var br1 = bl1.clone()
            var br2 = bl1.clone()
            var fl1 = bl1.clone()
            var fl2 = bl1.clone()
            var fr1 = bl1.clone()
            var fr2 = bl1.clone()
            br1.position.z -= 1
            objects.push(br1)
            Guard.add(br1)
            br2.position.z -= 1
            br2.position.y += 1.5
            br2.position.x -= 1.1
            objects.push(br2)
            Guard.add(br2)
            //left
            bl1.rotateY(3.14)
            bl1.position.z = 0
            bl1.position.x += 24
            objects.push(bl1)
            Guard.add(bl1)
            bl2.rotateY(3.14)
            bl2.position.z = 0
            bl2.position.y += 1.5
            bl2.position.x += 25.1
            objects.push(bl2)
            Guard.add(bl2)
        //front
            //left        
            fl1.position.z += 8
            objects.push(fl1)
            Guard.add(fl1)
            fl2.position.z += 8
            fl2.position.y += 1.5
            fl2.position.x -= 1.1
            objects.push(fl2)
            Guard.add(fl2)
            //right
            fr1.rotateY(3.14)
            fr1.position.z += 9
            fr1.position.x += 24
            objects.push(fr1)
            Guard.add(fr1)
            fr2.rotateY(3.14)
            fr2.position.z += 9
            fr2.position.y += 1.5
            fr2.position.x += 25.1
            objects.push(fr2)
            Guard.add(fr2)
    //spike teeth
    var geometry = new THREE.ConeGeometry( 4.5, 15, 6 );
    var tooth1 = new THREE.Mesh( geometry, redderPlasticMaterial );
    var tooth2 = tooth1.clone()
    tooth1.rotateZ(3*3.14/4)
    tooth1.position.z += 4
    tooth1.position.y += 240
    tooth1.position.x -= 3
    objects.push(tooth1)
    Guard.add(tooth1)
    tooth2.rotateZ(-3*3.14/4)
    tooth2.position.z += 4
    tooth2.position.y += 240
    tooth2.position.x += 27
    objects.push(tooth2)
    Guard.add(tooth2)

    //black inside guard
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-7,242);
    bladeShape.lineTo(-14,243);
    bladeShape.lineTo(-14,244);
    bladeShape.lineTo(-16,244);
    bladeShape.lineTo(-14,252);
    bladeShape.lineTo(-3,252);
    bladeShape.lineTo(-4,248);
    bladeShape.lineTo(-3,247);
    bladeShape.lineTo(-9,247);
    bladeShape.lineTo(-8,251);
    bladeShape.lineTo(-10,251);
    bladeShape.lineTo(-11,246);
    bladeShape.lineTo(-10,245);
    bladeShape.lineTo(-3,243);
    bladeShape.lineTo(-7,242);
    var extrudeSettings = { depth: 4, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    var mesh2 = mesh.clone()
    mesh.position.z += 2
    objects.push(mesh)
    Guard.add(mesh)
    mesh2.rotateY(3.14)
    mesh2.position.z += 6
    mesh2.position.x += 24
    objects.push(mesh2)
    Guard.add(mesh2)

    var i = -8
    //Guard black outside left
    var bladeShape = new THREE.Shape();
    //outside lining
    bladeShape.moveTo(-1,250);
    bladeShape.lineTo(-10,250);
    bladeShape.lineTo(-12,248);
    bladeShape.lineTo(-34-i,248);
    bladeShape.lineTo(-38-i,243);
    bladeShape.lineTo(-42-i,250);
    bladeShape.lineTo(-45-i,252);
    bladeShape.lineTo(-42-i,254);
    bladeShape.lineTo(-38-i,261);
    bladeShape.lineTo(-34-i,256);
    bladeShape.lineTo(-12,256);
    bladeShape.lineTo(-10,256);
    bladeShape.lineTo(-1,256);
    //transition
    bladeShape.lineTo(-1,254);
    //inside lining
    bladeShape.lineTo(-10,254);
    bladeShape.lineTo(-12,254);
    bladeShape.lineTo(-34-i,254);
    bladeShape.lineTo(-38-i,259);
    bladeShape.lineTo(-40-i,254);
    bladeShape.lineTo(-43-i,252);
    bladeShape.lineTo(-40-i,250);
    bladeShape.lineTo(-38-i,245);
    bladeShape.lineTo(-34-i,250);
    bladeShape.lineTo(-12,250);
    bladeShape.lineTo(-10,252);
    bladeShape.lineTo(-1,250);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var gbol = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    var gbor = gbol.clone()
    objects.push(gbol)
    Guard.add(gbol)

    //Guard Red inside left
    var bladeShape = new THREE.Shape();
    //outside lining
    bladeShape.moveTo(-1,252);
    bladeShape.lineTo(-10,254);
    bladeShape.lineTo(-12,254);
    bladeShape.lineTo(-34-i,254);
    bladeShape.lineTo(-38-i,259);
    bladeShape.lineTo(-40-i,254);
    bladeShape.lineTo(-43-i,252);
    bladeShape.lineTo(-40-i,250);
    bladeShape.lineTo(-38-i,245);
    bladeShape.lineTo(-34-i,250);
    bladeShape.lineTo(-12,250);
    bladeShape.lineTo(-10,252);
    bladeShape.lineTo(-1,252);
    var extrudeSettings = { depth: 9, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var gril = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    var grir = gril.clone()
    gril.position.z -= 0.5
    objects.push(gril)
    Guard.add(gril)

    //Guard black outside right
    gbor.rotateY(3.14)
    gbor.position.z += 8
    gbor.position.x += 24
    objects.push(gbor)
    Guard.add(gbor)

    //Guard Red inside right
    grir.rotateY(3.14)
    grir.position.z += 8.5
    grir.position.x += 24
    objects.push(grir)
    Guard.add(grir)

    //top guard left
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-14.5,261.5);
    bladeShape.lineTo(-12.5,264);
    bladeShape.lineTo(-7,263);
    bladeShape.lineTo(7,276);
    bladeShape.lineTo(12,276);
    bladeShape.lineTo(12,263);
    bladeShape.lineTo(5,266);
    bladeShape.lineTo(0,260);
    bladeShape.lineTo(-7,259);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var topGl = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    var topGr = topGl.clone()
    objects.push(topGl)
    Guard.add(topGl)
    //top guard right
    topGr.rotateY(3.14)
    topGr.position.z += 8
    topGr.position.x += 24
    objects.push(topGr)
    Guard.add(topGr)

    //top guard red spikes
    var geometry = new THREE.BoxGeometry( 2, 4, 2 );
    var cube1 = new THREE.Mesh( geometry, redBrownPlasticMaterial );
    var cube2 = cube1.clone()
    var cube3 = cube1.clone()
    var cube4 = cube1.clone()

    var geometry = new THREE.ConeGeometry( 2.5, 7, 4 );
    var spike1 = new THREE.Mesh( geometry, redBrownPlasticMaterial );
    var spike2 = spike1.clone()
    var spike3 = spike1.clone()
    var spike4 = spike1.clone()
        //back left
        cube1.rotateZ(3.14/4)
        cube1.rotateY(3.14/4)
        cube1.position.y += 263
        objects.push(cube1)
        Guard.add(cube1)
        spike1.rotateZ(3.14/4)
        spike1.position.x -= 4
        spike1.position.y += 267
        objects.push(spike1)
        Guard.add(spike1)
        //back right
        cube2.rotateZ(-3.14/4)
        cube2.rotateY(-3.14/4)
        cube2.position.x += 24
        cube2.position.y += 263
        objects.push(cube2)
        Guard.add(cube2)
        spike2.rotateZ(-3.14/4)
        spike2.position.x += 28
        spike2.position.y += 267
        objects.push(spike2)
        Guard.add(spike2)
        //front left
        cube3.rotateZ(3.14/4)
        cube3.rotateY(3.14/4)
        cube3.position.y += 263
        cube3.position.z += 8
        objects.push(cube3)
        Guard.add(cube3)
        spike3.rotateZ(3.14/4)
        spike3.position.x -= 4
        spike3.position.y += 267
        spike3.position.z += 8
        objects.push(spike3)
        Guard.add(spike3)
        //front right
        cube4.rotateZ(-3.14/4)
        cube4.rotateY(-3.14/4)
        cube4.position.x += 24
        cube4.position.y += 263
        cube4.position.z += 8
        objects.push(cube4)
        Guard.add(cube4)
        spike4.rotateZ(-3.14/4)
        spike4.position.x += 28
        spike4.position.y += 267
        spike4.position.z += 8
        objects.push(spike4)
        Guard.add(spike4)

    //top guard black spikes
    var geometry = new THREE.BoxGeometry( 2, 4, 2 );
    var cube1 = new THREE.Mesh( geometry, blackMaterial );
    var cube2 = cube1.clone()

    var geometry = new THREE.ConeGeometry( 2.5, 7, 4 );
    var spike1 = new THREE.Mesh( geometry, blackMaterial );
    var spike2 = spike1.clone()
        //left
        cube1.rotateZ(3.14/4)
        cube1.rotateY(3.14/4)
        cube1.position.x -= 4.5
        cube1.position.y += 267.5
        cube1.position.z += 4
        objects.push(cube1)
        Guard.add(cube1)
        spike1.rotateZ(3.14/4)
        spike1.position.x -= 8
        spike1.position.y += 271
        spike1.position.z += 4
        objects.push(spike1)
        Guard.add(spike1)
        //right
        cube2.rotateZ(-3.14/4)
        cube2.rotateY(-3.14/4)
        cube2.position.x += 28.5
        cube2.position.y += 267.5
        cube2.position.z += 4
        objects.push(cube2)
        Guard.add(cube2)
        spike2.rotateZ(-3.14/4)
        spike2.position.x += 32
        spike2.position.y += 271
        spike2.position.z += 4
        objects.push(spike2)
        Guard.add(spike2)
    return Guard
}

function createHilt(){
    var Hilt = new THREE.Group();
    //Top ellipsoid hilt   
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(7,0);
    bladeShape.bezierCurveTo(9.5,3,14.5,3,17,0)
    bladeShape.bezierCurveTo(14.5,-3,9.5,-3,7,0)
    var extrudeSettings = { depth: 3, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var ellipsoid = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    ellipsoid.rotateX(3.14/2)
    ellipsoid.position.z += 4
    ellipsoid.position.y += 279
    objects.push(ellipsoid)
    Hilt.add(ellipsoid)

    //hilt base
    var geometry = new THREE.CylinderGeometry( 2, 2, 5, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 279
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt girth
    var geometry = new THREE.CylinderGeometry( 1.5, 1.5, 67, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 284
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt bot anomaly
    var geometry = new THREE.CylinderGeometry( 2.5, 1.5, 3, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 319
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt top anomaly
    var geometry = new THREE.CylinderGeometry( 1.5, 2.5, 3, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 322
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt bot point base
    var geometry = new THREE.CylinderGeometry( 2, 1.5, 1.5, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 323.5
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt top point base
    var geometry = new THREE.CylinderGeometry( 1.6, 2, 1.5, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 325
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt top red base
    var geometry = new THREE.CylinderGeometry( 1.6, 1.6, 0.2, 64 );
    var cylinder = new THREE.Mesh( geometry, redPlasticMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 325.7
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt girthy line
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-0.06,0);
    bladeShape.lineTo(3.06,0)
    bladeShape.lineTo(3.06,35.6)
    bladeShape.lineTo(4.06,39.5)
    bladeShape.lineTo(3.06,42.5)
    bladeShape.lineTo(-0.06,42.5)
    bladeShape.lineTo(-1.06,39.5)
    bladeShape.lineTo(-0.06,36.5)
    bladeShape.lineTo(-0.06,0)
    var extrudeSettings = { depth: 0.6, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var girth = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial );
    girth.rotateY(3.14/2)
    girth.position.z += 5.51
    girth.position.y += 281
    girth.position.x += 11.7
    objects.push(girth)
    Hilt.add(girth)

    //hilt point outside
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(11,325);
    //left
    bladeShape.lineTo(11,327.5);
    bladeShape.lineTo(10,327.5);
    bladeShape.lineTo(8,326.5);
    bladeShape.lineTo(6,328.5);
    bladeShape.lineTo(8,330.5);
    bladeShape.lineTo(10,329.5);
    bladeShape.lineTo(11,329.5);
    bladeShape.lineTo(11.3,330);
    bladeShape.lineTo(10,332);
    //center
    bladeShape.lineTo(12,336);
    //right
    bladeShape.lineTo(14,332);
    bladeShape.lineTo(12.7,330);
    bladeShape.lineTo(13,329.5);
    bladeShape.lineTo(14,329.5);
    bladeShape.lineTo(16,330.5);
    bladeShape.lineTo(18,328.5);
    bladeShape.lineTo(16,326.5);
    bladeShape.lineTo(14,327.5);
    bladeShape.lineTo(13,327.5);
    //connect 4
    bladeShape.lineTo(13,325);
    var extrudeSettings = { depth: 2.4, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var cross = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    cross.position.z += 2.8
    objects.push(cross)
    Hilt.add(cross)
    //hilt point inside
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(12,325.5);
    //left
    bladeShape.lineTo(11.4,327.8);
    bladeShape.lineTo(9.5,328);
    bladeShape.lineTo(8,327.5);
    bladeShape.lineTo(7,328.5);
    bladeShape.lineTo(8,329.5);
    bladeShape.lineTo(9.5,329);
    bladeShape.lineTo(11.6,329);
    bladeShape.lineTo(11.6,330);
    bladeShape.lineTo(10.6,332);
    //center
    bladeShape.lineTo(12,335);
    //right
    bladeShape.lineTo(13.4,332);
    bladeShape.lineTo(12.4,330);
    bladeShape.lineTo(12.4,329);
    bladeShape.lineTo(14.5,329);
    bladeShape.lineTo(16,329.5);
    bladeShape.lineTo(17,328.5);
    bladeShape.lineTo(16,327.5);
    bladeShape.lineTo(14.5,328);
    bladeShape.lineTo(12.6,327.8);
    //connect 4
    bladeShape.lineTo(12,325.5);
    var extrudeSettings = { depth: 3.4, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var cross = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    cross.position.z += 2.3
    objects.push(cross)
    Hilt.add(cross)
    return Hilt
}

function createBlade() {
    //Creating shape for repeated use
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,0);
    bladeShape.lineTo(24,0);
    bladeShape.lineTo(24,7);
    bladeShape.lineTo(0,7);
    bladeShape.lineTo(0,0);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeEdgeLeftGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var bladeEdgeRightGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    //Creating a Normal block for replicating
    var bladeBlockShape = new THREE.Group()
    //Normal blade block
    var mesh = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    mesh.position.y += 40
    bladeBlockShape.add(mesh);
    //Normal left blade edgge
    var mesh = new THREE.Mesh( bladeEdgeLeftGeo, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 47
    mesh.position.z -= 1
    bladeBlockShape.add(mesh);
    //Normal right blade edgge
    var mesh = new THREE.Mesh( bladeEdgeRightGeo, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.rotation.y = 3.14
    mesh.position.x += 22
    mesh.position.y += 40
    mesh.position.z -= 1
    bladeBlockShape.add(mesh);

    //Full blade group
    var blade = new THREE.Group();
    
    //LEFT BLADE SIDE
    blade.add(leftBlade())

    //RIGHT BLADE SIDE
    blade.add(rightBlade())

    //Join both blade sides

    //Adding length
    for(var i = 1; i<10;i++){
        var normalBlock = bladeBlockShape.clone()
        normalBlock.position.y += 58+7*i
        objects.push(normalBlock)
        blade.add(normalBlock)    
    }

    //Creating blade top
    //spikes 1st row
    var pts = [
        new THREE.Vector3(7, 5.5, 4),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 8),
      new THREE.Vector3(14, 0, 8),
      new THREE.Vector3(14, 0, 0)
    ];
    
    var geom = new THREE.BufferGeometry().setFromPoints(pts);
    geom.setIndex([
        0, 1, 2,
      0, 2, 3, 
      0, 3, 4,
      0, 4, 1,
      1, 3, 2,
      1, 4, 3
    ]);
    geom.computeVertexNormals();
    var mesh = new THREE.Mesh(geom, ironMaterial);
    mesh.rotation.z += 3.14/2
    mesh.position.y += 159
    objects.push(mesh)
    blade.add(mesh);
    var mesh = new THREE.Mesh(geom, ironMaterial);
    mesh.rotation.z -= 3.14/2
    mesh.position.y += 173
    mesh.position.x += 24
    objects.push(mesh)
    blade.add(mesh)

    //sword center
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,168);
    bladeShape.lineTo(0,173);
    bladeShape.bezierCurveTo(3,177,5,181,7,199)
    bladeShape.lineTo(5,205);
    bladeShape.lineTo(5,225);
    bladeShape.lineTo(-1,235);
    bladeShape.lineTo(0,245);
    bladeShape.bezierCurveTo(8,235,16,235,24,245)
    bladeShape.lineTo(25,235);
    bladeShape.lineTo(19,225);
    bladeShape.lineTo(19,205);
    bladeShape.lineTo(17,199);
    bladeShape.bezierCurveTo(21,177,19,181,24,173)
    bladeShape.lineTo(24,168);
    bladeShape.lineTo(0,168);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    
    //curved sides right
    for(var i = 1; i <= 5; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(24,173);
        bladeShape.bezierCurveTo(19+(i/3),181,21+(i/3),177,17+i,199)
        bladeShape.lineTo(20+(i/2),208)
        bladeShape.lineTo(19+(i/2 - 1/2),208)
        bladeShape.lineTo(17+(i-1),199)
        bladeShape.bezierCurveTo(21,177,19,181,24,173)
        var extrudeSettings = { depth: 8-i, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var mesh = new THREE.Mesh( bladeBlockGeo, redderPlasticMaterial );
        mesh.position.z += 0.5*i
        objects.push(mesh)
        blade.add(mesh);
    }
    for(var i = 5; i < 7; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(26,168);
        bladeShape.bezierCurveTo(19+(i/3),181,21+(i/3),177,17+i,199)
        bladeShape.lineTo(20+(i/2),205)
        bladeShape.lineTo(19+(i/2 - 1/2),205)
        bladeShape.lineTo(17+(i-1),199)
        bladeShape.bezierCurveTo(3-(i/3),179,4-(i/3),184,7-i,199)
        bladeShape.lineTo(4-(i/2),205)
        bladeShape.lineTo(5-(i/2 - 1/2),205)
        bladeShape.lineTo(7-(i-1),199)
        bladeShape.bezierCurveTo(21,177,19,181,26,168)
        var extrudeSettings = { depth: 8-i, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var mesh = new THREE.Mesh( bladeBlockGeo, ironMaterial );
        mesh.position.z += 0.5*i
        objects.push(mesh)
        blade.add(mesh);
    }
    //curved sides left
    for(var i = 1; i <= 5; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(0,173);
        bladeShape.bezierCurveTo(3-(i/3),179,4-(i/3),184,7-i,199)
        bladeShape.lineTo(4-(i/2),208)
        bladeShape.lineTo(5-(i/2 - 1/2),208)
        bladeShape.lineTo(7-(i-1),199)
        bladeShape.bezierCurveTo(5,181,3,177,0,173)
        var extrudeSettings = { depth: 8-i, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var mesh = new THREE.Mesh( bladeBlockGeo, redderPlasticMaterial );
        mesh.position.z += 0.5*i
        objects.push(mesh)
        blade.add(mesh);
    }
    for(var i = 5; i < 7; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(-2,168);
        bladeShape.bezierCurveTo(3-(i/3),179,4-(i/3),184,7-i,199)
        bladeShape.lineTo(4-(i/2),205)
        bladeShape.lineTo(5-(i/2 - 1/2),205)
        bladeShape.lineTo(7-(i-1),199)
        bladeShape.bezierCurveTo(5,181,3,177,-2,168)
        var extrudeSettings = { depth: 8-i, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var mesh = new THREE.Mesh( bladeBlockGeo, ironMaterial );
        mesh.position.z += 0.5*i
        objects.push(mesh)
        blade.add(mesh);
    }
    //blade spikes outlines
    var i = 2
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+i,3);
    bladeShape.lineTo(0+i,0);
    bladeShape.bezierCurveTo(1+i,-4,2+i,-7,5,-8)
    bladeShape.lineTo(7,-8)
    bladeShape.bezierCurveTo(10-i,-7,11-i,-4,12-i,0)
    bladeShape.lineTo(11.9-i,3)
    bladeShape.lineTo(12.9-i,3)
    bladeShape.lineTo(13-i,0)
    bladeShape.bezierCurveTo(12-i,-4,11-i,-7,7,-9)
    bladeShape.lineTo(5,-9)
    bladeShape.bezierCurveTo(1+i,-7,0+i,-4,-1+i,0)
    bladeShape.lineTo(-0.9+i,3)
    bladeShape.lineTo(0.1+i,3)
    
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);
    mesh.rotateY(3.14/2)
    mesh.rotateX(-0.75)
    mesh.position.z += 10
    mesh.position.y += 208
    mesh.position.x += 18
    objects.push(mesh)
    blade.add(mesh);

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+i,3);
    bladeShape.lineTo(0+i,0);
    bladeShape.bezierCurveTo(1+i,-4,2+i,-7,5,-8)
    bladeShape.lineTo(7,-8)
    bladeShape.bezierCurveTo(10-i,-7,11-i,-4,12-i,0)
    bladeShape.lineTo(11.9-i,3)
    bladeShape.lineTo(12.9-i,3)
    bladeShape.lineTo(13-i,0)
    bladeShape.bezierCurveTo(12-i,-4,11-i,-7,7,-9)
    bladeShape.lineTo(5,-9)
    bladeShape.bezierCurveTo(1+i,-7,0+i,-4,-1+i,0)
    bladeShape.lineTo(-0.9+i,3)
    bladeShape.lineTo(0.1+i,3)
    
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);
    mesh.rotateY(-3.14/2)
    mesh.rotateX(-0.75)
    mesh.position.z -= 2
    mesh.position.y += 208
    mesh.position.x += 6
    objects.push(mesh)
    blade.add(mesh);
    
    //spikes 2nd row
    var pts = [
      new THREE.Vector3(7, 7.5, 4),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 7),
      new THREE.Vector3(20, 0, 6),
      new THREE.Vector3(20, 0, 2)
    ];
    
    var geom = new THREE.BufferGeometry().setFromPoints(pts);
    geom.setIndex([
        0, 1, 2,
      0, 2, 3, 
      0, 3, 4,
      0, 4, 1,
      1, 3, 2,
      1, 4, 3
    ]);
    geom.computeVertexNormals();
    var mesh = new THREE.Mesh(geom, ironMaterial);
    mesh.rotation.z += 3.14/2
    mesh.rotation.x += 3.14
    mesh.position.x += 4
    mesh.position.y += 218
    mesh.position.z += 8
    objects.push(mesh)
    blade.add(mesh);
    var mesh = new THREE.Mesh(geom, ironMaterial);
    mesh.rotation.z -= 3.14/2
    mesh.position.y += 218
    mesh.position.x += 20
    objects.push(mesh)
    blade.add(mesh)
    //filling the gaps
    //inside
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(5,208);
    bladeShape.lineTo(4,210);
    bladeShape.lineTo(4,240);
    bladeShape.lineTo(5,240);
    bladeShape.lineTo(5,208);
    var extrudeSettings = { depth: 6, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    mesh.position.z += 1
    objects.push(mesh)
    blade.add(mesh);
    var mesh = mesh.clone()
    mesh.rotateY(3.14)
    mesh.position.z += 6
    mesh.position.x += 24
    objects.push(mesh)
    blade.add(mesh)
    //inside outlines
    for(var i = 0; i <= 1; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(2+(i),1);
        bladeShape.bezierCurveTo(3,-4,4,-7,5+(i),-8)
        bladeShape.lineTo(7-(i),-8)
        bladeShape.bezierCurveTo(8,-7,9,-4,10-(i),0)
        bladeShape.lineTo(2+(i),1);
        var extrudeSettings = { depth: 2.4, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var leftbot = new THREE.Mesh( bladeBlockGeo, blackMaterial );
        var rightbot = leftbot.clone()
        var lefttop = rightbot.clone()
        var righttop = lefttop.clone()
        leftbot.rotateY(-3.14/2)
        leftbot.rotateX(-0.75)
        leftbot.position.z -= 2
        leftbot.position.y += 208+2*i
        leftbot.position.x += 6
        objects.push(leftbot)
        blade.add(leftbot)
        rightbot.rotateY(3.14/2)
        rightbot.rotateX(-0.75)
        rightbot.position.z += 10
        rightbot.position.y += 208+2*i
        rightbot.position.x += 18
        objects.push(rightbot)
        blade.add(rightbot);
        lefttop.rotateY(-3.14/2)
        lefttop.rotateX(-2.70)
        lefttop.position.z -= 2
        lefttop.position.y += 212.1-i
        lefttop.position.x += 5-i
        objects.push(lefttop)
        blade.add(lefttop)
        righttop.rotateY(3.14/2)
        righttop.rotateX(-2.70)
        righttop.position.z += 10
        righttop.position.y += 212.1-i
        righttop.position.x += 19+i
        objects.push(righttop)
        blade.add(righttop);
    }
    //spikes outlines 2
    var i = 2
    //right
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+i,3);
    bladeShape.lineTo(0+i,0);
    bladeShape.bezierCurveTo(1+i,-4,2+i,-7,5,-8)
    bladeShape.lineTo(7,-8)
    bladeShape.bezierCurveTo(10-i,-7,11-i,-4,12-i,0)
    bladeShape.lineTo(11.9-i,3)
    bladeShape.lineTo(12.9-i,3)
    bladeShape.lineTo(13-i,0)
    bladeShape.bezierCurveTo(12-i,-4,11-i,-7,7,-9)
    bladeShape.lineTo(5,-9)
    bladeShape.bezierCurveTo(1+i,-7,0+i,-4,-1+i,0)
    bladeShape.lineTo(-0.9+i,3)
    bladeShape.lineTo(0.1+i,3)
    
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);
    mesh.rotateY(3.14/2)
    mesh.rotateX(-2.70)
    mesh.position.z += 10
    mesh.position.y += 212.1
    mesh.position.x += 19
    objects.push(mesh)
    blade.add(mesh);
    //left
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+i,3);
    bladeShape.lineTo(0+i,0);
    bladeShape.bezierCurveTo(1+i,-4,2+i,-7,5,-8)
    bladeShape.lineTo(7,-8)
    bladeShape.bezierCurveTo(10-i,-7,11-i,-4,12-i,0)
    bladeShape.lineTo(11.9-i,3)
    bladeShape.lineTo(12.9-i,3)
    bladeShape.lineTo(13-i,0)
    bladeShape.bezierCurveTo(12-i,-4,11-i,-7,7,-9)
    bladeShape.lineTo(5,-9)
    bladeShape.bezierCurveTo(1+i,-7,0+i,-4,-1+i,0)
    bladeShape.lineTo(-0.9+i,3)
    bladeShape.lineTo(0.1+i,3)
    
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);

    mesh.rotateY(-3.14/2)
    mesh.rotateX(-2.70)
    mesh.position.z -= 2
    mesh.position.y += 212.1
    mesh.position.x += 5
    objects.push(mesh)
    blade.add(mesh);

    //big spike outline
    //rightBot
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+2,3);
    bladeShape.lineTo(0+2,0);
    bladeShape.bezierCurveTo(1+2,-7,2+2,-12,6,-12.5)
    bladeShape.bezierCurveTo(10-2,-12,11-2,-7,12-2,0)
    bladeShape.lineTo(11.9-2,3)
    bladeShape.lineTo(12.9-2,3)
    bladeShape.lineTo(13-2,0)
    bladeShape.bezierCurveTo(12-2,-7,11-2,-12,6,-13.5)
    bladeShape.bezierCurveTo(1+2,-12,0+2,-7,-1+2,0)
    bladeShape.lineTo(-0.9+2,3)
    bladeShape.lineTo(0.1+2,3)
    
    var extrudeSettings = { depth: 2.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);
    var mesh2 = mesh.clone()
    mesh.rotateY(3.14/2)
    mesh.rotateX(-0.8)
    mesh.position.z += 10
    mesh.position.y += 219
    mesh.position.x += 18
    objects.push(mesh)
    blade.add(mesh);
    //leftBot
    var mesh = mesh2.clone()
    mesh.rotateY(-3.14/2)
    mesh.rotateX(-0.8)
    mesh.position.z -= 2
    mesh.position.y += 219
    mesh.position.x += 6
    objects.push(mesh)
    blade.add(mesh);
    //rightTop
    var mesh = mesh2.clone()
    mesh.rotateY(3.14/2)
    mesh.rotateX(-2.66)
    mesh.position.z += 10
    mesh.position.y += 222
    mesh.position.x += 19
    objects.push(mesh)
    blade.add(mesh);
    //leftTop
    var mesh = mesh2
    mesh.rotateY(-3.14/2)
    mesh.rotateX(-2.66)
    mesh.position.z -= 2
    mesh.position.y += 222
    mesh.position.x += 5
    objects.push(mesh)
    blade.add(mesh);
    //big black spikes row 3
    var pts = [
        new THREE.Vector3(7, 8.5, 4),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 7),
        new THREE.Vector3(20, 0, 7),
        new THREE.Vector3(20, 0, 0)
      ];
      
      var geom = new THREE.BufferGeometry().setFromPoints(pts);
      geom.setIndex([
          0, 1, 2,
        0, 2, 3, 
        0, 3, 4,
        0, 4, 1,
        1, 3, 2,
        1, 4, 3
      ]);
      geom.computeVertexNormals();
      //left
      var mesh = new THREE.Mesh(geom, blackMaterial);
      mesh.rotation.z += 3.14/2
      mesh.rotation.x += 3.14
      mesh.position.x += 4
      mesh.position.y += 233
      mesh.position.z += 7.5
      objects.push(mesh)
      blade.add(mesh);
      //right
      var mesh = new THREE.Mesh(geom, blackMaterial);
      mesh.rotation.z -= 3.14/2
      mesh.position.y += 233
      mesh.position.x += 20
      mesh.position.z += 0.5
      objects.push(mesh)
      blade.add(mesh)
    return blade;
}

function rightBlade(){
    //Creating shape for repeated use
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,0);
    bladeShape.lineTo(10,0);
    bladeShape.lineTo(10,7);
    bladeShape.lineTo(0,7);
    bladeShape.lineTo(0,0);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,7);
    bladeShape.lineTo(11,7);
    bladeShape.lineTo(11,14);
    bladeShape.lineTo(10,14);
    bladeShape.lineTo(10,7);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeDetailGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeEdgeGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    
    //Creating a Normal block for replicating
    var bladeBlockShape = new THREE.Group()
    //Normal blade block
    var mesh = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    mesh.position.y += 40
    bladeBlockShape.add(mesh);
    //Normal blade details
    var mesh = new THREE.Mesh( bladeDetailGeo, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y+=33;
    mesh.position.z = mesh.position.z+0.25;
    bladeBlockShape.add(mesh)
    //Normal blade edgge
    var mesh = new THREE.Mesh( bladeEdgeGeo, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 47
    mesh.position.z -= 1
    bladeBlockShape.add(mesh);

    //RIGHT BLADE SIDE
    var blade = new THREE.Group();

    //blade creation
    //right blade Point
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,33);
    bladeShape.lineTo(24,48);
    bladeShape.lineTo(14,48);
    bladeShape.lineTo(14,33);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    
    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    //right Blade Details
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,33);
    bladeShape.lineTo(14,48);
    bladeShape.lineTo(13,48);
    bladeShape.lineTo(13,31.5);
    bladeShape.lineTo(14,33);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    
    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
        
    //right Blade bottom edge
    //triangle1
    var edgeShape = new THREE.Shape();
    edgeShape.moveTo(0,0);
    edgeShape.lineTo(0,9.02);
    edgeShape.lineTo(5.67,9.02);
    edgeShape.lineTo(0,0);

    var extrudeSettings = { depth: 0.1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( edgeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.y += 0.7854
    mesh.position.x += 23.92;
    mesh.position.y += 48;
    mesh.position.z += 7.94;
    objects.push(mesh)
    blade.add(mesh);
    
    //triangle2
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-11.86);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-11.86);
    var extrudeSettings = { depth: 0.1   , bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.rotation.y = 4.29
    mesh.position.x += 23.17
    mesh.position.y += 46.14
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);
    
    
    //triangle3
    var edgeShape = new THREE.Shape();
    edgeShape.moveTo(0,0);
    edgeShape.lineTo(0,9.02);
    edgeShape.lineTo(5.67,9.02);
    edgeShape.lineTo(0,0);

    var extrudeSettings = { depth: 0.1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( edgeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.y -= 0.7854
    mesh.position.x += 24.01;
    mesh.position.y += 48;
    mesh.position.z -= 0.021
    objects.push(mesh)
    blade.add(mesh);
    
    
    //Creating and adding right center 1
    // right Blade center1 details missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,48);
    bladeShape.lineTo(14,50);
    bladeShape.lineTo(13,48);
    bladeShape.lineTo(14,48);

    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
    // right Blade center1 block missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,48);
    bladeShape.lineTo(14,50);
    bladeShape.lineTo(15,52);
    bladeShape.lineTo(16,54);
    bladeShape.lineTo(24,54);
    bladeShape.lineTo(24,48);
    bladeShape.lineTo(14,48);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    // right Blade center1 edge missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.rotation.y = 3.14
    mesh.position.x += 22
    mesh.position.y += 57
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);
    

    //Creating and adding RIGHT center 2
    // right Blade center2 details missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,61);
    bladeShape.lineTo(14,58);
    bladeShape.lineTo(13,60);
    bladeShape.lineTo(13,61);
    bladeShape.lineTo(14,61);

    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
    // right Blade center2 block missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,61);
    bladeShape.lineTo(14,58);
    bladeShape.lineTo(15,56);
    bladeShape.lineTo(16,54);
    bladeShape.lineTo(24,54);
    bladeShape.lineTo(24,61);
    bladeShape.lineTo(14,61);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);

    //adding length
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 21
    normalBlock.position.x += 24
    normalBlock.position.z += 8
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 28
    normalBlock.position.x += 24
    normalBlock.position.z += 8
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 35   
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 42
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 49
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    
    //right blade edge point
    var geometry = new THREE.ConeGeometry( 4, 10, 4); 
    var piramid = new THREE.Mesh(geometry, ironMaterial)
    piramid.position.y += 84
    piramid.position.z += 4
    piramid.position.x += 27
    piramid.rotation.z -= 3.14/2
    objects.push(piramid)
    blade.add(piramid)

    //adding length
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 56
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 58
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    return blade
}

function leftBlade(){
    //Creating shape for repeated use
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,0);
    bladeShape.lineTo(10,0);
    bladeShape.lineTo(10,7);
    bladeShape.lineTo(0,7);
    bladeShape.lineTo(0,0);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,7);
    bladeShape.lineTo(11,7);
    bladeShape.lineTo(11,14);
    bladeShape.lineTo(10,14);
    bladeShape.lineTo(10,7);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeDetailGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeEdgeGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    
    //Creating a Normal block for replicating
    var bladeBlockShape = new THREE.Group()
    //Normal blade block
    var mesh = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    mesh.position.y += 40
    bladeBlockShape.add(mesh);
    //Normal blade details
    var mesh = new THREE.Mesh( bladeDetailGeo, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y+=33;
    mesh.position.z = mesh.position.z+0.25;
    bladeBlockShape.add(mesh)
    //Normal blade edgge
    var mesh = new THREE.Mesh( bladeEdgeGeo, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 47
    mesh.position.z -= 1
    bladeBlockShape.add(mesh);

    //blade creation
    var blade = new THREE.Group();
    //Left blade Point
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,0);
    bladeShape.lineTo(10,18);
    bladeShape.lineTo(10,40);
    bladeShape.lineTo(0,40);
    bladeShape.lineTo(0,0);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    //Left Blade Details
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,18);
    bladeShape.lineTo(11,20);
    bladeShape.lineTo(11,40);
    bladeShape.lineTo(10,40);
    bladeShape.lineTo(10,18);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
    
    //Left Blade edge
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 40, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 40
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);

    
    var normalBlock = bladeBlockShape.clone()
    objects.push(normalBlock)
    blade.add(normalBlock)

    //Creating and adding left center 1
    // Left Blade center1 details missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,47);
    bladeShape.lineTo(11,47);
    bladeShape.lineTo(11,48);
    bladeShape.lineTo(10,50);
    bladeShape.lineTo(10,47);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
    // Left Blade center1 block missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,47);
    bladeShape.lineTo(10,47);
    bladeShape.lineTo(10,50);
    bladeShape.lineTo(9,52);
    bladeShape.lineTo(8,54);
    bladeShape.lineTo(0,54);
    bladeShape.lineTo(0,47);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    // Left Blade center1 edge missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 54
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);
    

    //Creating and adding left center 2
    // Left Blade center2 details missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,58);
    bladeShape.lineTo(11,60);
    bladeShape.lineTo(11,61);
    bladeShape.lineTo(10,61);
    bladeShape.lineTo(10,58);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);

    // Left Blade center2 block missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,54);
    bladeShape.lineTo(8,54);
    bladeShape.lineTo(9,56);
    bladeShape.lineTo(10,58);
    bladeShape.lineTo(10,61);
    bladeShape.lineTo(0,61);
    bladeShape.lineTo(0,54);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    // Left Blade center2 edge missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 61
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);

    //adding length
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 21
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 28
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 35 
    objects.push(normalBlock)   
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 42
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 49
    objects.push(normalBlock)
    blade.add(normalBlock)

    //left blade edge point
    var geometry = new THREE.ConeGeometry( 4, 10, 4); 
    var piramid = new THREE.Mesh(geometry, ironMaterial)
    piramid.position.y += 84
    piramid.position.z += 4
    piramid.position.x -= 3
    piramid.rotation.z += 3.14/2
    objects.push(piramid)
    blade.add(piramid)

    //adding length
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 56
    objects.push(normalBlock)
    blade.add(normalBlock)
    
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 58
    objects.push(normalBlock)
    blade.add(normalBlock)
    return blade
}

function createSnowFlake(){
    //shiny Red material
    var diffuse = new THREE.Color(35, 8, 0)
    var specular = new THREE.Color(193, 35, 96)
    var shiny = 0
    var snowMaterial = new THREE.MeshPhongMaterial({ color: diffuse, specular: specular, shininess: shiny });

    var snowflakePart = new THREE.Group()
    var snowflake = new THREE.Group()
    var rightFlake = new THREE.Shape();
    rightFlake.moveTo(0,0);
    rightFlake.lineTo(3,-5);
    rightFlake.lineTo(1,-8);
    rightFlake.lineTo(1,-10);
    rightFlake.lineTo(5,-11);
    rightFlake.lineTo(5.5,-11.5);
    rightFlake.lineTo(5.25,-12);
    rightFlake.lineTo(1,-11);
    rightFlake.lineTo(1,-16);
    rightFlake.lineTo(1,-18);
    rightFlake.lineTo(8,-10);
    rightFlake.lineTo(8.5,-9.8);
    rightFlake.lineTo(8.25,-10.2);
    rightFlake.lineTo(1,-19);
    rightFlake.lineTo(1,-22);
    rightFlake.lineTo(3,-20);
    rightFlake.lineTo(3.5,-19.8);
    rightFlake.lineTo(3.25,-20.2);
    rightFlake.lineTo(1,-23);
    rightFlake.lineTo(1,-24);
    rightFlake.lineTo(3,-26);
    rightFlake.lineTo(0,-30);
    var extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var snowflackeGEo = new THREE.ExtrudeGeometry( rightFlake, extrudeSettings );
    var right = new THREE.Mesh( snowflackeGEo, snowMaterial );
    var left = right.clone()
    left.rotateY(3.14)
    left.position.z += 1
    snowflakePart.add(right)
    snowflakePart.add(left)
    snowflake.add(snowflakePart)
    for(var rotate = 0; rotate < 6; rotate++){
        snowflakePart = snowflakePart.clone()
        snowflakePart.rotateZ(3.14/3)  
        snowflake.add(snowflakePart)  
    }
    snowflake.scale.x = 0.1
    snowflake.scale.y = 0.1
    snowflake.scale.z = 0.1
    return snowflake
}

var xS,yS,zS = 0.0
var sVelx,sVely,sVelz = 1.0
function swingSword(){
    if(rotate){
        rotationSwitch()
    }
    var srd = sceneElements.sceneGraph.getObjectByName("sword");
    if(!swing){
        srd.position.x += 110
        srd.position.y += 150
        srd.rotateZ(3.14/6)
        srd.rotateZ(3.14)
        swingSwitch()
        srd.position.x = 12.5
        srd.position.y = 305
        srd.position.z = -4
        xS = Math.random()*2.02 - 1.01
        yS = Math.random()*2.02 - 1.01
        zS = Math.random()*2.02 - 1.01
        sVelx = Math.random()*3.01 + 4.0
        sVely = Math.random()*3.01 + 4.0
        sVelz = Math.random()*3.01 + 4.0
    }
}

function swingSwitch(){
    if(swing){
        swing = false
    }else{
        swing = true
    }
}

function rotationSwitch(){
    if(rotate || swing){
        rotate = false
    }else{
        rotate = true
    }
}

function removeSwitch(){
    if(remove){
        remove = false
    }else{
        remove = true
    }
}
function changeColor(){
    var indx = 0;
    switch(document.getElementById("object").value) {
        case "orb":
            indx = 0
            break;
        case "blade":
            indx = 1
            break;
        case "RedBladeSidesGuardClaws":
            indx = 2
            break;
        case "guardCover":
            indx = 3
            break;
        case "guardInsides":
            indx = 4
            break;
        case "bladeSides":
            indx = 5
            break;
    }
    materials[indx].diffuse = new THREE.Color(document.getElementById("diffR").value,document.getElementById("diffG").value,document.getElementById("diffB").value)
    materials[indx].specular = new THREE.Color(document.getElementById("specR").value,document.getElementById("specG").value,document.getElementById("specB").value)
    materials[indx].shininess = document.getElementById("shiny").value
}
// Displacement value
var delta = 1.0;
var vel = 0.005;
var velCenter = 0.005;
var cmX = 10
var cmY = 10
var cmZ = 0
var cameralookingat = new THREE.Vector3(); // create once and reuse it!
var ctr = sceneElements.sceneGraph.getObjectByName("centro");
var camera = sceneElements.camera;
var i = 0
var srd = sceneElements.sceneGraph.getObjectByName("sword");
//removing later on
var removing = []
function breakSword(){
    if(swing){
        
    }else{
        if(rotate){
            rotationSwitch()
        }
        ctr.rotation.x = 0
        ctr.rotation.y = 0
        ctr.rotation.z = 0
        var midObj = Math.floor(Math.random() * objects.length); // 0 - 441
        var around = Math.floor(Math.random() * 6 + 5) // 5 - 10
        for(var i = -around;i <= around;i++ ){
            if(objects.length == 0){
                break
            }
            if(midObj + i < 0 || midObj + i > objects.length-1){
                continue
            }
            removing.push({obj:objects[midObj+i], xVel:Math.random()*4.02 - 2.01, yVel:Math.random()*0.31, zVel:Math.random()*4.02-2.01})
            objects.splice(midObj+i, 1);
            midObj = midObj-1
        }
        if(!remove){
            removeSwitch()
            srd.rotateZ(+3.14/6)
            srd.position.x += 100
        }  
    }
}
function reset(){
    location.reload()
}

function unbreak(){
    if(remove || swing){
        
    }else{
        if(rotate){
            rotationSwitch()
        }
        ctr.rotation.x = 0
        ctr.rotation.y = 0
        ctr.rotation.z = 0
        for(var indx = 0; indx < objects.length; indx++){
            var obj_dic = objects[indx]
            obj_dic.parent.remove(obj_dic)
        }
        objects = []
        ctr.clear()
        ctr.rotation.x = 0
        ctr.rotation.y = 0
        ctr.rotation.z = 0
        ctr.position.x = 0
        ctr.position.y = 0
        ctr.position.z = 0
        createScene(sceneElements.sceneGraph)
        srd = sceneElements.sceneGraph.getObjectByName("sword");
        if(!rotate){
            rotationSwitch()
        }
    }

}
var snowflakes = []
function computeFrame(time) {
    if(snowflakes.length <= 120){
    	snowflakes.push({obj:createSnowFlake(), xVel:Math.random()*1000 - 500, zVel:Math.random()*1000 - 500})
    	snowflakes[snowflakes.length-1]["obj"].position.y += 240
    	sceneElements.sceneGraph.add(snowflakes[snowflakes.length-1]["obj"])
    }
    for(var indx = 0; indx < snowflakes.length; indx++){
        var curr = snowflakes[indx]["obj"]
        curr.position.y -= 1
        curr.position.x = (snowflakes[indx]["xVel"])*Math.sin(curr.position.y/(8*3.14))
        curr.position.z = (snowflakes[indx]["zVel"])*Math.cos(curr.position.y/(8*3.14))
        curr.rotateX(snowflakes[indx]["xVel"])
        curr.rotateY(snowflakes[indx]["xVel"]+snowflakes[indx]["zVel"])
        curr.rotateZ(snowflakes[indx]["zVel"])
        if(curr.position.y <= -155){
            sceneElements.sceneGraph.remove(curr)
        }
    }
    
    camera.getWorldDirection( cameralookingat );
    if(keyD){
        cmX += 1
    }
    if(keyS){
        cmY -= 1
    }
    if(keyA){
        cmX -= 1
    }
    if(keyW){
        cmY += 1
    }
    camera.lookAt(cmX,cmY,cmZ)

    if (rotate && ctr != undefined){    
        ctr.rotation.y += velCenter
    }
    if(swing){
        i++
        srd.position.x -= 12.5
        srd.position.y -= 305
        srd.position.z -= -4
        
        ctr.rotation.x += velCenter*sVelx *xS
        ctr.rotation.y += velCenter*sVely *yS
        ctr.rotation.z += velCenter*sVelz *zS
        
        srd.position.x += 12.5
        srd.position.y += 305
        srd.position.z += -4
        if(i > 60){
            ctr.rotation.x = 0
            ctr.rotation.y = 0
            ctr.rotation.z = 0
            srd.position.x = 0
            srd.position.y = 0
            srd.position.z = 0
            srd.rotateZ(-3.14)
            srd.rotateZ(-3.14/6)
            srd.position.x -= 110
            srd.position.y -= 150
            swingSwitch()
            rotationSwitch()
            i = 0;
        }
    }
    if(remove){
        for(var indx = 0; indx < removing.length; indx++){
            var obj_dic = removing[indx]
            obj_dic["obj"].position.x += obj_dic["xVel"]
            obj_dic["obj"].translateY(-(200/(i+obj_dic["yVel"]))*Math.sin((i*obj_dic["yVel"])/3.14)-1)
            //obj_dic["obj"].position.y += -10*Math.sin((i*obj_dic["yVel"])/3.14)
            obj_dic["obj"].position.z += obj_dic["zVel"]
            i++;
        }
        if(i > 200*removing.length){
            for(var indx = 0; indx < removing.length; indx++){
                var obj_dic = removing[indx]
                obj_dic["obj"].parent.remove(obj_dic["obj"])
            }
            removing = []
            i = 0
            rotationSwitch()
            removeSwitch()
            srd.position.x += -100
            srd.rotateZ(-3.14/6)
        }
    }
    if(objects.length == 0 && i == 0 && removing.length == 0){
        if(remove){
            removeSwitch()
        }
    }
    // Rendering
    helper.render(sceneElements);
    //camera control
    sceneElements.control.update();
    // Call for the next frame
    requestAnimationFrame(computeFrame);
}