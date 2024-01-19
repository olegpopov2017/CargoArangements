import * as THREE from 'three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DragControls } from './node_modules/three/examples/jsm/controls/DragControls.js';

//Intialization scene,camera,renderer,loader 3d models.
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0ecf3 );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 7;

const geometry = new THREE.PlaneGeometry( 10,10);
geometry.rotateX(-Math.PI * 2);
const material = new THREE.MeshBasicMaterial( {color: 0xaeb9b6, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

var spotLight = new THREE.SpotLight( 0xffffff );
scene.add( spotLight );

const renderer = new THREE.WebGLRenderer({canvas: canvas_three});
renderer.setSize( 600, 300 );


//Adding odject to scene.
const box = new THREE.Box3();
box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 3 ), new THREE.Vector3( 2, 1, 2 ) );
const helper = new THREE.Box3Helper( box, 0x000000 );
scene.add( helper );


//Instantiate a loader
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
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// //Rotation camera with orbit controls.
const controls = new OrbitControls(camera, canvas_three);
controls.enableDamping = true;
controls.zoomSpeed = 6;

const controls1 = new DragControls( box, camera, renderer.domElement );
// controls1.update();

function animate() 
{
	requestAnimationFrame( animate );
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	// controls1.update();

	renderer.render( scene, camera );
}
	
animate();

