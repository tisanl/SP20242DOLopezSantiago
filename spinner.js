class Spinner{
    form = ""

    constructor(id){
        this.form = document.getElementById(id)
    }

    ocultar(){
        this.form.style.display = "none"
    }

    mostrar(){
        this.form.style.display = "flex"
    }
}