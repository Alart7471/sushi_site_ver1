//const express = require('express')
import express from 'express'
import path from 'path'
//const path = require('path')
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { menu } from './modules/menu.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = 8000;
const app = express();

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

// Эндпоинт для получения меню
app.get('/api/getMenu', (req, res) => {
  res.json(menu);
});

app.listen(PORT, (err) => {
    if(err){
      return console.log(err);
    }
    console.log(`Server OK :${PORT}`)
})
