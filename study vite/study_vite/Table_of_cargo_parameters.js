import 'tabulator-tables/dist/css/tabulator.min.css';
import {Tabulator} from 'tabulator-tables';
// import {draggable_cargo} from './Dragging and Collisions'
import {create_cuboid_from_cargo,threejs_scena_to_cuboid_with_inner_objects} from './functions'

//Creating HTML TAG table
let table_html = `<div id="cargo_table"></div>`;
let table1 = document.createElement('cargo_table');
table1.id = 'cargo_table'
table1.innerHTML = table_html
document.body.append(table1)

//Creating empty table for first visualization
let table = new Tabulator("#cargo_table", {
    height:"200px",
    width:"700px",
    // data:tabledata,
    columns:[
        {title:"GUID", field:"guid", hozAlign:"center",headerHozAlign:"center",width:250},
        {title:"Width X", field:"width", hozAlign:"center",headerHozAlign:"center"},
        {title:"Height Y", field:"height", hozAlign:"center",headerHozAlign:"center"},
        {title:"Depth Z", field:"depth", hozAlign:"center",headerHozAlign:"center"},
        {title:"Position X", field:"pos_x", hozAlign:"center",headerHozAlign:"center"},
        {title:"Position Y", field:"pos_y", hozAlign:"center",headerHozAlign:"center"},
        {title:"Position Z", field:"pos_z", hozAlign:"center",headerHozAlign:"center"},

    ],
});


//Creating function that view changing parameters of cargos when it dragging by user.
function updateDragableData(dragable){

    let box = create_cuboid_from_cargo(dragable)
    // console.log(box )
    let dragableData ={
        guid:box.uuid,
        width:box.width_X,
        height:box.height_Y,
        depth:box.depth_Z,
        pos_x: Number(box.position_x).toFixed(2),
        pos_y:Math.abs(Number(box.position_y).toFixed(2)),
        pos_z: Number(box.position_z).toFixed(2)
        
        }
    return dragableData
}
    
 function updateCargosData(){
    let cargoArea = threejs_scena_to_cuboid_with_inner_objects()
    // console.log(cargoArea)
    let cargos = [...cargoArea.array_of_inner_objects]
    let cargosData  = []
        for (let i = 0; i<cargos.length;i++){    
                let box = {
                    guid:cargos[i].uuid, 
                    width : cargos[i].width_X,
                    height :cargos[i].height_Y,
                    depth : cargos[i].depth_Z,
                    pos_x : Number(cargos[i].position_x).toFixed(2),
                    pos_y : Math.abs(Number(cargos[i].position_y).toFixed(2)),
                    pos_z :  Number(cargos[i].position_z).toFixed(2)
                }
                // console.log(box,"qqqq")
            cargosData.push(box)
            }
            // console.log(cargosData)
            return cargosData
    }   
        
    
            
    
 

export function updateTable(draggable){  
    
    let dragbleData = updateDragableData(draggable)
    let cargoData = updateCargosData()
    cargoData.unshift(dragbleData)
    console.log(cargoData,"www")
    let tabledata = cargoData
    console.log(tabledata,"data")

    let table = new Tabulator("#cargo_table", {
        height:"200px",
        width:"700px",
        data:tabledata,
        // layout: "fitColumns",
        columns:[
            
            {title:"GUID", field:"guid", hozAlign:"center",headerHozAlign:"center",width:250},
            {title:"Width X", field:"width", hozAlign:"center",headerHozAlign:"center"},
            {title:"Height Y", field:"height", hozAlign:"center",headerHozAlign:"center"},
            {title:"Depth Z", field:"depth", hozAlign:"center",headerHozAlign:"center"},
            {title:"Position X", field:"pos_x", hozAlign:"center",headerHozAlign:"center"},
            {title:"Position Y", field:"pos_y", hozAlign:"center",headerHozAlign:"center"},
            {title:"Position Z", field:"pos_z", hozAlign:"center",headerHozAlign:"center"},
        ],
        
        rowFormatter: function(row) {
                // console.log(row.getPosition())
                if(row.getPosition()==1){
                // row.getElement().style.backgroundColor = "#1e3b20";
                row.getElement().style.color = "#ff5733"

            }
            // // Change color of the first row
            // if (row.getPosition() === 0) {
            //     row.getElement().classList.add("highlight-row");
            // }
            // // Change color for other conditions (e.g., age > 30)
            // const data = row.getData();
            // if (data.age > 30) {
            //     row.getElement().classList.add("another-highlight-row");
            // }
        }
    });
    
    
}


export function testfunc() {
    // Example of new data
    var newRowData = {
        
        guid:1,
        width:1,
        height:1,
        depth:1,
        pos_x: 1,
        pos_y:1,
        pos_z: 1
        
            
    };
    
    // Add the new row to the table
    table.addData([newRowData]);
    console.log(table.getData())
}
// document.getElementById("button42").addEventListener("click", testfunc());
// let button42 = document.querySelector('#button42');
//     button42.addEventListener('click',testfunc);