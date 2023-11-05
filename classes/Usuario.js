class Usuario {

    static usuarioId = 0;

    constructor(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc) {

        this.id = Usuario.usuarioId++;
        this.nombre = nombre ?? '';
        this.apellido = apellido ?? '';
        this.nombreUsuario = nombreUsuario ?? '';
        this.password = password ?? '';
        this.numeroTarjeta = numeroTarjeta ?? '';
        this.cvc = cvc ?? '';
        this.aprobado = false;
        this.bloqueado = false;
    }

    validarNombre(nombre, idDiv) {

        UI.limpiarHTML();

        if (nombre.length < 0 || nombre === '') {

            UI.imprimirAlerta('El Nombre es Obligatorio', 'error', idDiv);
            return false;

        } else if (nombre.charAt(0) !== nombre.charAt(0).toUpperCase()) {

            UI.imprimirAlerta('El nombre debe comenzar con mayúscula', 'error', idDiv);
            return false;

        } else if (nombre.length < 3 || nombre.length > 15) {

            UI.imprimirAlerta('El Nombre no debe tener entre 3 y 15 caracteres', 'error', idDiv);
            return false;
        }

        let espacio = false;
        let numero = false;

        for (let index = 0; index < nombre.length; index++) {

            let letra = nombre.charAt(index);

            if (letra === ' ') {

                espacio = true;
            }

            if (!isNaN(letra)) {

                numero = true;
            }
        }

        if (espacio) {

            UI.imprimirAlerta('El nombre no puede tener espacios', 'error', idDiv);
            return false;

        } else if (numero) {

            UI.imprimirAlerta('El nombre no puede tener números', 'error', idDiv);
            return false;
        }

        return true;
    }

    validarApellido(apellido, idDiv) {

        UI.limpiarHTML();

        if (apellido.length < 0 || apellido === '') {

            UI.imprimirAlerta('El Apellido es Obligatorio', 'error', idDiv);
            return false;

        } else if (apellido.charAt(0) !== apellido.charAt(0).toUpperCase()) {

            UI.imprimirAlerta('El apellido debe comenzar con mayúscula', 'error', idDiv);
            return false;

        } else if (apellido.length < 3 || apellido.length > 10) {

            UI.imprimirAlerta('El Apellido debe tener entre 3 y 15 caracteres', 'error', idDiv);
        }

        let espacio = false;
        let numero = false;

        for (let index = 0; index < apellido.length; index++) {

            let letra = apellido.charAt(index);

            if (letra === ' ') {
                espacio = true;
            }

            if (!isNaN(letra)) {

                numero = true;
            }
        }

        if (espacio) {

            UI.imprimirAlerta('El Apellido no puede tener espacios', 'error', idDiv);
            return false;

        } else if (numero) {

            UI.imprimirAlerta('El Apellido no puede tener números', 'error', idDiv);
            return false;
        }

        return true;
    }

    validarNombreUsuario(nombreUsuario, idDiv) {

        UI.limpiarHTML();

        /** Nombre de usuario: formato string alfanumérico, case insensitive. A modo de ejemplo: martin.luz01 */
        if (nombreUsuario.length < 0 || nombreUsuario === '') {

            UI.imprimirAlerta('El Nombre de usuario es obligatorio', 'error', idDiv);
            return false;

        } else if (nombreUsuario.length < 3 && nombreUsuario.length > 15) {

            UI.imprimirAlerta('El nombre de usuario debe tener entre 3 y 15 caracteres', 'error', idDiv);
        }

        let index = 0;
        let numero = 0;
        let espacio = false;

        while (index < nombreUsuario.length) {

            let letra = nombreUsuario.charAt(index);

            if (letra === ' ') {
                espacio = true;
            }

            if (!isNaN(letra)) {
                numero++;
            }

            index++;
        }

        if (espacio) {

            UI.imprimirAlerta('El Nombre de Usuario no puede tener espacios', 'error', idDiv);
            return false;
        }

        if (numero > 2 && Number(numero) > 0) {

            UI.imprimirAlerta('El nombre de usuario solo puede tener 2 números positivos', 'error', idDiv);
            return false;

        }

        return true;
    }

    validarPassword(password, idDiv) {

        UI.limpiarHTML();

        /** Contraseña: La contraseña deberá ser un string con un mínimo de 5 caracteres, contando con al menos una 
        mayúscula, una minúscula y un número. */

        if (password.length < 0 || password === '') {

            UI.imprimirAlerta('El Password es obligatorio', 'error', idDiv);
            return false;

        } else if (password.length < 5 || password.length > 15) {

            UI.imprimirAlerta('El Password debe tener entre 5 y 15 caracteres', 'error', idDiv);
            return false;
        }

        let index = 0;
        let numero = 0;
        let espacio = false;
        let cantidadEspacio = 0
        let mayuscula = 0;
        let minuscula = 0;

        while (index < password.length) {

            let letra = password.charAt(index);
            let code = password.charCodeAt(index);

            if (code >= 65 && code <= 90 && letra === letra.toUpperCase()) {
                mayuscula++;;
            }

            if (code >= 97 && code <= 122 && letra === letra.toLowerCase()) {
                minuscula++;;
            }

            if (code >= 48 && code <= 57 && !isNaN(letra)) {
                numero++;
            }

            if (letra === ' ') {
                espacio = true;
                cantidadEspacio++;
            }

            index++;
        }

        // console.log(`Numeros: ${numero}`);
        // console.log(`Espacios: ${espacio}, ${cantidadEspacio}`);
        // console.log(`Mayuscula: ${mayuscula}`);
        // console.log(`Minuscula: ${minuscula}`);

        if (mayuscula === 0) {

            UI.imprimirAlerta('El Password debe tener al menos una mayúscula', 'error', idDiv);
            return false;

        } else if (minuscula === 0) {

            UI.imprimirAlerta('El Password debe tener al menos una minúscula', 'error', idDiv);
            return false;

        } else if (espacio) {

            UI.imprimirAlerta('El Password no puede tener espacios', 'error', idDiv);
            return false;

        } else if (Number(numero) <= 0) {

            UI.imprimirAlerta('El Password debe tener al menos 1 números', 'error', idDiv);
            return false;

        }

        return true;
    }

    validarUsuario(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc) {

        return usuario.validarNombreUsuario(nombreUsuario) && usuario.validarPassword(password);
    }

    validarRegistro(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc) {
        return usuario.validarNombre(nombre) && usuario.validarApellido(apellido) && usuario.validarNombreUsuario(nombreUsuario) && usuario.validarPassword(password) && sistema.validarNumeroTarjeta(numeroTarjeta) && sistema.validarCvc(cvc);
    }

}