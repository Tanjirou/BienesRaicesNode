import  express  from "express";

const router = express.Router();

router.get('/', (req,res) => res.json({msg: 'Hola Mundo con express'}));

router.post('/', (req,res) => res.json({msg:'Respuesta de tipo post'}));
//grouping equal routes but with different methods
// router.route('/')
//     .get(function(req,res){
//         res.json({msg: 'Ruta con metodo get'})
//     })
//     .post(function(req,res){
//         res.json({msg: 'Ruta con metodo post'})
//     })
export default router;
