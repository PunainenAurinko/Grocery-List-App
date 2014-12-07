var myList = [];


$(document).ready(function (ev){
    //this runs when the page loads
  
    if(localStorage.getItem("grocery-tonk0006")){
        myList = JSON.parse(localStorage.getItem("grocery-tonk0006"));
        //convert from String to Array
    }
  
    showList();
  
    $("#addItem").click(function(ev){
        ev.preventDefault();
        var newItem = document.querySelector("#item").value;
            if (newItem !== ""){
            myList.push( newItem );
            }
        localStorage.setItem("grocery-tonk0006", JSON.stringify(myList) );
        //convert from Array to String.
        document.getElementById("myForm").reset();
        showList();
        return false;
    });
});

function removeItem(ev){
    //this.firstChild.nodeValue
    //ev.currentTarget.firstChild - the textNode inside the paragraph
    //ev.currentTarget.firstChild.nodeValue - the text inside the textNode
    var txt = ev.currentTarget.firstChild.nodeValue;
    for(var i=0; i<myList.length; i++){
        if(myList[i] == txt){
        //found the match
        myList.splice(i, 1);
        }
    }
    localStorage.setItem("grocery-tonk0006", JSON.stringify(myList) );
    showList();
}

function showList(){
    var output = document.querySelector("#itemList");
    output.innerHTML = "";
    for(var i=0; i<myList.length; i++){
        var list = document.createElement("li");
        list.innerHTML = myList[i];
    
        output.appendChild(list);
              
        $(list).on("click", function(){
            $(this).toggleClass("strikethrough");
        });
        
        $(list).dblclick(removeItem);
    }
}

