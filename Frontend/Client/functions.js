import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene,animate} from './three_cargo_canvas.js';


export function present_object_parameters()
{
    try{
            console.clear();
            let pallete = palette_group.children[0];
            let inner_array = group1.children;

            if(typeof(pallete) === "undefined" || pallete.length === 0) {throw new Error("Pallete not createted. Please create pallete and try again.")}
            if(typeof(pallete.scale.x) === "undefined" || typeof(pallete.scale.y) === "undefined" || typeof(pallete.scale.z) === "undefined" ) {throw new Error("Pallete data not valid. Please create pallete and try again.")}
            if(pallete.scale.x == 0 || pallete.scale.y === 0 || pallete.scale.z === 0) {throw new Error("Pallete size not correct. Please create pallete and try again.")}
            if(inner_array.length == 0) {throw new Error("No objects in cargo area.")}

            console.log(' Cargo area UUID: ',pallete.uuid,'\n',
                        'Cargo area scale:  ','Lenght =',pallete.scale.z*2,'; Width =',pallete.scale.x*2,'; Height =',pallete.scale.y*2,'\n',
                        'Number of objects in the cargo area:',inner_array.length,'\n',
                        )


            for (let i = 0; i < inner_array.length; ++i)
                {
                let arr = inner_array[i];
                if(arr.scale.x == 0 || arr.scale.y === 0 || arr.scale.z === 0) {console.log("Object size is not correct. Please create object and try again.")}
                console.log('     Number of object: ',i+1,'\n',
                            '    UUID: ',arr.uuid,'\n',
                            '    Scale:  ','Lenght =',arr.scale.z*2,'; Width =',arr.scale.x*2,'; Height =',arr.scale.y*2,'\n',
                            '    Coordinates:  ','X =',arr.position.z-arr.scale.z,'; Y =',arr.position.y-arr.scale.y, '; Z =',arr.position.x-arr.scale.x
                            );
                }
        } 
        catch (err) 
        {
            console.log(err.message)
        }
}


export function create_object_and_adding_to_scene()
{
    let length = Number(document.querySelector("#lenght4").value);
    let width = Number(document.querySelector("#width4").value);
    let height = Number(document.querySelector("#height4").value);
    let x = Number(document.querySelector("#x4").value);
    let y = Number(document.querySelector("#y4").value);
    let z = Number(document.querySelector("#z4").value);
    
    const box_three = new THREE.Box3();
    box_three.setFromCenterAndSize(new THREE.Vector3( z+(width/2), y+(height/2),  x+(length/2)), new THREE.Vector3( width,height,length ) );
    const helper = new THREE.Box3Helper(box_three, 0x000000 );
    group1.add(helper);
    animate()
}


export function create_object_and_present_object_parameters()
{
    create_object_and_adding_to_scene()
    present_object_parameters()
}


export function palette_adding()   
{
palette_group.clear();

let x = Number(document.querySelector("#lenght_palette").value);
let y = Number(document.querySelector("#width_palette").value);
let z = Number(document.querySelector("#height_palette").value);

//Create/adding palette to scene.
const palette_box = new THREE.Box3();
palette_box.setFromCenterAndSize( new THREE.Vector3( y/2,z/2 ,x/2  ), new THREE.Vector3( y, z, x));
const palette_helper = new THREE.Box3Helper( palette_box, 0xdf0707 );

palette_group.add(palette_helper);
animate()
present_object_parameters()
};





    