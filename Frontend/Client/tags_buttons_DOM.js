import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene} from './three_cargo_canvas.js';
import {present_object_parameters, create_object_and_present_object_parameters,
		create_object_and_adding_to_scene, palette_adding} from './functions.js';


        //Creating Form1 - Creating object,change coordinates on server.
// let form1_html = `
// <fieldset>
// 				<legend>Создание обьекта,изменение координат на сервере</legend>
// 					<table>
// 						<tr>
// 							<td><label >Длина</label></td>
// 							<td><input id="lenght" type="number"/></td>
// 						</tr>
// 						<tr>
// 							<td><label>Ширина</label></td>
// 							<td><input id="width" type="number"/></td>
// 						</tr>
// 						<tr>
// 							<td><label>Высота</label></td>
// 							<td><input id="height" type="number"/></td>
// 						</tr>
// 						<tr>
// 							<td><label>X</label></td>
// 							<td><input id="x" type="number"/></td>
// 						</tr>
// 						<tr>
// 							<td><label>Y</label></td>
// 							<td><input id="y" type="number"/></td>
// 						</tr>
// 						<tr>
// 							<td><label>Z</label></td>
// 							<td><input id="z" type="number"/></td>
// 						</tr>
// 						<tr>
// 							<td><button id = "button2" type="button" >Создать</button></td>
// 							<td><button id = "button3" type="button" >Удалить все обьекты</button></td>
// 							<td><button id = "button6" type="button" >Показать параметры объектов</button></td>

// 						</tr>
// 					</table>
//     </fieldset>
//     `;
    
    
//     let form1 = document.createElement('form1');
//     form1.id = "form1";
//     form1.innerHTML = form1_html;
//     document.body.append(form1);



		//Creating Form2 - Adding/delete cargo area to scene
let form2_html = `
<fieldset>
<legend>Создание грузового помещения</legend>
    <table>
        <tr>
            <td><label >Длина</label></td>
            <td><input id="lenght_palette" type="number"/></td>
        </tr>
        <tr>
            <td><label>Ширина</label></td>
            <td><input id="width_palette" type="number"/></td>
        </tr>
        <tr>
            <td><label>Высота</label></td>
            <td><input id="height_palette" type="number"/></td>
        </tr>
        <tr>
            <td><button id = "button24" type="button" >Добавить</button></td>
            <td><button id = "button25" type="button" >Удалить</button></td>
            
        </tr>
    </table>
</fieldset>
    `;
    
let form2 = document.createElement('form2');
form2.id = "form2";
form2.innerHTML = form2_html;
document.body.append(form2);

//Button 24 - Adding palette
let button24 = document.querySelector('#button24');
button24.addEventListener('click',palette_adding);

//Button 25 - Delete all palets in scene
let button25 = document.querySelector('#button25');
button25.addEventListener('click',() => (palette_group.clear(),present_object_parameters()));





		//Creating Form4 - Creating object,delete object on scene.
let form4_html = `
<fieldset>
				<legend>Создание объекта, удаление всех объектов</legend>
					<table>
						<tr>
							<td><label >Длина</label></td>
							<td><input id="lenght4" type="number"/></td>
						</tr>
						<tr>
							<td><label>Ширина</label></td>
							<td><input id="width4" type="number"/></td>
						</tr>
						<tr>
							<td><label>Высота</label></td>
							<td><input id="height4" type="number"/></td>
						</tr>
						<tr>
							<td><label>X</label></td>
							<td><input id="x4" type="number"/></td>
						</tr>
						<tr>
							<td><label>Y</label></td>
							<td><input id="y4" type="number"/></td>
						</tr>
						<tr>
							<td><label>Z</label></td>
							<td><input id="z4" type="number"/></td>
						</tr>
						<tr>
							<td><button id = "button42" type="button" >Создать</button></td>
							<td><button id = "button43" type="button" >Удалить все обьекты</button></td>
							<td><button id = "button44" type="button" >Показать параметры объектов</button></td>

						</tr>
					</table>
    </fieldset>
    `;
        
let form4 = document.createElement('form4');
form4.id = "form4";
form4.innerHTML = form4_html;
document.body.append(form4);

//Button42(Form 4) - Creating object
let button42 = document.querySelector('#button42');
button42.addEventListener('click',create_object_and_present_object_parameters);

//Button 43(Form4) - Delete all objects in scene
let button43 = document.querySelector('#button43');
button43.addEventListener('click',() => (group1.clear(),present_object_parameters()));

//Button 44(Form4) - Present object parameters
let button44 = document.querySelector('#button44');
button44.addEventListener('click',present_object_parameters);
    