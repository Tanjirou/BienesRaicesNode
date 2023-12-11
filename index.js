import express from 'express';
import userRoutes from './routes/userRoutes.js';
//create app
const app = express();


//Routing
app.use('/',userRoutes);
//Define a port and start the project
const port = 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});