class UI {

    static imprimirAlerta(mensaje, tipo, idDiv) {

        const parrafo = document.createElement('P');
        parrafo.classList.add('alerta');
        parrafo.innerHTML = mensaje;

        if (tipo === 'error') {
            parrafo.classList.add('error')
        } else {
            parrafo.classList.add('exito');
        }

        document.querySelector(`#${idDiv}`).appendChild(parrafo);

        setTimeout(() => {
            parrafo.remove();
        }, 2000);
    }

    static limpiarHTML() {

        const nodeList = document.querySelectorAll('.resultado');

        for (let div of nodeList) {

            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }
    }

    static limpiarBienvenida() {

        const div = document.querySelector('#bienvenido');

        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }

    static limpiarUsuariosAprobados() {

        const div = document.querySelector('#resultadoListadoUsuariosAprobados');

        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }

    selectMaquina() {

        let select = `
        <select id="maquina">
            <option value="">--Seleccione--</option>
        `;

        for (let maquina of sistema.maquinas) {

            const { idMaquina, nombre, tipo, costoAlquiler, costoEncendido, stock } = maquina;

            select += `<option value="${idMaquina}">Nombre: ${nombre} Tipo: ${tipo} Costo: ${costoAlquiler} Costo Encendido: ${costoEncendido} Stock: ${stock}</option>`;
        }

        select += `</select>`;

        document.querySelector('#selectMaquina').innerHTML = select;
    }

    tablaMaquinas() {

        if (sistema.maquinasAlquiladas.length > 0) {

            const idUsuario = sistema.logueado.id;

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

            for (let maquinasAlquiladas of sistema.maquinasAlquiladas) {

                if (maquinasAlquiladas.idUsuario === idUsuario) {

                    const { idAlquiler, nombre, tipo, estado, iniciada } = maquinasAlquiladas;

                    tabla +=
                        `<tr>
                        <td>${nombre}</td>
                        <td>${tipo}</td>
                        <td><b>${estado}</b></td>
                        <td><b>${iniciada}</b></td>
                        <td><input type="button" value="ON / OFF" id="btnApagarPrender" data-alquiler="${idAlquiler}"></td>
                    </tr>`

                }
            }

            tabla +=
                `</body>
                </table>`

            document.querySelector('#tablaMaquinas').innerHTML = tabla;

        } else {

            const h2 = `<h2 class="descripcion-pagina" style="color: red;">No hay Registros</h2>`;
            document.querySelector('#tablaMaquinas').innerHTML = h2;
        }

        /** Permitir funcionalidad al boton apagar */
        sistema.accionesTabla();
    }

    tablaCostosTotales() {

        if (sistema.maquinasAlquiladas.length > 0) {

            const idUsuario = sistema.logueado.id;

            let tabla =
                `<table>
                <thead class="heading">
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo de Instancia</th>
                        <th>Costo Alquiler</th>
                        <th>Costo por encendido</th>
                        <th>Total de veces encendidas</th>
                        <th>Costo total</th>
                    </tr>
                </thead>
                <tbody>`;

            for (let maquinaAlquilada of sistema.maquinasAlquiladas) {

                if (maquinaAlquilada.idUsuario === idUsuario) {

                    /** calcular y retornar total */
                    const costoTotal = sistema.costoTotal(maquinaAlquilada);

                    const { nombre, tipo, costoAlquiler, costoEncendido, iniciada } = maquinaAlquilada;

                    tabla +=
                        `<tr>
                        <td>${nombre}</td>
                        <td>${tipo}</td>
                        <td>${costoAlquiler}</td>
                        <td>${costoEncendido}</td>
                        <td><b>${iniciada}</b></td>
                        <td><b>${costoTotal}</b></td>
                    </tr>`
                }
            }

            tabla +=
                `</body>
                </table>`

            document.querySelector('#tablaCostoTotalAlquiler').innerHTML = tabla;

        } else {

            const h2 = `<h2 class="descripcion-pagina" style="color: red;">No hay Registros</h2>`;
            document.querySelector('#tablaCostoTotalAlquiler').innerHTML = h2;
        }
    }

