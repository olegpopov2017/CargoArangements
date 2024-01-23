import * as THREE from 'three';
import {Box, click} from './test_json.js';
import {scene,helper,group} from './main';

let button2 = document.querySelector('#button1');
button2.addEventListener('click',create_obj_to_scene);

function create_obj_to_scene()
{

    group.clear();

let box1 = new Box;
console.log(box1);


box1.length = (parseInt(document.querySelector("#lenght").value));
box1.width = parseInt(document.querySelector("#width").value);
box1.height = parseInt(document.querySelector("#height").value);
box1.x = parseInt(document.querySelector("#x").value);
box1.y = parseInt(document.querySelector("#y").value);
box1.z = parseInt(document.querySelector("#z").value);
console.log(box1);

let lenght = box1.length = (parseInt(document.querySelector("#lenght").value));
let width = box1.width = parseInt(document.querySelector("#width").value);
let height = box1.height = parseInt(document.querySelector("#height").value);
let x = box1.x = parseInt(document.querySelector("#x").value);
let y = box1.y = parseInt(document.querySelector("#y").value);
let z = box1.z = parseInt(document.querySelector("#z").value);
// console.log(box1);


const box_three = new THREE.Box3();
box_three.setFromCenterAndSize( new THREE.Vector3( x, y, z ), new THREE.Vector3( lenght, width, height ) );
// box_three.setFromCenterAndSize( new THREE.Vector3( 1, 1,1 ), new THREE.Vector3(1, 1,1 ));

const helper = new THREE.Box3Helper( box_three, 0x000000 );
group.add(helper);


}
