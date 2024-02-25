import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene} from './main';




                        // Creating Form4 - Test form on HTML

                        
let comment = `
<form id= "form4">
<fieldset>	
<legend>Создание формы на JS</legend>
<table>
<tr>

<td><label >тестовая форма</label></td>
<td><input id="lenght" type="number"/></td>

<tr>
<td><button id = "button2" type="button" >Создать</button></td>
</tr>
</tr>
</table>
</form> 
`;
        
let form = document.createElement('div');
form.id = "form4";
form.innerHTML = comment;
document.body.append(form);