class Maquina {

    static idMaquina = 0;

    constructor(nombre, tipo, costo, costoEncendido) {

        this.id = Maquina.idMaquina++;
        this.nombre = nombre ?? '';
        this.tipo = tipo ?? '';
        this.costoAlquiler = costo;
        this.costoEncendido = costoEncendido;
        this.estado = 'on';
    }

    validarMaquina(id) {

        if (id.length < 0 || id === '') {

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

            sistema.maquinasAlquiladas.push(alquilada);

            sistema.maquinas.splice(posicion, 1);

            UI.imprimirAlerta(`Maquina Alquilada: <b><u>${alquilada.nombre}</u></b>`, 'exito', 'resultadoFormMaquina');

            sistema.selectMaquina();
        }

        
    }
}