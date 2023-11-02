class Sistema {

    constructor() {

        this.usuarios = new Array();
        this.maquinas = new Array();
        this.maquinasAlquiladas = new Array();
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

            index++;
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

    agregarUsuario(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc) {

        let agregado = false;

        if (usuario.validarUsuario(nombre, apellido, nombreUsuario, password, numeroTarjeta, cvc)) {

            let usuario = new Usuario();

            usuario.nombre = nombre;
            usuario.apellido = apellido;
            usuario.nombreUsuario = nombreUsuario;
            usuario.password = password;
            usuario.numeroTarjeta = numeroTarjeta;
            usuario.cvc = cvc;

            // Agregar al arreglo de usuarios
            this.usuarios.push(usuario);

            agregado = true;
        }

        return agregado;
    }

    login(nombreUsuario, password) {

        let encontrado = false;

        let usuario = this.obtenerUsuario(nombreUsuario); /** retorna objeto de usuario encontrado sino default null */

        if (usuario !== null) {

            if (usuario.password === password) {

                encontrado = true;
                this.logueado = usuario;
            }
        }

        return encontrado;
    }

    obtenerUsuario(nombreUsuario) {

        let existe = null;
        let index = 0;

        while (existe === null && index < this.usuarios.length) {

            let usuario = this.usuarios[index];

            if (nombreUsuario === usuario.nombreUsuario) {
                existe = usuario;
            }

            index++;
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

        for(let maquina of sistema.maquinas) {

            if (maquina.idMaquina === idMaquina) {

                machine = maquina;
            }
        }

        return machine;
    }

    maquinaAlquilada(idAlquiler) {

        let maquinaAlquilada = null;

        for(let maquina of sistema.maquinasAlquiladas) {

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

                /** Actualizar tabla **/
                this.tablaMaquinas();

                UI.imprimirAlerta(`Instancia Alquilada: <b><u>${nombre}</u></b>`, 'exito', 'resultadoFormMaquina');

            } else {
                // this.maquinas.splice(posicion, 1);
                UI.imprimirAlerta(`Sin Stock: <b><u>${nombre}</u></b>`, 'error', 'resultadoFormMaquina');
            }

            this.selectMaquina();
        }
    }

    selectMaquina() {

        let select = `
        <select id="maquina">
            <option value="">--Seleccione--</option>
        `;

        for (let maquina of this.maquinas) {

            const { idMaquina, nombre, tipo, costoAlquiler, costoEncendido, stock } = maquina;

            select += `<option value="${idMaquina}">Nombre: ${nombre} Tipo: ${tipo} Costo: ${costoAlquiler} Costo Encendido: ${costoEncendido} Stock: ${stock}</option>`;
        }

        select += `</select>`;

        document.querySelector('#selectMaquina').innerHTML = select;
    }

    tablaMaquinas() {

        if (sistema.maquinasAlquiladas.length > 0) {

            let tabla =
                `<table>
                <thead class="heading">
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo de Instancia</th>
                        <th>Estado</th>
                        <th>Veces Iniciada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`;

            for (let index = 0; index < this.maquinasAlquiladas.length; index++) {

                let maquina = this.maquinasAlquiladas[index];

                const { idAlquiler, idMaquina, nombre, tipo, estado, iniciada } = maquina;

                tabla +=
                    `<tr>
                        <td>${nombre}</td>
                        <td>${tipo}</td>
                        <td><b>${estado}</b></td>
                        <td><b>${iniciada}</b></td>
                        <td><input type="button" value="ON / OFF" id="btnApagarPrender" data-alquiler="${idAlquiler}"></td>
                    </tr>`
            }

            tabla +=
                `</body>
                </table>`

            document.querySelector('#tablaMaquinas').innerHTML = tabla;

            /** Permitir funcionalidad al boton apagar */
            this.accionesTabla();
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

        if (maquinaAlquilada !== null) {

            const nuevoEstado = sistema.estadoMaquina(maquinaAlquilada);

            maquinaAlquilada.estado = nuevoEstado;

            if (maquinaAlquilada.estado === 'ON') {

                const iniciada = maquinaAlquilada.iniciada + 1;
                maquinaAlquilada.iniciada = iniciada;
            }

            sistema.tablaMaquinas();
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
}