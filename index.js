const http = require('http');
//const data = {age:5};
const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;
const server = http.createServer((req, res)=>{
        console.log(req.url);
if(req.url.startsWith('/product'))
{
    const id  = req.url.split('/')[2]
    const product = products.find(p=>p.id===(+id))
    console.log(product);
    res.setHeader('Content-Type', 'text/html');
    let modifiedIndex = index.replace('**title**', product.title)
    .replace('**url**', product.thumbnail)
    .replace('**price**', product.price)
    .replace('**rating**', product.rating)
    res.end(modifiedIndex);
    return;

    
}
        switch(req.url){
            case '/':
                res.setHeader('Content-type' , 'text/html');
                res.end(index);
                break;
            case '/api' :
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(data));
                break
          
                default :
                res.writeHead(404, 'Not found' )
                res.end();
        }

        console.log('SERVER IS START');
      //  res.setHeader('Content-type' , 'text/html')
        //res.end(index);
})
server.listen(8090)