import 'tabulator-tables/dist/css/tabulator.min.css';
import {Tabulator} from 'tabulator-tables';
// import {draggable_cargo} from './Dragging and Collisions'
import {create_cuboid_from_cargo} from './functions'

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
    console.log(box )
    let tabledata =[{
        guid:box.uuid,
        width:box.width_X,
        height:box.height_Y,
        depth:box.depth_Z,
        pos_x: Number(box.position_x).toFixed(2),
        pos_y:Math.abs(Number(box.position_y).toFixed(2)),
        pos_z: Number(box.position_z).toFixed(2)
        
        }]
    return tabledata
}
    
 

export function updateTable(draggable){  
    
    let tabledata = updateDragableData(draggable)

    let table = new Tabulator("#cargo_table", {
        height:"200px",
        width:"700px",
        data:tabledata,
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
    
    
}



