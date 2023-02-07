import {Rectangle} from './Rectangle.mjs';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const rect = new Rectangle(220, 280, 350, 150, Math.PI * .25);

let mx = -1, my = -1;

window.addEventListener('mousemove', e => {
	mx = e.clientX;
	my = e.clientY;
});

window.addEventListener('touchmove', e => {
	if (e.touches.length === 1) {
		mx = e.touches[0].clientX;
		my = e.touches[0].clientY;
	}
});

let prev;

const animate = time => {
	const dx = (time - prev) * .001;

	prev = time;

	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	ctx.beginPath();
	ctx.moveTo(rect.tlx, rect.tly);
	ctx.lineTo(rect.trx, rect.try);
	ctx.lineTo(rect.brx, rect.bry);
	ctx.lineTo(rect.blx, rect.bly);
	ctx.closePath();
	ctx.fillStyle = 'rgb(80,0,0)';
	ctx.fill();


	rect.setRadians(rect.radians + Math.PI * .1 * dx);
	const radius = 50;
	const d = rect.distanceXY(mx, my);

	if (mx + my >= 0) {
		ctx.beginPath();
		ctx.arc(mx, my, radius, 0, Math.PI * 2);

		if (Math.abs(d) <= radius) {
			ctx.fillStyle = 'rgba(113,217,24,0.62)';
		} else {
			ctx.fillStyle = d <= radius ? 'rgba(172,20,192,0.62)' : 'rgba(227,218,10,0.62)';
		}

		ctx.fill();
	}

	ctx.fillStyle = '#FFFFFF';
	ctx.font = `20px Verdana`;
	ctx.textAlign = 'center';

	if (mx + my < 0) {
		ctx.fillText('Наведите курсор/палец на прямоугольник', 10, 50);
	} else {
		ctx.fillText(Math.round(d).toString(), mx, my - radius);
	}
	ctx.fillText('tl', rect.tlx, rect.tly);
	ctx.fillText('tr', rect.trx, rect.try);
	ctx.fillText('bl', rect.blx, rect.bly);
	ctx.fillText('br', rect.brx, rect.bry);

	ctx.fillStyle = '#e88206';

	ctx.fillText('t', rect.tx, rect.ty);
	ctx.fillText('l', rect.lx, rect.ly);
	ctx.fillText('r', rect.rx, rect.ry);
	ctx.fillText('b', rect.bx, rect.by);

	requestAnimationFrame(animate);
};

prev = performance.now();
requestAnimationFrame(animate);
