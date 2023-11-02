class Alquiler {

    static idAlquiler = 1;

    constructor(idUsuario, idMaquina, nombre, tipo, estado, iniciada, costoAlquiler, costoEncendido, stock) {

        this.idAlquiler = Alquiler.idAlquiler++ ?? null;
        this.idUsuario = idUsuario ?? null;
        this.idMaquina = idMaquina ?? null;
        this.nombre = nombre ?? '';
        this.tipo = tipo ?? '';
        this.estado = estado ?? '';
        this.iniciada = iniciada ?? null;
        this.costoAlquiler = costoAlquiler ?? null;
        this.costoEncendido = costoEncendido ?? null;
        this.stock = stock ?? null;
    }
}