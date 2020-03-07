window.onload = function () {

    $("#cards-party").append(localStorage.getItem("tagsParty"))
    $("#cards-enemies").append(localStorage.getItem("tagsEnemies"))
    //localStorage.removeItem("tagsParty")
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
        <div class="center-image-char" onclick="carregarImagem('imagem${numeroCard}')">
            <img class="image-char" id="imagem${numeroCard}"
                src="media/img/57-572389_twenty-sided-dice-20-sided-dice-png-clipart.png">
        </div>
        <div class="label-n-input">
            <label>Nome-Char:</label><span spellcheck="false" contenteditable class="inputs"></span>
        </div>
        <div class="label-n-input">
            <label>Classe:</label><span spellcheck="false" contenteditable class="inputs"></span>
        </div>
        <div class="label-n-input">
            <label>Armour:</label><span spellcheck="false" contenteditable class="inputs"></span>
        </div>
        <div class="abilities">
            <div class="abilitie-inside border-abilitie">
                <span>STR</span>
                <span spellcheck="false" contenteditable class="inputs-abilities"></span>
            </div>
            <div class="abilitie-inside border-abilitie">
                <span>DEX</span>
                <span spellcheck="false" contenteditable class="inputs-abilities"></span>
            </div>
            <div class="abilitie-inside border-abilitie">
                <span>CON</span>
                <span spellcheck="false" contenteditable class="inputs-abilities"></span>
            </div>
            <div class="abilitie-inside border-abilitie">
                <span>INT</span>
                <span spellcheck="false border-abilitie" contenteditable class="inputs-abilities"></span>
            </div>
            <div class="abilitie-inside border-abilitie">
                <span>WIS</span>
                <span spellcheck="false" contenteditable class="inputs-abilities"></span>
            </div>
            <div class="abilitie-inside">
                <span>CHA</span>
                <span spellcheck="false" contenteditable class="inputs-abilities"></span>
            </div>

        </div>

        <div class="label-n-input">
            <label>Vida:</label><span spellcheck="false" contenteditable class="inputs"
                onkeypress="vida(event,'${numeroCard}')" id="vida${numeroCard}"></span>
        </div>
        <div class="label-n-input">
            <label>Saving-Throws:</label><span spellcheck="false" contenteditable class="inputs input-menor"></span>
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

let imagemId
function carregarImagem(idImagem) {
    imagemId = idImagem
    $("#modalParty").css("display", "flex")
    let pos=$("#modalParty").position().top-1000
    $('html, body').animate({ 'scrollTop' :pos  }, 1);

}

$("#fechareModal").click(function () {
    $("#modalParty").css("display", "none")

});

$("#AddImg").click(function () {
    let img = document.getElementById(imagemId);
    let url = $("#urlImage").val()
    img.src = url;
    $("#urlImage").val("")
    
    $("#modalParty").css("display", "none")
});

function salvar() {


    let html = $("#cards-party").html()
    localStorage.removeItem("tagsPaty")
    localStorage.setItem("tagsParty", html)



}
function excluir(cardTarget) {

    let target = "#card" + cardTarget
    $(target).remove()
    salvar()
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
                    let htmlAtual = $('#cards-party').html()
                    fileContents.innerHTML = htmlAtual + fileReader.result
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




$("#btnNewEnemie").click(function () {

    let numeroCard = uuid()

    let template = `
 

    <div id="card${numeroCard}" class="card-out cardEnemie">
    <div class="card-in">

        <div class="title-card">
            <span spellcheck="false" contenteditable class="inputs ,
            "></span> 
            <i onclick="excluirEnemie('${numeroCard}')" class="fas fa-trash"></i>
            <i onclick="salvarEnemies()" class="fas fa-save"></i>
        </div>
        <div class="center-image-char" onclick="carregarImagem('imagem${numeroCard}')">
            <img class="image-char" id="imagem${numeroCard}" src="media/img/beholder.png">
        </div>
        <div class="label-n-input">
            <label>Vida:</label><span spellcheck="false" contenteditable class="inputs"  onkeypress="vida(event,'${numeroCard}')" id="vida${numeroCard}" ></span> 
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

    $("#cards-enemies").append(template)
    salvarEnemies()

});





function salvarEnemies() {


    let html = $("#cards-enemies").html()
    localStorage.removeItem("tagsEnemies")
    localStorage.setItem("tagsEnemies", html)



}

function excluirEnemie(cardTarget) {

    let target = "#card" + cardTarget
    $(target).remove()
    salvarEnemies()
}


$("#btnExportEnemies").click(function () {

    let html = $("#cards-enemies").html()
    let blob = new Blob([html], { type: "text/plain;charset=utf-8" })
    saveAs(blob, "ExportedEnemies.txt")


});

$("#btnImportEnemies").click(function () {


    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        let fileSelected = document.getElementById('file_uploadEnemie')
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
                    let fileContents = document.getElementById('cards-enemies')
                    let htmlAtual = $('#cards-enemies').html()
                    fileContents.innerHTML = htmlAtual + fileReader.result
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


