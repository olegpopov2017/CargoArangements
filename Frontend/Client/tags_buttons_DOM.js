import * as THREE from 'three';
// import {Box} from './classes.js';
import {group1,palette_group,scene} from './three_cargo_canvas.js';
import {present_object_parameters, create_object_and_present_object_parameters,
		create_object_and_adding_to_scene, palette_adding,placement_cargo_according_to_algorithm,
		threejs_obj_to_cuboid_obj	} from './functions.js';


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





							//Creating Form5 - Placement cargo according to algorithm
let form5_html = `
<fieldset>
<legend>Расстановка грузов по алгоритму согласно размеров грузового помещения</legend>
    <table>
        <td><button id = "button53" type="button" class = "button1">Расчитать</button></td>
		<td><button id = "button54" type="button" class = "button1">Расчитать на локальном сервере</button></td>
</table>
</fieldset>
    `;
    
let form5 = document.createElement('form5');
form5.id = "form5";
form5.innerHTML = form5_html;
document.body.append(form5);
               
//Button 53 - создать объект testing box
let button53 = document.querySelector('#button53');
button53.addEventListener('click',placement_cargo_according_to_algorithm);




    