import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DragControls } from '/node_modules/three/examples/jsm/controls/DragControls.js';
import { any } from 'three/examples/jsm/nodes/Nodes.js';
// import { EffectComposer } from '/node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from '/node_modules/three/examples/jsm/postprocessing/RenderPass.js';
// import { GlitchPass } from '/node_modules/three/examples/jsm/postprocessing/GlitchPass.js';
// import { OutputPass } from '/node_modules/three/examples/jsm/postprocessing/OutputPass.js';
// import { OutlinePass } from '/node_modules/three/examples/jsm/postprocessing/OutlinePass.js';
// import {} from './classes.js';
// DragControls.install({THREE: THREE})



//Intialization scene,camera,plane,renderer
export const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0ecf3 );

export let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(20, 20, 0);

camera.position.x = 7;
camera.position.z = 7;
camera.position.y = 7;


const light = new THREE.DirectionalLight( 0xffffff, 4 );
				light.position.set( 3000, 7000, 10000 ).normalize();
				scene.add( light );

export let renderer = new THREE.WebGLRenderer({canvas: canvas_three});
renderer.setSize( 600, 300 );

//Adding groups for objects and another for pallets.
export const cargo_area_group = new THREE.Group();
export const cargo_group = new THREE.Group();
export const draggable_objects_group = new THREE.Group();
scene.add(draggable_objects_group);
scene.add(cargo_area_group);
scene.add(cargo_group);

//Adding odject to scene.

let boxGeometry = new THREE.BoxGeometry(10, 10, 10);
var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
export let helper = new THREE.Mesh(boxGeometry, cubeMaterial);
// scene.add(helper)


export let colorful_box = new THREE.Mesh(boxGeometry, cubeMaterial);


//Rotation camera with orbit controls.
export let controls = new OrbitControls(camera, canvas_three);
controls.enableDamping = true;
controls.zoomSpeed = 6;
// controls.enabled = false


//Adding drag and drop objets

// let controls2 = new DragControls(cargo_group.children,camera,renderer.domElement);

// controls2.recursive = false
// controls2.addEventListener( 'dragstart', function () { controls.enabled = false; } );
// controls2.addEventListener( 'dragend', function () { controls.enabled = true; } );

// controls2.addEventListener ( 'drag', function( event ){event.object.position.z = Number(event.object.geometry.parameters.height/2);});
// controls2.addEventListener ( 'drag', function( event ){if(event.object.position.x > 10){event.object.position.x = 10}});
	


								//Addinng raycaster for mousr picking objects.	

//3333333333333333333
const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const moveMouse = new THREE.Vector2();   // create once
let  draggable = new THREE.Object3D;

window.addEventListener('click', event => {
	if (draggable) {
		controls.enabled = false
		console.log(`Dropping draggable object`)
	    draggable = null 
		if(!draggable){
			controls.enabled = true
		return;
	}
	}
	
	let canvasBounds = renderer.getContext().canvas.getBoundingClientRect();

	clickMouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
	clickMouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
	// console.log(clickMouse.x)
	
	raycaster.setFromCamera(clickMouse, camera);

	const found = raycaster.intersectObjects(cargo_group.children,false);
	// console.log(found)

	if(found.length>0){
		draggable = found[0].object
		console.log("Found object:",draggable)
		
	}
	})


window.addEventListener('mousemove', event => {

	let canvasBounds2 = renderer.getContext().canvas.getBoundingClientRect();

	moveMouse.x = ( ( event.clientX - canvasBounds2.left ) / ( canvasBounds2.right - canvasBounds2.left ) ) * 2 - 1;
	moveMouse.y = - ( ( event.clientY - canvasBounds2.top ) / ( canvasBounds2.bottom - canvasBounds2.top) ) * 2 + 1;
	
	// console.log(moveMouse.x)
})

function dragObject() {
	if (draggable != null) {
		// controls.enabled = false
		raycaster.setFromCamera(moveMouse, camera);
		const found = raycaster.intersectObjects(cargo_area_group.children)  
		if (found.length > 0) {
			
			for (let o of found) {
				if(!o.object.userData.ground)
				continue
				draggable.position.x = (o.point.x + draggable.scale.x)
				draggable.position.y = o.point.y
	
			}
		}
	}
		
}
	
//
	

export function animate() 
{	
	dragObject();
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	
}
animate();

















// const material_x = new THREE.LineBasicMaterial({color: 'red'});
// const points_x = [new THREE.Vector3( 0, 0, 0 ),new THREE.Vector3( 300, 0, 0 )];
// const geometry_x = new THREE.BufferGeometry().setFromPoints( points_x );
// const line_x = new THREE.Line( geometry_x, material_x );

// const material_y = new THREE.LineBasicMaterial({color: 'green'});
// const points_y = [new THREE.Vector3( 0, 0, 0 ),new THREE.Vector3( 0, 300, 0 )];
// const geometry_y = new THREE.BufferGeometry().setFromPoints( points_y );
// const line_y = new THREE.Line( geometry_y, material_y );

// const material_z = new THREE.LineBasicMaterial({color: 'blue'});
// const points_z = [new THREE.Vector3( 0, 0, 0 ),new THREE.Vector3( 0, 0, 300 )];
// const geometry_z = new THREE.BufferGeometry().setFromPoints( points_z );
// const line_z = new THREE.Line( geometry_z, material_z );

// scene.add( line_x,line_y,line_z);

export let colors = ["aqua","antiquewhite","coral","cornflowerblue","chocolate","azure","beige","bisque","blanchedalmond","blueviolet","brown",]

let random_color_index = Math.floor(Math.random() * colors.length);

// new THREE.Color.NAMES.



// var materials = [
//     leftSide,        // Left side
//     rightSide,       // Right side
//     topSide,         // Top side
//     bottomSide,      // Bottom side
//     frontSide,       // Front side
//     backSide         // Back side
// ];
// var geometry = new THREE.CubeGeometry(100, 75, 8, 1, 1, 1, materials);
// var someMesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());








// npm run build