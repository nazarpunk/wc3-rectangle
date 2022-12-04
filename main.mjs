import {Rectangle} from "./rectangle.mjs";

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const rect = new Rectangle(300, 300, 350, 150, Math.PI * .25);

let mx = -1, my = -1;

window.addEventListener('mousemove', e => {
	mx = e.clientX;
	my = e.clientY;
});

let prev;

const animate = time => {
	const dx = (time - prev) * .001;

	prev = time;

	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	ctx.beginPath();
	ctx.moveTo(rect.tlX, rect.tlY);
	ctx.lineTo(rect.trX, rect.trY);
	ctx.lineTo(rect.brX, rect.brY);
	ctx.lineTo(rect.blX, rect.blY);
	ctx.closePath();

	rect.setAngle(rect.angle + Math.PI * .1 * dx);
	const radius = 50;
	const d = rect.distanceToPoint(mx, my, ctx);

	ctx.fillStyle = d > radius ? 'rgba(255,0,0,0.6)' : 'rgba(6,245,162,0.6)';
	ctx.fill();


	if (mx + my >= 0) {
		ctx.beginPath();
		ctx.arc(mx, my, radius, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(172,20,192,0.62)';
		ctx.fill();
	}

	ctx.fillStyle = '#FFFFFF';
	ctx.font = `20px Verdana`;

	ctx.fillText(`Расстояние до центра окружности: ${d.toFixed(3)}`, 10, 50);
	ctx.fillText('tl', rect.tlX, rect.tlY);
	ctx.fillText('tr', rect.trX, rect.trY);
	ctx.fillText('bl', rect.blX, rect.blY);
	ctx.fillText('br', rect.brX, rect.brY);

	requestAnimationFrame(animate);
};

prev = performance.now();
requestAnimationFrame(animate);
