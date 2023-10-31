class Maquina {

    static idMaquina = 0;

    constructor(nombre, tipo, costo, costoEncendido, stock) {

        this.id = Maquina.idMaquina++;
        this.nombre = nombre ?? '';
        this.tipo = tipo ?? '';
        this.costoAlquiler = costo;
        this.costoEncendido = costoEncendido;
        this.estado = 'on';
        this.stock = stock
    }

    validarMaquina(id) {

        if (id === 0) {

            UI.imprimirAlerta('Seleccione alguna opción', 'error', 'resultadoFormMaquina');
            return;
        }

        return true;
    }

    alquilar(id) {

        let alquilada = null;
        let posicion = 0;
        let index = 0;

        while (index < sistema.maquinas.length) {

            let maquina = sistema.maquinas[index];

            if (id === maquina.id) {

                posicion = index
                alquilada = maquina;
            }

            index++;
        }

        if (alquilada !== null) {

            if (alquilada.stock > 0) {

                const disminuirStock = alquilada.stock - 1;

                alquilada.stock = disminuirStock;

                // sistema.maquinasAlquiladas.push(alquilada);
                sistema.maquinasAlquiladas = [...sistema.maquinasAlquiladas, alquilada];

                UI.imprimirAlerta(`Instancia Alquilada: <b><u>${alquilada.nombre}</u></b>`, 'exito', 'resultadoFormMaquina');

            } else {
                // sistema.maquinas.splice(posicion, 1);
                UI.imprimirAlerta(`Sin Stock: <b><u>${alquilada.nombre}</u></b>`, 'error', 'resultadoFormMaquina');
            }

            sistema.selectMaquina();
        }

        return sistema.maquinasAlquiladas;
    }
}