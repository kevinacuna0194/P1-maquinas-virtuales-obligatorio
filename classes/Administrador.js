class Administrador {

    static IdAdministrador = 1;

    constructor(nombre, nombreUsuario, password) {

        this.id = Administrador.IdAdministrador++;
        this.nombre = nombre ?? '';
        this.nombreUsuario = nombreUsuario ?? '';
        this.password = password ?? null;
    }
}