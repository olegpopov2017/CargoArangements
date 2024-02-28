import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene,animate} from './three_cargo_canvas.js';


export function present_object_parameters()
{
    console.clear();
    let pallete = palette_group.children[0]
    let inner_array = group1.children;

    console.log(' Cargo area UUID: ',pallete.uuid,'\n',
                'Cargo area scale:  ','Lenght =',pallete.scale.x*2,'; Width =',pallete.scale.y*2,'; Height =',pallete.scale.z*2,'\n',
                'Number of objects in the cargo area:',inner_array.length,'\n',
                )


    for (let i = 0; i < inner_array.length; ++i)
        {
        let arr = inner_array[i];
        console.log('     Number of object: ',i+1,'\n',
                    '    UUID: ',arr.uuid,'\n',
                    '    Scale:  ','Lenght =',arr.scale.x*2,'; Width =',arr.scale.y*2,'; Height =',arr.scale.z*2,'\n',
                    '    Coordinates:  ','X =',arr.position.x-arr.scale.x,'; Y =',arr.position.y-arr.scale.y, '; Z =',arr.position.z-arr.scale.z
                    );
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
};





    
