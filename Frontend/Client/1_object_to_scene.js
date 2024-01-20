import {box} from './test_json.js';
let z = new box(1,1,1,1,1,1);
console.log("qqqq");
console.log(z);



const button = document.createElement('form');
button.textContent = 'Send Json';
button.setAttribute('type', 'button');
button.setAttribute('id', '1');
document.body.append(button);
button.addEventListener('click',post_method_send_json);


