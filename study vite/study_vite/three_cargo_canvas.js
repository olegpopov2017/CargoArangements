import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls';


//Intialization scene,camera,plane,renderer
	export let scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xf0ecf3 );

	export let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000 );

		camera.position.x = 7;
		camera.position.z = 7;
		camera.position.y = 7;

	const light = new THREE.AmbientLight( 0xffffbb, 0x080820, 1 )
		light.position.set( 30, 30, 30 ).normalize();
		scene.add( light );
	
	export let renderer = new THREE.WebGLRenderer({canvas: canvas_three});
		renderer.setSize( 600, 300 );
	
	//Adding groups for objects and another for pallets.
	export let cargo_area_group = new THREE.Group();
	export let cargo_group = new THREE.Group();
	export let group_of_cargo_area_floor = new THREE.Group();

	scene.add(cargo_area_group);
	scene.add(cargo_group);
	scene.add(group_of_cargo_area_floor)
	
	//Rotation camera with orbit controls.
	export let controls = new OrbitControls(camera, canvas_three);
	controls.enableDamping = true;
	controls.zoomSpeed = 6;
	


export let colors = ["aqua","antiquewhite","coral","cornflowerblue","chocolate","azure","beige","bisque","blanchedalmond","blueviolet","brown",]


// npm run build
// npm run preview