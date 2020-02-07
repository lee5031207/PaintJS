//   https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
//   참고자료 

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const color_arr = Array.from(colors);
color_arr.forEach(color=>color.addEventListener("click",handleColorClick));  
//foreach 정확한뜻이해하고 싶음 모르겠음 ;;

const width = canvas.width = 800;
const height = canvas.height = 500;
ctx.fillStyle = "white";
ctx.fillRect(0,0,width,height);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}


function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x,y);   //offset 은 div안에 마우스 좌표값 
    if(!painting){   
       
        ctx.beginPath();
        ctx.moveTo(x,y);    
    }else{
       
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,width,height);
    }
}
function handleCM(event){
    event.preventDefault();  //마우스 우클릭 방지 
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //클릭하면 -> 스타트패인팅 -> 패인팅=트루 -> lineto(x,y)
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click" , handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}
function handelRangeChange(event){
    ctx.lineWidth = event.target.value;
}

if(range){
    range.addEventListener("input",handelRangeChange);
}

function changeHTML(event){
    if(mode.innerHTML==="fill"){
        mode.innerHTML = "draw";
        filling = false;
        console.log("filling =",filling);
    }else{
        mode.innerHTML = "fill";
        filling = true;
        console.log("filling =",filling);
    }
 }
 
 if(mode){
     mode.addEventListener("click",changeHTML);
 }

 function handleSaveClick(event){
     const image = canvas.toDataURL();
     const link = document.createElement("a");
     link.href = image;
     link.download = "PaintJS";
     link.click();
 }

 if(saveBtn){
     saveBtn.addEventListener("click",handleSaveClick);
 }
 