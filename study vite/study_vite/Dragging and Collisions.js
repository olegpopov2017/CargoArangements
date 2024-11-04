import * as THREE from 'three';
import {renderer,scene,camera,controls,cargo_group,cargo_area_group,group_of_cargo_area_floor} from './three_cargo_canvas.js';
import{updateTable,testfunc} from './Table_of_cargo_parameters.js'


//////////// Raycaster mouse moving cargos and Check the collisions of draggable cargo and other cargos. If collision is detected,cargo come back to start position.

	let raycaster = new THREE.Raycaster(); 	// Create once for dragging cargos
	let moveMouse = new THREE.Vector2();   	// Create once for dragging cargo according mouse position
	let clickMouse = new THREE.Vector2();  // create once
	export let draggable_cargo = null;			//Variable that containe draggable cargo
	let backup_draggable_cargo = null;	//Use if collisions is detected and after that,cargo return in start position(position before dragging).
	let canvasBounds = renderer.getContext().canvas.getBoundingClientRect();	//Using for only checking mouse coordinstes in canvas.

//Find delay bettwen mousedown and mouse up. If delay < 200 mlsec, calling function "catch draggable".
    let start_time;
    let end_time;
    let time_diff;
        
    window.addEventListener('mousedown', (event) => {
        start_time = null

        start_time = new Date;
    });

    window.addEventListener('mouseup', (event) => {
        end_time = null
        time_diff = null

        end_time = new Date
        time_diff = end_time-start_time
        if (time_diff < 200){catch_draggable()}
    })

//Realtime catching object after mouse cошибкаlicking on canvas and save values in variable "draggable".Use in raycaster dragging objects
    function catch_draggable() {
		
		if (draggable_cargo) 	//If we will dropping draggable cargo.

		{
			controls.enabled = false
			// addcolumn(draggable_cargo)
			// table.addData([{ id: 1, name: "John Doe" }]);
			// table.on("tableBuilt", function () {addcolumn()});

			// table.on("tableBuilt", function(){table.addData({guid:44})},console.log("sss"));
			check_collision_of_draggable_cargo_and_other_cargos()

			draggable_cargo.material.opacity = 1
			draggable_cargo.material.transparent = false
			draggable_cargo.children[0].material.color.set("black")
			
			draggable_cargo.removeFromParent()		//Need for jumping cargos after mouse moving  and intersect mouse with other object
			cargo_group.add(draggable_cargo)		//Need for jumping cargos after mouse moving  and intersect mouse with other object
			
			
			draggable_cargo = null
			backup_draggable_cargo = null 
			
			if(!draggable_cargo)	//If we will picking cargo for dragging		
				{
					controls.enabled = true
					return;
				}
		}
		
		//Founding ClickMouse position and set this parameters to variable "raycaster".Use in raycaster dragging object
		clickMouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
		clickMouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
		
		//Create array "found" from intersection raycast and cargos. Set value from first element of array to variable "draggable".Replace draggable from "cargo_group" to scene.
		raycaster.setFromCamera(clickMouse, camera);
		
		if(event.clientX > canvasBounds.left && event.clientX < canvasBounds.right && event.clientY < canvasBounds.bottom && event.clientY > canvasBounds.top){		//Condition for pick objects when mouse clc only on canvas.			
				const found = raycaster.intersectObjects(cargo_group.children,false);
				
				if(found.length > 0 && found[0].object.userData.isFloor == false)
				{
					draggable_cargo = found[0].object
					backup_draggable_cargo = found[0].object.clone()
					
					draggable_cargo.userData.intersecteble = false
					
					draggable_cargo.removeFromParent()			//Need for jumping cargos after mouse moving  and intersect mouse with other object
					
					draggable_cargo.material.opacity = 0.2
					draggable_cargo.material.transparent = true
					draggable_cargo.children[0].material.color.set("GREEN")
					
					scene.add(draggable_cargo)					//Need for jumping cargos after mouse moving  and intersect mouse with other object
				}
			}
		}
	

	//Realtime record mouse position to variable "moveMouse".Use in raycaster dragging objects.
	window.addEventListener('mousemove', event => {
		
		let canvasBounds2 = renderer.getContext().canvas.getBoundingClientRect();
		moveMouse.x = ( ( event.clientX - canvasBounds2.left ) / ( canvasBounds2.right - canvasBounds2.left ) ) * 2 - 1;
		moveMouse.y = - ( ( event.clientY - canvasBounds2.top ) / ( canvasBounds2.bottom - canvasBounds2.top) ) * 2 + 1;
		
	}
	)

