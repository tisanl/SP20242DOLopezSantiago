class Auto extends Vehiculo{
    cantidadPuertas = ""
    asientos = ""

    constructor(id,modelo,anoFabricacion,velMax,cantidadPuertas,asientos){
        super(id,modelo,anoFabricacion,velMax)
        this.cantidadPuertas = cantidadPuertas
        this.asientos = asientos
    }

    modificarDatos(datos){
        super.modificarDatos(datos)
        this.cantidadPuertas = datos.cantidadPuertas
        this.asientos = datos.asientos
    }

    toString(){
        let s = super.toString()
        s += "\nCantidad de Puertas: " + this.cantidadPuertas
        s += "\nAsientos: " + this.asientos

        return s
    }
    
    toJson(){
        return JSON.stringify(this)
    }
}