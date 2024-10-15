import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import {group_of_cargo_area_attribute} from './three_cargo_canvas.js';

create_RGB_axes_helper_with_symbols(3,3,3)
//Adding text X Y Z on axes
export function create_RGB_axes_helper_with_symbols(width_x,height_y,depth_z){
    
    
    let width = Number(width_x)
    let height = Number(height_y)
    let depth = Number(depth_z) 
    
    //Searching Min value for scaling and positioneted text.
        let min = width
        if (width >= height)
            {
                min = height
                if(height >= depth){min = depth}
            }
        if (width >= depth) {min = depth}

    //Create red axe with text "X"
        //Create text "x"
        const loader_x = new FontLoader();
        loader_x.load( './optimer_regular.typeface.json', function ( font ) {

            const text_geometry = new TextGeometry( 'X', {
                font: font,
                size: 80,
                depth: 5,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
                } );
            
            let text_material =new THREE.MeshBasicMaterial({color: "red"})
            let text = new THREE.Mesh(text_geometry, text_material);
            text.scale.set(0.01*(min/4),0.01*(min/4),0.001)
            text.position.x = width+min//*1.4
            text.position.y = 0
            text.position.z = 0
            group_of_cargo_area_attribute.add(text)
        } );

        //Create red line of axes "X"
        const material_x = new THREE.LineBasicMaterial( { color: 'red' } );
        const points_x = [];
        points_x.push( new THREE.Vector3( 0, 0, 0) );
        points_x.push( new THREE.Vector3( width*1.2, 0, 0) );
        const geometry_x = new THREE.BufferGeometry().setFromPoints( points_x );
    
        const line_x = new THREE.Line( geometry_x, material_x );
        line_x.material.linewidth = 1
        group_of_cargo_area_attribute.add(line_x)

    //Create green axe with text "Y"
        //Create text "y"
        const loader_y = new FontLoader();
        loader_y.load( './optimer_regular.typeface.json', function ( font ) {
            const text_geometry = new TextGeometry( 'Y', {
                font: font,
                size: 80,
                depth: 5,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
                } );
            
            let text_material =new THREE.MeshBasicMaterial({color: "green"})
            let text = new THREE.Mesh(text_geometry, text_material);
            text.scale.set(0.01*(min/4),0.01*(min/4),0.001)
            text.position.x = 0
            text.position.y = height+min
            text.position.z = 0
            group_of_cargo_area_attribute.add(text)
        } );

        //Create green line of axes "Y"
        const material_y = new THREE.LineBasicMaterial( { color: 'green' } );
        const points_y = [];
        points_y.push( new THREE.Vector3( 0, 0, 0) );
        points_y.push( new THREE.Vector3( 0, height_y*1.2, 0 ) );
        const geometry_y = new THREE.BufferGeometry().setFromPoints( points_y );

        const line_y = new THREE.Line( geometry_y, material_y );
        line_y.material.linewidth = 1
        group_of_cargo_area_attribute.add(line_y)

    //Create red axe with text "Z"
        //Create text "Z"
        const loader_z = new FontLoader();
        loader_z.load( './optimer_regular.typeface.json', function ( font ) {
            const text_geometry = new TextGeometry( 'Z', {
                font: font,
                size: 80,
                depth: 5,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
                } );
            
            let text_material =new THREE.MeshBasicMaterial({color: "blue"})
            let text = new THREE.Mesh(text_geometry, text_material);
            text.scale.set(0.01*(min/4),0.01*(min/4),0.001)
            text.position.x = 0
            text.position.y = 0
            text.position.z = depth*1.3+min//+ Number(text.geometry.parameters.options.size)
            text.rotation.y = Math.PI/2 
            // console.log(text)
            group_of_cargo_area_attribute.add(text)
        } );

        //Create blue line of axes "Z"
        const material_z = new THREE.LineBasicMaterial( { color: 'blue' } );
        const points_z = [];
        points_z.push( new THREE.Vector3( 0, 0, 0) );
        points_z.push( new THREE.Vector3( 0, 0, depth_z*1.2 ) );
        const geometry_z = new THREE.BufferGeometry().setFromPoints( points_z );

        const line_z = new THREE.Line( geometry_z, material_z );
        line_z.material.linewidth = 1
        group_of_cargo_area_attribute.add(line_z)




}
