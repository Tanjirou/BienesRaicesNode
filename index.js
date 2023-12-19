import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';

//create app
const app = express();

//enable reading in forms
app.use(express.urlencoded({extended: true}));

//enabled coockieparser
app.use(cookieParser());

//enabled CSRF
app.use( csrf({cookie:true}));

//database conection
try{
    await db.authenticate();
    db.sync();//create table if it does not exist
    console.log('Conexion correcta');
}catch(error){
    console.log(error);
}

//pug
app.set('view engine', 'pug');
app.set('views','./views');

//public
app.use(express.static('public'));

//Routing
app.use('/auth',userRoutes);

//Define a port and start the project
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});