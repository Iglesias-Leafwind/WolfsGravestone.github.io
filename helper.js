"use strict";

const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();

        // ************************** //
        // Add camera
        // ************************** //
        const width = window.innerWidth;
        const height = window.innerHeight;
        var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
        sceneElements.camera = camera;
        camera.position.set(0, 0, 500);
        // ************************** //
        // Illumination
        // ************************** //

 
        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(0,0,50)', 1);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add point light source (without shadows)
        // ***************************** //

        const light1 = new THREE.DirectionalLight('rgb(19,61,27)');
        light1.position.set(10, 55, 100);
        sceneElements.sceneGraph.add(light1);

        const light2 = new THREE.DirectionalLight('rgb(40,124,55)');
        light2.position.set(10, 55, -100);
        sceneElements.sceneGraph.add(light2);

        const light3 = new THREE.DirectionalLight('rgb(58,186,82)');
        light3.position.set(18, 15, 75);
        sceneElements.sceneGraph.add(light3);

        const light4 = new THREE.DirectionalLight('rgb(58,186,82)');
        light4.position.set(18, 15, -75);
        sceneElements.sceneGraph.add(light4);

        // Setup shadow properties
        light1.castShadow = true;
        light1.shadow.mapSize.width = 2048;
        light1.shadow.mapSize.height = 2048;
        
        light2.castShadow = true;
        light2.shadow.mapSize.width = 2048;
        light2.shadow.mapSize.height = 2048;
        
        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.0);
        renderer.setSize( window.innerWidth, window.innerHeight );
        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Wolfs-Gravestone");
        htmlElement.appendChild(renderer.domElement);
        
        // **************************************** //
        // Add the orbital controls
        // **************************************** //
        sceneElements.control = new THREE.OrbitControls(camera, renderer.domElement);
        sceneElements.control.screenSpacePanning = true;
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};