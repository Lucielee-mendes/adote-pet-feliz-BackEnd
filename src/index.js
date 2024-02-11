//configuração inicial

const express = require('express')
const cors = require('cors');
const app = express()
const path = require('path');
const multer = require('multer');


//configuração de banco
const mongoose = require('mongoose')
const { ObjectId } = require('mongoose').Types;

const Login = require('../model/login')
const Cadastro = require('../model/cadastro')
const PerfilUsuario = require('../model/perfilUsuario')
const CadastroPet = require('../model/cadastroPet');

//imagem
const uploadUser = require('./config/config');
const { request } = require('http');


app.use(cors());

app.use(
    express.urlencoded({
        extended: true
    })
)


//criação das rotas
app.use(express.json())

app.use('/files',
    express.static(path.resolve(__dirname, 'uploads')));

app.get('/getImagem/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(404).json({ error: 'Imagem não encontrada' });
        }
    });
});

const upload = multer(uploadUser.upload());

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






app.post('/cadastro', upload.single('image'), async (req, res) => {
    const json = req.body.json ? JSON.parse(req.body.json) : {}
    const { nome, email, confirmEmail, senha, whatsApp, telefone, estado, cidade, possuiCasaTelada, possuiDisponibilidadeCastrar, possuiDisponibilidadeVacinar, sobreVoce } = json;
    const cadastro = {
        nome,
        email,
        confirmEmail,
        senha,
        whatsApp,
        telefone,
        estado,
        cidade,
        possuiCasaTelada,
        possuiDisponibilidadeCastrar,
        possuiDisponibilidadeVacinar,
        sobreVoce,
        fotoPrincipal: req.file.filename
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




app.post('/cadastroPet/:userId', upload.array('image', 5), async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('Valor de userId:', userId);

        const perfilUsuario = await Cadastro.findOne({ _id: ObjectId.createFromHexString(userId) });
        console.log('Usuário encontrado:', perfilUsuario);

        if (!perfilUsuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const json = req.body.json ? JSON.parse(req.body.json) : {}
        const {
            nomePet,
            especie,
            sexo,
            idade,
            porte,
            raca,
            sobrePet,
            cuidadosVeterinarios,
            temperamento,
            viveBem,
            sociavelCom,
            estado,
            cidade,
        } = json;

        const fotos = req.files ? req.files.map(file => ({
            url: file.path,
            file: file.filename
        })) : [];

        const petData = {
            nomePet,
            especie,
            sexo,
            idade,
            porte,
            raca,
            sobrePet,
            cuidadosVeterinarios,
            temperamento,
            viveBem,
            sociavelCom,
            estado,
            cidade,
            proprietario: perfilUsuario._id,
            fotos: fotos
        };

        try {
            const novoPet = await CadastroPet.create(petData);
            res.status(201).json({ message: 'Cadastro de pet realizado com sucesso' });
        } catch (error) {
            console.error('Erro ao cadastrar pet:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/perfilPet/:petId', async (req, res) => {
    try {
        const petId = req.params.petId;
        const perfilPet = await CadastroPet.findById(petId).populate('proprietario');

        if (!perfilPet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        res.status(200).json({ perfilPet });
    } catch (error) {
        console.error('Erro ao buscar perfil do pet: ', error);
        res.status(500).json({ error: error.message });
    }
});


mongoose.connect('mongodb+srv://lucielee:Luci1010@adote-pet-feliz.0gz1wit.mongodb.net/')
    .then(() => {
        console.log('conectou')
        app.listen(3001)
    })
    .catch((err) => console.log(err))