let registros = [];

function agregarRegistro() {
    const clave = document.getElementById('clave').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const fechaEgreso = document.getElementById('fechaEgreso').value;
    const tipo = document.getElementById('tipo').value;

    registros.push({ clave, fechaIngreso, fechaEgreso, tipo });
    mostrarRegistros();
}

function mostrarRegistros() {
    const tablaRegistros = document.getElementById('tablaRegistros');
    tablaRegistros.innerHTML = '';
    registros.forEach((registro, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${registro.clave}</td>
            <td>${registro.fechaIngreso}</td>
            <td>${registro.fechaEgreso}</td>
            <td>${registro.tipo === '1' ? 'Activo' : 'Licencia'}</td>
            <td>
                <button onclick="eliminarRegistro(${index})">Eliminar</button>
            </td>
        `;
        tablaRegistros.appendChild(fila);
    });
}

function eliminarRegistro(index) {
    registros.splice(index, 1);
    mostrarRegistros();
}

function eliminarTodo() {
    registros = [];
    mostrarRegistros();
}

function calcular() {
    let tiempoActivo = { años: 0, meses: 0, días: 0 };
    let tiempoLicencia = { años: 0, meses: 0, días: 0 };
    registros.forEach(registro => {
        const fechaIngreso = new Date(registro.fechaIngreso);
        const fechaEgreso = new Date(registro.fechaEgreso);
        let tiempo = calcularTiempo(fechaIngreso, fechaEgreso);
        if (registro.tipo === '1') {
            tiempoActivo = sumarTiempo(tiempoActivo, tiempo);
        } else {
            tiempoLicencia = sumarTiempo(tiempoLicencia, tiempo);
        }
    });
    mostrarResultados(tiempoActivo, tiempoLicencia);
}

function calcularTiempo(fechaInicio, fechaFin) {
    let años = fechaFin.getFullYear() - fechaInicio.getFullYear();
    let meses = fechaFin.getMonth() - fechaInicio.getMonth();
    let días = fechaFin.getDate() - fechaInicio.getDate();
    if (días < 0) {
        meses--;
        días += 30;
    }
    if (meses < 0) {
        años--;
        meses += 12;
    }
    return { años, meses, días };
}

function sumarTiempo(tiempo1, tiempo2) {
    let años = tiempo1.años + tiempo2.años;
    let meses = tiempo1.meses + tiempo2.meses;
    let días = tiempo1.días + tiempo2.días;

    if (días >= 30) {
        meses += Math.floor(días / 30);
        días %= 30;
    }
    if (meses >= 12) {
        años += Math.floor(meses / 12);
        meses %= 12;
    }

    return { años, meses, días };
}

function mostrarResultados(tiempoActivo, tiempoLicencia) {
    document.getElementById('tiempoActivo').innerText = 
        `Tiempo Activo en años, meses y días: ${tiempoActivo.años} años, ${tiempoActivo.meses} meses, ${tiempoActivo.días} días`;
    document.getElementById('tiempoLicencia').innerText = 
        `Tiempo en Licencia en años, meses y días: ${tiempoLicencia.años} años, ${tiempoLicencia.meses} meses, ${tiempoLicencia.días} días`;
}
