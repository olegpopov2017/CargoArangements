import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from '/node_modules/three/examples/jsm/loaders/FontLoader.js';
import { TextureLoader } from '/node_modules/three/src/loaders/TextureLoader.js';

import { DragControls } from '/node_modules/three/examples/jsm/controls/DragControls.js';
import { TextGeometry } from '/node_modules/three/examples/jsm/geometries/TextGeometry.js';
import { CSS3DRenderer, CSS3DObject } from '/node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';
// import { any } from 'three/examples/jsm/nodes/Nodes.js';
// import { EffectComposer } from '/node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from '/node_modules/three/examples/jsm/postprocessing/RenderPass.js';
// import { GlitchPass } from '/node_modules/three/examples/jsm/postprocessing/GlitchPass.js';
// import { OutputPass } from '/node_modules/three/examples/jsm/postprocessing/OutputPass.js';
// import { OutlinePass } from '/node_modules/three/examples/jsm/postprocessing/OutlinePass.js';
// import {} from './classes.js';
// DragControls.install({THREE: THREE})

// const textureLoader = new THREE.TextureLoader();
// export const texture = textureLoader.load('./image/conteiner_side.jpg',
//   (texture) => {
//     // Успешная загрузка
//     console.log('Texture loaded successfully');
// 	console.log(texture)
//   },undefined,
//   (error) => {
//     // Ошибка загрузки
//     console.error('An error occurred while loading the texture:', error);
//   })

//Intialization scene,camera,plane,renderer
	export const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf0ecf3 );

	export let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// camera.position.set(0, 50, 0);
	// camera.up.set(0, 0, 1);
	// camera.lookAt(20, 20, 0);

	camera.position.x = 7;
	camera.position.z = 7;
	camera.position.y = 7;


	// const light = new THREE.DirectionalLight( 0xffffff, 4 );
	const light = new THREE.DirectionalLight( 0xffffbb, 0x080820, 1 )
					light.position.set( 30, 30, 30 ).normalize();
					scene.add( light );

	export let renderer = new THREE.WebGLRenderer({canvas: canvas_three});
	renderer.setSize( 600, 300 );

//Adding groups for objects and another for pallets.
	export const cargo_area_group = new THREE.Group();
	export const cargo_group = new THREE.Group();
	export const intersected_objects_group = new THREE.Group();
	export let group_of_grounds_for_draggable_objects = new THREE.Group();
	scene.add(intersected_objects_group);
	scene.add(cargo_area_group);
	scene.add(cargo_group);
	scene.add(group_of_grounds_for_draggable_objects);

//Rotation camera with orbit controls.
	export let controls = new OrbitControls(camera, canvas_three);
	controls.enableDamping = true;
	controls.zoomSpeed = 6;
	// controls.enabled = false

//Adding drag and drop objets from "controls"(not a raycasting)

	// let controls2 = new DragControls(cargo_group.children,camera,renderer.domElement);

	// controls2.recursive = false
	// controls2.addEventListener( 'dragstart', function () { controls.enabled = false; } );
	// controls2.addEventListener( 'dragend', function () { controls.enabled = true; } );

	// controls2.addEventListener ( 'drag', function( event ){event.object.position.z = Number(event.object.geometry.parameters.height/2);});
	// controls2.addEventListener ( 'drag', function( event ){if(event.object.position.x > 10){event.object.position.x = 10}});
	


