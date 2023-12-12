const formLogin = (req, res) => {
    res.render('auth/login',{
        page:'Iniciar Sesión'
    })
}

const formRegister = (req,res) => {
    res.render('auth/register',{
        page: 'Crear Cuenta'
    })
}

const recoverPassword = (req,res) => {
    res.render('auth/recover-password',{
        page: 'Recupera tu acceso a Bienes Raices'
    })
}
export {
    formLogin,
    formRegister,
    recoverPassword
}