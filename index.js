//configuração inicial

const express = require('express')
const app = express()

//configuração de banco
const mongoose = require('mongoose')
const Login = require('./model/login')


app.use(
    express.urlencoded({
        extended:true
    })
)

//criação das rotas
app.use(express.json())

app.post('/login', async(req,res)=>{
    const {email, senha} = req.body
    const login = {
        email,
        senha
    }
    try{
        await Login.create(login)
        res.status(201).json({message: 'Fez login'})
    } catch(error){
        res.status(500).json({error:error})
    }
})

app.get('/login', async(req,res) =>{
    try{
        const login = await Login.find()
        res.status(200).json(login)
    } catch(error){
        res.status(500).json({error:error})
    }
})

mongoose.connect('mongodb+srv://lucielee:Luci1010@adote-pet-feliz.0gz1wit.mongodb.net/')
.then(() =>{
    console.log('conectou')
    app.listen(3000)
})
.catch((err)=>console.log(err))