//Create function drag object. If mouse catch draggable cargo,create array of floors for draggable,which consist of all other cargos and cargo area floor. 
//Draggable cargo moving only upperfaces of this array objects (face index = 4 or 5)
    function dragObject() {
		
		raycaster.setFromCamera(moveMouse, camera);
		
		if (draggable_cargo != null) {
			
			let array_of_floors_for_draggable = [...group_of_cargo_area_floor.children,...cargo_group.children]

			const cargos_on_ray = raycaster.intersectObjects(array_of_floors_for_draggable,false)
				
			if (cargos_on_ray.length > 0) {

				let found = cargos_on_ray[0]
				// testfunc()
					updateTable(draggable_cargo)
				//Condition for cargo moving only upper faces of cargo (upper faces consist of two triangles with numbers 4 and 5).
				if(found.faceIndex == 4 || found.faceIndex == 5){		
					
					if(found.point.x <= Number(draggable_cargo.geometry.parameters.width)/2)     											//MIN X axis limitation draggable object according ti cargo area
					{draggable_cargo.position.x = Number(draggable_cargo.geometry.parameters.width)/2}
					else if(found.point.x+Number(draggable_cargo.geometry.parameters.width)/2 >= cargo_area_group.children[0].scale.x*2)  	//MAX X axis limitation draggable object according ti cargo area
					{draggable_cargo.position.x = cargo_area_group.children[0].scale.x*2-Number(draggable_cargo.geometry.parameters.width)/2}
					else {draggable_cargo.position.x = found.point.x}
					
					if(found.point.z <= Number(draggable_cargo.geometry.parameters.depth)/2)     											//MIN Z axis limitation draggable object according ti cargo area
					{draggable_cargo.position.z = Number(draggable_cargo.geometry.parameters.depth)/2}
					else if(found.point.z+Number(draggable_cargo.geometry.parameters.depth)/2 >= cargo_area_group.children[0].scale.z*2)  	//MAX Z axis limitation draggable object according ti cargo area
					{draggable_cargo.position.z = cargo_area_group.children[0].scale.z*2-Number(draggable_cargo.geometry.parameters.depth)/2}
					else {draggable_cargo.position.z = found.point.z}
					
					draggable_cargo.position.y = found.point.y+Number(draggable_cargo.geometry.parameters.height)/2				//Set Y position of dragable object.		
				}
			}
		}
	}
	
	
    
//Create function for check collision after user dragging cargo.If collision is detected, cargo comeback to start position.
    function check_collision_of_draggable_cargo_and_other_cargos()
	{
	const box1 = new THREE.Box3().setFromObject(draggable_cargo) 	//Create box1 type of "box3" becose "box3" have metod "intersectsBox" for detect collisions.
	box1.min.x = box1.min.x + 0.01	//Need for correct cheching intersection bettween 2 near cargos
	box1.min.y = box1.min.y + 0.01	//Need for correct cheching intersection bettween 2 near cargos
	box1.min.z = box1.min.z + 0.01	//Need for correct cheching intersection bettween 2 near cargos

	box1.max.x = box1.max.x - 0.01	//Need for correct cheching intersection bettween 2 near cargos
	box1.max.y = box1.max.y - 0.01	//Need for correct cheching intersection bettween 2 near cargos
	box1.max.z = box1.max.z - 0.01	//Need for correct cheching intersection bettween 2 near cargos
	
		if(cargo_group.children.length > 0){
			for (let i=0;i<cargo_group.children.length;i++){
				let box2 = new THREE.Box3().setFromObject(cargo_group.children[i])
				if(box1.intersectsBox(box2)){
					console.log('collision detected')
					draggable_cargo.position.x = backup_draggable_cargo.position.x		//Need for backup cargo position to start when collision is exist
					draggable_cargo.position.y = backup_draggable_cargo.position.y		//Need for backup cargo position to start when collision is exist
					draggable_cargo.position.z = backup_draggable_cargo.position.z		//Need for backup cargo position to start when collision is exist


				} else {console.log("collision not detected")}
			}
		}

	} 


//Create function to animation with request animation frame 60 fps
    function animate() 
        {	
            dragObject();
            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        }

animate()

