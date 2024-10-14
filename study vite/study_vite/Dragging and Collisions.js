import * as THREE from 'three';
import {renderer,scene,camera,dragObject,controls} from './three_cargo_canvas.js';


 function animate() 
{	
	dragObject();
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	
}

animate()

