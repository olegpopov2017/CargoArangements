import * as THREE from 'three';
import {cargo_area_group,cargo_group,group_of_cargo_area_floor,group_of_cargo_area_attribute} from './three_cargo_canvas.js';
import {cargo_area_adding,resize_renderer,create_cargo_after_input_data_and_adding_to_scene} from './functions.js';
import {placement_cargo_according_to_algorithm_on_local_server,present_object_parameters} from './NEW_functions.js';
import {import_from_excel,export_to_excel} from './excel.js';




		//Adding button "f" to change screen size.
document.addEventListener('keydown', function(event) {
    if (event.key === 'f') 
	{
        resize_renderer()
    }
});


		//Creating Form2 - Adding/delete cargo area to scene
let form2_html = `
<fieldset>
<legend>Создание грузового помещения</legend>
    <table>
        <tr>
            <td><label style="color:Red;">Ширина</label></td>
            <td><input id="width_palette" type="number"/></td>
        </tr>
        <tr>
            <td><label style="color:Green;">Высота</label></td>
            <td><input id="height_palette" type="number"/></td>
        </tr>
        <tr>
            <td><label style="color:Blue;">Длина</label></td>
            <td><input id="depth_palette" type="number"/></td>
        </tr>
		<td> </td>
        <tr>
            <td><button id = "button24" type="button" >Добавить / Изменить</button></td>
            <td><button id = "button25" type="button" >Удалить грузовое помещение</button></td>
            
        </tr>
    </table>
</fieldset>
    `;
    
let form2 = document.createElement('form2');
form2.id = "form2";
form2.innerHTML = form2_html;
document.body.append(form2);

//Button 24 - Adding/change cargo area
let button24 = document.querySelector('#button24');
button24.addEventListener('click',cargo_area_adding);

//Button 25 - Delete all cargo areas in scene
let button25 = document.querySelector('#button25');
button25.addEventListener('click',() => (cargo_area_group.clear(),group_of_cargo_area_floor.clear(),group_of_cargo_area_attribute.clear(),present_object_parameters()));





			//Creating Form4 - Creating object,delete object on scene.
let form4_html = `
<fieldset>
				<legend>Создание грузов</legend>
					<table>
						<label>Ручное добавление грузов </label>
						<tr>
							<td><label >Колличество</label></td>
							<td><input id="quantity4" type="number"/></td>
						</tr>
						<tr>
							<td><label style="color:Red;">Ширина (width,x)</label></td>
							<td><input id="width4" type="number"/></td>
						</tr>
						<tr>
							<td><label style="color:Green;">Высота (height,y)</label></td>
							<td><input id="height4" type="number"/></td>
						</tr>
						<tr>
							<td><label style="color:Blue;">Длина (depth,z)</label></td>
							<td><input id="depth4" type="number"/></td>
						</tr>
					</table>
					<br>
					<table>
						<tr>
							<td><label style="color:Red;">X (position)</label></td>
							<td><input id="x4" type="number"/></td>
						</tr>
						<tr>
							<td><label style="color:Green;">Y (position)</label></td>
							<td><input id="y4" type="number"/></td>
						</tr>
						<tr>
							<td><label style="color:Blue;">Z (position) </label></td>
							<td><input id="z4" type="number"/></td>
						</tr>
						<td><button id = "button45" type="button" >Добавить груз</button></td>
					</table>
					<br>
					<br>
					<table>
						<tr>
							<td><label>Импорт грузов из Excel </label></td>
						</tr>
							<td><input type="file" id="myImportExcelfile" ></td>
							<td><button id = "LoadOnScreenMyFile" type="button" >Добавить грузы на экран</button></td>
					</table>
					<br>
					<br>
					<table>				
						<tr>
							<td><button id = "button42" type="button" >Не работает</button></td>
							<td><button id = "button43" type="button" >Удалить все грузы</button></td>
							<td><button id = "button44" type="button" >Вывести параметры грузов</button></td>
						</tr>
					<table/>
					
    </fieldset>
    `;
        
let form4 = document.createElement('form4');
form4.id = "form4";
form4.innerHTML = form4_html;
document.body.append(form4);

//Button42(Form 4) - Creating object
let button42 = document.querySelector('#button42');
// button42.addEventListener('click',create_object_and_present_object_parameters);

// button42.addEventListener('click',present_object_parameters)

let button45 = document.querySelector('#button45');
button45.addEventListener('click',() => (create_cargo_after_input_data_and_adding_to_scene(),present_object_parameters()))

//Button 43(Form4) - Delete all objects in scene
let button43 = document.querySelector('#button43');
button43.addEventListener('click',() => (cargo_group.clear(),present_object_parameters()));

//Button 44(Form4) - Present object parameters
let button44 = document.querySelector('#button44');
button44.addEventListener('click',present_object_parameters);

//Button 44(Form4) - Present object parameters
let button_LoadOnScreenMyFile = document.querySelector('#LoadOnScreenMyFile');
button_LoadOnScreenMyFile.addEventListener('click',import_from_excel);





							//Creating Form5 - Placement cargo according to algorithm
let form5_html = `
<fieldset>
<legend>Автоматическая расстановка. Экспорт в Excel.</legend>
    <table>
        <td><button id = "button53" type="button" class = "button1">Не работает</button></td>
		<td><button id = "button54" type="button" class = "button1">Расчитать на локальном сервере</button></td>
	</table>
	<br>
	<br>
	<table>
		<td><button id = "button55" type="button" class = "button1">Экспорт параметров грузов в документ Excel</button></td>
	</table>
</fieldset>
    `;
    
	
let form5 = document.createElement('form5');
form5.id = "form5";
form5.innerHTML = form5_html;
document.body.append(form5);
               
//Button 53 - creating buttons 'placement cargo according with algorithm"
let button53 = document.querySelector('#button53');


//Button 54 - creating buttons 'placement cargo according with algorithm"
let button54 = document.querySelector('#button54');
button54.addEventListener('click',placement_cargo_according_to_algorithm_on_local_server);

//Button 54 - creating buttons 'placement cargo according with algorithm"
let button55 = document.querySelector('#button55');
button55.addEventListener('click',export_to_excel);




    