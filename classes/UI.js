class UI extends Sistema {

    static imprimirAlerta(mensaje, tipo) {

        const parrafo = document.createElement('P');
        parrafo.classList.add('alerta');
        parrafo.innerHTML = mensaje;

        if (tipo === 'error') {
            parrafo.classList.add('error')
        } else {
            parrafo.classList.add('exito');
        }

        resultado.appendChild(parrafo);

        setTimeout(() => {
            parrafo.remove();
        }, 3000);
    }

    static limpiarHTML() {

        while (resultado.firstChild) {
            resultado.removeChild(resultado.firstChild);
        }
    }
}