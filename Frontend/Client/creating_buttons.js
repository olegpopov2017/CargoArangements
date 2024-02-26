import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene} from './three_cargo_canvas.js';

                //Button 2 - Creating object,changing position into server

let button2 = document.querySelector('#button2');
button2.addEventListener('click',create_and_changing_position_into_server);

function create_and_changing_position_into_server()
{
    let box = new Box;
        
    box.length = document.querySelector("#lenght").value;
    box.width = document.querySelector("#width").value;
    box.height = document.querySelector("#height").value;
    box.x = document.querySelector("#x").value;
    box.y = document.querySelector("#y").value;
    box.z = document.querySelector("#z").value;
    
    const controller = new AbortController();
    setTimeout(() => {controller.abort()}, 2000);
    
    fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box),AbortController: controller.signal})
        .then((response) => {
            return response.json();
        })
            .then((data) => {
                let box1 = data;
                let lenght = Number(box1.length); 
                let width = Number(box1.width);
                let height = Number(box1.height); 
                let x = Number(box1.x);
                let y = Number(box1.y);
                let z = Number(box1.z);
                                               
                const box_three = new THREE.Box3();
                box_three.setFromCenterAndSize(new THREE.Vector3( z+(width/2), y+(height/2),  x+(lenght/2)), new THREE.Vector3( width,height,lenght ) );
                
                const helper = new THREE.Box3Helper(box_three, 0x000000 );
                group1.add(helper);
                
            });
}



                //Button 3 - Delete all objects in scene
let button3 = document.querySelector('#button3');
button3.addEventListener('click',delete_all);
function delete_all()   {group1.clear()};

  
                //Button 4 - Adding palette
let button4 = document.querySelector('#button4');
button4.addEventListener('click',palette_adding);
 function palette_adding()   
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


                //Button 5 - Delete all palets in scene
let button5 = document.querySelector('#button5');
button5.addEventListener('click',() => (palette_group.clear()));

                

                //Button 6 - Represent object parameters
let button6 = document.querySelector('#button6');
button6.addEventListener('click',present_object_parameters);

function present_object_parameters()
{
console.clear();
let array = group1.children;
console.log('Array lengh: ',group1.children.length)
let i;
for (i = 0; i < array.length; i++)
    {
    let arr = array[i];
    console.log('Number of object: ',i+1,'\n',
                'UUID: ',arr.uuid,'\n',
                'Scale:  ','Lenght =',arr.scale.x*2,'; Width =',arr.scale.y*2,'; Height =',arr.scale.z*2,'\n',
                'Coordinates:  ','X =',arr.position.x-arr.scale.x,'; Y =',arr.position.y-arr.scale.y, '; Z =',arr.position.z-arr.scale.z);
    }
};


                