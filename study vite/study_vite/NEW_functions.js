import * as THREE from 'three';
import { create_cuboid_from_cargo,create_cargo_from_cuboid } from './functions';
import {Cuboid} from './classes.js';
import {cargo_area_group,cargo_group,scene,animate, helper} from './three_cargo_canvas.js';

        //Create cuboid with inner object from cargo area and cargos.Using in API
export function threejs_scena_to_cuboid_with_inner_objects()
{
   let parent_cube = create_cuboid_from_cargo(cargo_area_group.children[0])
   
       for(let i =0; i<cargo_group.children.length; i++)
        {   
            let children_cube = create_cuboid_from_colorfulbox(cargo_group.children[i])
            parent_cube.array_of_inner_objects.push(children_cube);
        }
    return parent_cube
}


export function create_cuboid_from_colorfulbox(colorfulbox)
{
    
    let cube = new Cuboid
    
    cube.length_X = colorfulbox.geometry.parameters.width
    cube.width_Y = colorfulbox.geometry.parameters.height
    cube.height_Z = colorfulbox.geometry.parameters.depth
    cube.x = colorfulbox.position.x-0.5*(colorfulbox.geometry.parameters.width)
    cube.y = colorfulbox.position.y-0.5*(colorfulbox.geometry.parameters.height)
    cube.z = colorfulbox.position.z-0.5*(colorfulbox.geometry.parameters.depth)
    
    cube.uuid = helper.uuid
    
    return cube
}


export function cargo_area_adding_from_cuboid(cube)   
    {
    cargo_area_group.clear();
    // let cube = cube1;
    let x = Number(cube.length_X)
    let y = Number(cube.width_Y)
    let z = Number(cube.height_Z)

    //Create/adding cargo area to scene.
    const area = new THREE.Box3();
    area.setFromCenterAndSize( new THREE.Vector3( x/2,y/2 ,z/2  ), new THREE.Vector3( x, y, z));
    const cargo_area = new THREE.Box3Helper(area, 0xdf0707 );

    cargo_area_group.add(cargo_area);
    // animate()
    let geometry = new THREE.PlaneGeometry( x, y );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let plane1 = new THREE.Mesh( geometry, material );
    plane1.position.x = x/2
    plane1.position.y = y/2
    plane1.material.opacity = 0.9
    plane1.userData.ground = true;
    // cargo_area_group.add(plane1)

    //Camera look at control target
    // controls.target = new THREE.Vector3( x/2,y/2 ,0 )

    // present_object_parameters()
    return plane1
    };


export function placement_cargo_according_to_algorithm_on_local_server()
    {
    let box = threejs_scena_to_cuboid_with_inner_objects()
    // console.log(box)
    
    fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box)})
        .then((response) => {
            
            return response.json();
        })
            .then((data) => {
                let cube1 = data//

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
                // parent_cube.material.color.setHex(0xdf0707)
                
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
                    // console.log(cube1)
                }
                console.log(cube1)
                return cube1
               // present_object_parameters();
                
            })
}