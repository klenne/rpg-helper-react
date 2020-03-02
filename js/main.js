let numerosParty = 0


window.onload = function () {
    $("#cards-party").append(sessionStorage.getItem("partySalva"))

    if (sessionStorage.getItem("partyNumero") == null) {
        sessionStorage.setItem("partyNumero", numerosParty)
    }else{
        numerosParty=sessionStorage.getItem("partyNumero") 
    }


}



$("#btnNewParty").click(function () {

    let numeroCard = numerosParty

    let template = `
 

    <div id="card${numerosParty}" class="card-out">
    <div class="card-in">

        <div class="title-card">
            <label>Jogador:</label><span spellcheck="false" contenteditable class="inputs"></span> 
            <i onclick="excluir(${numeroCard})" class="fas fa-trash"></i>
            <i onclick="salvar()" class="fas fa-save"></i>
        </div>
        <div class="center-image-char">
            <img class="image-char" id="imagem${numerosParty}" src="media/img/barb.png">
        </div>
        <div class="label-n-input">
            <label>Nome-Char:</label><span spellcheck="false" contenteditable class="inputs"></span> 
        </div>
        <div class="label-n-input">
            <label>Vida:</label><span spellcheck="false" contenteditable class="inputs"  onkeypress="vida(event,${numeroCard})" id="vida${numerosParty}" ></span> 
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

    numerosParty++
    sessionStorage.setItem("partyNumero", numerosParty)
    salvar()

});


function salvar() {


    let html = $("#cards-party").html()
    sessionStorage.setItem("partySalva", html)

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
    
    let blob = new Blob([html], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "ExportedPArty.txt");


});


$("#btnImportParty").click(function () {
    

   //Check the support for the File API support
   if (window.File && window.FileReader && window.FileList && window.Blob) {
    var fileSelected = document.getElementById('file_upload');
    fileSelected.addEventListener('change', function (e) {
        //Set the extension for the file
        var fileExtension = /text.*/;
        //Get the file object
        var fileTobeRead = fileSelected.files[0];
        //Check of the extension match
        if (fileTobeRead.type.match(fileExtension)) {
            //Initialize the FileReader object to read the 2file
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                var fileContents = document.getElementById('cards-party');
                fileContents.innerHTML = fileReader.result;
            }
            fileReader.readAsText(fileTobeRead);
        }
        else {
            alert("Por favor selecione arquivo texto");
        }

    }, false);
}
else {
    alert("Arquivo(s) não suportado(s)");
}


      
      
  
  
  });


 
 