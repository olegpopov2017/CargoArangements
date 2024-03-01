import * as THREE from 'three';
import {Box, Cuboid} from './classes.js';
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
    let parent_cube = new Cuboid
    let cargo_area = palette_group.children[0];
     
    parent_cube.uuid = cargo_area.uuid;
    parent_cube.length = cargo_area.scale.z*2;
    parent_cube.width = cargo_area.scale.x*2;
    parent_cube.height = cargo_area.scale.y*2;
    
    for(let i =0;i<group1.children.length;i++)
        {
            let children_cube = new Cuboid;
            let inner_cube = group1.children[i];

            children_cube.uuid = inner_cube.uuid;
            children_cube.length = inner_cube.scale.z*2;
            children_cube.width = inner_cube.scale.x*2;
            children_cube.height = inner_cube.scale.y*2;

            children_cube.x = inner_cube.position.z-inner_cube.scale.z;
            children_cube.y = inner_cube.position.y-inner_cube.scale.y;
            children_cube.z = inner_cube.position.x-inner_cube.scale.x;

 
            

            // '    Coordinates:  ','X =',arr.position.z-arr.scale.z,'; Y =',arr.position.y-arr.scale.y, '; Z =',arr.position.x-arr.scale.x
            parent_cube.array_of_inner_objects.push(children_cube);

        }
    
    return parent_cube
}


export function button53_function()
{
    let box = button52_function()
    // console.log(box)

    fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box)})
        .then((response) => {
            return response.json();
        })
            .then((data) => {
                palette_group.clear()
                group1.clear()

                let parent_cube = data;

                console.log(parent_cube)
                
                let lenght = Number(parent_cube.length); 
                let width = Number(parent_cube.width);
                let height = Number(parent_cube.height); 
                let x = Number(parent_cube.x);
                let y = Number(parent_cube.y);
                let z = Number(parent_cube.z);

                const box_three = new THREE.Box3();
                box_three.setFromCenterAndSize(new THREE.Vector3( z+(width/2), y+(height/2),  x+(lenght/2)), new THREE.Vector3( width,height,lenght ) );
                const helper = new THREE.Box3Helper(box_three, 0xf0707 );
                palette_group.add(helper);
                
                for(let i = 0; i < parent_cube.array_of_inner_objects.length; i++)
                {
                    let children_cube = parent_cube.array_of_inner_objects[i]

                    // console.log('11')
                    
                    // console.log(children_cube)
                    
                    let lenght = Number(children_cube.length); 
                    let width = Number(children_cube.width);
                    let height = Number(children_cube.height); 
                    let x = Number(children_cube.x);
                    let y = Number(children_cube.y);
                    let z = Number(children_cube.z);

                    // console.log(lenght,width,x,y,z)

                    const box_three = new THREE.Box3();
                    box_three.setFromCenterAndSize(new THREE.Vector3( z+(width/2), y+(height/2),  x+(lenght/2)), new THREE.Vector3( width,height,lenght ) );
                    const helper = new THREE.Box3Helper(box_three, 0x000000 );
                    
                    // console.log(helper)
                    group1.add(helper);

                }
                
                // let box1 = data;
                // let lenght = Number(box1.length); 
                // let width = Number(box1.width);
                // let height = Number(box1.height); 
                // let x = Number(box1.x);
                // let y = Number(box1.y);
                // let z = Number(box1.z);
                                               
                // const box_three = new THREE.Box3();
                // box_three.setFromCenterAndSize(new THREE.Vector3( z+(width/2), y+(height/2),  x+(lenght/2)), new THREE.Vector3( width,height,lenght ) );
                
                // const helper = new THREE.Box3Helper(box_three, 0x000000 );
                // group1.add(helper);
                
            });
    
}