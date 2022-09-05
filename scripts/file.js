
let options=document.querySelectorAll(".options");
let noteSpace=document.querySelector(".note");
options.forEach((ele)=>{
   ele.addEventListener("click",optionsclicked)
    
})

function optionsclicked(ele){
if(ele.currentTarget.classList.contains("activeoption")){
    ele.currentTarget.classList.remove("activeoption")
    if(ele.currentTarget.classList.contains("italic")){
    noteSpace.style.fontStyle="normal";
    }
    else if(ele.currentTarget.classList.contains("center")){
    noteSpace.style.textAlign="left";
    }
   
}
else{
    ele.currentTarget.classList.add("activeoption")
    if(ele.currentTarget.classList.contains("italic")){
        noteSpace.style.fontStyle="oblique";
    }
    else if(ele.currentTarget.classList.contains("center")){
        noteSpace.style.textAlign="center";
        }

}
}
let fontsize=document.querySelector(".fontsize input")
fontsize.onclick=function(){
    console.log(fontsize.value)
    noteSpace.style.fontSize=(fontsize.value).toString()+"px";
}

//colors 
let colors=document.querySelectorAll(".colors div")
colors.forEach((color)=>{
    color.addEventListener("click",activeColorFunction)
})
function activeColorFunction(selectedColor){
    colors.forEach(color=>{
        color.classList.remove("activeColor")

    })
    if(selectedColor.currentTarget.classList.contains("activeColor")){
        selectedColor.currentTarget.classList.remove("activeColor");
    }
    else{
        selectedColor.currentTarget.classList.add("activeColor");
        noteSpace.style.color=selectedColor.currentTarget.dataset.color

        console.log("bashar")


    }
}
//add file
let addButton=document.querySelector(".addbutton")
let titlevalue=document.querySelector(".title")
let arrayoftextfiles=[]
if (localStorage.getItem("file")) {
    arrayoftextfiles = JSON.parse(localStorage.getItem("file"));
  }
let file=document.querySelector(".files");
addButton.onclick=function(){
  if(Savetext().title!="" ||Savetext().title!=undefined){
    if(arrayoftextfiles.length!=0 && Savetext()){
    for(let i=0;i<arrayoftextfiles.length;i++){
        if(arrayoftextfiles[i].title!=Savetext().title){
   arrayoftextfiles.push(Savetext());
    }
    else{
        arrayoftextfiles[i]=Savetext();

    }
}}

  

 addElmentTolist(arrayoftextfiles)
  addToLocalStorage(arrayoftextfiles)
  window.location.reload()
}
}
function Savetext(){
    let filetext={
        title:titlevalue.value,
        noteSpaceValue:noteSpace.value,
        noteSpacecolor:noteSpace.style.color,
        noteSpacefSize:noteSpace.style.fontSize,
        noteSpacePos:noteSpace.style.textAlign,
        noteSpacestyle:noteSpace.style.fontStyle
    }
    return filetext;
}
function addElmentTolist(arrayoftextfiles){
    file.innerHTML=""
arrayoftextfiles.forEach((textfile)=>{
let divtask=document.createElement("div")
divtask.setAttribute("id",textfile["title"])
divtask.classList.add("bg-light","rounded-3","p-2","my-2")
let headtask=document.createElement("h1")
headtask.classList.add("fs-5")
headtask.appendChild(document.createTextNode(textfile["title"]))
divtask.appendChild(headtask);

//create delete and edit buttons
let containerOfButtons=document.createElement("p")
containerOfButtons.classList.add("text-white");
let deleteButton=document.createElement("span");
deleteButton.classList.add("delete","bg-danger","p-1","rounded-1","me-1");
deleteButton.appendChild(document.createTextNode("delete"))
let editButton=document.createElement("span")
editButton.appendChild(document.createTextNode("edit"))
editButton.classList.add("edit","bg-primary","p-1","rounded-1")
//add buttons to container
containerOfButtons.appendChild(deleteButton);
containerOfButtons.appendChild(editButton)
//add buttons to file
divtask.appendChild(containerOfButtons)


//append file to files list
file.appendChild(divtask)
})}



