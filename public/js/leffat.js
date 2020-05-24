var elokuvanTitle = "";

haeArvostelut();

async function haeArvostelut() {
    const response = await fetch("/api/arvostelut");
    const data = await response.json();
    console.log(data);
    console.log(data[0].leffa);
    console.log(data[1].leffa);
    taytaTaulukko(data);
}

function taytaTaulukko(data) {
    // Find a <table> element with id="myTable":
    var table = document.getElementById("arvostelutaulukko");
    for (var i = 0; i < data.length; i++) {

        var row = table.insertRow(1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
    
        // Add some text to the new cells:
        cell1.innerHTML = data[i].leffa;
        cell2.innerHTML = data[i].arvostelu;
        cell3.innerHTML = data[i].arvostelija; 
    }
}

async function haeElokuva() {
    console.log("hello world");
    var leffanNimi = document.getElementById("leffa").value;
    var leffanVuosi = document.getElementById("vuosi").value;
    var leffakysely = "http://www.omdbapi.com/?t="+ leffanNimi + "&y=" + leffanVuosi + "&apikey=a95f3723";
    
    const response = await fetch(leffakysely);
    const data = await response.json();

    console.log(data);
    
    console.log(data.Title);
    // tallennetaan globaaliin muuttujaan
    elokuvanTitle = data.Title;
    console.log(data.Year);

    document.getElementById("leffan_nimi").innerHTML = data.Title;
    var posteri = document.getElementById("leffan_posteri");
    posteri.src = data.Poster;
}

async function lahetaArvostelu() {
    var arvostelu = document.getElementById("arvostelu").value;
    var arvostelija = document.getElementById("arvostelija").value;
    var leffa = elokuvanTitle;

    console.log(arvostelu);
    console.log(arvostelija);
    console.log(elokuvanTitle);

    const data = {leffa, arvostelu, arvostelija};
  const options = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
       },
       body: JSON.stringify(data)
   };
fetch('/api/arvostele', options).then(function(response) {
      if(response.status == 200){
        console.log("ok");
        tyhjenna_arvostelutaulukko();
        haeArvostelut();
      }
    }, function(error){
      console.log(error.message);
    }); 
}

function tyhjenna_arvostelutaulukko(){
    var table = document.getElementById("arvostelutaulukko");
    var rivien_maara = table.rows.length - 1;
  
    for (var i = 0; i < rivien_maara; i++) {
        table.deleteRow(1);
    }
  } 