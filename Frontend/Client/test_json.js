export class box
{
  constructor(length,weight,hight,x,y,z) 
  {
    this.length = length;
    this.weight = weight;
    this.hight = hight;    
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  name = 'box_json';
  foo(){};
};

let box2 = new box(11,22,33,44,55,66); 



//Adding button "Send JSON" 
const button = document.createElement('button');
button.textContent = 'Send Json';
button.setAttribute('type', 'button');
button.setAttribute('id', '1');
document.body.append(button);
button.addEventListener('click',post_method_send_json);

async function post_method_send_json()
{
        const controller = new AbortController();
        setTimeout(() => {controller.abort()}, 2000);
          
        try{
              const response = await fetch
              ('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box2),AbortController: controller.signal});
                

                if (response.ok)
                {
                  const data = await response.json();
                  console.log(data);
                }
                else{
                  console.log("Error HTTP:" + response.status);
                }
              }
          catch (error)
                {
                  if (error.name === 'AbortError')
                      alert('Abort is finished')
                  console.log("Error request:" + error.messsege);
                  throw error;
                }
    
  };


