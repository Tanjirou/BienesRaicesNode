import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import { generateId } from "../helpers/tokens.js";
import { emailRegister } from "../helpers/emails.js";

const formLogin = (req, res) => {
    res.render('auth/login',{
        page:'Iniciar Sesión'
    })
}

const formRegister = (req,res) => {
    res.render('auth/register',{
        page: 'Crear Cuenta',
        csrfToken: req.csrfToken()
    })
}

const register = async (req,res) => {
    //validation
    await check('name').notEmpty().withMessage('El Nombre no puede ir vacío.').run(req);
    await check('email').isEmail().withMessage('Eso no parece un email.').run(req);
    await check('password').isLength({min:6}).withMessage('El Password debe ser de al menos 6 caracteres.').run(req);
    await check('repeat_password').equals(req.body.password).withMessage('Las Contraseñas no son iguales.').run(req);
    let result = validationResult(req);
    if(!result.isEmpty()){
       return res.render('auth/register',{
            page: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            error: result.array(),
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }
    //apply destroctoring
    const {name, email, password} = req.body;
    //verify user
    const userExist = await User.findOne({where:{email}});
    if(userExist){
        return res.render('auth/register',{
            page: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            error: [{msg: 'El usuario ya está registrado'}],
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }
    const user = await User.create({
        name,
        email,
        password,
        token:generateId()
    });
    //send confirmation email 
    emailRegister({
        name: user.name,
        email: user.email,
        token: user.token
    });
    //confirmation message
    res.render('templates/message',{
        page: 'Cuenta Creada Correctamente',
        message: 'Hemos enviado un email de confirmación, precione en el enlace'
    })
    
}

const recoverPassword = (req,res) => {
    res.render('auth/recover-password',{
        page: 'Recupera tu acceso a Bienes Raices'
    })
}

const confirm = async (req,res) => {
    const {token} = req.params;
    
    //verify token if is valid
    const user = await User.findOne({where:{token}});
    if(!user){
        return res.render('auth/confirm', {
            page: 'Error al confirmar tu cuenta',
            message: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        });
    }
  
    //account confirm
    user.token = null;
    user.confirm = true;
    await user.save();
    return res.render('auth/confirm', {
        page: 'Cuenta Confirmada',
        message: 'La cuenta se confirmó correctamente',
    });
}
export {
    formLogin,
    formRegister,
    recoverPassword,
    register,
    confirm
}