import * as THREE from 'three';
import {Cuboid as cube} from './classes.js';

import {renderer,scene,camera,controls,cargo_group,cargo_area_group,group_of_cargo_area_floor} from './three_cargo_canvas.js';



//Create side of conteiner from picture
let texture_side = new THREE.TextureLoader().load('./conteiner_side.png' ); 
let material_side = new THREE.MeshBasicMaterial( { map:texture_side } );
let side_picture = new THREE.Mesh(new THREE.PlaneGeometry(200, 200),material_side);

//Create front of conteiner from picture
let texture_front = new THREE.TextureLoader().load('./conteiner_front.png' ); 
let material_front = new THREE.MeshBasicMaterial( { map:texture_front } );
let front_picture = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),material_front);

// scene.add(front)

export function create_conteiner_picture_from_cargo_area_cuboid(cube1){
    let cube = cube1

    let front = front_picture.clone()
    front.scale.x = Number(cube.width_X)
    front.scale.y = Number(cube.height_Y)
    front.position.x = Number(cube.width_X/2)
    front.position.y = Number(cube.height_Y/2)
    scene.add(front)

    let back = front_picture.clone()
    back.scale.x = Number(cube.width_X)
    back.scale.y = Number(cube.height_Y)
    back.position.x = Number(cube.width_X/2)
    back.position.y = Number(cube.height_Y/2)
    back.position.z = Number(cube.depth_Z)
    back.rotation.y = Math.PI
    // mesh.rotation.x = Math.PI ;
    scene.add(back)

}



    
    
    