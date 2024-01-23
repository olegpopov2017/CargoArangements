import * as THREE from 'three';
import {Box} from './test_json.js';
import {scene,helper,group} from './main';

let button2 = document.querySelector('#button2');
button2.addEventListener('click',create_obj_to_scene);

function create_obj_to_scene()
{

    
    let box = new Box;
    // console.log(box);
    
    
    box.length = document.querySelector("#lenght").value;
    box.width = document.querySelector("#width").value;
    box.height = document.querySelector("#height").value;
    box.x = document.querySelector("#x").value;
    box.y = document.querySelector("#y").value;
    box.z = document.querySelector("#z").value;
    // console.log(box);


    async function click()
    {    
        const controller = new AbortController();
        setTimeout(() => {controller.abort()}, 2000);
        
        let response = await fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box),AbortController: controller.signal})
        
        let box1 = await response.json()
        await console.log(box1)
        
        let lenght = box1.length = (parseInt(document.querySelector("#lenght").value))
        let width = box1.width = parseInt(document.querySelector("#width").value);
        let height = box1.height = parseInt(document.querySelector("#height").value);
        let x = box1.x = parseInt(document.querySelector("#x").value);
        let y = box1.y = parseInt(document.querySelector("#y").value);
        let z = box1.z = parseInt(document.querySelector("#z").value);
        
        group.clear();
        
        const box_three = new THREE.Box3();
        box_three.setFromCenterAndSize( new THREE.Vector3( x, y, z ), new THREE.Vector3( lenght, width, height ) );
        // box_three.setFromCenterAndSize( new THREE.Vector3( 1, 1,1 ), new THREE.Vector3(1, 1,1 ));

        const helper = new THREE.Box3Helper( box_three, 0x000000 );
        group.add(helper);
    }
    click();
}
