const express= require('express');
const path= require('path');
const bodyParser= require('body-parser');
const device=require('express-device');
const app=express();

//INITIALITZATION

app.set('port',  process.env.PORT || 4200);

//settings

require('./database');


//SERVER LISTENING 
app.listen(app.get('port'),()=>{
    console.log('Bitfy escuchando en el puerto:' , app.get('port'));
});



//MIDDLEWARE
app.use(device.capture());

app.use(bodyParser.json());


// routes
const usuarioRutas=require('./routes/user');


//init routes 
app.use('/api', usuarioRutas);


//export
module.exports=app;