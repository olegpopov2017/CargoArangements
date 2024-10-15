import * as THREE from 'three';
import {group_of_cargo_area_attribute} from './three_cargo_canvas.js';



//Create side of conteiner from picture
let texture_side = new THREE.TextureLoader().load('./conteiner_side.png' ); 
let material_side = new THREE.MeshBasicMaterial( { map:texture_side } );
let side_picture = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),material_side);

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
    group_of_cargo_area_attribute.add(front)

    let back = front_picture.clone()
    back.scale.x = Number(cube.width_X)
    back.scale.y = Number(cube.height_Y)
    back.position.x = Number(cube.width_X/2)
    back.position.y = Number(cube.height_Y/2)
    back.position.z = Number(cube.depth_Z)
    back.rotation.y = Math.PI
    group_of_cargo_area_attribute.add(back)

    let left = side_picture.clone()
    left.scale.x = Number(cube.depth_Z)
    left.scale.y = Number(cube.height_Y)
    left.position.x = 0
    left.position.y = Number(cube.height_Y/2)
    left.position.z = Number(cube.depth_Z/2)
    left.rotation.y = Math.PI/2
    group_of_cargo_area_attribute.add(left)

    let right = side_picture.clone()
    right.scale.x = Number(cube.depth_Z)
    right.scale.y = Number(cube.height_Y)
    right.position.x = Number(cube.width_X)
    right.position.y = Number(cube.height_Y/2)
    right.position.z = Number(cube.depth_Z/2)
    right.rotation.y = -Math.PI/2
    group_of_cargo_area_attribute.add(right)

}



    
    
    