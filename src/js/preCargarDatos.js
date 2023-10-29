function preCargarDatosUsuario() {
    /** constructor (nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc, aprobado, logueado) */
    const nombre = 'Kevin';
    const apellido = 'Acuña';
    const nombreUsuario = 'kevin';
    const password = 'Kevin01';
    const numeroTarjeta = 5158459996466345;
    const cvc = 223;
    const aprobado = false;
    const logueado = true;

    sistema.agregarUsuario(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc, aprobado); /** Retorna true si se agrega correctamente */

    if(sistema.agregarUsuario) { /** retorna true o false */
        
        // UI.imprimirAlerta(`Usuario Agregado Correctamente: ${nombreUsuario}`, 'exito');

    } else {

        UI.imprimirAlerta(`Error al agregar el Usuario: ${nombreUsuario}`, 'error');
    }
}