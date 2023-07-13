const express = require('express')
const conexion = require('../database/db')

exports.consultar = (req,res) => {
    conexion.query('select * from persona',(error, consulta) => {
        if(error){
            console.log("error consultando la tabla persona: "+ error)
            return
        }
        //res.send(consulta)
        res.render('index',{consulta1:consulta})
    })
}
exports.save = (req,res) => {
    const nombre = req.body.nombre
    const edad = req.body.edad
    const genero = req.body.genero
    const email = req.body.email
    //console.log(req.body, nombre, edad, genero, email)
    var comando = "insert into persona (nombre,edad,genero,email) values ('"
    comando += nombre + "',"+edad+","+genero+",'"+email+"')"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })
}
exports.consultaruno = (req,res) => {
    const id = req.params.id
    console.log(id)
    conexion.query('select * from persona where id='+id,(error, consulta) => {
        if(error){
            console.log("error consultando el id en la tabla persona: "+ error)
            return
        }
        //res.send(consulta)
        res.render('edit',{persona:consulta[0]})
    })
}
exports.actualizar = (req,res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const edad = req.body.edad
    const genero = req.body.genero
    const email = req.body.email
    //console.log(req.body, nombre, edad, genero, email)
    var comando = "update persona set nombre='"+nombre+"',edad="+edad
    comando += ",email='"+email+"',genero="+genero
    comando += " where id="+id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })
}
exports.delete = (req,res) => {
    const id = req.params.id
    var comando = "delete from persona where id="+id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.redirect('/')
        }
    })
}

//Apis
exports.api_consultatodos = (req,res) => {
    conexion.query('select * from persona',(error, consulta) => {
        if(error){
            console.log("error consultando la tabla persona: "+ error)
            return
        }
        res.send(consulta)
    })
}
exports.api_consultauno = (req,res) => {
    const id = req.params.id
    console.log(id)
    conexion.query('select * from persona where id='+id,(error, consulta) => {
        if(error){
            console.log("error consultando el id en la tabla persona: "+ error)
            return
        }
        res.send(consulta)
    })
}
exports.api_consultaunoid = (req,res) => {
    const id = req.query.id
    console.log(id)
    conexion.query('select * from persona where id='+id,(error, consulta) => {
        if(error){
            console.log("error consultando el id en la tabla persona: "+ error)
            return
        }
        res.send(consulta)
    })
}
exports.api_agregar = (req,res) => {
    //console.log("LLEGO AQUI ", req.body)
    const nombre = req.query.nombre || req.body.nombre
    const edad = req.query.edad || req.body.edad
    const genero = req.query.genero || req.body.genero
    const email = req.query.email || req.body.email
    //console.log(req.body, nombre, edad, genero, email)
    var comando = "insert into persona (nombre,edad,genero,email) values ('"
    comando += nombre + "',"+edad+","+genero+",'"+email+"')"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Registro agregado correctamente')
        }
    })
}
exports.api_actualizar = (req,res) => {
    const id = req.query.id
    const nombre = req.query.nombre
    const edad = req.query.edad
    const genero = req.query.genero
    const email = req.query.email
    //console.log(req.body, nombre, edad, genero, email)
    var comando = "update persona set nombre='"+nombre+"',edad="+edad
    comando += ",email='"+email+"',genero="+genero
    comando += " where id="+id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Registro Actualizado Correctamente')
        }
    })
}
exports.api_borrar = (req,res) => {
    const id = req.query.id
    var comando = "delete from persona where id="+id
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Registro Barrado Corerctamente')
        }
    })
}
exports.api_borrar_todo = (req,res) => {
    var comando = "delete from persona"
    console.log(comando)
    conexion.query(comando, (error, resultado) => {
        if(error){
            console.log(error)
            return
        } else {
            res.send('Registro Barrado Corerctamente')
        }
    })
}