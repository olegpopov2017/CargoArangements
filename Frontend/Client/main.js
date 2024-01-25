import * as THREE from 'three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DragControls } from './node_modules/three/examples/jsm/controls/DragControls.js';
import { Box,Container } from './classes.js';




//Intialization scene,camera,renderer,loader 3d models.
export const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0ecf3 );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.x = 7;
camera.position.y = 7;

var geometry = new THREE.PlaneGeometry( 300,300,3,3);
// geometry.scale(0,0,0)
var material = new THREE.MeshBasicMaterial( {color: 0xaeb9b6} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x= -Math.PI*0.5;
// plane.rotation.y= -Math.PI;

scene.add( plane );

var spotLight = new THREE.SpotLight( 0xffffff );
scene.add( spotLight );

const renderer = new THREE.WebGLRenderer({canvas: canvas_three});
renderer.setSize( 600, 300 );

export const group = new THREE.Group();

//Adding odject to scene.
export const box_three = new THREE.Box3();
box_three.setFromCenterAndSize( new THREE.Vector3( 1, 1, 3 ), new THREE.Vector3( 2, 1, 2 ) );
export const helper = new THREE.Box3Helper( box_three, 0x000000 );


group.add( helper );
scene.add(group);


//Instantiate a loaderr
// const loader = new GLTFLoader();
// loader.load(
// 	// resource URL
// 	'/GLTF_2.0/avocado/Avocado.gltf',
// 	// called when the resource is loaded
// 	function ( gltf ) {
// 		scene.add( gltf.scene );
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 	},
// 	// called while loading is progressing
// 	function ( xhr ) {
// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
// 	},
// 	// called when loading has errors
// 	function ( error ) {
// 		console.log( 'An error happened' );
// 	}
// );



//Adding axis helper.
const axesHelper = new THREE.AxesHelper( 150 );

scene.add( axesHelper );

// //Rotation camera with orbit controls.
const controls = new OrbitControls(camera, canvas_three);
controls.enableDamping = true;
controls.zoomSpeed = 6;

const controls1 = new DragControls( box_three, camera, renderer.domElement );
// controls1.update();

function animate() 
{
	requestAnimationFrame( animate );
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	
	renderer.render( scene, camera );
}


export function delete_from_scene()
{
	scene.remove(helper);
}


animate();

let l = new  Container(null,1,1,1,1,1,1);
let a = new Box(2,2,2,2,2,2);
let b = new Box(3,3,3,3,3,3);
let c = new Box(4,4,4,4,4,4);


l.box_array = {a,b,c};
console.log(l);

l.box_array.a.x = 99;
console.log(l);
