import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene,animate} from './three_cargo_canvas.js';


function present_object_parameters()
{
console.clear();
let pallete = palette_group.children
let inner_array = group1.children;


// console.log(pallete)
// console.log('Array lengh:',inner_array.length,'\n',
//             'UUID: ',pallete.uuid,'\n',
//             'Scale:  ','Lenght =',pallete.scale.x*2,'; Width =',pallete.scale.y*2,'; Height =',pallete.scale.z*2,'\n',
//             )




for (let i = 0; i < inner_array.length; ++i)
    {
    let arr = inner_array[i];
    console.log('    Number of object: ',i+1,'\n',
                '   UUID: ',arr.uuid,'\n',
                '   Scale:  ','Lenght =',arr.scale.x*2,'; Width =',arr.scale.y*2,'; Height =',arr.scale.z*2,'\n',
                '   Coordinates:  ','X =',arr.position.x-arr.scale.x,'; Y =',arr.position.y-arr.scale.y, '; Z =',arr.position.z-arr.scale.z
                );
    }
};

async function create_object_and_adding_to_scene()
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
    return group1;
}

async function create_object_and_present_object_parameters()
{
    const a = await create_object_and_adding_to_scene().then(present_object_parameters())
    return ;
}




//Button42(Form 4) - Creating object
let button42 = document.querySelector('#button42');
button42.addEventListener('click',create_object_and_present_object_parameters);



//Button 43(Form4) - Delete all objects in scene
let button43 = document.querySelector('#button43');
button43.addEventListener('click',delete_all);
function delete_all()   {group1.clear(),console.clear();};


//Button 44(Form4) - Present object parameters
let button44 = document.querySelector('#button44');
button44.addEventListener('click',present_object_parameters);





    
