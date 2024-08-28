import * as THREE from 'three';
import {Cuboid} from './classes.js';
import {cargo_group,cargo_area_group,scene,animate,colors,camera, controls,renderer, draggable_objects_group} from './three_cargo_canvas.js';
import { Color } from 'three';
import {} from './NEW_functions.js';

//Change screen size before pushing button "f".
export function resize_renderer()
{	
	let height = Number(window.innerHeight)
	let width = Number(window.innerWidth)
	let canvas_obj = document.getElementById("canvas_three");

	if (canvas_obj.width == 600)
		{
			renderer.setSize(width,height)
		}
		else
		{
			renderer.setSize(600,300)
		}
}

//Creating object by class "Cuboid" after input user data in fields of cargo. return object 'cube' by type cuboid.Using in handle input
export function create_cuboid_from_input()
{   
    let length = Number(document.querySelector("#lenght4").value);
    let width = Number(document.querySelector("#width4").value);
    let height = Number(document.querySelector("#height4").value);
    let x = Number(document.querySelector("#x4").value);
    let y = Number(document.querySelector("#y4").value);
    let z = Number(document.querySelector("#z4").value);

    let cube = new Cuboid
    cube.length_X = length
    cube.width_Y = width
    cube.height_Z = height
    cube.x = x
    cube.y = y
    cube.z = z

    return cube
}

//Create cuboid from cargo.Using in API
export function create_cuboid_from_cargo(cargo)
    {
    
    let cube = new Cuboid
    
    cube.length_X = cargo.geometry.parameters.width
    cube.width_Y = cargo.geometry.parameters.height
    cube.height_Z = cargo.geometry.parameters.depth
    cube.x = cargo.position.x-0.5*(cargo.geometry.parameters.width)
    cube.y = cargo.position.y-0.5*(cargo.geometry.parameters.height)
    cube.z = cargo.position.z-0.5*(cargo.geometry.parameters.depth)
    
    cube.uuid = cargo.uuid
    
    return cube
    }

//Creating colorful objects with black frame with objects by type 'cuboid'.Using in API and handle input.
//First-create object by type 'THREE.Mesh".
//Second-create object by type "THREE.LineSegments"
//Third-object "THREE.LineSegments" adding to object "THREE.Mesh"
export function create_cargo_from_cuboid(Cuboid)
{
    let cube = Cuboid
    let uuid,x,y,z,lenght,width,height

    uuid = cube.uuid
    x = Number(cube.x)   
    y = Number(cube.y)
    z = Number(cube.z)
    lenght = Number(cube.length_X)
    width = Number(cube.width_Y)
    height = Number(cube.height_Z)

    let random_color_index = Math.floor(Math.random() * colors.length)
    
    let boxGeometry = new THREE.BoxGeometry(lenght, width, height);
    let cubeMaterial =new THREE.MeshBasicMaterial({color: colors[random_color_index]})

                       
     
    //Adding edge frame for a box
    let box1 = new THREE.Mesh(boxGeometry, cubeMaterial);
    
    
    let edges = new THREE.EdgesGeometry( boxGeometry ); 
    let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: "black" } ) );
    // line.material.linewidth = 1 
    box1.add(line)
    
    
      
    box1.position.x = x + lenght/2;
    box1.position.y = y + width/2;
    box1.position.z = z + height/2;
    
    
    if (typeof(cube.uuid) != "undefined"){box1.uuid = uuid}
    
    
    return box1
}

//Adding cargo to scene after input user data.Using in handle input data.
export function create_cargo_after_input_data_and_adding_to_scene()
{
    
    let quantity = Number(document.querySelector("#quantity4").value);
    
    if(quantity != 0)
    {
        for(let i = 0; i<quantity; i++)
        {
            let cube3 = create_cuboid_from_input();
            let colorful_box1 = create_cargo_from_cuboid(cube3);
            cargo_group.add(colorful_box1);
            console.log(colorful_box1)
        }
    } 
    else {
        let cube2 = create_cuboid_from_input();
        let colorful_box2 = create_cargo_from_cuboid(cube2);
        cargo_group.add(colorful_box2);
        console.log(colorful_box2)
        }
        
}


//Create and add to scene cargo area from user input data. Camera look up to center of new cargo area.Using in handle input data.
export function cargo_area_adding()   
{
    cargo_area_group.clear();

    let x = Number(document.querySelector("#lenght_palette").value);
    let y = Number(document.querySelector("#width_palette").value);
    let z = Number(document.querySelector("#height_palette").value);

    //Create/adding cargo area to scene.
    const area = new THREE.Box3();
    area.setFromCenterAndSize( new THREE.Vector3( x/2,y/2 ,z/2  ), new THREE.Vector3( x, y, z));
    const cargo_area = new THREE.Box3Helper(area, 0xdf0707 );

    cargo_area_group.add(cargo_area);
    // animate()
    let geometry = new THREE.PlaneGeometry( x, y );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let plane1 = new THREE.Mesh( geometry, material );
    plane1.position.x = x/2
    plane1.position.y = y/2
    plane1.material.opacity = 0.9
    plane1.userData.ground = true;
    cargo_area_group.add(plane1)

    //Camera look at control target
    controls.target = new THREE.Vector3( x/2,y/2 ,0 )

};





//Create cuboid from cargo area without inner objects.For present parameters.Using in API and viewing data.
export function create_cuboid_from_cargo_area(cargo_area)
{
    let cube = new Cuboid
        
    cube.length_X = cargo_area.scale.x*2
    cube.width_Y = cargo_area.scale.y*2
    cube.height_Z = cargo_area.scale.z*2
    cube.x = cargo_area.position.x-0.5*(cargo_area.scale.x*2)
    cube.y = cargo_area.position.y-0.5*(cargo_area.scale.y*2)
    cube.z = cargo_area.position.z-0.5*(cargo_area.scale.z*2)
    
    cube.uuid = cargo_area.uuid
          
    return cube
}

//Create cuboid with inner object from cargo area and cargos.Using in API
export function threejs_scena_to_cuboid_with_inner_objects()
    {
    let parent_cube = create_cuboid_from_cargo_area(cargo_area_group.children[0])

    for(let i =0; i<cargo_group.children.length; i++)
        {   
            let children_cube = create_cuboid_from_cargo(cargo_group.children[i])
            parent_cube.array_of_inner_objects.push(children_cube);
        }
    return parent_cube
    }

      
//Create cargo area with colored ground.Using in API
export function cargo_area_adding_from_cuboid(cube)   
    {
    cargo_area_group.clear();

    let x = Number(cube.length_X)
    let y = Number(cube.width_Y)
    let z = Number(cube.height_Z)

    //Create/adding cargo area to scene.
    const area = new THREE.Box3();
    area.setFromCenterAndSize( new THREE.Vector3( x/2,y/2 ,z/2  ), new THREE.Vector3( x, y, z));
    const cargo_area = new THREE.Box3Helper(area, 0xdf0707 );

    cargo_area_group.add(cargo_area);
    let geometry = new THREE.PlaneGeometry( x, y );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let plane1 = new THREE.Mesh( geometry, material );
    plane1.position.x = x/2
    plane1.position.y = y/2
    plane1.material.opacity = 0.9
    plane1.userData.ground = true;

    return plane1
    };   
      
 




        


        



        



    
