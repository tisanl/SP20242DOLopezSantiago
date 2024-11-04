class Camion extends Vehiculo{
    carga = ""
    autonomia = ""

    constructor(id,modelo,anoFabricacion,velMax,carga,autonomia){
        super(id,modelo,anoFabricacion,velMax)
        this.carga = carga
        this.autonomia = autonomia
    }

    modificarDatos(datos){
        super.modificarDatos(datos)
        this.carga = datos.carga
        this.autonomia = datos.autonomia
    }

    toString(){
        let s = super.toString()
        s += "\nCarga: " + this.carga
        s += "\nAutonomia: " + this.autonomia

        return s
    }
    
    toJson(){
        return JSON.stringify(this)
    }
}

