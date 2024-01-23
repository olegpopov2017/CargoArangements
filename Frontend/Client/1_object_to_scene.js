import * as THREE from 'three';
import {Box} from './classes.js';
import {group} from './main';


//Button from form "creating object,changing position into server"
let button2 = document.querySelector('#button2');
button2.addEventListener('click',changing_position_into_server);

function changing_position_into_server()
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
                console.log(data);
                let box1 = data;
                console.log(box1);

                let lenght = Number(box1.length); 
                let width = Number(box1.width);
                let height = Number(box1.height); 
                let x = Number(box1.x);
                let y = Number(box1.y);
                let z = Number(box1.z);
                console.log(x);

                group.clear();
                
                const box_three = new THREE.Box3();
                box_three.setFromCenterAndSize(new THREE.Vector3( x+(lenght/2), y+(height/2), z+(width/2) ), new THREE.Vector3( lenght,height,width, ) );
                
                const helper = new THREE.Box3Helper(box_three, 0x000000 );
                group.add(helper);
                
            });
}



    
