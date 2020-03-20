var canvas = document.getElementById('canvas');
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;
ctx.lineCap = 'round';

let lastPoint = [0, 0];

function drawLine(lastX, lastY, X, Y) {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(X, Y);
  ctx.stroke();
}



//画图功能
var isTouchAble = 'ontouchstart' in document.documentElement;
if (isTouchAble) {
  console.log('触屏设备');
  canvas.ontouchstart = (e) => {
    lastPoint = [e.touches[0].clientX, e.touches[0].clientY]
  };
  canvas.ontouchmove = (e) => {
    drawLine(lastPoint[0],lastPoint[1],e.touches[0].clientX, e.touches[0].clientY);
    lastPoint = [e.touches[0].clientX, e.touches[0].clientY]
  }
} else {
  let isMoving = false;
  canvas.onmousedown = (e) => {
    lastPoint = [e.clientX, e.clientY];
    isMoving = true
  };

  canvas.onmousemove = (e) => {
    if (isMoving === true) {
      drawLine(lastPoint[0],lastPoint[1],e.clientX,e.clientY);
      lastPoint = [e.clientX, e.clientY]
    }
  };

  canvas.onmouseup = (e) => {
    isMoving = false;
    lastPoint = [0, 0]
  };
}

//换颜色功能
anyColor = document.getElementById('anyColor');
anyColor.onchange = (e) => {
  ctx.strokeStyle = e.target.value
};

anyColor.oninput = (e) => {
  ctx.strokeStyle = e.target.value
};

red.onclick = ()=>{
  ctx.strokeStyle = 'red'
};
black.onclick = ()=>{
  ctx.strokeStyle = 'black'
};
blue.onclick = ()=>{
  ctx.strokeStyle = 'blue'
};

yellow.onclick = ()=>{
  ctx.strokeStyle = 'yellow'
};
green.onclick = ()=>{
  ctx.strokeStyle = 'green'
};

//换笔粗功能
width2.onclick = ()=>{
  ctx.lineWidth = 2
};

width4.onclick = ()=>{
  ctx.lineWidth = 4
};

width6.onclick = ()=>{
  ctx.lineWidth = 6
};

anyPenWidth.oninput = (e)=>{
  // console.log(e);
  ctx.lineWidth =  e.target.valueAsNumber
};
//重置画笔功能

penStyleReset.onclick = ()=>{
  alert('重置画笔成功！颜色笔粗已重置~');
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
};


//橡皮功能



