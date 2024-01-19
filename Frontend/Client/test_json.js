class box
{
    constructor(idn,length,weight,hight,x,y,z) 
  {
    this.name = 'box_json';
    this.idn = idn;
    this.length = length;
    this.weight = weight;
    this.hight = hight;    
    this.x = x;
    this.y = y;
    this.z = z;
  }
    foo(){};
};
let box2 = new box(11,22,33,44,55,66,77); 
let json2 = JSON.stringify(box2);
console.log(box2);


//Adding button "JSON" 
const button1 = document.querySelector('#JSON');
button1.addEventListener('click',json22);

async function json22()
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
  let xxxxx = json22()
  console.log("xxxxxxxx = " + xxxxx);
  };


//   // document.getElementById('#JSON').onclick = function () {
//   //   fetch('http://127.0.0.1:3000',{method: 'post',body: JSON.stringify(box2),AbortController: controller.signal})
//   //       .then(function (response) {
//   //           console.log(response.ok);
//   //           const data =response.json();
//   //           console.log(data);

//   //       })
//   //       .catch(alert);
// };