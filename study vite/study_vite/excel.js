import * as XLSX from 'xlsx';
import {Cuboid} from './classes.js'; 
import {create_cargo_from_cuboid,create_cuboid_from_cargo} from './functions.js';  
import {cargo_group} from './three_cargo_canvas.js'; 


//Adding function import cargos from excel file.
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

               let quantity = box['quantity']                         //Quantity of cargos in raw of excel document
               
               
               if(typeof(quantity) != "undefined"){                   //Adding equals cargos by user number of quantity in excel.
                    for (let i = 1; i<=quantity; i++){
                         let cube = new Cuboid

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
                              cube.height_Y = box['size Y (height)']
                              cube.depth_Z = box['size Z (depth)']

                              let cargo = create_cargo_from_cuboid(cube);
                              cargo_group.add(cargo)
                                   }
               }else {                                                //Adding one rargo if quantity is not defined by user  in excel.
               
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
                    cube.height_Y = box['size Y (height)']
                    cube.depth_Z = box['size Z (depth)']

                    let cargo = create_cargo_from_cuboid(cube);
                    cargo_group.add(cargo)
               }
          });
     }
     reader.readAsArrayBuffer(file)
}

//Adding function export cargos to excel file.
export function export_to_excel(){

     console.log('export')

     let array_of_cuboids = new Array;

     for (let i = 0; i < cargo_group.children.length; i++){                     //Create array of cuboids from cargo group         
          let cube = create_cuboid_from_cargo(cargo_group.children[i])

          delete cube.array_of_inner_objects                                    //Delete unwanted parameter in cube
          delete cube.array_of_outer_objects                                    //Delete unwanted parameter in cube

          cube.position_x = Number(cube.position_x).toFixed(2)                  //Fix value 2 numbers after float
          cube.position_z = Number(cube.position_z).toFixed(2)                  //Fix value 2 numbers after float
          
          if(Number(cube.position_y) < 1){cube.position_y = 0} else {
               cube.position_y = Number(cube.position_y).toFixed(2)                  //Fix value 2 numbers after float
               }
          array_of_cuboids.push(cube)
     }

     let json = array_of_cuboids                                                //Create json from cargo group
     json.forEach((cargo) => {cargo})                                           //Create json from cargo group

     
     const worksheet = XLSX.utils.json_to_sheet(json);
     const workbook = XLSX.utils.book_new();
     
     //Rename headers according to excel file
     XLSX.utils.sheet_add_aoa(worksheet, [["id", "size X (width)","size Y (height)","size Z (depth)","position X","position Y","position Z","quantity",]], { origin: "A1" });
     
     XLSX.utils.book_append_sheet(workbook, worksheet, "Cargos");

     //Set size of columns
     if(!worksheet["!cols"]) worksheet["!cols"] = [];
     worksheet["!cols"][0]= {wch: 38}
     worksheet["!cols"][1]= {wch: 12}
     worksheet["!cols"][2]= {wch: 12}
     worksheet["!cols"][3]= {wch: 12}
     worksheet["!cols"][4]= {wch: 12}
     worksheet["!cols"][5]= {wch: 12}
     worksheet["!cols"][6]= {wch: 12}
     worksheet["!cols"][7]= {wch: 12}
     
     // worksheet["!cols"][0].alignment = { horizontal: 'center' };        //Setting parametrs of the cell.In trial version of library not working.
     
     XLSX.writeFile(workbook, "Arranged cargos.xlsx", { compression: true });   //Create file and save them

}
