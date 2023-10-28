"use strict";

/** variables */
const divLogin = document.querySelector('#divLogin');
const divRegistrarse = document.querySelector('#divRegistrarse');
const btnIniciarSesion = document.querySelector('#btnIniciarSesion');
const btnRegistrarse = document.querySelector('#btnRegistrarse');
const resultado = document.querySelector('#resultado');

/** Iniciar Aplicación */
obligatorio();
function obligatorio() {
    document.addEventListener('DOMContentLoaded', eventListeners);
}

/** Eventos */
function eventListeners() {
    // btnIniciarSesion.addEventListener('click', login);
    btnRegistrarse.addEventListener('click', registrarse);
}

/** Instancias */

/** Funciones */
ocultarTodo();

function registrarse() {

    console.log('Desde el formulario Regitrarse');
} 

