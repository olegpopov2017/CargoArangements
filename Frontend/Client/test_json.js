import {scene,helper,} from './main';

export class Box
{
  // length = 1;
  // width = 1;
  // height = 1;
  // x = 1;
  // y = 1;
  // z = 1;
  name = 'box_json';
  constructor(length,width,height,x,y,z) 
  {
    this.length = length;
    this.width = width;
    this.height = height;    
    this.x = x;
    this.y = y;
    this.z = z;
  }
};



// //Adding button "Send JSON" 
// const button = document.createElement('button');
// button.textContent = 'Send Json';
// button.setAttribute('type', 'button');
// document.body.append(button);
// button.addEventListener('click',click);





// async function click()
// {
//   let box2 = new Box(2,2,2,1,1,1); 

// scene.remove(helper);


// const controller = new AbortController();
// setTimeout(() => {controller.abort()}, 2000);

// let response = await fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box2),AbortController: controller.signal});

// let box = await response.json();
// // console.log(box);

// }
