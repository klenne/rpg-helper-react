function vida(e, numeroCard) {
    if (e.keyCode == 13) {
        e.preventDefault();
        let target = "#vida" + numeroCard
        let valor = $(target).html()

        if (valor.includes("+")) {
            let splitSoma = valor.split("+")
            let soma = parseInt(splitSoma[0]) + parseInt(splitSoma[1])
            $(target).html(soma.toString());



        } else
            if (valor.includes("-")) {
                let splitmenos = valor.split("-")
                let menos = parseInt(splitmenos[0]) - parseInt(splitmenos[1])
                $(target).html(menos.toString());



            } else if (valor.includes("*")) {
                let splitMult = valor.split("*")
                let mult = parseInt(splitMult[0]) * parseInt(splitMult[1])
                $(target).html(mult.toString());





            } else if (valor.includes("/")) {
                let splitDiv = valor.split("/")
                let div = parseInt(splitDiv[0]) / parseInt(splitDiv[1])
                $(target).html(div.toString());



            }
        salvar()
    }
}