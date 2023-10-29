"use strict";

/** variables */
const btnIniciarSesion = document.querySelector('#btnIniciarSesion');
const btnRegistrarse = document.querySelector('#btnRegistrarse');
const resultado = document.querySelector('#resultado');

/** Iniciar Aplicación */
obligatorio();
function obligatorio() {
    document.addEventListener('DOMContentLoaded', eventListeners => {
        btnIniciarSesion.addEventListener('click', login);
        btnRegistrarse.addEventListener('click', registrarse);
    });
}

cargarNavegacion();
ocultarTodo(); /** Ocultar todo el contenido HTML */

/** Mostrar solamente Login cuando se inicia la app*/
iniciarObligatorio();
function iniciarObligatorio() {
    document.querySelector('#divLogin').style.display = 'block';
}

/** Instancias */
const sistema = new Sistema();
preCargarDatosUsuario();

/** Funciones */
function login() {

    const nombreUsuario = document.querySelector('#nombreUsuario').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (Usuario.validarNombreUsuario(nombreUsuario) && Usuario.validarPassword(password)) {

        if (sistema.login(nombreUsuario, password)) {

            mostrarSecciones('usuario');
            document.querySelector("#divLogin").style.display = "none";

        } else {

            UI.imprimirAlerta('Nombre de Uusario o Contraseña incorrectos', 'error');
        }
    }
}

function registrarse() {

    console.log('Desde el formulario Regitrarse');
} 

