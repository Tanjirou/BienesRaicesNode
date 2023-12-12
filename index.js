import express from 'express';
import userRoutes from './routes/userRoutes.js';
//create app
const app = express();

//pug
app.set('view engine', 'pug');
app.set('views','./views');

//public
app.use(express.static('public'));

//Routing
app.use('/auth',userRoutes);

//Define a port and start the project
const port = 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});