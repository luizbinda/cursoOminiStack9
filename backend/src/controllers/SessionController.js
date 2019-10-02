//Metodos: index, show, store, update, destroy 
// index: listar 
// show: lista uma unica
// store: criar
// destroy: excluir 
const User = require('../models/User')

module.exports = {
    async store(req, res ) {
        const {email} = req.body

        let user = await User.findOne({ email })

        if (!user)
            user = await User.create({ email })
        
            return res.json(user)
    }
}