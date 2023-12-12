const formLogin = (req, res) => {
    res.render('auth/login',{
        authenticate: false
    })
}

const formRegister = (req,res) => {
    res.render('auth/register',{

    })
}

export {
    formLogin,
    formRegister
}