import * as THREE from 'three';
import { create_cuboid_from_cargo_area,create_cargo_from_cuboid,threejs_scena_to_cuboid_with_inner_objects,create_cuboid_from_cargo,cargo_area_adding_from_cuboid } from './functions';
import {Cuboid} from './classes.js';
import {cargo_area_group,cargo_group} from './three_cargo_canvas.js';

       

//Send data of scena(cargo area,cargos) to local algorithm and come back result on the screen.
export function placement_cargo_according_to_algorithm_on_local_server()
    {
    let box = threejs_scena_to_cuboid_with_inner_objects()
    
    fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box)})
        .then((response) => {
            
            return response.json();
        })
            .then((data) => {
                
                cargo_area_group.clear()
                cargo_group.clear()
                
                let cube = new Cuboid

                cube.uuid = data.uuid
                cube.length_X = data.length_X
                cube.width_Y = data.width_Y
                cube.height_Z = data.height_Z
                cube.x = data.x
                cube.y = data.y
                cube.z = data.z

                let parent_cube = cargo_area_adding_from_cuboid(cube)
                                
                cargo_area_group.add(parent_cube);
                
                for(let i = 0; i < data.array_of_inner_objects.length; i++)
                {
                    let inner_cube = data.array_of_inner_objects[i]
                    
                    let children_cube = new Cuboid
                    
                    children_cube.uuid = inner_cube.uuid
                    children_cube.length_X = inner_cube.length_X
                    children_cube.width_Y = inner_cube.width_Y
                    children_cube.height_Z = inner_cube.height_Z
                    children_cube.x = inner_cube.x
                    children_cube.y = inner_cube.y
                    children_cube.z = inner_cube.z
                    
                    let children = create_cargo_from_cuboid(children_cube)
                    
                    cargo_group.add(children);
                    
                }
                
                return data
                               
            })
    }




//Present parameters of cargo area and cargos in console.
export function present_object_parameters()
    {
        
        try{
            console.clear()
            
            let car_area = create_cuboid_from_cargo_area(cargo_area_group.children[0])
            
            if(typeof(car_area) === "undefined"){throw new Error("Cargo area not createted. Please create cargo area and try again.")}

            if( car_area.length_X == 0 ||
            car_area.width_Y == 0 ||
            car_area.height_Z == 0)
            {throw new Error("Cargo area size not valid. Please enter correct size and try again.")}
            
            if(cargo_group.children.length == 0) {throw new Error("No objects in cargo area.")}

            console.log(' Cargo area UUID: ',car_area.uuid,'\n',
                            'Cargo area scale:  ','Lenght =',car_area.length_X,'; Width =',car_area.width_Y,'; Height =',car_area.height_Z,'\n',
                            'Number of objects in the cargo area:',cargo_group.children.length,'\n',)
                    


                for (let i = 0; i < cargo_group.children.length; ++i)
                    {
                    let cargo = create_cuboid_from_cargo(cargo_group.children[i]);

                    if( cargo.length_X == 0 ||
                        cargo.width_Y == 0 ||
                        cargo.height_Z == 0)
                    {console.log("Cargo uuid",cargo.uuid ,"size not valid. Please enter correct size and try again.")}
                    
                    console.log('     Number of object: ',i+1,'\n',
                                '    UUID: ',cargo.uuid,'\n',
                                '    Scale:  ','Lenght =',cargo.length_X,'; Width =',cargo.width_Y,'; Height =',cargo.height_Z,'\n',
                                '    Coordinates:  ','X =',cargo.x,'; Y =',cargo.y, '; Z =',cargo.z
                                );
                    
                    // animate()
                    }
            } 
            catch (err) 
            {
                console.log(err.message)
            }
    }