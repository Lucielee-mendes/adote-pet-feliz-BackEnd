const mongoose = require('mongoose')

const CadastroPet = mongoose.model('cadastroPet', {
    nomePet: String,
    especie: String,
    sexo: String,
    idade: String,
    porte: String,
    raca: String,
    sobrePet: String,
    cuidadosVeterinarios: Object,
    temperamento: Object,
    viveBem: Object,
    sociavelCom: Object,
    estado: String,
    cidade: String,
    fotos: [
        { 
            url: String,
            file: Object  
        }
    ],

    proprietario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'PerfilUsuario'  // Referência ao modelo de perfil do usuário
    }
});

module.exports = CadastroPet;