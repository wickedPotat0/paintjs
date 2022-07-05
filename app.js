const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVARS_SIZE = 700;
/*canvars pixel modifier에 사이즈를 주어야 그릴수 있음. css와 마찬가지로 윈도우에 픽셀을 줘야함.*/
canvas.width = CANVARS_SIZE;
canvas.height = CANVARS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVARS_SIZE, CANVARS_SIZE);
/*ctx -defalut설정하기  선의 색과 넓이*/
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    /*클릭하고 움직이 전까지 사용되는 조건문 */
    ctx.beginPath(); /*path는 '선' */
    ctx.moveTo(x, y);
    /* 마우스의 x,y좌표를 path에 옮긴다. 그래서 마우스를 움직이면 path를 만들수 있음.*/
  } else {
    /*클릭하고 움직이면 사용되는 조건문 */
    ctx.lineTo(
      x,
      y
    ); /*path의 시작점부터 현재위치까지의 x,y좌표의 선을 만든다. */
    ctx.stroke(); /*선을 만든다. 위의 라인투에서 생성된 path들을 보여줄수있음(선으로 나타냄)*/
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

/*클릭을 했을때 만약 필링의 상태가 트루인 경우 false로 바꾸고 텍스트를 필로 바꿈. 반대는 트로로 바꾸고 텍스트를 페인트로. */
function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVARS_SIZE, CANVARS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

/* Array.from()은 오브젝트로 부터 배열을 만듦 */
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
