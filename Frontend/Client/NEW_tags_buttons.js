import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene} from './three_cargo_canvas.js';
import {present_object_parameters, create_object_and_present_object_parameters,
		create_object_and_adding_to_scene, palette_adding} from './functions.js';

import{function_button51,button52_function,button53_function} from './NEW_functions.js'


                                    // FETCH Button 2 - Creating object,changing position into server

// let button2 = document.querySelector('#button2');
// button2.addEventListener('click',create_and_changing_position_into_server);

// function create_and_changing_position_into_server()
// {
//     let box = new Cuboid;
        
//     box.length = document.querySelector("#lenght").value;
//     box.width = document.querySelector("#width").value;
//     box.height = document.querySelector("#height").value;
//     box.x = document.querySelector("#x").value;
//     box.y = document.querySelector("#y").value;
//     box.z = document.querySelector("#z").value;
    
//     const controller = new AbortController();
//     setTimeout(() => {controller.abort()}, 2000);
    
//     fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box),AbortController: controller.signal})
//         .then((response) => {
//             return response.json();
//         })
//             .then((data) => {
//                 let box1 = data;
//                 let lenght = Number(box1.length); 
//                 let width = Number(box1.width);
//                 let height = Number(box1.height); 
//                 let x = Number(box1.x);
//                 let y = Number(box1.y);
//                 let z = Number(box1.z);
                                               
//                 const box_three = new THREE.Box3();
//                 box_three.setFromCenterAndSize(new THREE.Vector3( z+(width/2), y+(height/2),  x+(lenght/2)), new THREE.Vector3( width,height,lenght ) );
                
//                 const helper = new THREE.Box3Helper(box_three, 0x000000 );
//                 group1.add(helper);
                
//             });
// }

  

//Creating Form5 - Create object for sending data to server
let form5_html = `
<fieldset>
<legend>создание объекта и отправка его на сервер</legend>
    <table>
        <td><button id = "button51" type="button" >Создать тестовый палетт и 2 обьекта</button></td>
        <td><button id = "button52" type="button" >создать обьект testing box из всего что на сцене</button></td>
        <td><button id = "button53" type="button" >отправитьна ,принять с сервера и в консоль</button></td>

    </table>
</fieldset>
    `;
    
let form5 = document.createElement('form5');
form5.id = "form5";
form5.innerHTML = form5_html;
document.body.append(form5);
               
//Button 51 - создать тестовый палет и 2 объекта
let button51 = document.querySelector('#button51');
button51.addEventListener('click',function_button51);

//Button 52 - создать объект testing box
let button52 = document.querySelector('#button52');
button52.addEventListener('click',button52_function);

//Button 53 - создать объект testing box
let button53 = document.querySelector('#button53');
button53.addEventListener('click',button53_function);
                



                