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

    alquilar(id) {

        UI.limpiarHTML();

        let alquilada = null;
        let posicion = 0;
        let index = 0;

        while (index < sistema.maquinas.length) {

            let maquina = sistema.maquinas[index];

            if (id === maquina.idMaquina) {

                posicion = index
                alquilada = maquina;
            }

            index++;
        }

        if (alquilada !== null) {

            let { idMaquina, nombre, tipo, estado, stock, iniciada } = alquilada;
            const idUsuario = sistema.logueado.id;

            if (stock > 0) {

                let disminuirStock = stock - 1;
                alquilada.stock = disminuirStock;

                const alquiler = new Alquiler(idUsuario, idMaquina, nombre, tipo, estado, iniciada);

                // this.maquinasAlquiladas = [...this.maquinasAlquiladas, alquilada];
                sistema.maquinasAlquiladas.push(alquiler);

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
                        <th>Tipo de Instancia</th>
                        <th>Estado</th>
                        <th>Veces Iniciada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`;

            for (let index = 0; index < this.maquinasAlquiladas.length; index++) {

                let maquina = this.maquinasAlquiladas[index];

                const { idAlquiler, idMaquina, tipo, estado, iniciada } = maquina;

                tabla +=
                    `<tr>
                    <td>${tipo}</td>
                    <td>${estado}</td>
                    <td>${iniciada}</td>
                    <td><input type="button" value="Apagar" id="btnApagar" data-id="${idMaquina}" data-alquiler="${idAlquiler}"></td>
                    <td><input type="button" value="Prender" id="btnPrender" data-id="${idMaquina}" data-alquiler="${idAlquiler}" disabled></td>
                </tr>`
            }

            tabla +=
                `</body>
            </table>`

            document.querySelector('#tablaMaquinas').innerHTML = tabla;

            this.apagar(); /** Permitir funcionalidad al boton apagar */



        }
    }

    apagar() {

        if (this.maquinasAlquiladas.length !== 0) {

            let btnApagar = document.querySelectorAll('#btnApagar');

            for (let boton of btnApagar) {

                boton.addEventListener('click', this.turnOff)
            }
        }
    }

    turnOff(e) {

        // const id = e.target.dataset.id;
        // const id = e.target.attributes[3].value;
        const idMaquina = Number(this.getAttribute("data-id"));
        const idAlquiler = Number(this.getAttribute("data-alquiler"));

        console.log('ID Alquiler', idAlquiler);

        let index = 0;

        while (index < sistema.maquinasAlquiladas.length) {

            let maquina = sistema.maquinasAlquiladas[index];

            if (idAlquiler === maquina.idAlquiler && idMaquina === maquina.idMaquina) {

                maquina.estado = 'OFF';
                document.querySelector('')
                sistema.tablaMaquinas();
            }

            index++;
        }
    }

    prender() {

        if (this.maquinasAlquiladas.length > 0) {

            let btnPrender = document.querySelectorAll('#btnPrender');

            for (let boton of btnPrender) {

                boton.addEventListener('click', this.turnOn);
            }
        }
    }

    // turnOn(e) {

    //     console.log(e.target);

    //     // const id = this.getAttribute("data-id");
    //     // const id = e.target.attributes[3].value;
    //     const id = Number(e.target.dataset.id);

    //     console.log(id);

    //     sistema.maquinasAlquiladas.forEach(maquina => {

    //         if (id === maquina.id && maquina.estado === 'OFF') {

    //             maquina.estado = 'ON';
    //             sistema.tablaMaquinas();
    //         }
    //     });
    // }
}