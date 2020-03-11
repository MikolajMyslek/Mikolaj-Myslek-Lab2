function cleanTitle(){
    document.getElementById("titleinp").value="";
}
function changeNoteColor(color){
    var Note = document.getElementById("topNote");
    Note.style.backgroundColor=color.id;
}
function add(){
    var NoteNumber=document.getElementById("Notecount").innerHTML;
    var NoteTittle = document.getElementById("titleinp").value;
    var NoteImportant = document.getElementById("topImportantNote").firstChild.id;
    var NoteColor = document.getElementById("topNote").style.backgroundColor;
    var NoteText = document.getElementById("textinp").value;
    var NoteDate = new Date();
    const Note = {
        NoteNumber: NoteNumber,
        NoteTittle: NoteTittle,
        NoteImportant: NoteImportant,
        NoteText: NoteText,
        NoteColor: NoteColor,
        NoteDate: NoteDate.getDay()+" "+NoteDate.getMonth()+" "+NoteDate.getFullYear()
    }
    localStorage.setItem(NoteNumber, JSON.stringify(Note));
    countNote();
    const retrievedObject = localStorage.getItem(NoteNumber);
    console.log(JSON.parse(retrievedObject).NoteImportant);
    loadNotes();
    location.reload();
}
function important(val){
    if(val.id=="true"){
        document.getElementById("topImportantNote").innerHTML="<i class=\"far fa-star\" id=\"false\"  onclick=\"important(this)\"></i>";
    }
    else{
        document.getElementById("topImportantNote").innerHTML="<i class=\"fas fa-star\" id=\"true\"  onclick=\"important(this)\"></i>";
    }
}
function countNote(){
    var i=-1;
    do{
        i++;
    }while(localStorage.getItem(i) != null)
    document.getElementById("Notecount").innerHTML=i;
}
function refresh(){
    var x = document.getElementById("note");
    x.removeChild(NoteList);
}

function loadNotes() {
    countNote();
    for (var NoteList = 0; NoteList < Number(document.getElementById("Notecount").innerHTML); NoteList++) {
        const retrievedObject = localStorage.getItem(NoteList);
        let elemet = JSON.parse(retrievedObject);
        var x = "";
        if (JSON.parse(retrievedObject).NoteImportant == "true") {
            x = "<i class=\"fas fa-star\"></i>";
        }
        else {
            x = "<i class=\"far fa-star\"></i>";
        }
        let note = document.createElement("div");
        note.className = "note";
        note.id = NoteList;

        let topNote = document.createElement("div");
        topNote.id = "topNote";
        
        let topTitleNote = document.createElement("div");
        topTitleNote.className = "topTitleNote";
        topTitleNote.style.width="90%";

        let titleinp = document.createElement("p");
        titleinp.id = "titleinp";
        titleinp.style.margin=0;
        titleinp.style.width="90%";
        titleinp.style.marginLeft="10%";

        let topImportantNote = document.createElement("div");
        topImportantNote.id = "topImportantNote";

        let importanto = document.createElement("p");

        let botNote = document.createElement("div");
        botNote.className = "botNote";

        let textinp = document.createElement("textarea");
        textinp.id = "textinp";
        textinp.style.width = "100%";
        
        textinp.disabled = true;

        note.appendChild(topNote);
        note.appendChild(botNote);
        topNote.appendChild(topTitleNote);
        topNote.appendChild(topImportantNote);
        botNote.appendChild(textinp);
        topTitleNote.appendChild(titleinp);
        topImportantNote.appendChild(importanto);
        document.body.appendChild(note)
        topNote.style.backgroundColor = JSON.parse(retrievedObject).NoteColor;
        titleinp.innerHTML = JSON.parse(retrievedObject).NoteTittle;
        textinp.value = JSON.parse(retrievedObject).NoteText;
        topImportantNote.innerHTML=x;
        note.style.float="left";
        console.log(topNote.backgroundColor)
    }
}
function Clear(){
    localStorage.clear();
      location.reload(); 
}