    tablaUsuariosPendientes() {

        if (sistema.usuariosPendientes.length > 0) {

            let tabla =
                `<table>
                <thead class="heading">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nombre de Usuario</th>
                        <th>Aprobado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`;

            for (let usuarioPendiente of sistema.usuariosPendientes) {

                const { id, nombre, apellido, nombreUsuario, aprobado } = usuarioPendiente;

                tabla +=
                    `<tr>
                        <td><b>${id}</b></td>
                        <td>${nombre}</td>
                        <td>${apellido}</td>
                        <td>${nombreUsuario}</td>
                        <td><b>${aprobado}</b></td>
                        <td><input type="button" value="Aprobar" id="btnAprobar" data-aprobar="${id}"</td>
                    </tr>`
            }

            tabla +=
                `</body>
                </table>`

            document.querySelector('#tablaListadoUsuariosPendientes').innerHTML = tabla;

            sistema.accionAprobar();

        } else {

            const h2 = `<h2 class="descripcion-pagina" style="color: red;">No hay Registros</h2>`;
            document.querySelector('#tablaListadoUsuariosPendientes').innerHTML = h2;
        }
    }

    tablaUsuariosAprobados() {

        if (sistema.usuarios.length > 0) {

            let tabla =
                `<table>
                <thead class="heading">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nombre de Usuario</th>
                        <th>Aprobado</th>
                        <th>Bloqueado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`;

            for (let usuarioAprobado of sistema.usuarios) {

                const { id, nombre, apellido, nombreUsuario, aprobado, bloqueado } = usuarioAprobado;

                tabla +=
                    `<tr>
                        <td><b>${id}</b></td>
                        <td>${nombre}</td>
                        <td>${apellido}</td>
                        <td>${nombreUsuario}</td>
                        <td><b>${aprobado}</b></td>
                        <td><b>${bloqueado}</b></td>
                        <td><input type="button" value="Bloquear" id="btnBloquear" data-bloquear="${id}"</td>
                    </tr>`
            }

            tabla +=
                `</body>
                </table>`

            document.querySelector('#tablaListadoUsuariosAprobados').innerHTML = tabla;

            sistema.accionBloquear();

        } else {

            const h2 = `<h2 class="descripcion-pagina" style="color: red;">No hay Registros</h2>`;
            document.querySelector('#tablaListadoUsuariosAprobados').innerHTML = h2;
        }

    }

    tablaUsuariosBloqueados() {

        if (sistema.usuariosBloqueados.length > 0) {

            let tabla =
                `<table>
                <thead class="heading">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nombre de Usuario</th>
                        <th>Bloqueado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`;

            for (let usuarioBloqueado of sistema.usuariosBloqueados) {

                const { id, nombre, apellido, nombreUsuario, aprobado, bloqueado } = usuarioBloqueado;

                tabla +=
                    `<tr>
                        <td><b>${id}</b></td>
                        <td>${nombre}</td>
                        <td>${apellido}</td>
                        <td>${nombreUsuario}</td>
                        <td><b>${bloqueado}</b></td>
                        <td><input type="button" value="Desbloquear" id="btnDesbloquear" data-desbloquear="${id}"</td>
                    </tr>`
            }

            tabla +=
                `</body>
                </table>`

            document.querySelector('#tablaUsuariosBloqueados').innerHTML = tabla;

        } else {

            const h2 = `<h2 class="descripcion-pagina" style="color: red;">No hay Registros</h2>`;
            document.querySelector('#tablaUsuariosBloqueados').innerHTML = h2;
        }

        sistema.accionDesbloquear();
    }

