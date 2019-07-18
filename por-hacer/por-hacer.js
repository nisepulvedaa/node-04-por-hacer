const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];


const getListado = () => {
    let listado = cargarDB();
    console.log(listado);
    for (let tarea of listado) {
        console.log('=====Por Hacer====='.green);
        console.log(tarea.descripcion);
        console.log('Estado: ', tarea.completado);
        console.log('==================='.green);
    }
}

const actualizar = (descripcion, completado = true) => {
    let lista = cargarDB();

    let index = lista.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        lista[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }


}

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];

    }
    return listadoPorHacer;

}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}