//Addinng raycaster for mouse picking objects.	

	const raycaster = new THREE.Raycaster(); // create once
	const clickMouse = new THREE.Vector2();  // create once
	const moveMouse = new THREE.Vector2();   // create once
	let  draggable_cargo = null;
	// scene.add(draggable_cargo)
	
	
	//Realtime catching object after mouse clicking on canvas and save values in variable "draggable"
	window.addEventListener('click', event => {
		
		// if (typeof(draggable_cargo) != "undefined") 
		if (draggable_cargo) 

		{
			controls.enabled = false
			console.log(`Dropping draggable object`)
			draggable_cargo.material.opacity = 1
			draggable_cargo.material.transparent = false
			draggable_cargo.children[0].material.color.set("black")
			
			console.log(draggable_cargo)
			draggable_cargo.removeFromParent()		//Need for jumping cargos after mouse moving  and intersect mouse with other object
			cargo_group.add(draggable_cargo)		//Need for jumping cargos after mouse moving  and intersect mouse with other object
			
			
			draggable_cargo = null 
			
			if(!draggable_cargo)	
				{
					controls.enabled = true
					return;
				}
		}
		
		//Founding ClickMouse position and set this parameters to variable "raycaster"
			let canvasBounds = renderer.getContext().canvas.getBoundingClientRect();	
			clickMouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
			clickMouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
					
		//Create array "found" from interection raycast and cargos. Set value from first element of array to variable "draggable".Replace draggable from "cargo_group" to scene.
			raycaster.setFromCamera(clickMouse, camera);
			const found = raycaster.intersectObjects(cargo_group.children,false);
			
			if(found.length>0 && found[0].object.userData.isFloor == false)
			{
				draggable_cargo = found[0].object
				console.log("Found object:",draggable_cargo)
				draggable_cargo.userData.intersecteble = false
				
				draggable_cargo.removeFromParent()			//Need for jumping cargos after mouse moving  and intersect mouse with other object
				
				draggable_cargo.material.opacity = 0.2
				draggable_cargo.material.transparent = true
				draggable_cargo.children[0].material.color.set("GREEN")
				
				// console.log(draggable_cargo)
				scene.add(draggable_cargo)					//Need for jumping cargos after mouse moving  and intersect mouse with other object
				// animate()
			}
			}
	)

	//Realtime record mouse position to variable "moveMouse"
	window.addEventListener('mousemove', event => {

		let canvasBounds2 = renderer.getContext().canvas.getBoundingClientRect();
		moveMouse.x = ( ( event.clientX - canvasBounds2.left ) / ( canvasBounds2.right - canvasBounds2.left ) ) * 2 - 1;
		moveMouse.y = - ( ( event.clientY - canvasBounds2.top ) / ( canvasBounds2.bottom - canvasBounds2.top) ) * 2 + 1;
		
	}
	)

	function dragObject() {
		
	//Use for cargos jumping 
	
		raycaster.setFromCamera(moveMouse, camera);
		
		if (draggable_cargo != null) {
			const cargos_on_ray = raycaster.intersectObjects(cargo_group.children,false)
				
			if (cargos_on_ray.length > 0) {

				let found = cargos_on_ray[0]
					
					console.log(found)

					//Condition for cargo moving only upper faces(upper faces consist of two triangles with numbers 4 and 5).
					if(found.faceIndex == 4 || found.faceIndex == 5){		
						
						if(found.point.x <= Number(draggable_cargo.geometry.parameters.width)/2)     											//MIN X axis limitation draggable
							{draggable_cargo.position.x = Number(draggable_cargo.geometry.parameters.width)/2}
						else if(found.point.x+Number(draggable_cargo.geometry.parameters.width)/2 >= cargo_area_group.children[0].scale.x*2)  	//MAX X axis limitation draggable
							{draggable_cargo.position.x = cargo_area_group.children[0].scale.x*2-Number(draggable_cargo.geometry.parameters.width)/2}
						else {draggable_cargo.position.x = found.point.x}
						
						if(found.point.z <= Number(draggable_cargo.geometry.parameters.depth)/2)     											//MIN Z axis limitation draggable
							{draggable_cargo.position.z = Number(draggable_cargo.geometry.parameters.depth)/2}
						else if(found.point.z+Number(draggable_cargo.geometry.parameters.depth)/2 >= cargo_area_group.children[0].scale.z*2)  	//MAX Z axis limitation draggable
							{draggable_cargo.position.z = cargo_area_group.children[0].scale.z*2-Number(draggable_cargo.geometry.parameters.depth)/2}
						else {draggable_cargo.position.z = found.point.z}
						
						draggable_cargo.position.y = found.point.y+Number(draggable_cargo.geometry.parameters.height)/2					//Set Y position of dragable object.		
					}
				
			}
		}
			
	}
	



export function animate() 
{	
	dragObject();
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	
}
animate();



export let colors = ["aqua","antiquewhite","coral","cornflowerblue","chocolate","azure","beige","bisque","blanchedalmond","blueviolet","brown",]


// npm run build