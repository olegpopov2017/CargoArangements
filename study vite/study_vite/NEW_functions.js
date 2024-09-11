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
                cube.width_X = data.width_X
                cube.height_Y = data.height_Y
                cube.depth_Z = data.depth_Z
                cube.position_x = data.x
                cube.position_y = data.y
                cube.position_z = data.z

                let parent_cube = cargo_area_adding_from_cuboid(cube)
                                
                cargo_area_group.add(parent_cube);
                
                for(let i = 0; i < data.array_of_inner_objects.length; i++)
                {
                    let inner_cube = data.array_of_inner_objects[i]
                    
                    let children_cube = new Cuboid
                    
                    children_cube.uuid = inner_cube.uuid
                    children_cube.width_X = inner_cube.width_X
                    children_cube.height_Y = inner_cube.height_Y
                    children_cube.depth_Z = inner_cube.depth_Z
                    children_cube.position_x = inner_cube.x
                    children_cube.position_y = inner_cube.y
                    children_cube.position_z = inner_cube.z
                    
                    let children = create_cargo_from_cuboid(children_cube)
                    
                    cargo_group.add(children);
                    
                }
                
                return data
                               
            }).then(present_object_parameters)
    }




//Present parameters of cargo area and cargos in console.
export function present_object_parameters()
    {
        
        try{
            console.clear()
            
            let car_area = create_cuboid_from_cargo_area(cargo_area_group.children[0])
            
            if(typeof(car_area) === "undefined"){throw new Error("Cargo area not createted. Please create cargo area and try again.")}

            if( car_area.width_X == 0 ||
            car_area.height_Y == 0 ||
            car_area.depth_Z == 0)
            {throw new Error("Cargo area size not valid. Please enter correct size and try again.")}
            
            if(cargo_group.children.length == 0) {throw new Error("No objects in cargo area.")}

            console.log(' Cargo area UUID: ',car_area.uuid,'\n',
                            'Cargo area size:  ','Width =',car_area.width_X,'; Height =',car_area.height_Y,'; depth =',car_area.depth_Z,'\n',
                            'Number of objects in the cargo area:',cargo_group.children.length,'\n',)
                    


                for (let i = 1; i < cargo_group.children.length; ++i)
                    {
                    let cargo = create_cuboid_from_cargo(cargo_group.children[i]);

                    if( cargo.width_X == 0 ||
                        cargo.height_Y == 0 ||
                        cargo.depth_Z == 0)
                    {console.log("Cargo uuid",cargo.uuid ,"size not valid. Please enter correct size and try again.")}
                    
                    console.log('     Number of object: ',i+1,'\n',
                                '    UUID: ',cargo.uuid,'\n',
                                '    Size:  ','Width =',cargo.width_X,'; Height =',cargo.height_Y,'; Depth =',cargo.depth_Z,'\n',
                                '    Coordinates:  ','X =',cargo.position_x,'; Y =',cargo.position_y, '; Z =',cargo.position_z
                                );
                    
                    // animate()
                    }
            } 
            catch (err) 
            {
                console.log(err.message)
            }
    }