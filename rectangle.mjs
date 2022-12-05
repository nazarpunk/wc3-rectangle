export class Rectangle {
	tx = 0;
	ty = 0;
	lx = 0;
	ly = 0;
	rx = 0;
	ry = 0;
	bx = 0;
	by = 0;

	tlx = 0;
	tly = 0;
	trx = 0;
	try = 0;
	blx = 0;
	bly = 0;
	brx = 0;
	bry = 0;

	cx = 0;
	cy = 0;

	radians = 0;

	width = 0;
	height = 0;

	constructor(cx, cy, width, height, radians) {
		this.cx = cx;
		this.cy = cy;
		this.width = width;
		this.height = height;
		this.radians = radians;
		this.setRadians(radians);
	}

	setRadians(radians) {
		const d = Math.sqrt(this.width * this.width + this.height * this.height) * .5;
		const wa = (Math.PI - Math.atan(this.height / this.width) * 2) * .5;

		this.radians = normalize(radians);

		let ar;

		ar = normalize(radians - wa);
		this.tlx = this.cx + d * Math.cos(ar);
		this.tly = this.cy + d * Math.sin(ar);

		ar = normalize(radians + wa);
		this.trx = this.cx + d * Math.cos(ar);
		this.try = this.cy + d * Math.sin(ar);

		radians += Math.PI;

		ar = normalize(radians - wa);
		this.brx = this.cx + d * Math.cos(ar);
		this.bry = this.cy + d * Math.sin(ar);

		ar = normalize(radians + wa);
		this.blx = this.cx + d * Math.cos(ar);
		this.bly = this.cy + d * Math.sin(ar);
	}

	distanceToXY(x, y) {
		const a = normalize(-this.radians);
		const cos = Math.cos(a);
		const sin = Math.sin(a);
		x = x - this.cx;
		y = y - this.cy;
		const xn = x * cos - y * sin;
		const yn = x * sin + y * cos;
		x = xn + this.cx;
		y = yn + this.cy;

		const hh = this.height * .5;
		const hw = this.width * .5;

		const dx = Math.max(0, this.cx - hh - x, x - (this.cx + hh));
		const dy = Math.max(0, this.cy - hw - y, y - (this.cy + hw));

		return Math.sqrt(dx * dx + dy * dy);
	}
}

const normalize = r => r - 2 * Math.PI * Math.floor(r / (Math.PI * 2));


