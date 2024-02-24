import * as THREE from 'three';
import {Box} from './classes.js';
import {group1,palette_group,scene} from './main';




//Button 6 - Represent object parameters

let button6 = document.querySelector('#button6');
button6.addEventListener('click',present_object_parameters);

function present_object_parameters()
{
console.clear();
let array = group1.children;
console.log('Array lengh: ',group1.children.length)
let i;
for (i = 0; i < array.length; i++)
    {
    let arr = array[i];
    console.log('Number of object: ',i+1,'\n',
                'UUID: ',arr.uuid,'\n',
                'Scale:  ','Lenght =',arr.scale.x*2,'; Width =',arr.scale.y*2,'; Height =',arr.scale.z*2,'\n',
                'Coordinates:  ','X =',arr.position.x-arr.scale.x,'; Y =',arr.position.y-arr.scale.y, '; Z =',arr.position.z-arr.scale.z);
    }
};


