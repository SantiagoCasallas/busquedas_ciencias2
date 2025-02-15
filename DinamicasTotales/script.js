let n = 2;
let densidad = 0.75;
let densidad2 = 1.05;
let tamañoMatriz = n;
let aux = 0;
let contador = 0
let otrocontador = 0;
let residuo = 0;

const $panelEstructura = document.querySelector(".panel-estructura")

//eso son las variables que usé

let arreglo = [];//arreglo al que el usuario le inserta datos
let arreglo2 = ["1", "2", "3", "4", '5', '6', '7', '8'];//una matriz predefinida para hacer pruebas o para una demostracion si ahce falta

var matriz = new Array(2);   //me crea una matriz de tamaño variable
for (i = 0; i < 2; i++) {  //a cada espacio de la matriz segun n se le inserta un vector de 2 posiciones
    // resultando n amatriz de n*2
    matriz[i] = new Array(n);
}

function registroAutomatico() {//lo mimso que la otra pero con el arreglo predefinido
    for (const item of arreglo2) {
        if (arreglo.includes(item)) {
            console.log("no se puede")
        } else {
            arreglo.push(item);//inserta el contenido del placeholder en el arreglo vacio inicial
        }
        dinamicaTotal()
    }
}

dinamicaTotal()

function registrarDatos() {//leen contenido del placeholder del html cuando se presiona el voton

    var dato = document.getElementById("Clave").value;

    if (arreglo.length == 0) {
        arreglo.push(dato);//inserta el contenido del placeholder en el arreglo vacio inicial
    }

    if (arreglo.includes(dato)) {
        console.log("no se puede")
    } else {
        arreglo.push(dato);//inserta el contenido del placeholder en el arreglo vacio inicial
    }
    document.getElementById("Clave").value = "";

    dinamicaTotal() //ejecuta la funcion dinamica total, la logica
}


function limpiarmatriz() {
    for (var i = 0; i < 2; i++) {
        matriz[i] = new Array(n);
    }

    for (i = 0; i < 2; i++) {
        for (j = 0; j < n; j++) {
            matriz[i][j] == null;
        }
    }
}



function actualizarMatriz() {//reescribe la matriz definida arriba

    n = n * 2;
    tamañoMatriz = n * 2;
    limpiarmatriz();

}

function imprimirMatrizEnPanel(matriz, panel) {
    if (!panel) {
        console.error("El panel especificado no se encontró en el documento.");
        return;
    }

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    // Agrega estilos CSS para los bordes de la tabla
    table.style.borderCollapse = "collapse";
    table.style.border = "1px solid black";


    for (let i = 0; i < matriz.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < matriz[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = matriz[i][j];
            cell.style.border = "1px solid black";
            cell.style.width = "50px"; // Estilo de borde para cada celda
            cell.style.height = "50px"; // Estilo de borde para cada celda
            cell.style.textAlign = "center";
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    panel.innerHTML = ""; // Limpia el contenido anterior del panel
    panel.appendChild(table);
}

// creo que hay problemas con esto y por eso tal vez se duplican los datos
function dinamicaTotal() {
    contador = 0
    tamañoMatriz = n * 2;
    for (i = 0; i < 2; i++) {
        for (j = 0; j < n; j++) {
            if (matriz[i][j] == null) {
                contador++//aumenta con cada espacio nulo de la matriz, deberia ser de n*2 al inicio siempre
                aux = (tamañoMatriz - contador) + 1;    //inicia en cero y va creciendo con cada dato que se ingresa
            }
        }
    }


    if ((aux) < (tamañoMatriz * densidad)) {//condicion de que la densidad ocupacional sea menor al limite establecido

        densidad_aceptada();

    }
    else if ((aux) >= (tamañoMatriz * densidad)) {//si la densidad ocupacional es mayor o igual al limite establecido
        densidad_rechazada();
    }


    imprimirMatrizEnPanel(matriz, $panelEstructura);
    $panelEstructura
    console.log("el tamaño es " + tamañoMatriz)
}

function hash(valor) {  //la funcion modulo hash
    residuo = valor % n;
}



function densidad_aceptada() {
    limpiarmatriz()
    for (i = 0; i < arreglo.length; i++) {
        clave = arreglo[i];//lee el arreglo que ingresa el usuario 
        hash(clave)//funcion hash a la que se le pasa la posision i del arreglo

        if (matriz[0][residuo] == null) {
            matriz[0][residuo] = clave;//ingresa indice
        } else if (matriz[1][residuo] == null) {
            matriz[1][residuo] = clave;//ingresa indice
        } else if (matriz[0][residuo] !== null & matriz[1][residuo] !== null) {
            otrocontador++//"espacio de memoria reservado cuando no entra el indice"
            aux += 1;
        }
    }
}

function densidad_rechazada() {

    actualizarMatriz();
    limpiarmatriz()
    //s actualiza el tamaño n de la matriz 
    for (i = 0; i < arreglo.length; i++) {
        clave = arreglo[i];//lee el arreglo que ingresa el usuario 
        hash(clave)//funcion hash a la que se le pasa la posision i del arreglo

        if (matriz[0][residuo] == null) {
            matriz[0][residuo] = clave;//ingresa indice
        } else if (matriz[1][residuo] == null) {
            matriz[1][residuo] = clave;//ingresa indice
        } else {
            otrocontador++//"espacio de memoria reservado cuando no entra el indice"
            aux += otrocontador;
        }
    }
}

function buscarDatos() {
    var busqueda = document.getElementById("Buqueda").value;

    for (i = 0; i < 2; i++) {
        for (j = 0; j < n; j++) {
            if (matriz[i][j] == busqueda) {
                alert("El clave " + busqueda + " se encuentra en la posición [" + (i + 1) + "," + j + "]")
                if (!arreglo.includes(busqueda)) {
                    alert("La clave " + busqueda + " no se encuentra en la estructura")
                }
            }
        }
    }

    //ejecuta la funcion dinamica total, la logica
}

function eliminarDatos() {
    var eliminar = document.getElementById("Eliminar").value;
    aux = 0;
    if (!arreglo.includes(eliminar)) {
        alert("La clave " + eliminar + " no se encuentra en la estructura")
    }

    if ((arreglo.length - 1) < (((tamañoMatriz / 2) * (densidad))*0.8)) {
        n = n / 2;
    }

    for (i = 0; i < arreglo.length; i++) {

        if (arreglo[i] == eliminar) {
            arreglo.splice(i, 1);

        }
    }

    dinamicaTotal()

}
