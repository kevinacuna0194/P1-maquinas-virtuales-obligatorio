function preCargarDatosUsuario() {
    /** constructor (nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc, aprobado, logueado) */

    const usuario1 = {
        nombre: 'Kevin',
        apellido: 'Acuña',
        nombreUsuario: 'kevin',
        password: 'Kevin01',
        numeroTarjeta: 5158459996466345,
        cvc: 223,
        aprobado: true
    }

    sistema.agregarUsuario(usuario1); /** Retorna true si se agrega correctamente */

    if (sistema.agregarUsuario) { /** retorna true o false */

        // UI.imprimirAlerta(`Usuario Agregado Correctamente: ${nombreUsuario}`, 'exito');

    } else {

        UI.imprimirAlerta(`Error al agregar el Usuario: ${nombreUsuario}`, 'error');
    }
}

function preCargarDatosMaquina() {

    const maquinaComputo1 = {
        nombre: 'c7.small',
        tipo: 'Optimizadas para computo',
        costoAlquiler: 20,
        costoEncendido: 2.5,
        stock: 5,
    }

    const maquinaComputo2 = {
        nombre: 'c7.medium',
        tipo: 'Optimizadas para computo',
        costoAlquiler: 30,
        costoEncendido: 3.5,
        stock: 5,
    }

    const maquinaComputo3 = {
        nombre: 'c7.large',
        tipo: 'Optimizadas para computo',
        costoAlquiler: 50,
        costoEncendido: 6,
        stock: 5,
    }

    const maquinaMemoria1 = {
        nombre: 'r7.small',
        tipo: 'Optimizadas para memoria',
        costoAlquiler: 35,
        costoEncendido: 4,
        stock: 5,
    }

    const maquinaMemoria2 = {
        nombre: 'r7.medium',
        tipo: 'Optimizadas para memoria',
        costoAlquiler: 50,
        costoEncendido: 6.5,
        stock: 5,
    }

    const maquinaMemoria3 = {
        nombre: 'r7.large',
        tipo: 'Optimizadas para memoria',
        costoAlquiler: 60,
        costoEncendido: 7,
        stock: 5,
    }

    const maquinaAlmacenamiento1 = {
        nombre: 'i7.medium',
        tipo: 'Optimizadas para almacenamiento',
        costoAlquiler: 30,
        costoEncendido: 3.5,
        stock: 5,
    }

    const maquinaAlmacenamiento2 = {
        nombre: 'i7.large',
        tipo: 'Optimizadas para almacenamiento:',
        costoAlquiler: 50,
        costoEncendido: 6.5,
        stock: 5,
    }

    sistema.agregarMaquina(maquinaComputo1);
    sistema.agregarMaquina(maquinaComputo2);
    sistema.agregarMaquina(maquinaComputo3);
    sistema.agregarMaquina(maquinaMemoria1);
    sistema.agregarMaquina(maquinaMemoria2);
    sistema.agregarMaquina(maquinaMemoria3);
    sistema.agregarMaquina(maquinaAlmacenamiento1);
    sistema.agregarMaquina(maquinaAlmacenamiento2);
}

function preCargarAdministrador() {

    

    const administrador1 = {
        nombre: 'administrador1',
        nombreUsuario: 'admin1',
        password: 'Admin1'
    }

    const administrador2 = {
        nombre: 'administrador2',
        nombreUsuario: 'admin2',
        password: 'Admin2'
    }

    const administrador3 = {
        nombre: 'administrador3',
        nombreUsuario: 'admin3',
        password: 'Admin3'
    }

    sistema.agregarAdministrador(administrador1);
    sistema.agregarAdministrador(administrador2);
    sistema.agregarAdministrador(administrador3);
}

function preCargarUsuariosPendientes() {

    const usuario2 = {
        nombre: 'Usuario2',
        apellido: 'Usuario2',
        nombreUsuario: 'usuario2',
        password: 'Usuario2',
        numeroTarjeta: 5158459996466345,
        cvc: 223,
    }

    const usuario3 = {
        nombre: 'Usuario3',
        apellido: 'Usuario3',
        nombreUsuario: 'usuario3',
        password: 'Usuario3',
        numeroTarjeta: 5158459996466345,
        cvc: 223,
    }

    const usuario4 = {
        nombre: 'Usuario4',
        apellido: 'Usuario4',
        nombreUsuario: 'usuario4',
        password: 'Usuario4',
        numeroTarjeta: 5158459996466345,
        cvc: 223,
    }

    const usuario5 = {

        nombre: 'Usuario5',
        apellido: 'Usuario5',
        nombreUsuario: 'usuario5',
        password: 'Usuario5',
        numeroTarjeta: 5158459996466345,
        cvc: 223,
    }

    sistema.agregarUsuario(usuario2);
    sistema.agregarUsuario(usuario3);
    sistema.agregarUsuario(usuario4);
    sistema.agregarUsuario(usuario5);
}