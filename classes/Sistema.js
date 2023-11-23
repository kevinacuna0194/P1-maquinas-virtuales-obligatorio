class Sistema {

    constructor() {

        this.usuarios = new Array();
        this.usuariosPendientes = new Array();
        this.usuariosBloqueados = new Array();
        this.maquinas = new Array();
        this.maquinasAlquiladas = new Array();
        this.administradores = new Array();
        this.logueado = null;
    }

    validarNumeroTarjeta(numeroTarjeta, idDiv) {

        UI.limpiarHTML();

        if (numeroTarjeta.length < 0 || numeroTarjeta === '') {

            UI.imprimirAlerta('El Número de tarjeta es obligatorio', 'error', idDiv);
            return false;
        }

        let index = 0;
        let numero = 0;
        let caracter = false;
        let espacio = false;
        let cantidadEspacio = 0;

        while (index < numeroTarjeta.length) {

            let letra = numeroTarjeta.charAt(index);
            let code = numeroTarjeta.charCodeAt(index);

            if (isNaN(letra)) {
                caracter = true;
            }

            if (code >= 48 && code <= 57 && !isNaN(letra)) {
                numero++;
            }

            if (letra === ' ') {
                espacio = true;
                cantidadEspacio++;
            }

            // index++;
        }

        if (caracter) {

            UI.imprimirAlerta('El Número de Tarjeta solo puede tener valores numéricos', 'error', idDiv);
            return false;

        } else if (espacio || cantidadEspacio > 0) {

            UI.imprimirAlerta('El Número de Tarjeta no puede contener espacios', 'error', idDiv);
            return false;

        } else if (numero < 16 || numeroTarjeta.length < 16) {

            UI.imprimirAlerta('El Número de Tarjeta debe tener 16 dígitos', 'error', idDiv);
            return false;
        }

        let valido = this.algoritmoLuhn(numeroTarjeta);

        if (!valido) {
            UI.imprimirAlerta(`El número de tarjeta: <u>${numeroTarjeta}</u> No es válido.`, 'error', idDiv);
            return false;
        }

        return true;
    }

    algoritmoLuhn(numeroTarjeta) {

        /*Se estara iterando numero a numero, desde el final del string hasta el primer caracter, se estarán sumando y sustituyendo por duplicado cuando sea par, ya que sería el segundo nro. */
        let suma = 0;
        let digitoVerificador = Number(numeroTarjeta.charAt(numeroTarjeta.length - 1));
        let contador = 0; //para saber cuando estamos en los segundos, lo pares.
        let index = numeroTarjeta.length - 2; //el penúltimo.

        //Mientras los numeros sea mayor o igual a 0 se estara tomando cada caracter
        while (index >= 0) {
            //Obtener el numero
            let digito = numeroTarjeta.charAt(index);

            //Valida que el número sea válido
            if (!isNaN(digito)) {

                let numero = Number(digito);
                //Duplicando cada segundo dígito

                if (contador % 2 == 0) {

                    numero = this.duplicarPar(numero); //porque si es mayor a 9 se deben sumar.
                }

                suma += numero; /** Acumular números */
            }

            index--;

            contador++;
        }

        let digitoVerificadorValido = this.checkDigito(suma, digitoVerificador);

        let modulodelasumaValiado = this.checkModulo(suma, digitoVerificador);

        return digitoVerificadorValido && modulodelasumaValiado;
    }

    duplicarPar(numero) {
        numero = numero * 2;
        if (numero > 9) {
            /*Si el resultado del multiplicación es mayor a 9 entonces lo descomponemos y sumamos. Como el numero sera x>=10 &&x<=19 Entonces es 1+(num % 10) 1 más el resto de dividir entre 10.*/
            numero = 1 + (numero % 10);
        }
        return numero;
    }

    checkDigito(suma, digitoVerificador) {
        /* 1. Calcular la suma de los dígitos (67). 2. Multiplicar por 9 (603). 3. Tomar el último dígito (3). 4. El resultado es el dígito de chequeo.*/

        let total = 9 * suma;

        let ultimoNro = total % 10

        return ultimoNro === digitoVerificador;
    }

    checkModulo(suma, digitoVerificador) {
        /*
        Si el total del módulo 10 es igual a O (si el total termina en cero), entonces el número es válido de acuerdo con la fórmula Luhn, de lo contrario no es válido.
        */

        let total = suma + digitoVerificador;


        let validacionFinal = false;

        if (total % 10 === 0 && total !== 0) {
            validacionFinal = true;
        }

        return validacionFinal;
    }

    validarCvc(cvc, idDiv) {

        UI.limpiarHTML();

        if (cvc.length < 0 || cvc === '') {

            UI.imprimirAlerta('El CVC es obligatorio', 'error', idDiv);
            return false;
        }

        if (sistema.espcio(cvc)) {

            UI.imprimirAlerta('El CVC no puede tener espacios', 'error', idDiv);
            return false;
        }

        if (sistema.CantidadNumeros(cvc, 'CVC') !== 3) {

            UI.imprimirAlerta('El CVC debe tener 3 números', 'error', idDiv);
            return false;
        }

        if (sistema.caracteres(cvc)) {

            UI.imprimirAlerta('El CVC solo puede tener números', 'error', idDiv);
            return false;
        }

        return true;
    }

    espcio(tipoDeDato) {

        let espacio = false;
        let cantidadEspacio = 0;

        for (let index = 0; index < tipoDeDato.length; index++) {

            let letra = tipoDeDato.charAt(index);

            if (letra === ' ') {

                espacio = true;
                cantidadEspacio++;
            }
        }

        return espacio;
    } /** return true or false */

    CantidadNumeros(tipoDeDato, campo) {

        let index = 0;
        let numero = 0;

        while (index < tipoDeDato.length) {

            let letra = tipoDeDato.charAt(index);
            let code = tipoDeDato.charCodeAt(index);

            if (code >= 48 && code <= 57 && !isNaN(letra)) {
                numero++;
            }

            index++;
        }

        return numero;
    } /** Retorna cantidad de números */

    caracteres(tipoDeDato) {

        let index = 0;
        let caracter = false;

        while (index < tipoDeDato.length) {

            let letra = tipoDeDato.charAt(index);
            let code = tipoDeDato.charCodeAt(index);

            if (code < 48 || code > 57) {
                caracter = true;
            }

            index++;
        }

        return caracter;
    } /** si contiene caracteres que no son números retorna true */

    agregarUsuario(object) {

        let agregado = false;

        const { nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc } = object;

        if (usuario.validarUsuario(nombreUsuario, password)) {

            if (object.aprobado === true) {

                const usuario = new Usuario(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc);
                usuario.aprobado = true;

                // Agregar al arreglo de usuarios
                this.usuarios.push(usuario);

            } else {

                const usuario = new Usuario(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc);

                // Agregar al arreglo de usuarios
                this.usuariosPendientes.push(usuario);
            }

            agregado = true;
        }

        return agregado;
    }

    nuevoRegistro(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc) {

        if (usuario.validarUsuario(nombreUsuario, password)) {

            for (let usuarios of this.usuarios) {

                if (usuarios.nombreUsuario === nombreUsuario) {

                    UI.imprimirAlerta('Usuario ya existe. Aprobado por Administrador', 'error', 'resultadoFormReg');
                    return;
                }
            }

            for (let usuarios of this.usuariosPendientes) {

                if (usuarios.nombreUsuario === nombreUsuario) {

                    UI.imprimirAlerta('Usuario ya existe. Pendinete de aprobación', 'error', 'resultadoFormReg');
                    return;
                }
            }

            const usuario = new Usuario(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc);
            this.usuariosPendientes.push(usuario);

            return true;
        }
    }

    login(nombreUsuario, password) {

        let encontrado = false;

        let usuario = this.obtenerUsuario(nombreUsuario); /** retorna objeto de usuario encontrado sino default null */

        if (usuario !== null && usuario.aprobado !== false) {

            if (usuario.password === password) {

                encontrado = true;
                this.logueado = usuario;
                document.querySelector('#formLogin').reset();
                return encontrado;
            }

        }

        if (usuario !== null && usuario.aprobado === false) {

            UI.limpiarHTML();

            UI.imprimirAlerta('Usuario pendiente de Aprobación', 'error', 'resultadoLogin');

            return;

        }

        if (usuario === null) {

            UI.imprimirAlerta('Nombre de Usario o Contraseña incorrectos', 'error', 'resultadoLogin');

            return;
        }
    }

    obtenerUsuario(nombreUsuario) {

        let existe = null;

        for (let index = 0; existe === null && index < this.usuarios.length; index++) {

            let usuario = this.usuarios[index];

            if (nombreUsuario === usuario.nombreUsuario) {
                existe = usuario;
            }
        }

        for (let index = 0; existe === null && index < this.administradores.length; index++) {

            let administrador = this.administradores[index];

            if (nombreUsuario === administrador.nombreUsuario) {
                existe = administrador;
            }
        }

        for (let index = 0; existe === null && index < this.usuariosPendientes.length; index++) {

            let usuarioPendiente = this.usuariosPendientes[index];

            if (nombreUsuario === usuarioPendiente.nombreUsuario) {

                existe = usuarioPendiente;
            }
        }

        return existe; /** Objeto de usuario encontrado */
    }

    agregarMaquina(object) {

        const { nombre, tipo, costoAlquiler, costoEncendido, stock } = object;

        let maquina = new Maquina(nombre, tipo, costoAlquiler, costoEncendido, stock);

        this.maquinas.push(maquina);
    }

    maquina(idMaquina) {

        let machine = null;

        for (let maquina of sistema.maquinas) {

            if (maquina.idMaquina === idMaquina) {

                machine = maquina;
            }
        }

        return machine;
    }

    maquinaAlquilada(idAlquiler) {

        let maquinaAlquilada = null;

        for (let maquina of sistema.maquinasAlquiladas) {

            if (maquina.idAlquiler === idAlquiler) {

                maquinaAlquilada = maquina;
            }
        }

        return maquinaAlquilada;
    }

    alquilar(id) {

        UI.limpiarHTML();

        let maquinaAlquilada = null;
        let posicion = 0;
        let index = 0;

        while (index < sistema.maquinas.length) {

            let maquina = sistema.maquinas[index];

            if (id === maquina.idMaquina) {

                posicion = index
                maquinaAlquilada = maquina;
            }

            index++;
        }

        if (maquinaAlquilada !== null) {

            let { idMaquina, nombre, tipo, costoAlquiler, costoEncendido, estado, stock, iniciada } = maquinaAlquilada;
            const idUsuario = this.logueado.id;

            if (stock > 0) {

                /** Restar stock y actualizar propiedad */
                let stockReal = stock - 1;
                maquinaAlquilada.stock = stockReal;

                /**Instanciar objeto Alquiler. Pasar datos al constructor */
                const alquiler = new Alquiler(idUsuario, idMaquina, nombre, tipo, estado, iniciada, costoAlquiler, costoEncendido, stockReal);

                // this.maquinasAlquiladas = [...this.maquinasAlquiladas, alquilada];
                this.maquinasAlquiladas.push(alquiler);

                ui.selectMaquina();
                /** Actualizar tabla **/
                ui.tablaMaquinas();

                ui.tablaCostosTotales();

                ui.tablaModificarStock();

                UI.imprimirAlerta(`Instancia Alquilada: <b><u>${nombre}</u></b>`, 'exito', 'resultadoFormMaquina');

            } else {
                // this.maquinas.splice(posicion, 1);
                UI.imprimirAlerta(`Sin Stock: <b><u>${nombre}</u></b>`, 'error', 'resultadoFormMaquina');
            }
        }
    }

    accionesTabla() {

        if (this.maquinasAlquiladas.length !== 0) {

            let btnApagarPrender = document.querySelectorAll(`#btnApagarPrender`);

            for (let boton of btnApagarPrender) {

                boton.addEventListener('click', this.cambiarEstado)
            }

        }

    }

    cambiarEstado() {

        const idAlquilerBoton = Number(this.getAttribute("data-alquiler"));
        const maquinaAlquilada = sistema.maquinaAlquilada(idAlquilerBoton);

        let vecesIniciada = 0;

        if (maquinaAlquilada !== null) {

            const nuevoEstado = sistema.estadoMaquina(maquinaAlquilada);
            const maquina = null;
            maquinaAlquilada.estado = nuevoEstado;

            if (maquinaAlquilada.estado === 'ON') {

                const iniciada = maquinaAlquilada.iniciada + 1;
                maquinaAlquilada.iniciada = iniciada;
            }

            ui.tablaMaquinas();
            ui.tablaCostosTotales();
            ui.tablaInformeMaquinas();
        }
    }

    estadoMaquina(maquinaAlquilada) {

        let estado = '';

        if (maquinaAlquilada.estado === 'ON') {
            estado = 'OFF'
        }

        if (maquinaAlquilada.estado === 'OFF') {
            estado = 'ON'

        }

        return estado;
    }

    costoTotal(maquina) {

        let total = 0;

        const { iniciada, costoAlquiler, costoEncendido } = maquina;

        total = (costoEncendido * iniciada) + costoAlquiler;

        return total;
    }

    /** Administrador **/
    agregarAdministrador(object) {

        const { nombre, nombreUsuario, password } = object;

        if (usuario.validarUsuario(nombreUsuario, password)) {

            const administrador = new Administrador(nombre, nombreUsuario, password);

            // this.administradores = [...this.administradores, administrador];
            this.administradores.push(administrador);
        }

    }

    tipoUsuario(nombreUsuario) {

        let tipoUsuario = '';

        for (let index = 0; index < this.usuarios.length; index++) {

            let usuario = this.usuarios[index];

            if (nombreUsuario === usuario.nombreUsuario) {
                tipoUsuario = 'usuario';
            }
        }

        for (let index = 0; index < this.administradores.length; index++) {

            let administrador = this.administradores[index];

            if (nombreUsuario === administrador.nombreUsuario) {
                tipoUsuario = 'administrador';
            }
        }

        return tipoUsuario;
    }

    accionAprobar() {

        if (this.usuariosPendientes.length !== 0) {

            let btnAprobar = document.querySelectorAll(`#btnAprobar`);

            for (let boton of btnAprobar) {

                boton.addEventListener('click', this.aprobarUsuario);
            }
        }
    }

    aprobarUsuario() {

        UI.limpiarHTML();

        const idUsuarioBotonAprobar = Number(this.getAttribute('data-aprobar'));
        let posicion = 0;
        let usuarioAprobado = null;

        for (let index = 0; usuarioAprobado === null && index < sistema.usuariosPendientes.length; index++) {

            let usuarioPendiente = sistema.usuariosPendientes[index];

            if (idUsuarioBotonAprobar === usuarioPendiente.id) {

                posicion = index;
                usuarioAprobado = usuarioPendiente;
            }
        }

        usuarioAprobado.aprobado = true;
        sistema.usuarios.push(usuarioAprobado);
        sistema.usuariosPendientes.splice(posicion, 1);
        UI.imprimirAlerta('Usuario Aprobado', 'exito', 'resultadoListadoUsuariosPendientes')

        ui.tablaUsuariosAprobados();
        ui.tablaUsuariosPendientes();
    }

    accionBloquear() {

        if (this.usuarios.length !== 0) {

            let btnBloquear = document.querySelectorAll(`#btnBloquear`);

            for (let boton of btnBloquear) {

                boton.addEventListener('click', this.bloquearUsuario);
            }
        }
    }

    bloquearUsuario() {

        UI.limpiarUsuariosAprobados();

        const idUsuarioBotonBloquear = Number(this.getAttribute('data-bloquear'));

        let posicion = 0;

        for (let index = 0; index < sistema.usuarios.length; index++) {

            let usuario = sistema.usuarios[index];

            if (usuario.id === idUsuarioBotonBloquear) {

                sistema.devolverStock(usuario);

                sistema.eliminarMaquinasAlquiladas(usuario);

                usuario.bloqueado = true;
                usuario.aprobado = false;

                posicion = index;

                sistema.usuarios.splice(posicion, 1);
                sistema.usuariosBloqueados.push(usuario);
                UI.imprimirAlerta('Usuario Bloqueado', 'exito', 'resultadoListadoUsuariosAprobados');
            }

        }

        ui.tablaUsuariosAprobados();
        ui.tablaUsuariosBloqueados();
        ui.selectMaquina();
        ui.tablaCostosTotales();
        ui.tablaModificarStock();
        ui.tablaInformeMaquinas();
    }

    devolverStock(usuario) {

        let posicion = 0;
        let stockFinal = 0;

        for (let index = 0; index < sistema.maquinasAlquiladas.length; index++) {

            let maquinaAlquilada = sistema.maquinasAlquiladas[index];

            if (maquinaAlquilada.idUsuario === usuario.id) { /** Máquinas alquiladas por el usuario */

                const maquina = this.maquina(maquinaAlquilada.idMaquina);

                posicion = index;

                let stockActual = maquina.stock;

                stockFinal = stockActual + 1;
                maquina.stock = stockFinal;
            }
        }
    }

    eliminarMaquinasAlquiladas(usuario) {

        let posicion = 0;

        for (let index = sistema.maquinasAlquiladas.length - 1; index >= 0; index--) {

            let maquinaAlquilada = sistema.maquinasAlquiladas[index];

            if (maquinaAlquilada.idUsuario === usuario.id) {

                posicion = index;
                sistema.maquinasAlquiladas.splice(posicion, 1); /** Quitar del arreglo maquinas alquiladas */
            }

        }
    }

    accionDesbloquear() {

        let btnDesbloquear = document.querySelectorAll('#btnDesbloquear');

        for (let boton of btnDesbloquear) {

            boton.addEventListener('click', this.desbloquear);
        }

    }

    desbloquear() {

        UI.limpiarHTML();

        const idUsuarioBloqueadoBoton = Number(this.getAttribute('data-desbloquear'));
        let posicion = 0;
        let index = 0;

        while (index < sistema.usuariosBloqueados.length) {

            let usuarioBloqueado = sistema.usuariosBloqueados[index];

            if (idUsuarioBloqueadoBoton === usuarioBloqueado.id && usuarioBloqueado.bloqueado === true) {

                posicion = index;
                usuarioBloqueado.bloqueado = false;
                sistema.usuariosPendientes.unshift(usuarioBloqueado);
                sistema.usuariosBloqueados.splice(posicion, 1);
                UI.imprimirAlerta('Usuario Pendientes de Aprobación', 'exito', 'resultadoListadoUsuariosBloqueados');
            }

            index++;
        }

        ui.tablaUsuariosBloqueados();
        ui.tablaUsuariosPendientes();
    }

    accionModificarStock() {

        let btnModificarStock = document.querySelectorAll('#btnModificarStock');

        for (let boton of btnModificarStock) {

            boton.addEventListener('click', this.modificarStock);
        }
    }

    modificarStock() {

        UI.limpiarHTML();

        /** ID maquina Boton */
        const idMaquina = Number(this.getAttribute('data-maquina'));

        /** Cantidad ingresada en campo de texto */
        const cantidadAModificar = Number(document.querySelector(`#txt${idMaquina}`).value.trim());

        /** Maquina con alquiler */
        const maquina = sistema.maquina(idMaquina);

        // let vecesAqluilada = 0;
        const vecesAqluilada = sistema.vecesAlquilada(idMaquina);

        if (cantidadAModificar > 0) {

            if (cantidadAModificar > vecesAqluilada) {

                maquina.stock = cantidadAModificar;

                UI.imprimirAlerta('Stock Modificado con éxito', 'exito', 'resultadoModificarStock');

            } else {

                UI.imprimirAlerta('Cantidad a Modificar no Puede ser Menor o Igual a las Máquinas Alquiladas', 'error', 'resultadoModificarStock');
            }

        } else {

            UI.imprimirAlerta('Valor a modificar no Puede estra Vacio', 'error', 'resultadoModificarStock');

        }

        ui.tablaModificarStock();
        ui.tablaInformeMaquinas();
    }

    vecesAlquilada(idMaquina) {

        let vecesAqluilada = 0;

        for (let index = 0; index < this.maquinasAlquiladas.length; index++) {

            let maquinasAlquiladas = sistema.maquinasAlquiladas[index];

            if (maquinasAlquiladas.idMaquina === idMaquina) {

                vecesAqluilada++;

            }
        }

        return vecesAqluilada;
    }

    vecesIniciada(idMaquina) {

        let vecesIniciada = 0;

        for (let maquinaAlquilada of sistema.maquinasAlquiladas) {

            if (maquinaAlquilada.idMaquina === idMaquina) {

                vecesIniciada += maquinaAlquilada.iniciada;
            }
        }

        return vecesIniciada;
    }

    total(idMaquina) {

        let ingresoTotal = 0;

        for (let maquinaAlquilada of sistema.maquinasAlquiladas) {

            if (maquinaAlquilada.idMaquina === idMaquina) {

                const { iniciada, costoAlquiler, costoEncendido } = maquinaAlquilada;

                let total = (costoEncendido * iniciada) + costoAlquiler;
                ingresoTotal += total;

            }
        }

        return ingresoTotal;
    }

    agregarAlquiler(object) {

        let maquinaAlquilada = null;
        let index = 0;

        while (index < sistema.maquinas.length) {

            let maquina = sistema.maquinas[index];

            if (object.idMaquina === maquina.idMaquina) {

                maquinaAlquilada = maquina;
            }

            index++;
        }

        if (maquinaAlquilada !== null) {

            let { idMaquina, nombre, tipo, costoAlquiler, costoEncendido, estado, stock, iniciada } = maquinaAlquilada;
            // const idUsuario = this.logueado.id; // Cuando se pre cargan los alquileres no existe usuario logueado. not defined.

            if (stock > 0) {

                /** Restar stock y actualizar propiedad */
                let stockReal = stock - 1;
                maquinaAlquilada.stock = stockReal;

                /**Instanciar objeto Alquiler. Pasar datos al constructor */
                const alquiler = new Alquiler(object.idUsuario, idMaquina, nombre, tipo, estado, iniciada, costoAlquiler, costoEncendido, stockReal);

                // this.maquinasAlquiladas = [...this.maquinasAlquiladas, alquilada];
                this.maquinasAlquiladas.push(alquiler);
            }
        }
    }
}