//function to add data to local storage
function addToLocalStorage(arrayoftextfiles){
    window.localStorage.setItem("file",JSON.stringify(arrayoftextfiles));
 
}
//get data from local
getFromLocalStorage()
function getFromLocalStorage(){
   let data= window.localStorage.getItem("file")
   if(data){
    let notes=JSON.parse(data)
      
   addElmentTolist(notes)
}
}
//on click delete button
let deleteButton=document.querySelectorAll(".delete")
deleteButton.forEach((e)=>{

    e.onclick=function(e){
        console.log(e.currentTarget.parentElement.parentElement)
console.log(arrayoftextfiles)
   e.currentTarget.parentElement.parentElement.remove()
   
   deleteTextfromLocal(e.currentTarget.parentElement.parentElement.id)
}
    
}
)
//to delete from local
function deleteTextfromLocal(fileId){
  
    
arrayoftextfiles=arrayoftextfiles.filter((arrayoftext)=>arrayoftext.title!=fileId)

addToLocalStorage(arrayoftextfiles)
}


//edit
let editButton=document.querySelectorAll(".edit")
editButton.forEach((e)=>{
    e.onclick=function(e){
editButtonfun(e.currentTarget.parentElement.parentElement.id)

    }
})
function editButtonfun(id){
    for(let i=0; i<arrayoftextfiles.length;i++){
    if(arrayoftextfiles[i].title==id){
        console.log(arrayoftextfiles[i])
        noteSpace.style.textAlign=arrayoftextfiles[i].noteSpacePos
        noteSpace.style.fontStyle=arrayoftextfiles[i].noteSpacestyle
        noteSpace.style.fontSize=arrayoftextfiles[i].noteSpacefSize
        noteSpace.style.color=arrayoftextfiles[i].noteSpacecolor;
        noteSpace.value=arrayoftextfiles[i].noteSpaceValue;
        titlevalue.value=arrayoftextfiles[i].title;
        current=-1;
        document.querySelector(".undo").classList.add("disabled")
        savedText=[arrayoftextfiles[i].noteSpaceValue]
        fontsize.value=Number(arrayoftextfiles[i].noteSpacefSize);
        for(let i=0;i<colors.length;i++){

            if(colors[i].dataset.color==noteSpace.style.color){
                colors[i].classList.add("activeColor")
            }
            else{
                colors[i].classList.remove("activeColor")

            }
        }
        if(noteSpace.style.fontStyle=="oblique"){
       options[0].classList.add("activeoption")
    
        }
        else{
            options[0].classList.remove("activeoption")

        }
        if(noteSpace.style.textAlign="center"){
            options[1].classList.add("activeoption")
         
             }
             else{
                 options[1].classList.remove("activeoption")
     
             }
        
    }
    }
}






//copy 
let copyButton=document.querySelector(".copy");
copyButton.onclick=function(){

    noteSpace.select();
    navigator.clipboard.writeText(noteSpace.value)

    
        copyButton.innerHTML="Copied";
        copyButton.style.opacity=0.7;
        
   setTimeout(function(){
    copyButton.innerHTML="Copy";
    copyButton.style.opacity=1;
   },1000)
  
}

//paste button 
let pasteButton=document.querySelector(".paste")
pasteButton.onclick= function(){
    navigator.clipboard.readText()
   .then(txt=>{
    noteSpace.value+=txt;
   })
    console.log("pasted")
}
/////////////////////

let savedText=[noteSpace.value]
let current=-1;
noteSpace.oninput=function(){
    document.querySelector(".undo").classList.remove("disabled")
 savedText.push(noteSpace.value)
 current++
}
function undo(){
    current--
noteSpace.value=savedText[current];

}

document.querySelector(".undo").onclick=function(){
    if(current>0)
    {
 undo();
    }
    else if(current==0){
        document.querySelector(".undo").classList.add("disabled")

        
    }
}
setInterval(function(){
    if(noteSpace.value!=savedText[current]){
        current++
        savedText.push(noteSpace.value)

    }
},5000)
