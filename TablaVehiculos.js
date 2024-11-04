class TablaVehiculos{
    tabla = ""
    header = ""
    body = ""

    //============================= Constructor =====================================//
    constructor(id_tablaVehiculos,id_header,id_body){
        this.tabla = document.getElementById(id_tablaVehiculos)
        this.header = document.getElementById(id_header)
        this.body = document.getElementById(id_body)
    }

    //====================== Funciones para dibujar =================================//
    dibujarTabla(arrayVehiculos){
        this.limpiarTabla()
        this.dibujarHeader()
        this.dibujarBody(arrayVehiculos)
    }

    dibujarHeader(){
        let fila = document.createElement("tr")
        fila.id = "header"

        let celda = document.createElement("th")
        celda.appendChild(document.createTextNode("Id"))
        fila.appendChild(celda)

        celda = document.createElement("th")
        celda.appendChild(document.createTextNode("Modelo"))
        fila.appendChild(celda)

        celda = document.createElement("th")
        celda.appendChild(document.createTextNode("Año de Fabricacion"))
        fila.appendChild(celda)

        celda = document.createElement("th")
        celda.appendChild(document.createTextNode("Velocidad Maxima"))
        fila.appendChild(celda)

        celda = document.createElement("th")
        celda.appendChild(document.createTextNode("Carga"))
        fila.appendChild(celda)

        celda = document.createElement("th")
        celda.appendChild(document.createTextNode("Autonomia"))
        fila.appendChild(celda)

        celda = document.createElement("th")
        celda.appendChild(document.createTextNode("Cantidad de Puertas"))
        fila.appendChild(celda)

        celda = document.createElement("th")
        celda.appendChild(document.createTextNode("Asientos"))
        fila.appendChild(celda)

        let celdaModificar = document.createElement("th")
        celdaModificar.appendChild(document.createTextNode("Modificar"))
        fila.appendChild(celdaModificar)

        let celdaEliminar = document.createElement("th")
        celdaEliminar.appendChild(document.createTextNode("Eliminar"))
        fila.appendChild(celdaEliminar)
        
        this.header.appendChild(fila)
    }

    dibujarBody(arrayVehiculos){
        let contador = 0
        for(let persona of arrayVehiculos){
            let fila = document.createElement("tr")
            fila.id = contador

            let celda = document.createElement("td")
            celda.appendChild(document.createTextNode(persona.id))
            fila.appendChild(celda)
        
            celda = document.createElement("td")
            celda.appendChild(document.createTextNode(persona.modelo))
            fila.appendChild(celda)
        
            celda = document.createElement("td")
            celda.appendChild(document.createTextNode(persona.anoFabricacion))
            fila.appendChild(celda)
        
            celda = document.createElement("td")
            celda.appendChild(document.createTextNode(persona.velMax))
            fila.appendChild(celda)
        
            celda = document.createElement("td")
            if(!persona.hasOwnProperty("carga")) celda.appendChild(document.createTextNode("----"))
            else celda.appendChild(document.createTextNode(persona.carga))
            fila.appendChild(celda)
        
            celda = document.createElement("td")
            if(!persona.hasOwnProperty("autonomia")) celda.appendChild(document.createTextNode("----"))
            else celda.appendChild(document.createTextNode(persona.autonomia))
            fila.appendChild(celda)
        
            celda = document.createElement("td")
            if(!persona.hasOwnProperty("cantidadPuertas")) celda.appendChild(document.createTextNode("----"))
            else celda.appendChild(document.createTextNode(persona.cantidadPuertas))
            fila.appendChild(celda)
        
            celda = document.createElement("td")
            if(!persona.hasOwnProperty("asientos")) celda.appendChild(document.createTextNode("----"))
            else celda.appendChild(document.createTextNode(persona.asientos))
            fila.appendChild(celda)

            let celdaModificar = document.createElement("td")
            let btnModificar = document.createElement("button")
            btnModificar.innerText = "Modificar"
            celdaModificar.appendChild(btnModificar)
            fila.appendChild(celdaModificar)

            let celdaEliminar = document.createElement("td")
            let btnEliminar = document.createElement("button")
            btnEliminar.innerText = "Eliminar"
            celdaEliminar.appendChild(btnEliminar)
            fila.appendChild(celdaEliminar)

            contador ++
            this.body.appendChild(fila)
        }
    }

    limpiarTabla(){
        this.header.innerHTML = '';
        this.body.innerHTML = '';
    }
}