const mongoose = require('mongoose');

const PerfilUsuario = mongoose.model('perfilUsuario', {
    nome: String,
    fotoPrincipal: String,
    estado: String,
    cidade: String,
    email: String,
    whatsapp: String,  
    possuiCasaTelada: Boolean,
    possuiDisponibilidadeCastrar: Boolean,
    possuiDisponibilidadeVacinar: Boolean,
    sobreVoce: String,
});

module.exports = PerfilUsuario;
