const colorInput = document.getElementById('color');
const colorsContainer = document.getElementById('colors');
const canvas = document.querySelector('canvas');
const lineWidthInput = document.getElementById('line-width');
const modeBtn = document.getElementById('mode-btn');
const resetBtn = document.getElementById('reset-btn');
const eraserBtn = document.getElementById('eraser-btn');
const saveBtn = document.getElementById('save-btn');
const fileInput = document.getElementById('file-input');
const textInput = document.getElementById('text-input');

const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidthInput.value;
ctx.lineCap = 'round';
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function stopPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorClick(event) {
  const color = event.target.dataset.color;
  if (!color) return;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  colorInput.value = color;
}

function onColorChange(event) {
  const color = event.target.value;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onModeChange() {
  isFilling = !isFilling;
  modeBtn.textContent = isFilling ? 'Draw' : 'Fill';
}

function onReset() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onErase() {
  ctx.strokeStyle = 'white';
  colorInput.value = '#ffffff';
  isFilling = false;
  modeBtn.innerText = 'Fill';
}

function onAddImage(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  });
  fileInput.value = null;
}

function onDoubleClick(event) {
  const text = textInput.value.trim();
  if (!text) return;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = '64px serif';
  ctx.fillText(text, event.offsetX, event.offsetY);
  textInput.value = '';
  ctx.restore();
}

function onSaveImage() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-drawing.png';
  a.click();
}

canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
lineWidthInput.addEventListener('change', onLineWidthChange);
colorInput.addEventListener('change', onColorChange);
colorsContainer.addEventListener('click', onColorClick);
modeBtn.addEventListener('click', onModeChange);
resetBtn.addEventListener('click', onReset);
eraserBtn.addEventListener('click', onErase);
saveBtn.addEventListener('click', onSaveImage);
fileInput.addEventListener('change', onAddImage);
