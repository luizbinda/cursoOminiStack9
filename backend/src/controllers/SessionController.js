//Metodos: index, show, store, update, destroy 
// index: listar 
// show: lista uma unica
// store: criar
// destroy: excluir 
module.exports = {
    store(req, res ) {
        return res.json({ message: "HELLO WORLD"})
    }
}