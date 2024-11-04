class Mensaje_error{
    form = ""
    lbl_mensaje = ""
    boton = ""

    constructor(id,idLblMensaje,mensaje,idBoton,display){
        this.form = document.getElementById(id)

        this.lbl_mensaje = document.getElementById(idLblMensaje)
        this.lbl_mensaje.textContent = mensaje

        this.boton = document.getElementById(idBoton)
        
        if(display){
            this.boton.style.display = "block"
            this.boton.addEventListener("click",(event)=>{
                form_abm.limpiarFormulario()
                form_abm.ocultar()
                form_datos.mostrar()
                tablaVehiculos.dibujarTabla(grupoVehiculos.listaVehiculos)
                this.ocultar()
            })
        } 
        else this.boton.style.display = "none"
    }

    ocultar(){
        this.form.style.display = "none"
    }

    mostrar(){
        this.form.style.display = "flex"
    }
}