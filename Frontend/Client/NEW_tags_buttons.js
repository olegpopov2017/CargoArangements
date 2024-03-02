import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene} from './three_cargo_canvas.js';
import {present_object_parameters, create_object_and_present_object_parameters,
		create_object_and_adding_to_scene, palette_adding} from './functions.js';

import{create_cuboid,create_helper_from_cuboid,create_cuboid_from_helper_and_show_to_console} from './NEW_functions.js'

// В input ШИРИНА это           X.SCALE в three.box             это КРАСНЫЙна сцене  
// В input ДЛИНА это            Y.SCALE three.box               это СИНИЙ на сцене 
// В input ВЫСОТА это           Z.SCALE в three.box             это ЗЕЛЕНЫЙ на сцене 


// В input X это            X.POSITION в three.box             это КРАСНЫЙна сцене  
// В input Y это            Y.POSITION three.box               это СИНИЙ на сцене 
// В input Z это            Z.POSITION в three.box             это ЗЕЛЕНЫЙ на сцене 



//Creating Form6 - Placement cargo according to algorithm
let form6_html = `
<fieldset>
<legend>рефакторинг cuboid to box и обратно</legend>
    <table>
        <td><button id = "button61" type="button" >создать кубоид</button></td>
		<td><button id = "button62" type="button" >кубоид в хелпер</button></td>
		<td><button id = "button63" type="button" >хелпер в кубоид></td>
</table>
</fieldset>
    `;
    
let form6 = document.createElement('form6');
form6.id = "form6";
form6.innerHTML = form6_html;
document.body.append(form6);
               
//Button 61 - create cuboid
let button61 = document.querySelector('#button61');
button61.addEventListener('click',create_cuboid);

//Button 62 - create cuboid
let button62 = document.querySelector('#button62');
button62.addEventListener('click',create_helper_from_cuboid);

//Button 63 - create cuboid
let button63 = document.querySelector('#button63');
button63.addEventListener('click',create_cuboid_from_helper_and_show_to_console);

  




                



                