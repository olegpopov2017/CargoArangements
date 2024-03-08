import * as THREE from 'three';
import {Cuboid} from './classes.js';
import {cargo_group,cargo_area_group,scene,animate} from './three_cargo_canvas.js';




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

    animate()
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
    
    animate()       
   
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
                   {console.log("Cargo size not valid. Please enter correct size and try again.")}
                
                console.log('     Number of object: ',i+1,'\n',
                            '    UUID: ',cargo.uuid,'\n',
                            '    Scale:  ','Lenght =',cargo.length_X,'; Width =',cargo.width_Y,'; Height =',cargo.height_Z,'\n',
                            '    Coordinates:  ','X =',cargo.x,'; Y =',cargo.y, '; Z =',cargo.z
                            );
                animate()
                }
        } 
        catch (err) 
        {
            console.log(err.message)
        }
}



export function palette_adding()   
{
cargo_area_group.clear();

let x = Number(document.querySelector("#lenght_palette").value);
let y = Number(document.querySelector("#width_palette").value);
let z = Number(document.querySelector("#height_palette").value);

//Create/adding palette to scene.
const palette_box = new THREE.Box3();
palette_box.setFromCenterAndSize( new THREE.Vector3( x/2,y/2 ,z/2  ), new THREE.Vector3( x, y, z));
const palette_helper = new THREE.Box3Helper( palette_box, 0xdf0707 );

cargo_area_group.add(palette_helper);
animate()
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

                let parent_cube = data;

                let uuid = data.uuid
                let lenght = Number(parent_cube.length); 
                let width = Number(parent_cube.width);
                let height = Number(parent_cube.height); 
                let x = Number(parent_cube.x);
                let y = Number(parent_cube.y);
                let z = Number(parent_cube.z);

                const box_three = new THREE.Box3();
                box_three.setFromCenterAndSize(new THREE.Vector3( x+(lenght/2), y+(width/2), z+(height/2)), new THREE.Vector3( lenght,width,height,) );
                const helper = new THREE.Box3Helper(box_three, 0xdf0707 );
                helper.uuid = uuid;
                cargo_area_group.add(helper);
                
                for(let i = 0; i < parent_cube.array_of_inner_objects.length; i++)
                {
                    let children_cube = parent_cube.array_of_inner_objects[i]

                    let uuid = children_cube.uuid;
                    let lenght = Number(children_cube.length); 
                    let width = Number(children_cube.width);
                    let height = Number(children_cube.height); 
                    let x = Number(children_cube.x);
                    let y = Number(children_cube.y);
                    let z = Number(children_cube.z);

                    const box_three = new THREE.Box3();
                    box_three.setFromCenterAndSize(new THREE.Vector3( x+(lenght/2), y+(width/2), z+(height/2)), new THREE.Vector3( lenght,width,height,) );
                    const helper = new THREE.Box3Helper(box_three, 0x000000 );
                    helper.uuid  = uuid;
                    cargo_group.add(helper);
                }
                present_object_parameters();
            });
}


    
