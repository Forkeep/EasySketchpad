var canvas = document.getElementById('canvas');
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.lineCap = 'round';

let lastPoint = [0, 0];

function drawLine(lastX, lastY, X, Y) {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(X, Y);
  ctx.stroke();
}

let isEraser = false;

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
    isMoving = true;

  };

  canvas.onmousemove = (e) => {
    if (isMoving) {
      if (isEraser) {
        eraserCircle.style.display = 'block';
        let left = e.clientX - (eraserCircle.clientWidth / 2);
        let top = e.clientY - (eraserCircle.clientHeight / 2);
        eraserCircle.style.top = `${top}px`;
        eraserCircle.style.left = `${left}px`;
      }
      drawLine(lastPoint[0], lastPoint[1], e.clientX, e.clientY);
      lastPoint = [e.clientX, e.clientY]
    }
  };

  canvas.onmouseup = (e) => {
    isMoving = false;
    lastPoint = [0, 0];
    eraserCircle.style.display = 'none'
  };
  eraserCircle.onmouseup = () => {
    isMoving = false;
    eraserCircle.style.display = 'none'
  };
  eraserCircle.onmousemove = (e) => {
    if (isMoving) {
      if (isEraser) {
        eraserCircle.style.display = 'block';
        let left = e.clientX - (eraserCircle.clientWidth / 2);
        let top = e.clientY - (eraserCircle.clientHeight / 2);
        eraserCircle.style.top = `${top}px`;
        eraserCircle.style.left = `${left}px`;
      }
      drawLine(lastPoint[0], lastPoint[1], e.clientX, e.clientY);
      lastPoint = [e.clientX, e.clientY]
    }
  }
}

//换颜色功能
anyColor = document.getElementById('anyColor');
anyColor.onchange = (e) => {
  ctx.strokeStyle = e.target.value;
  isEraser = false
};

anyColor.oninput = (e) => {
  ctx.strokeStyle = e.target.value;
  isEraser = false
};

red.onclick = () => {
  ctx.strokeStyle = 'red';
  isEraser = false

};
black.onclick = () => {
  ctx.strokeStyle = 'black';
  isEraser = false
};
blue.onclick = () => {
  ctx.strokeStyle = 'blue';
  isEraser = false
};

yellow.onclick = () => {
  ctx.strokeStyle = 'yellow';
  isEraser = false
};
green.onclick = () => {
  ctx.strokeStyle = 'green';
  isEraser = false
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
  ctx.lineWidth =  e.target.valueAsNumber
};
//重置画笔功能

penStyleReset.onclick = () => {
  alert('重置画笔成功！颜色笔粗已重置~');
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
};


//橡皮功能
eraser2.onclick = () => {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  eraserCircle.style.width = '4px';
  eraserCircle.style.height = '4px';
  isEraser = true
};
eraser4.onclick = () => {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 8;
  eraserCircle.style.width = '8px';
  eraserCircle.style.height = '8px';
  isEraser = true
};
eraser8.onclick = () => {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 16;
  eraserCircle.style.width = '16px';
  eraserCircle.style.height = '16px';
  isEraser = true
};
eraser16.onclick = () => {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 32;
  eraserCircle.style.width = '32px';
  eraserCircle.style.height = '32px';
  isEraser = true
};

chooseEraser.oninput = (e) => {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = e.target.valueAsNumber;
  eraserCircle.style.width = `${ctx.lineWidth}px`;
  eraserCircle.style.height = `${ctx.lineWidth}px`;
  isEraser = true
};
//清空功能
clearWrapper.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setTimeout(()=>{
    alert('画板已清空！')
  },0)
};


//切换工具功能
let isPen = true;
usePen.onclick = () => {
  if (!isPen) {
    ctx.restore();
    isPen = true;
    penStyle.style.display = 'block';
    usePen.classList.add('active');
    eraser.style.display = 'none';
    useEraser.classList.remove('active');
    eraserCircle.style.display = 'none';
    isEraser = false;

  }
};

useEraser.onclick = () => {
  if (isPen) {
    ctx.save();
    isPen = false;
    eraser.style.display = 'block';
    useEraser.classList.add('active');
    penStyle.style.display = 'none';
    usePen.classList.remove('active');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    eraserCircle.style.width = '2px';
    eraserCircle.style.height = '2px';
    isEraser = true;

  }
};


//下载功能
downloadBtn.onclick = () => {
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.href = canvas.toDataURL('image/png',1.0);
  a.download = '灵动画板.png';
  a.click();
};
