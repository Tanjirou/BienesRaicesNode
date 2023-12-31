import  express  from "express";
import { formLogin, formRegister, register, recoverPassword, confirm, } from "../controllers/UserController.js";
const router = express.Router();

router.get('/', (req,res) => res.json({msg: 'Hola Mundo con express'}));

router.get('/login', formLogin );
router.get('/register', formRegister);
router.post('/register', register);
router.get('/confirm/:token', confirm);
router.get('/recover-password', recoverPassword);
//grouping equal routes but with different methods
// router.route('/')
//     .get(function(req,res){
//         res.json({msg: 'Ruta con metodo get'})
//     })
//     .post(function(req,res){
//         res.json({msg: 'Ruta con metodo post'})
//     })
export default router;
