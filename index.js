// in command prompt/terminal
// 1. npm install hapi --save
// 2. npm init
// 3. node .

"use strict";

var Hapi = require('hapi');

const server = new Hapi.Server({  
  host: 'localhost',
  port: 3002
})

//to test. test http://localhost:3002/aboutus at browser
server.route({
  method: 'GET',
  path: '/aboutus',
  handler: (req, h) => {
      return '<h1>About Us</h1>'
  }
})

//to test. test http://localhost:3002/hello/samsuri at browser
server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: (request, h) => {
      return '<h1>Hello ' + request.params.name + '</h1>'
  }
})

//to test. test http://localhost:3000 at browser
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
      return '<h1>Hapi Server Running at '+server.info.uri+'...</h1>'
  }
})

//to test. test http://localhost:3000/result/infomina at postman app
server.route({
  method: 'POST',
  path: '/result/{MyInput}',
  handler: (request, h) => {
      return '[{"result": "' + request.params.MyInput + 
      '","Name": "' + request.payload.Name +      
      '","Phone": "' + request.payload.Phone + '"}]'
  }
})

server.route({
  method: 'POST',
  path: '/calc',
  handler: (request, h) => {
    var result = request.payload.Value1 + request.payload.Value2
      return result
  }
})

const bootUpServer = async () => 
{    
  await server.start();    
  console.log(`Server is running at ${server.info.uri}`);
 process.on('unhandledRejection', (err) => 
 {       
         console.log(err); 
         process.exit(1);    
 })
}

bootUpServer();