import express from 'express';
//create app
const app = express();


//Routing
app.get('/', function(req,res){
    res.send('Hola mundo');
});

//Define a port and start the project
const port = 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});