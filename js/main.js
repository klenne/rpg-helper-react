window.onload = function () {

    $("#cards-party").append(localStorage.getItem("tagsParty"))
    $("#cards-enemies").append(localStorage.getItem("tagsEnemies"))
    //localStorage.removeItem("tagsParty")
    this.setDice(20)
    this.setQuantity(1)
    setMod(0)
}



$("#btnNewParty").click(function () {

    let numeroCard = uuid()

    let template = `
 
    <div id="card${numeroCard}" class="card-out">
    <div class="card-in">
    <div class="title-card">
    <label>Jogador:</label><span spellcheck="false" contenteditable class="inputs input-px"></span>
    <i onclick="excluir('${numeroCard}')" class="fas fa-trash"></i>
    <i onclick="salvar()" class="fas fa-save"></i>
</div>
<div class="center-image-char" onclick="carregarImagem('imagem${numeroCard}')">
    <img class="image-char" id="imagem${numeroCard}"
        src="media/img/57-572389_twenty-sided-dice-20-sided-dice-png-clipart.png">
</div>
<div class="label-n-input">
    <label>Nome-Char:</label><span spellcheck="false" contenteditable class="inputs input-px"></span>
</div>
<div class="label-n-input">
    <label>Classe:</label><span spellcheck="false" contenteditable class="inputs"></span>
</div>
<div class="label-n-input">
    <label>Armour:</label><span spellcheck="false" contenteditable class="inputs"></span>
</div>
<div class="abilities">
    <div class="abilitie-inside">
        <span>STR</span>
        <span id="str${numeroCard}" onkeypress="calcularAtribut0(event,'str${numeroCard}')"  spellcheck="false" contenteditable class="inputs-abilities"></span>
    </div>
    <div class="border-abilitie"></div>
    <div class="abilitie-inside">
        <span>DEX</span>
        <span id="dex${numeroCard}" onkeypress="calcularAtribut0(event,'dex${numeroCard}')"  spellcheck="false" contenteditable class="inputs-abilities"></span>
    </div>
    <div class="border-abilitie"></div>
    <div class="abilitie-inside">
        <span>CON</span>
        <span id="con${numeroCard}"  onkeypress="calcularAtribut0(event,'con${numeroCard}')"  spellcheck="false" contenteditable class="inputs-abilities"></span>
    </div>
    <div class="border-abilitie"></div>
    <div class="abilitie-inside">
        <span>INT</span>
        <span id="int${numeroCard}" onkeypress="calcularAtribut0(event,'int${numeroCard}')"  spellcheck="false" contenteditable class="inputs-abilities"></span>
    </div>
    <div class="border-abilitie"></div>
    <div class="abilitie-inside">
        <span>WIS</span>
        <span id="wis${numeroCard}" onkeypress="calcularAtribut0(event,'wis${numeroCard}')" spellcheck="false" contenteditable class="inputs-abilities"></span>
    </div>
    <div class="border-abilitie"></div>
    <div class="abilitie-inside">
        <span>CHA</span>
        <span id="cha${numeroCard}"  onkeypress="calcularAtribut0(event,'cha${numeroCard}')" id="vida${numeroCard}" spellcheck="false" contenteditable class="inputs-abilities"></span>
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
    let pos = $("#modalParty").position().top - 1000
    $('html, body').animate({ 'scrollTop': pos }, 1);

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

    var html = $("#cards-party").html()
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


                fileReader.readAsText(fileTobeRead)

                fileReader.onload = function (e) {
                    let fileContents = document.getElementById('cards-party')
                    fileContents.innerHTML = fileReader.result + html
                }




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
                            <span spellcheck="false" contenteditable class="inputs"></span>
                            <i onclick="excluirEnemie('${numeroCard}')" class="fas fa-trash"></i>
                            <i onclick="salvarEnemies()" class="fas fa-save"></i>
                        </div>
                        <div class="center-image-char" onclick="carregarImagem('imagem${numeroCard}')">
                            <img class="image-char" id="imagem${numeroCard}" src="media/img/beholder.png">
                        </div>
                        <div class="label-n-input">
                            <label>Vida:</label><span spellcheck="false" contenteditable class="inputs"
                                onkeypress="vida(event,'${numeroCard}')" id="vida${numeroCard}"></span>
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

    var html = $("#cards-enemies").html()
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

                    fileContents.innerHTML = fileReader.result + html
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





let diceControl = 6;
let dice = 4;

function setDice(thisdice) {
    $("#dice").html(thisdice.toString())
}

$("#plusDice").click(function () {
    diceControl++

    formatDice()
});


$("#minusDice").click(function () {
    diceControl--;
    formatDice()
});

function formatDice() {

    switch (diceControl) {
        case 1: dice = 4
            break
        case 2: dice = 6
            break
        case 3: dice = 8
            break
        case 4: dice = 10
            break
        case 5: dice = 12
            break
        case 6: dice = 20
            break
        case 7: dice = 100
            break
        default: dice = 4
            diceControl = 1
            break
    }
    setDice(dice)
}


let quantity = 1

function setQuantity(thisquant) {
    $("#quantity").html(thisquant.toString())
}

$("#plusQtd").click(function () {
    quantity++
    setQuantity(quantity)
});


$("#minusQtd").click(function () {
    quantity--;
    if (quantity < 1) {
        quantity = 1
    }
    setQuantity(quantity)
});




let modfier = 0

function setMod(thismod) {
    let modificador = thismod.toString()
    if (modificador > 0) {
        modificador = '+' + thismod.toString()
    }
    $("#modifier").html(modificador)
}

$("#plusmod").click(function () {
    modfier++
    setMod(modfier)
});


$("#minusmod").click(function () {
    modfier--;
    setMod(modfier)
});



$("#btn-dice").click(function () {

    let diceType = parseInt($("#dice").html())
    let quantidade = parseInt($("#quantity").html())
    let modificador = parseInt($("#modifier").html())
    let valRoll = 0
    for (let i = 0; i < quantidade; i++) {
        valRoll += rolarDado(diceType)
    }
    valRoll += modificador
    if (valRoll < 1) {
        valRoll = 1;
    }

    $("#resultDice").html(valRoll)

});

function rolarDado(range) {
    return Math.floor(Math.random() * range + 1)
}



$(".to-roll").click(function () {
    $("#dices").get(0).scrollIntoView();
});

$(".to-party").click(function () {
    $("#party").get(0).scrollIntoView();
});

$(".to-enemies").click(function () {
    $("#enemies").get(0).scrollIntoView();
});


function calcularAtribut0(e, idAtributo) {
    if (e.keyCode == 13) {
        e.preventDefault();
        let target = "#" + idAtributo

        let valor = $(target).html()
        let atribute = parseInt(valor)
        if (isNaN(atribute)) {
            $(target).html("")
            return 0

        }
        let atributecalc = Math.trunc((atribute - 10) / 2)
        let mod
        if (atributecalc < 0) {
            mod = `\n${atributecalc}`
        } else {
            mod = `\n+${atributecalc}`
        }
        let tudoFormatado = `${valor}\n${mod}`
        $(target).html(tudoFormatado)

        salvar()
    }

}