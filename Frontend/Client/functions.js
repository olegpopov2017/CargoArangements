import * as THREE from 'three';
import {Cuboid} from './classes.js';
import {cargo_group,cargo_area_group,scene,animate} from './three_cargo_canvas.js';
import { Color } from 'three';




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




export function create_helper_from_cuboid(Cuboid)
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

    const box_three = new THREE.Box3();
    box_three.setFromCenterAndSize(new THREE.Vector3( x+(lenght/2), y+(width/2),  z+(height/2)), new THREE.Vector3( lenght,width,height) );
    const helper = new THREE.Box3Helper(box_three, 0x000000 );
    if (typeof(cube.uuid) != "undefined"){helper.uuid = uuid}

    // animate()
    return helper
}



export function create_cuboid_from_helper(helper1)
{
    let helper = helper1
    let cube = new Cuboid
    
    
    cube.length_X = helper.scale.x*2
    cube.width_Y = helper.scale.y*2
    cube.height_Z = helper.scale.z*2
    cube.x = helper.position.x-0.5*(helper.scale.x*2)
    cube.y = helper.position.y-0.5*(helper.scale.y*2)
    cube.z = helper.position.z-0.5*(helper.scale.z*2)
    
    cube.uuid = helper.uuid
    
    // animate()       
   
    return cube
}


export function present_object_parameters()
{
    
    try{
        console.clear()
        
        let car_area = create_cuboid_from_helper(cargo_area_group.children[0])
        
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
                let cargo = create_cuboid_from_helper(cargo_group.children[i]);

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
present_object_parameters()
};




export function threejs_scena_to_cuboid_obj()
{
   let parent_cube = create_cuboid_from_helper(cargo_area_group.children[0])
   
       for(let i =0; i<cargo_group.children.length; i++)
        {   
            let children_cube = create_cuboid_from_helper(cargo_group.children[i])
            parent_cube.array_of_inner_objects.push(children_cube);
        }
    return parent_cube
}




export function placement_cargo_according_to_algorithm()
{
    let box = threejs_scena_to_cuboid_obj()
    
    fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box)})
        .then((response) => {
            return response.json();
        })
            .then((data) => {
                cargo_area_group.clear()
                cargo_group.clear()
                
                let cube = new Cuboid

                cube.uuid = data.uuid
                cube.length_X = data.length_X
                cube.width_Y = data.width_Y
                cube.height_Z = data.height_Z
                cube.x = data.x
                cube.y = data.y
                cube.z = data.z

                let parent_cube = create_helper_from_cuboid(cube)
                parent_cube.material.color.setHex(0xdf0707)
                
                cargo_area_group.add(parent_cube);
                
                for(let i = 0; i < data.array_of_inner_objects.length; i++)
                {
                    let inner_cube = data.array_of_inner_objects[i]
                    
                    let children_cube = new Cuboid
                    
                    children_cube.uuid = inner_cube.uuid
                    children_cube.length_X = inner_cube.length_X
                    children_cube.width_Y = inner_cube.width_Y
                    children_cube.height_Z = inner_cube.height_Z
                    children_cube.x = inner_cube.x
                    children_cube.y = inner_cube.y
                    children_cube.z = inner_cube.z
                    
                    let children = create_helper_from_cuboid(children_cube)
                    
                    cargo_group.add(children);
                    
                }
                present_object_parameters();
            });
}


export function create_cargo_from_input()
{
    
    let quantity = Number(document.querySelector("#quantity4").value);
    
    if(quantity != 0)
    {
        for(let i = 0; i<quantity; i++)
        {
            let cube1 = create_cuboid_from_input();
            let helper2 = create_helper_from_cuboid(cube1);
            cargo_group.add(helper2);
            // animate();
        }
    } 
    else {
        let cube2 = create_cuboid_from_input();
        let helper3 = create_helper_from_cuboid(cube2);
        cargo_group.add(helper3);
        // animate();
    }
    present_object_parameters()
    
}
    
