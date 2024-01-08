const mongoose = require('mongoose');

const PerfilUsuario = mongoose.model('perfilUsuario', {
    nome: String,
    fotoPrincipal: String,
    estado: String,
    cidade: String,
    email: String,
    whatsapp: String,


});

module.exports = PerfilUsuario;
