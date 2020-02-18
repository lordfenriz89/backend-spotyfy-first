const express=require('express');
const userControl=require('../controllers/userControl');
const multiparty=require('connect-multiparty');
var api = express.Router();

let upImgRoutr=multiparty({uploadDir:'./files/users'});


api.post('/registro', userControl.createUser);
api.post('/loginuser', userControl.login);
api.post('/editar:id', userControl.edit);
api.put('/upImgUser/:id',upImgRoutr, userControl.upImg);
api.get('/editar/:imgFile', userControl.renderImg)

module.exports = api;