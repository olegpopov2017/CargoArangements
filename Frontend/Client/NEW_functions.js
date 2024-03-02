import * as THREE from 'three';
import {Box, Cuboid} from './classes.js';
import {group1,palette_group,scene,animate, helper} from './three_cargo_canvas.js';



export function create_cuboid()
{   
    group1.clear()
    let length = Number(document.querySelector("#lenght4").value);
    let width = Number(document.querySelector("#width4").value);
    let height = Number(document.querySelector("#height4").value);
    let x = Number(document.querySelector("#x4").value);
    let y = Number(document.querySelector("#y4").value);
    let z = Number(document.querySelector("#z4").value);

    let cube = new Cuboid
    cube.height = height
    cube.width = width
    cube.length = length
    cube.x = x
    cube.y = y
    cube.z = z

    return cube
}



export function create_helper_from_cuboid(Cuboid)
{
    let cube = Cuboid
    let uuid,x,y,z,width,height,lenght

    uuid = cube.uuid
    x = Number(cube.x)   
    y = Number(cube.y)
    z = Number(cube.z)
    width = Number(cube.width)
    lenght = Number(cube.length)
    height = Number(cube.height)

    const box_three = new THREE.Box3();
    box_three.setFromCenterAndSize(new THREE.Vector3( x+(width/2), z+(lenght/2),  y+(height/2)), new THREE.Vector3( width,height,lenght ) );
    const helper = new THREE.Box3Helper(box_three, 0xdf0707 );

    // if(typeof(uuid) != "undefined"){helper.uuid = uuid}

    // console.log(helper.uuid)
    group1.clear(   )
    // group1.add(helper)
    animate()
    return helper
}



export function create_cuboid_from_helper_and_show_to_console()
{
    let a = create_cuboid()
    // console.log(a)
    
    let helper = create_helper_from_cuboid(a)
    group1.add(helper)
animate()
    console.log(helper)

    
    
    // console.clear()
    
    let cube = new Cuboid
    
    cube.height = helper.scale.y
    cube.width = helper.scale.x
    cube.length = helper.scale.z
    cube.x = helper.position.x
    cube.y = helper.position.z
    cube.z = helper.position.y
animate()
    // console.log(helper)
    console.log(cube)
    return cube


}