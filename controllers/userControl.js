const User=require('../models/user');
const fs=require('fs');// importmos el modulo File sistem 
const path =require('path');


function createUser(req, res){
user= new User()
params= req.body;
user.name= params.name;
user.email=params.email;
user.password=params.password;
user.confirmPassword=params.confirmPassword;
user.rol='default'
user.img=null

user.save((err, userNew) =>{
    if(err){
        res.status(500).send({message:"error on server"})
    }else{
        if(!userNew){
            res.status(200).send({message:'user not save'})
        }else{
            res.status(200).send({user: userNew});
        }
    }
})
}

//login 

function login(req, res){
    var params= req.body;
    var emailUser= params.email;
    var passUser=params.password;
    User.findOne({email:emailUser.toLowerCase()}, (err,userLogin)=>{
        if(err){
            res.status(500).send({message:'error to server'});
        }else{
            if(!userLogin){
                res.status(200).send({message:'credenciales no validas'});
            }else{
                
                    res.status(200).send({user:userLogin});
                
            }
        }
    })
}

// edit

function edit(req, res){
    var userId= req.params.userId;
    var editUser= req.body;
    User.findByIdAndUpdate(userId, editUser, (err,userEditado)=>{
        if(err){
            res.status(500).send({message:'error on server'});
        }else{
            if(!userEditado){
                res.stats(200).send({message:'no fue posible actualizar datos '})
            }else{
                res.status(200).send({User: userEditado});
            }
        }
    })

}

function upImg(req, res){
    let user= userId= req.params.id;
    var nameUser= "no ha subido ninguna imagen...";
    // validar si efectivamente  se esta enviando el archivo 
    if(req.files){
        //vamos analizar se la rutaarchivo, el nombre y la extension 
        var routeFile = req.files.img.path
        console.log(routeFile);
        var brokenFile=routeFile.split('\\');// el split genra un arreglo para solo dejar el nombre del archivo y no la ruta ompleta 
        var nameUser= brokenFile[2];//se indica la posision del arreglo 
        console.log(nameUser);
        var extensionImg = nameUser.split('.');// divide de en un arraya el file img.jpg[img, .jpg]
        console.log(extensionImg);
        var extnsionFile= extensionImg[1];
        // validar que el formato del archivo es aceptable 

        if(extnsionFile == "png" || extnsionFile== "jpg" || extnsionFile== "jpeg"){
            // actualizar del usuario del campo imagen que incialmente se tenia como null
            user.findByIdAndUpdate(userId, {img: nameUser},(err, userImg)=>{
                if (err){
                    res.status(500).send({message:"error on server "});
                }else{
                    if (!userImg){
                        res.status(200).send({message:"No fue posible subir la imagen"});
                    }else{
                        res.status(200).send({
                            img: nameUser,
                             user: userImg
                            });
                    }
                }
                
            });

        }else{
                //formato invalido 
                res.status(200).send({message:"formato invalido"})
        }
        }else{
            res.status(200).send({message:"no ha subido nngua imagen "})
        }
        
       
    
}
function renderImg(res, req){
    //pedir el archivo que queremos mostrar 

    var file =req.params.imgFile;
    var route ='./files/users/'+ file;
    fs.exists(route,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(route));

        }else {
            res.status(200).send({message:"img not found "});
        }
    })
}



module.exports={
    createUser,
    login, 
    edit,
    upImg, 
    renderImg
}