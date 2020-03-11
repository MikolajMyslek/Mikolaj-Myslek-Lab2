document.addEventListener('DOMContentLoaded', appStart) 
  let mouseClicked=false
  let mouseReleased = true
  const  canvas = document.querySelector('#canvas') 
  const ctx = canvas.getContext('2d'); 
  canvas.width = 1650;
  canvas.height = 800;
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let size = 20;
  let btn = document.querySelector("#disable")
function appStart() {
    document.querySelector('#darken').addEventListener('click',() => darken())
    document.querySelector('#brighten').addEventListener('click', ()=>brighten())
    document.querySelector('#contrast').addEventListener('click' , ()=>contrastFilter())
    document.querySelector('#blur').addEventListener('click' , ()=>blurFilter())
    document.querySelector('#fillcircle').addEventListener('click' , ()=>activateCircle(false))
    document.querySelector('#circle').addEventListener('click' , ()=>activateCircle(true))
    document.querySelector('#rectangle').addEventListener('click' , ()=>activateRect())
}
 
 
function blurFilter() {
    const canvasData = ctx.getImageData(0, 0, document.getElementById('canvas').width,document.getElementById('canvas').height)
    for( let i = 0; i < canvasData.data.length; i+=4) {        
      canvasData.data[i] = (canvasData.data[i] + canvasData.data[i+4])/2 
      canvasData.data[i+1] = (canvasData.data[i+1] + canvasData.data[i+5])/2
      canvasData.data[i+2] = (canvasData.data[i+2] + canvasData.data[i+6])/2
    }
    ctx.putImageData(canvasData, 0, 0)
  }
function contrastFilter (amount = 10) {
    const canvasData = ctx.getImageData(0, 0, document.getElementById('canvas').width,document.getElementById('canvas').height)
    for (let i = 0; i < canvasData.data.length; i += 2) {
      const r = canvasData.data[i]
      const g = canvasData.data[i + 1]
      const b = canvasData.data[i + 2]
 
      const avg = (r + g + b) / 3
      if (avg <= 127) {
        amount = -amount
      }
      canvasData.data[i] += amount
      canvasData.data[i + 1] += amount
      canvasData.data[i + 2] += amount
    }
    ctx.putImageData(canvasData, 0, 0)
    console.log(canvasData.data)    
   
}

function activateCircle(on){
  function draw(e) {
      if(!isDrawing) return;
      ctx.beginPath();
      ctx.arc(e.offsetX,e.offsetY, size, 0, Math.PI * 2, false); 
      if(on==true)
      {
          ctx.lineWidth = 5;
      }
      else
      {
          ctx.lineWidth = size;
      }
      ctx.strokeStyle = x;
      ctx.stroke(); 
    }
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
    });
    canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
}
function activateRect(){
  function draw(e) {
      if(!isDrawing) return;
      ctx.lineJoin = 'round'; 
      ctx.lineCap = 'round'; 
      ctx.beginPath(); 
      ctx.fillStyle = x;
      ctx.fillRect(lastX , lastY , size ,size)
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
     
    }
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
}      
 
function color(obj) {
    x = obj.id;
}

function BGcolor(obj) {
  document.getElementById("canvas").style.backgroundColor = obj.id;
}

function brushSize(){
    actS = document.getElementById("canvasSize");
    size = actS.value;
}

 
function drawCanvasImage() {
    const image = new Image()
    image.src = 'zdjecie.jpg'
    image.addEventListener('load', ()=> {
        ctx.drawImage(image, 0,0 , document.getElementById('canvas').width, document.getElementById('canvas').height)
    })
}
 
function darken(amount = 30) { 
    const canvasData = ctx.getImageData(0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height)
    for(let i = 0; i<canvasData.data.length; i++) { 
        canvasData.data[i] -= amount 
    }
    ctx.putImageData(canvasData, 0, 0)
}
function brighten(amount = 30){
    canvasData = ctx.getImageData(0,0,document.getElementById('canvas').width, document.getElementById('canvas').height)
    for(let i =0; i<canvasData.data.length; i++){
        canvasData.data[i] +=amount;
    }
    ctx.putImageData(canvasData , 0 ,0)
}
function deleteAll(){
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,document.getElementById('canvas').width,document.getElementById('canvas').height);
  }
}