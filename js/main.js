window.onload = function () {
    $("#cards-party").append(getCookie("partySalva"))
   

}



$("#btnNewParty").click(function () {

    let numeroCard = uuid()

    let template = `
 

    <div id="card${numeroCard}" class="card-out">
    <div class="card-in">

        <div class="title-card">
            <label>Jogador:</label><span spellcheck="false" contenteditable class="inputs"></span> 
            <i onclick="excluir('${numeroCard}')" class="fas fa-trash"></i>
            <i onclick="salvar()" class="fas fa-save"></i>
        </div>
        <div class="center-image-char">
            <img class="image-char" id="imagem${numeroCard}" src="media/img/barb.png">
        </div>
        <div class="label-n-input">
            <label>Nome-Char:</label><span spellcheck="false" contenteditable class="inputs"></span> 
        </div>
        <div class="label-n-input">
            <label>Vida:</label><span spellcheck="false" contenteditable class="inputs"  onkeypress="vida(event,${numeroCard})" id="vida${numeroCard}" ></span> 
        </div>
        <div class="label-n-input">
            <label>Buffs:</label><span spellcheck="false" contenteditable class="inputs"></span> 
        </div>
        <div class="label-n-input">
            <label>Debufs:</label><span spellcheck="false" contenteditable class="inputs"></span> 
        </div>
    </div>
     </div>


   `

    $("#cards-party").append(template)
    salvar()

});


function salvar() {


    let html = $("#cards-party").html()

    setCookie("partySalva", html.toString())
   
}
function excluir(cardTarget) {

    let target = "#card" + cardTarget
    $(target).remove()
    salvar()
}
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


$("#btnExportParty").click(function () {

    let html = $("#cards-party").html()
    let blob = new Blob([html], { type: "text/plain;charset=utf-8" })
    saveAs(blob, "ExportedPArty.txt")


});


$("#btnImportParty").click(function () {


    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        let fileSelected = document.getElementById('file_upload')
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            let fileExtension = /text.*/
            //Get the file object
            let fileTobeRead = fileSelected.files[0]
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                let fileReader = new FileReader()
                fileReader.onload = function (e) {
                    let fileContents = document.getElementById('cards-party')
                    fileContents.innerHTML = fileReader.result
                }
                fileReader.readAsText(fileTobeRead)
            }
            else {
                alert("Por favor selecione arquivo texto")
            }

        }, false)
    }
    else {
        alert("Arquivo(s) não suportado(s)")
    }
});



function uuid() {

    // Retorna um número randômico entre 0 e 15.
    function randomDigit() {

        // Se o browser tiver suporte às bibliotecas de criptografia, utilize-as;
        if (crypto && crypto.getRandomValues) {

            // Cria um array contendo 1 byte:
            var rands = new Uint8Array(1)

            // Popula o array com valores randômicos
            crypto.getRandomValues(rands)

            // Retorna o módulo 16 do único valor presente (%16) em formato hexadecimal
            return (rands[0] % 16).toString(16)
        } else {
            // Caso não, utilize random(), que pode ocasionar em colisões (mesmos valores
            // gerados mais frequentemente):
            return ((Math.random() * 16) | 0).toString(16)
        }
    }

    // A função pode utilizar a biblioteca de criptografia padrão, ou
    // msCrypto se utilizando um browser da Microsoft anterior à integração.
    var crypto = window.crypto || window.msCrypto

    // para cada caracter [x] na string abaixo um valor hexadecimal é gerado via
    // replace:
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit)
}

function setCookie(name, value) {  //função universal para criar cookie
    $.Storage.set(name, value);
}

function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function getCookie(name) {
return $.Storage.get(name);
  }