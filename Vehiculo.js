class Vehiculo{
    id = ""
    modelo = ""
    anoFabricacion = ""
    velMax = ""

    constructor(id,modelo,anoFabricacion,velMax){
        this.id = id
        this.modelo = modelo
        this.anoFabricacion = anoFabricacion
        this.velMax = velMax
    }

    modificarDatos(datos){
        this.modelo = datos.modelo
        this.anoFabricacion = datos.anoFabricacion
        this.velMax = datos.velMax
    }

    toString(){
        let s = "Id: " + this.id
        s += "\nModelo: " + this.modelo
        s += "\nAño de Fabricacion: " + this.anoFabricacion
        s += "\nVelocidad Maxima: " + this.velMax

        return s
    }
    
    toJson(){
        return JSON.stringify(this)
    }
}
