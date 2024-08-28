import * as THREE from 'three';
import {Cuboid} from './classes.js';
import {cargo_group,cargo_area_group,scene,animate,helper,colorful_box,colors,camera, controls,renderer, draggable_objects_group} from './three_cargo_canvas.js';
import { Color } from 'three';

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

        //Creating object by class "Cuboid" after input user data in fields of cargo. return object 'cube' by type cuboid.
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

        //Creating colorful objects with black frame with objects by type 'cuboid'. 
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

        //Adding cargo to scene.
export function create_cargo_and_adding_to_scene()
{
    
    let quantity = Number(document.querySelector("#quantity4").value);
    
    if(quantity != 0)
    {
        for(let i = 0; i<quantity; i++)
        {
            let cube3 = create_cuboid_from_input();
            let colorful_box1 = create_cargo_from_cuboid(cube3);
            cargo_group.add(colorful_box1);
            // draggable_objects_group.add(colorful_box1);
            console.log(colorful_box1)
            // animate();
        }
    } 
    else {
        let cube2 = create_cuboid_from_input();
        let colorful_box2 = create_cargo_from_cuboid(cube2);
       
        cargo_group.add(colorful_box2);
        // draggable_objects_group.add(colorful_box2);
        console.log(colorful_box2)
        // animate();
    }
    //present_object_parameters()
    
}









export function create_cuboid_from_cargo(cargo)
{
    let cube = new Cuboid
        
    cube.length_X = cargo.scale.x*2
    cube.width_Y = cargo.scale.y*2
    cube.height_Z = cargo.scale.z*2
    cube.x = cargo.position.x-0.5*(cargo.scale.x*2)
    cube.y = cargo.position.y-0.5*(cargo.scale.y*2)
    cube.z = cargo.position.z-0.5*(cargo.scale.z*2)
    
    cube.uuid = cargo.uuid
    
       
    return cube
}


        //Present parameters of cargo area and cargos in console.
export function present_object_parameters()
{
    
    try{
        console.clear()
        
        let car_area = create_cuboid_from_cargo(cargo_area_group.children[0])
        
        if(typeof(car_area) === "undefined"){throw new Error("Cargo area not createted. Please create cargo area and try again.")}

        if( car_area.length_X == 0 ||
         car_area.width_Y == 0 ||
         car_area.height_Z == 0)
        {throw new Error("Cargo area size not valid. Please enter correct size and try again.")}
        
        if(cargo_group.children.length == 0) {throw new Error("No objects in cargo area.")}

        console.log(' Cargo area UUID: ',car_area.uuid,'\n',
                        'Cargo area scale:  ','Lenght =',car_area.length_X,'; Width =',car_area.width_Y,'; Height =',car_area.height_Z,'\n',
                        'Number of objects in the cargo area:',cargo_group.children.length,'\n',)
                 


            for (let i = 0; i < cargo_group.children.length; ++i)
                {
                let cargo = create_cuboid_from_cargo(cargo_group.children[i]);

                if( cargo.length_X == 0 ||
                    cargo.width_Y == 0 ||
                    cargo.height_Z == 0)
                   {console.log("Cargo uuid",cargo.uuid ,"size not valid. Please enter correct size and try again.")}
                
                console.log('     Number of object: ',i+1,'\n',
                            '    UUID: ',cargo.uuid,'\n',
                            '    Scale:  ','Lenght =',cargo.length_X,'; Width =',cargo.width_Y,'; Height =',cargo.height_Z,'\n',
                            '    Coordinates:  ','X =',cargo.x,'; Y =',cargo.y, '; Z =',cargo.z
                            );
                
                // animate()
                }
        } 
        catch (err) 
        {
            console.log(err.message)
        }
}


        //Create and add to scene cargo area from user input data. Camera look up to center of new cargo area.
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

present_object_parameters()
};



        //Create object by type "Cuboid" using data from scena. As a result main object has parameters of cargo area and his parameter "array of inner objects" 
        //includes all cargos from scene
export function threejs_scena_to_cuboid_obj()
{
   let parent_cube = create_cuboid_from_cargo(cargo_area_group.children[0])
   
       for(let i =0; i<cargo_group.children.length; i++)
        {   
            let children_cube = create_cuboid_from_cargo(cargo_group.children[i])
            parent_cube.array_of_inner_objects.push(children_cube);
        }
    return parent_cube
}



    
