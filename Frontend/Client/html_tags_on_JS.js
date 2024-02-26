import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene} from './three_cargo_canvas.js';


        //Creating Form1 - Creating object,change coordinates on server.
let form1_html = `
<fieldset>
				<legend>Создание обьекта,изменение координат на сервере</legend>
					<table>
						<tr>
							<td><label >Длина</label></td>
							<td><input id="lenght" type="number"/></td>
						</tr>
						<tr>
							<td><label>Ширина</label></td>
							<td><input id="width" type="number"/></td>
						</tr>
						<tr>
							<td><label>Высота</label></td>
							<td><input id="height" type="number"/></td>
						</tr>
						<tr>
							<td><label>X</label></td>
							<td><input id="x" type="number"/></td>
						</tr>
						<tr>
							<td><label>Y</label></td>
							<td><input id="y" type="number"/></td>
						</tr>
						<tr>
							<td><label>Z</label></td>
							<td><input id="z" type="number"/></td>
						</tr>
						<tr>
							<td><button id = "button2" type="button" >Создать</button></td>
							<td><button id = "button3" type="button" >Удалить все обьекты</button></td>
							<td><button id = "button6" type="button" >Показать параметры объектов</button></td>

						</tr>
					</table>
    </fieldset>
    `;
    
    
    let form1 = document.createElement('form1');
    form1.id = "form1";
    form1.innerHTML = form1_html;
    //document.body.append(form1);



//Creating Form2 - Adding/delete cargo box to scene

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
            <td><button id = "button4" type="button" >Добавить</button></td>
            <td><button id = "button5" type="button" >Удалить</button></td>
            
        </tr>
    </table>
</fieldset>
    `;
    
    
    let form2 = document.createElement('form2');
    form2.id = "form2";
    form2.innerHTML = form2_html;
    document.body.append(form2);


    