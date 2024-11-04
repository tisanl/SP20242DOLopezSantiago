class Form_abm{
    form = ""
    titulo_abm = ""
    txt_id = ""
    txt_modelo = ""
    lbl_error_modelo = ""
    txt_anoFabricacion = ""
    lbl_error_anoFabricacion = ""
    txt_velMax = ""
    lbl_error_velMax = ""
    select_tipo = ""
    txt_carga = ""
    lbl_error_carga = ""
    txt_autonomia = ""
    lbl_error_autonomia = ""
    txt_cantidadPuertas = ""
    lbl_error_cantidadPuertas = ""
    txt_asientos = ""
    lbl_error_asientos = ""
    campo_vehiculo = ""
    campo_camion = ""
    campo_auto = ""
    campo_botones = ""
    btn_aceptar = ""
    btn_cancelar = ""

    vehiculoEnUso = ""

    //============================= Constructor =====================================//
    constructor(elementosFormAbm){
        this.form = elementosFormAbm.form
        this.titulo_abm = elementosFormAbm.titulo_abm
        this.txt_id = elementosFormAbm.txt_id
        this.txt_modelo = elementosFormAbm.txt_modelo
        this.lbl_error_modelo = elementosFormAbm.lbl_error_modelo
        this.txt_anoFabricacion = elementosFormAbm.txt_anoFabricacion
        this.lbl_error_anoFabricacion = elementosFormAbm.lbl_error_anoFabricacion
        this.txt_velMax = elementosFormAbm.txt_velMax
        this.lbl_error_velMax = elementosFormAbm.lbl_error_velMax
        this.select_tipo = elementosFormAbm.select_tipo
        this.txt_carga = elementosFormAbm.txt_carga
        this.lbl_error_carga = elementosFormAbm.lbl_error_carga
        this.txt_autonomia = elementosFormAbm.txt_autonomia
        this.lbl_error_autonomia = elementosFormAbm.lbl_error_autonomia
        this.txt_cantidadPuertas = elementosFormAbm.txt_cantidadPuertas
        this.lbl_error_cantidadPuertas = elementosFormAbm.lbl_error_cantidadPuertas
        this.txt_asientos = elementosFormAbm.txt_asientos
        this.lbl_error_asientos = elementosFormAbm.lbl_error_asientos
        this.campo_vehiculo = elementosFormAbm.campo_vehiculo
        this.campo_camion = elementosFormAbm.campo_camion
        this.campo_auto = elementosFormAbm.campo_auto
        this.campo_botones = elementosFormAbm.campo_botones
        this.btn_aceptar = elementosFormAbm.btn_aceptar
        this.btn_cancelar = elementosFormAbm.btn_cancelar
    }

    //=================== Agregar / modificar vehiculo ==============================//
    completarFormulario(vehiculo){
        this.vehiculoEnUso = vehiculo

        this.campo_camion.style.display = "none"
        this.campo_auto.style.display = "none"
        this.select_tipo.disabled = true

        this.txt_id.value = vehiculo.id
        this.txt_modelo.value = vehiculo.modelo
        this.txt_anoFabricacion.value = vehiculo.anoFabricacion
        this.txt_velMax.value = vehiculo.velMax

        if(vehiculo instanceof Camion){
            this.txt_carga.value = vehiculo.carga
            this.txt_autonomia.value = vehiculo.autonomia
            this.select_tipo.value = 1
            this.campo_camion.style.display = "block"
        }
        else if(vehiculo instanceof Auto){
            this.txt_cantidadPuertas.value = vehiculo.cantidadPuertas
            this.txt_asientos.value = vehiculo.asientos
            this.select_tipo.value = 2
            this.campo_auto.style.display = "block"
        }
    }

    validarFormulario(){
        let todoOk = true

        // Validacion del modelo
        let modelo = validarNoVacio(this.txt_modelo.value)
        if(!modelo){
            this.lbl_error_modelo.textContent = "Este campo no puede quedar vacio"
            todoOk = false
        } else this.lbl_error_modelo.textContent = ""

        // Validacion del anoFabricacion
        let anoFabricacion = validarNumeroMin(this.txt_anoFabricacion.value,1985)
        if(anoFabricacion === -1 || anoFabricacion === -2){
            this.lbl_error_anoFabricacion.textContent = "No puede ser menor a 1985"
            todoOk = false
        } else this.lbl_error_anoFabricacion.textContent = ""

        // Validacion de la velMax
        let velMax = validarNumeroMin(this.txt_velMax.value,1)
        if(velMax === -1 || velMax === -2){
            this.lbl_error_velMax.textContent = "No puede ser menor a 0"
            todoOk = false
        } else this.lbl_error_velMax.textContent = ""

        // Validacion campos camion
        let carga = ""
        let autonomia = ""
        if(this.select_tipo.value == 1){
            // Validacion carga
            carga = validarNumeroMin(this.txt_carga.value,1)
            if(carga === -1 || carga === -2){
                this.lbl_error_carga.textContent = "No puede ser menor a 0"
                todoOk = false
            } else this.lbl_error_carga.textContent = ""

            // Validacion autonomia
            autonomia = validarNumeroMin(this.txt_autonomia.value,1)
            if(autonomia === -1 || autonomia === -2){
                this.lbl_error_autonomia.textContent = "No puede ser menor a 0"
                todoOk = false
            } else this.lbl_error_autonomia.textContent = ""
        }

        // Validacion campos auto
        let cantidadPuertas = ""
        let asientos = ""
        if(this.select_tipo.value == 2){
            // Validacion cantidadPuertas
            cantidadPuertas = validarNumeroMin(this.txt_cantidadPuertas.value,2)
            if(cantidadPuertas === -1 || cantidadPuertas === -2){
                this.lbl_error_cantidadPuertas.textContent = "No puede ser menor a 2"
                todoOk = false
            } else this.lbl_error_cantidadPuertas.textContent = ""
            
            // Validacion asientos
            asientos = validarNumeroMin(txt_asientos.value,2)
            if(asientos === -1 || asientos === -2){
                this.lbl_error_asientos.textContent = "No puede ser menor a 2"
                todoOk = false
            } else this.lbl_error_asientos.textContent = ""
        }        

        if(todoOk){
            let datos = {
                "modelo" : modelo,
                "anoFabricacion" : anoFabricacion,
                "velMax" : velMax,
                "select_tipo" : this.select_tipo.value,
            }
            if(this.titulo_abm.innerText !== "DAR DE ALTA"){
                datos["id"] = this.txt_id.value
            }
            if(this.select_tipo.value == 1){
                datos["carga"] = carga
                datos["autonomia"] = autonomia
            }
            else if(this.select_tipo.value == 2){
                datos["cantidadPuertas"] = cantidadPuertas
                datos["asientos"] = asientos
            }

            return datos

        } else return false
    }

    //========================= Funciones varias ===================================//
    limpiarFormulario(){
        this.txt_id.value = ""
        this.txt_modelo.value = ""
        this.lbl_error_modelo.textContent = ""
        this.txt_anoFabricacion.value = ""
        this.lbl_error_anoFabricacion.textContent = ""
        this.txt_velMax.value = ""
        this.lbl_error_velMax.textContent = ""
        this.select_tipo.value = 1
        this.txt_carga.value = ""
        this.lbl_error_carga.textContent = ""
        this.txt_autonomia.value = ""
        this.lbl_error_autonomia.textContent = ""
        this.txt_cantidadPuertas.value = ""
        this.lbl_error_cantidadPuertas.textContent = ""
        this.txt_asientos.value = ""
        this.lbl_error_asientos.textContent = ""
    }

    ocultar(){
        this.form.style.display = "none"
    }

    mostrar(titulo){
        this.titulo_abm.innerText = titulo
        this.form.style.display = "flex"
        this.campo_vehiculo.style.display = "block"
        this.campo_botones = "block"
        this.select_tipo.value = 1
        this.campo_camion.style.display = "block"
        this.campo_auto.style.display = "none"
    }
}