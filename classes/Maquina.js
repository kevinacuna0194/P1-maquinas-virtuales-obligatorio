class Maquina {

    static idMaquina = 0;

    constructor(nombre, tipo, costo, costoEncendido, stock) {

        this.idMaquina = Maquina.idMaquina++;
        this.nombre = nombre ?? '';
        this.tipo = tipo ?? '';
        this.costoAlquiler = costo ?? null;
        this.costoEncendido = costoEncendido ?? null;
        this.estado = 'ON';
        this.stock = stock ?? null;
        this.iniciada = 1;
    }

    validarMaquina(id) {

        UI.limpiarHTML();

        if (id === 0) {

            UI.imprimirAlerta('Seleccione alguna opción', 'error', 'resultadoFormMaquina');
            return;
        }

        return true;
    }
}