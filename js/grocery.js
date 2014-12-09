var myList = [];

$(document).ready(function (ev){
      
    if(localStorage["grocery-tonk0006"]){
        myList = JSON.parse(localStorage["grocery-tonk0006"]);
    }
    
    showList();
  
    $("#addItem").click(function(ev){
        ev.preventDefault();
        var newItem = document.querySelector("#item").value;
            if (newItem !== ""){
                newItem = newItem + ":false";
            myList.push( newItem );
            }
        localStorage["grocery-tonk0006"] = JSON.stringify(myList);
        document.querySelector("#myForm").reset();
        showList();
        return false;
    });
});

function markAsDone() {
    $(this).toggleClass("strikethrough");
    var selectedText = $(this).text();
    if(localStorage["grocery-tonk0006"]){
        for (var i = 0; i<myList.length; i++) {
            var parts = myList[i].split(":");
            
            if(parts[0]==selectedText){
                
                if(parts[1]=="false") 
                {
                    parts[1]="true";
                }
                else if(parts[1]=="true")
                {
                    parts[1]="false";
                }
                
                myList[i] = parts[0]+":"+parts[1];
            }
        }
    }
    localStorage["grocery-tonk0006"] = JSON.stringify(myList);
    //console.log(localStorage["grocery-tonk0006"]);
}

function removeItem(ev){
    var txt = ev.currentTarget.firstChild.nodeValue;
    for(var i=0; i<myList.length; i++){
        var parts = myList[i].split(":");
        if(parts[0] == txt){
        // found the match
        myList.splice(i, 1);
        }
    }
    localStorage["grocery-tonk0006"] = JSON.stringify(myList);
    showList();
}

function showList(){
    var output = document.querySelector("#itemList");
    output.innerHTML = "";
    for(var i=0; i<myList.length; i++){
        var list = document.createElement("li");
        var parts = myList[i].split(":");
        list.innerHTML = parts[0];
        
        if(parts[1]=="true"){
            $(list).toggleClass("strikethrough");
        }
        output.appendChild(list);
        
        $(list).click(markAsDone);
        
        $(list).dblclick(removeItem);
    }
}