    tablaModificarStock() {

        const nombreUsuario = sistema.logueado.nombreUsuario;
        const tipoUsuario = sistema.tipoUsuario(nombreUsuario);

        if (sistema.maquina.length > 0) {

            let tabla =
                `<table>
                <thead class="heading">
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo de Instancia</th>
                        <th>Stock</th>
                        <th>Veces Alquilada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`;

            for (let index = 0; index < sistema.maquinas.length; index++) {

                let maquinas = sistema.maquinas[index];

                if (tipoUsuario === 'administrador') {

                    const { idMaquina, nombre, tipo, stock } = maquinas;

                    const vecesAqluilada = sistema.vecesAlquilada(idMaquina);

                    tabla +=
                        `<tr>
                        <td>${nombre}</td>
                        <td>${tipo}</td>
                        <td><b>${stock}</b></td>
                        <td><b>${vecesAqluilada}</b></td>
                        <td>
                            <input type"text" id="txt${idMaquina}" class="txtModificarStock" placeholder="Ingrese un valor">
                            <input type="button" value="Modificar Stock" id="btnModificarStock" data-maquina="${idMaquina}">
                        </td>
                    </tr>`

                }
            }

            tabla +=
                `</body>
                </table>`

            document.querySelector('#tablaModificarStock').innerHTML = tabla;

            sistema.accionModificarStock();

        } else {

            const h2 = `<h2 class="descripcion-pagina" style="color: red;">No hay Registros</h2>`;
            document.querySelector('#tablaModificarStock').innerHTML = h2;
        }
    }

    tablaInformeMaquinas() {

        const nombreUsuario = sistema.logueado.nombreUsuario;
        const tipoUsuario = sistema.tipoUsuario(nombreUsuario);
        let ingresoTotal = 0;

        if (sistema.maquina.length > 0) {

            let tabla =
                `<table>
                <thead class="heading">
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo de Instancia</th>
                        <th>Costo Alquiler</th>
                        <th>Costo por Encendido</th>
                        <th>Total Veces Encendidas</th>
                        <th>Total veces Alquilada</th>
                        <th>Stock</th>
                        <th>Ingreso Total</th>
                    </tr>
                </thead>
                <tbody>`;

            for (let index = 0; index < sistema.maquinas.length; index++) {

                let maquina = sistema.maquinas[index];

                if (tipoUsuario === 'administrador') {

                    const { idMaquina, nombre, tipo, costoAlquiler, costoEncendido, stock } = maquina;

                    const vecesAqluilada = sistema.vecesAlquilada(idMaquina);
                    const vecesIniciada = sistema.vecesIniciada(idMaquina);
                    const total = sistema.total(idMaquina);

                    tabla +=
                        `<tr>
                        <td>${nombre}</td>
                        <td>${tipo}</td>
                        <td><b>${costoAlquiler}</b></td>
                        <td><b>${costoEncendido}</b></td>
                        <td><b>${vecesIniciada}</b></td>
                        <td><b>${vecesAqluilada}</b></td>
                        <td><b>${stock}</b></td>
                        <td><b>${total}</b></td>
                    </tr>`;

                    ingresoTotal += total;
                    console.log(ingresoTotal);
                }

            }

            tabla +=
                `</body>
                </table>`;

            document.querySelector('#tablaInformeMaquinas').innerHTML = tabla;
            document.querySelector('#totalIngreso').innerHTML = ingresoTotal;

            sistema.accionModificarStock();

        } else {

            const h2 = `<h2 class="descripcion-pagina" style="color: red;">No hay Registros</h2>`;
            document.querySelector('#tablaInformeMaquinas').innerHTML = h2;
        }
    }

    selectFiltroMaquinasAlquiladas() {

        let select = `
            <select id="filtroMaquinasAlquiladas">
                <option value="">--Seleccione--</option>
                <option value="on">ON</option>
                <option value="off">OFF</option> 
            </select>`;

        document.querySelector('#selectFiltroMaquinasAlquiladas').innerHTML = select;
    }
}