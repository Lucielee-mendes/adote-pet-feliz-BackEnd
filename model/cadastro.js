const mongoose = require('mongoose')

const Cadastro = mongoose.model('cadastro', {
    nome: String,
    email: String,
    confirmEmail: String,
    senha: String,
    whatsApp: String,
    telefone: String,
    fotoPrincipal: String,
    estado: String,
    cidade: String,
    possuiCasaTelada: Boolean,
    possuiDisponibilidadeCastrar: Boolean,
    possuiDisponibilidadeVacinar: Boolean,
    sobreVoce: String,
});

module.exports = Cadastro;

