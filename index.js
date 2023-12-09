//configuração inicial

const express = require('express')
const cors = require('cors');
const app = express()

//configuração de banco
const mongoose = require('mongoose')
const Login = require('./model/login')
const Cadastro = require('./model/cadastro')

app.use(cors());

app.use(
    express.urlencoded({
        extended: true
    })
)

//criação das rotas
app.use(express.json())

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Cadastro.findOne({ email });

        if (usuario && usuario.senha === senha) {
            res.status(200).json({ message: 'Login efetuado com sucesso' });
        } else {
            res.status(401).json({ message: 'Erro ao fazer login. Verifique suas credenciais.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/login', async (req, res) => {
    try {
        const login = await Login.find()
        res.status(200).json(login)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/cadastro', async (req, res) => {
    const { nome, email, confirmEmail, senha, whatsApp, telefone, fotoPrincipal, estado, cidade, possuiCasaTelada, possuiDisponibilidadeCastrar, possuiDisponibilidadeVacinar, sobreVoce } = req.body;
    const cadastro = {
        nome,
        email,
        confirmEmail,
        senha,
        whatsApp,
        telefone,
        fotoPrincipal,
        estado,
        cidade,
        possuiCasaTelada,
        possuiDisponibilidadeCastrar,
        possuiDisponibilidadeVacinar,
        sobreVoce,
    };
    try {
        await Cadastro.create(cadastro);
        res.status(201).json({ message: 'Cadastro realizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
    mongoose.connect('mongodb+srv://lucielee:Luci1010@adote-pet-feliz.0gz1wit.mongodb.net/')
    .then(() =>{
        console.log('conectou')
        app.listen(3001)
    })
    .catch((err)=>console.log(err))
