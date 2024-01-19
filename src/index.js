//configuração inicial

const express = require('express')
const cors = require('cors');
const app = express()
const path = require('path');
const multer = require('multer');


//configuração de banco
const mongoose = require('mongoose')
const Login = require('../model/login')
const Cadastro = require('../model/cadastro')
const PerfilUsuario = require('../model/perfilUsuario')

//imagem
const uploadUser = require('./config/config')


app.use(cors());

app.use(
    express.urlencoded({
        extended: true
    })
)



//criação das rotas
app.use(express.json())

app.use('/files',
express.static(path.resolve(__dirname, 'uploads')))


app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Cadastro.findOne({ email });

        if (usuario && usuario.senha === senha) {
            res.status(200).json({ message: 'Login efetuado com sucesso', user: usuario });
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


const upload = multer(uploadUser.upload());
  
  

app.post('/cadastro', upload.single('file'), async (req, res) => {
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

app.get('/perfilUsuario/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = await PerfilUsuario.findById(userId);

        if (!userData) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ userData, fotoPrincipal: userData.fotoPrincipal });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



mongoose.connect('mongodb+srv://lucielee:Luci1010@adote-pet-feliz.0gz1wit.mongodb.net/')
    .then(() => {
        console.log('conectou')
        app.listen(3001)
    })
    .catch((err) => console.log(err))