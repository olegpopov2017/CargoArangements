import * as THREE from 'three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DragControls } from './node_modules/three/examples/jsm/controls/DragControls.js';
import {} from './classes.js';



//Intialization scene,camera,plane,renderer
export const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0ecf3 );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

camera.position.x = 7;
camera.position.z = 7;
camera.position.y = 7;

var geometry1 = new THREE.PlaneGeometry( 300,300,3,3);
var material1 = new THREE.MeshBasicMaterial( {color: 0xaeb9b6} );
var plane = new THREE.Mesh( geometry1, material1 );
scene.add( plane );

var spotLight = new THREE.SpotLight( 0xffffff );
scene.add( spotLight );

const renderer = new THREE.WebGLRenderer({canvas: canvas_three});
renderer.setSize( 600, 300 );

//Adding groups for objects and another for pallets.
export const cargo_area_group = new THREE.Group();
export const cargo_group = new THREE.Group();
scene.add(cargo_area_group);
scene.add(cargo_group);


//Adding odject to scene.
const box_three = new THREE.Box3();
export const helper = new THREE.Box3Helper( box_three, 0x000000 );


//Adding axis helper.
const axesHelper = new THREE.AxesHelper( 150 );
scene.add( axesHelper );

//Rotation camera with orbit controls.
const controls = new OrbitControls(camera, canvas_three);
controls.enableDamping = true;
controls.zoomSpeed = 6;


export function animate() 
{	
	
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	
}

animate();

