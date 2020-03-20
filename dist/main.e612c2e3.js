// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var canvas = document.getElementById('canvas');
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.lineCap = 'round';
var lastPoint = [0, 0];

function drawLine(lastX, lastY, X, Y) {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(X, Y);
  ctx.stroke();
}

var isEraser = false; //画图功能

var isTouchAble = 'ontouchstart' in document.documentElement;

if (isTouchAble) {
  console.log('触屏设备');

  canvas.ontouchstart = function (e) {
    lastPoint = [e.touches[0].clientX, e.touches[0].clientY];
  };

  canvas.ontouchmove = function (e) {
    drawLine(lastPoint[0], lastPoint[1], e.touches[0].clientX, e.touches[0].clientY);
    lastPoint = [e.touches[0].clientX, e.touches[0].clientY];
  };
} else {
  var isMoving = false;

  canvas.onmousedown = function (e) {
    lastPoint = [e.clientX, e.clientY];
    isMoving = true;
  };

  canvas.onmousemove = function (e) {
    if (isMoving) {
      if (isEraser) {
        eraserCircle.style.display = 'block';
        var left = e.clientX - eraserCircle.clientWidth / 2;
        var top = e.clientY - eraserCircle.clientHeight / 2;
        eraserCircle.style.top = "".concat(top, "px");
        eraserCircle.style.left = "".concat(left, "px");
      }

      drawLine(lastPoint[0], lastPoint[1], e.clientX, e.clientY);
      lastPoint = [e.clientX, e.clientY];
    }
  };

  canvas.onmouseup = function (e) {
    isMoving = false;
    lastPoint = [0, 0];
    eraserCircle.style.display = 'none';
  };

  eraserCircle.onmouseup = function () {
    isMoving = false;
    eraserCircle.style.display = 'none';
  };

  eraserCircle.onmousemove = function (e) {
    if (isMoving) {
      if (isEraser) {
        eraserCircle.style.display = 'block';
        var left = e.clientX - eraserCircle.clientWidth / 2;
        var top = e.clientY - eraserCircle.clientHeight / 2;
        eraserCircle.style.top = "".concat(top, "px");
        eraserCircle.style.left = "".concat(left, "px");
      }

      drawLine(lastPoint[0], lastPoint[1], e.clientX, e.clientY);
      lastPoint = [e.clientX, e.clientY];
    }
  };
} //换颜色功能


anyColor = document.getElementById('anyColor');

anyColor.onchange = function (e) {
  ctx.strokeStyle = e.target.value;
  isEraser = false;
};

anyColor.oninput = function (e) {
  ctx.strokeStyle = e.target.value;
  isEraser = false;
};

red.onclick = function () {
  ctx.strokeStyle = 'red';
  isEraser = false;
};

black.onclick = function () {
  ctx.strokeStyle = 'black';
  isEraser = false;
};

blue.onclick = function () {
  ctx.strokeStyle = 'blue';
  isEraser = false;
};

yellow.onclick = function () {
  ctx.strokeStyle = 'yellow';
  isEraser = false;
};

green.onclick = function () {
  ctx.strokeStyle = 'green';
  isEraser = false;
}; //换笔粗功能


width2.onclick = function () {
  ctx.lineWidth = 2;
};

width4.onclick = function () {
  ctx.lineWidth = 4;
};

width6.onclick = function () {
  ctx.lineWidth = 6;
};

anyPenWidth.oninput = function (e) {
  ctx.lineWidth = e.target.valueAsNumber;
}; //重置画笔功能


penStyleReset.onclick = function () {
  alert('重置画笔成功！颜色笔粗已重置~');
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
}; //橡皮功能


eraser2.onclick = function () {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  eraserCircle.style.width = '4px';
  eraserCircle.style.height = '4px';
  isEraser = true;
};

eraser4.onclick = function () {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 8;
  eraserCircle.style.width = '8px';
  eraserCircle.style.height = '8px';
  isEraser = true;
};

eraser8.onclick = function () {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 16;
  eraserCircle.style.width = '16px';
  eraserCircle.style.height = '16px';
  isEraser = true;
};

eraser16.onclick = function () {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 32;
  eraserCircle.style.width = '32px';
  eraserCircle.style.height = '32px';
  isEraser = true;
};

chooseEraser.oninput = function (e) {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = e.target.valueAsNumber;
  eraserCircle.style.width = "".concat(ctx.lineWidth, "px");
  eraserCircle.style.height = "".concat(ctx.lineWidth, "px");
  isEraser = true;
}; //清空功能


clearWrapper.onclick = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setTimeout(function () {
    alert('画板已清空！');
  }, 0);
}; //切换工具功能


var isPen = true;

usePen.onclick = function () {
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

useEraser.onclick = function () {
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
}; //下载功能


downloadBtn.onclick = function () {
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = canvas.toDataURL('image/png', 1.0);
  a.download = '灵动画板.png';
  a.click();
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e612c2e3.js.map