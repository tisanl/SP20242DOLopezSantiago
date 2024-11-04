URL_APP = "https://examenesutn.vercel.app/api/VehiculoAutoCamion"

class GrupoVehiculos{
    listaVehiculos = []
    listaVehiculosEnUso = []
    ultimoId = ""

    //============================= Constructor =====================================//
    constructor(){ }

    //========================= Funciones varias ===================================//
    filtrarLista(filtro){
        if(filtro == 0) this.listaVehiculosEnUso =  this.listaVehiculos
        else this.listaVehiculosEnUso = this.listaVehiculos.filter((vehiculo)=>{
            if(filtro == 1 && vehiculo instanceof Camion) return true
            else if(filtro == 2 && vehiculo instanceof Auto) return true
        },filtro)
    }

    sortLista(atributo){
        if(atributo == "Año de Fabricacion") atributo = "anoFabricacion"
        else if(atributo == "Velocidad Maxima") atributo = "velMax"
        else if(atributo == "Cantidad de Puertas") atributo = "cantidadPuertas"
        else atributo = atributo.toLowerCase()
        
        this.listaVehiculosEnUso = this.listaVehiculosEnUso.sort((p1,p2)=>{
            if(p1[atributo] > p2[atributo]) return 1
            else if(p1[atributo] < p2[atributo]) return -1
            else return 0 
        })
    }
    
    buscarPorId(id){
        for(let vehiculo of this.listaVehiculosEnUso){
            if(id == vehiculo.id){
                return vehiculo
            }
        }
    }

    async add(datos){
        try{
            console.log(JSON.stringify(datos))
            // Formateo y ejecuto el fetch
            let respuesta = await fetch(URL_APP, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(datos) // Tiene que coincidir con el Content-Type
            })

            if(respuesta.ok){
                // Transformo el diccionario de datos en una instancia de vehiculo
                let vehiculo = GrupoVehiculos.crearInstanciaVehiculo(datos)

                respuesta = await respuesta.json()
                vehiculo.id = respuesta.id
                this.listaVehiculos.push(vehiculo)
                this.listaVehiculosEnUso = this.listaVehiculos
                return 1
            }
            else return 0
        }
        catch(e){
            return -1
        }
    }

    
    update(datos,form_datos,tablaVehiculos,spinner,form_abm){
        try{
            // Transformo el diccionario de datos en una instancia de vehiculo
            let vehiculo = GrupoVehiculos.crearInstanciaVehiculo(datos)
            
            // Formateo y ejecuto el fetch
            fetch(URL_APP, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: vehiculo.toJson() // Tiene que coincidir con el Content-Type
            })
            // Obtengo la respuesta de la promesa del fetch y la transformo en json
            .then((respuesta) => {
                if(respuesta.ok){
                    let indice = this.listaVehiculos.findIndex(objeto => objeto.id === vehiculo.id);
                    this.listaVehiculos[indice] = vehiculo
                    this.listaVehiculosEnUso = this.listaVehiculos
                    form_datos.mostrar()
                    tablaVehiculos.dibujarTabla(this.listaVehiculos)
                    spinner.ocultar()
                    form_abm.limpiarFormulario()
                    form_abm.ocultar()
                }
                else{
                    mensaje_error = new Mensaje_error("mensaje_error","idLblMensaje","No se pudo hacer la modificacion. Error interno del servidor. Intente denuevo mas tarde.","btn_msj_error",true)
                    spinner.ocultar()
                    mensaje_error.mostrar()
                } 
            })
            .catch(error => {
                new Mensaje_error("mensaje_error","idLblMensaje","No se pudo acceder al servidor. Intente denuevo mas tarde","btn_msj_error",true)
                spinner.ocultar()
                mensaje_error.mostrar()
            });

        }
        catch(e){
            mensaje_error = new Mensaje_error("mensaje_error","idLblMensaje","No se pudo acceder al servidor. Intente denuevo mas tarde","btn_msj_error",true)
            spinner.ocultar()
            mensaje_error.mostrar()
        }
    }

    async delete(vehiculo){
        try{
            let respuesta = await fetch(URL_APP, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({"id":vehiculo.id}) // Tiene que coincidir con el Content-Type
            });
            
            if(respuesta.ok){
                let indice = this.listaVehiculos.findIndex(objeto => objeto.id === vehiculo.id);
                this.listaVehiculos.splice(indice,1)
                this.listaVehiculosEnUso = this.listaVehiculos
                return 1
            }
            else return 0            
        }
        catch(e){
            return -1
        }
    }

    //========================= Funciones archivo ==================================//
    obtenerListaVehiculos(form_datos,spinner,mensaje_error,tablaVehiculos){
        let xhttp = new XMLHttpRequest(); // Instancio el objeto
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4)
            {
                if(xhttp.status == 200)
                {
                    let jsonRespuesta = JSON.parse(xhttp.response);
                    this.listaVehiculos = jsonRespuesta.map(GrupoVehiculos.crearInstanciaVehiculo)
                    this.listaVehiculosEnUso = this.listaVehiculos
                    this.ultimoId = this.obtenerUltimoId()

                    form_datos.mostrar()
                    tablaVehiculos.dibujarTabla(this.listaVehiculos)
                } 
                else 
                {
                    mensaje_error.mostrar()
                }
                spinner.ocultar()
            }
        }

        form_datos.ocultar()
        spinner.mostrar()

        // Configuro manejador para cambio de estado
        xhttp.open("GET", URL_APP)
        xhttp.setRequestHeader("Content-type", "application/json")
        xhttp.send() // Envio la solicitud
    }

    static crearInstanciaVehiculo(diccionario){
        if(diccionario.hasOwnProperty("carga") && diccionario.hasOwnProperty("autonomia")){
            return new Camion(parseInt(diccionario.id),
                                diccionario.modelo,
                                parseInt(diccionario.anoFabricacion),
                                parseInt(diccionario.velMax),
                                parseInt(diccionario.carga),
                                parseInt(diccionario.autonomia))
        }
        else if(diccionario.hasOwnProperty("cantidadPuertas") && diccionario.hasOwnProperty("asientos")){
            return new Auto(parseInt(diccionario.id),
                                diccionario.modelo,
                                parseInt(diccionario.anoFabricacion),
                                parseInt(diccionario.velMax),
                                parseInt(diccionario.cantidadPuertas),
                                parseInt(diccionario.asientos))
        }
        else{
            return new Vehiculo(parseInt(diccionario.id),
                                diccionario.modelo,
                                parseInt(diccionario.anoFabricacion),
                                parseInt(diccionario.velMax))
        }
    }

    obtenerUltimoId(){
        return this.listaVehiculos.reduce((id,vehiculo)=>{
            if(vehiculo.id > id) return vehiculo.id
            else return id
        },-1)
    }

    obtenerNuevoId(){
        this.ultimoId += 1
        return this.ultimoId
    }
}