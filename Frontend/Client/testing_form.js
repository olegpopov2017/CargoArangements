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