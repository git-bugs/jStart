
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const angle = (degrees = 360) => (Math.PI / 180) * degrees;

ctx.beginPath();
ctx.lineWidth = '11';
ctx.strokeStyle = 'blue';
ctx.arc(100, 100, 70, 0, angle(), false);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.arc(260, 100, 70, 0, angle(), false);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.arc(420, 100, 70, 0, angle(), false);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'yellow';
ctx.arc(175, 175, 70, 0, angle(), false);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'green';
ctx.arc(340, 175, 70, 0, angle(), false);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.arc(100, 100, 70, 0, angle(30), false);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.arc(260, 100, 70, 0, angle(30), false);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.arc(260, 100, 70, angle(90), angle(120), false);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.arc(420, 100, 70, angle(90), angle(120), false);
ctx.stroke();



const range = document.getElementById('range');
const color = document.getElementById('color');

color.addEventListener('input', () => ctx.strokeStyle = color.value);
range.addEventListener('input', () => {
  document.querySelector('span').textContent = range.value;
  ctx.lineWidth = range.value;
});

canvas.addEventListener('mousemove', (event)=>{
  ctx.lineWidth = range.value;
  const x = event.offsetX,
  y = event.offsetY,
  mx = event.movementX,
  my = event.movementY;
  if(event.buttons > 0) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x-mx, y-my);
    ctx.stroke();
    ctx.closePath();
  }
});