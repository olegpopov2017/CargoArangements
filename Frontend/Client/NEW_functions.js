import * as THREE from 'three';
import {Box, Trainig_box} from './classes.js';
import {group1,palette_group,scene,animate} from './three_cargo_canvas.js';

export function function_button51()
{
    
        const box_three = new THREE.Box3();
        box_three.setFromCenterAndSize(new THREE.Vector3( 5, 6, 7), new THREE.Vector3( 8,9,10 ) );
        const helper = new THREE.Box3Helper(box_three, 0x000000 );
        
        
        const box_three1 = new THREE.Box3();
        box_three1.setFromCenterAndSize(new THREE.Vector3( 55, 66, 77), new THREE.Vector3( 88,99,100 ) );
        const helper1 = new THREE.Box3Helper(box_three1, 0x000000 );
        group1.add(helper,helper1);
        
        const box_pallete = new THREE.Box3();
        box_pallete.setFromCenterAndSize(new THREE.Vector3( 22, 33, 44), new THREE.Vector3( 55,55,66) );
        const helper_pallete = new THREE.Box3Helper(box_pallete, 0xdf0707  );
        palette_group.add(helper_pallete);
        
        animate()

    
}

export function button52_function()
{
    let t_box = new Trainig_box
    let cargo_area = palette_group.children[0];
    console.log(typeof t_box.init_array)

    t_box.init_array = group1.children.slice();
    console.log(typeof t_box.init_array)
    
    t_box.uuid = cargo_area.uuid;
    t_box.length = cargo_area.scale.z*2;
    t_box.width = cargo_area.scale.x*2;
    t_box.height = cargo_area.scale.y*2;
    
    // for(let i =0;i<=t_box.inner_objects.length;i++)
    //     {
    //         let obj = new Trainig_box;
    //         let arr = t_box.inner_objects[i];

    //         obj.uuid = arr.uuid;
    //         obj.length = arr.scale.z*2;
    //         obj.width = arr.scale.x*2;
    //         obj.height = arr.scale.y*2;

           
           
        // }
    console.log(t_box)
}