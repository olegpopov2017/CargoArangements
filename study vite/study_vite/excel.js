import {Cuboid} from './classes.js'; 
import {create_cargo_from_cuboid} from './functions.js';  
import {cargo_group} from './three_cargo_canvas.js';  




//Adding function export cargos from excel file.
export function import_from_excel(){

     let load_file = document.querySelector("#myImportExcelfile");    //Save data from input user file.
     
     const file = load_file.files[0]
     const reader = new FileReader
          
     reader.onload = (Event) => {                                     //Event that fires after input file by user
               
          const data = Event.target.result
          const workbook = XLSX.read(data,{type:'array'})
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const rows_of_exel = XLSX.utils.sheet_to_json(worksheet)    //Reading all rows of excel file into variable step by step
          
          let data_from_excel = rows_of_exel;
          
          let json = Array.from(data_from_excel)                      //Type casting data of rows into array of rows.

          json.forEach((box) => {

               let cube = new Cuboid
               
               if(typeof(box['id']) != "undefined"){
                    cube.uuid = box['id']
               }
               

               if(typeof(box['position X']) != "undefined"){
                   cube.position_x = box['position X']
               } else {cube.position_x = 1}
               
               if(typeof(box['position Y']) != "undefined"){
                    cube.position_y = box['position Y']
               } else {cube.position_y = 0}

               if(typeof(box['position Z']) != "undefined"){
                    cube.position_z = box['position Z']
               } else {cube.position_z = 1}

               
               cube.width_X = box['size X (width)']
               cube.height_Y = box['size X (width)']
               cube.depth_Z = box['size X (width)']

               let cargo = create_cargo_from_cuboid(cube);
               cargo_group.add(cargo)

               // console.log(cube)


               });
               
          }
     reader.readAsArrayBuffer(file)
}