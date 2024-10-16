const http = require('http');
const url = require ('url');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) =>  
    {   
        //Disable CORS security in server.
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        res.setHeader('Content-Type','application/json');     
       
        // Post
        if(req.method == 'POST') {
            //Concatenate request data (chunk) to  string var "body"
            let body ='';
            req.on('data',chunk =>{
            body += chunk.toString()
            });
            req.on('end',()=>{
            
            //Interacring with request data (var "body")
            
            let x = JSON.parse(body);
            // console.log(x);
            
            x.x = x.x +1;
            x.y = x.y +1;
            x.z = x.z + 1;
            
            console.log(x);

            let y = JSON.stringify(x);
            
            
            // Sending response to clint in format JSON.
            res.end(y);
            });
        
    }   
}
);


server.listen(port, hostname, () => 
{console.log(`Server running at http://${hostname}:${port}/`);});


