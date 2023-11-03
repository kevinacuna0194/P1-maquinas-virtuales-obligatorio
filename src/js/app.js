/** variables */
const btnIniciarSesion = document.querySelector('#btnIniciarSesion');
const btnRegistrarse = document.querySelector('#btnRegistrarse');
const btnAlquilar = document.querySelector('#btnAlquilar');
const resultado = document.querySelector('form #resultado');

/** Iniciar Aplicación */
obligatorio();
function obligatorio() {
    document.addEventListener('DOMContentLoaded', eventListeners => {
        btnIniciarSesion.addEventListener('click', login);
        btnRegistrarse.addEventListener('click', registrarse);
        btnAlquilar.addEventListener('click', alquilar);
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
const usuario = new Usuario();
const maquina = new Maquina();

console.log(sistema);

/** Pre Cargar Datos */
preCargarDatosUsuario();
preCargarDatosMaquina();
preCargarAdministrador();

/** Funciones */
function login() {

    const nombreUsuario = document.querySelector('#nombreUsuarioLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    if (usuario.validarNombreUsuario(nombreUsuario, 'resultadoLogin')) {

        if (usuario.validarPassword(password, 'resultadoLogin')) {

            console.log(password);

            if (sistema.login(nombreUsuario, password)) {

                UI.imprimirAlerta('Iniciando Sesión...', 'exito', 'resultadoLogin');

                setTimeout(() => {

                    UI.limpiarBienvenida();
                    bienvenido();

                    mostrarSecciones('usuario');
                    /** Ocultar Login */
                    document.querySelector("#divLogin").style.display = "none";

                    sistema.selectMaquina();

                    sistema.tablaMaquinas();
                    // sistema.prender();

                }, 1000);

            } else {

                UI.imprimirAlerta('Nombre de Usario o Contraseña incorrectos', 'error', 'resultadoLogin');
            }
        }
    }
}

function registrarse() {

    const nombre = document.querySelector('#nombre').value.trim();
    const apellido = document.querySelector('#apellido').value.trim();
    const nombreUsuario = document.querySelector('#nombreUsuario').value.trim().toLowerCase();
    const password = document.querySelector('#password').value.trim();
    let numeroTarjeta = document.querySelector('#numeroTarjeta').value;
    let cvc = document.querySelector('#cvc').value.trim();

    if (usuario.validarNombre(nombre, 'resultadoFormReg')) {

        if (usuario.validarApellido(apellido, 'resultadoFormReg')) {

            if (usuario.validarNombreUsuario(nombreUsuario, 'resultadoFormReg')) {

                if (usuario.validarPassword(password, 'resultadoFormReg')) {

                    if (sistema.validarNumeroTarjeta(numeroTarjeta, 'resultadoFormReg')) {

                        numeroTarjeta = Number(numeroTarjeta);

                        if (sistema.validarCvc(cvc, 'resultadoFormReg')) {

                            cvc = Number(cvc);

                            if (sistema.agregarUsuario(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc)) {

                                UI.imprimirAlerta('Usuario Agregado Correctamente', 'exito', 'resultadoFormReg');

                                document.querySelector('#formReg').reset();

                                setTimeout(() => {

                                    ocultarTodo();
                                    document.querySelector('#divLogin').style.display = 'block';

                                }, 3000);

                            } else {

                                UI.imprimirAlerta('Error al registrar el usuario', 'error', 'resultadoFormReg');
                            }

                        }
                    }
                }
            }
        }
    }
}

function alquilar() {

    const machine = Number(document.querySelector('#selectMaquina #maquina').value);

    if (maquina.validarMaquina(machine)) {

        sistema.alquilar(machine);
    }
}



