const bj_PI = Math.PI;
const Cos = Math.cos;
const Sin = Math.sin;
const Atan = Math.atan;
const SquareRoot = Math.sqrt;
const RMaxBJ = Math.max;

export class Rectangle {

	cx = 0;
	cy = 0;


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

	radians = 0;

	width = 0;
	height = 0;

	diagonal = 0;

	constructor(cx, cy, width, height, radians) {
		this.cx = cx;
		this.cy = cy;
		this.width = width;
		this.height = height;
		this.radians = radians;
		this.setRadians(radians);
	}

	setRadians(radians) {
		this.diagonal = SquareRoot(this.width * this.width + this.height * this.height);

		const d = this.diagonal * .5;
		const wr = (bj_PI - Atan(this.height / this.width) * 2) * .5;
		const hw = this.width * .5;
		const hh = this.height * .5;
		const hp = bj_PI * .5;

		let nr;
		this.radians = normalize(radians);
		this.tx = this.cx + hh * Cos(this.radians);
		this.ty = this.cy + hh * Sin(this.radians);

		nr = normalize(radians + hp);
		this.rx = this.cx + hw * Cos(nr);
		this.ry = this.cy + hw * Sin(nr);

		nr = normalize(radians - hp);
		this.lx = this.cx + hw * Cos(nr);
		this.ly = this.cy + hw * Sin(nr);

		nr = normalize(radians - wr);
		this.tlx = this.cx + d * Cos(nr);
		this.tly = this.cy + d * Sin(nr);

		nr = normalize(radians + wr);
		this.trx = this.cx + d * Cos(nr);
		this.try = this.cy + d * Sin(nr);

		radians = radians + bj_PI;
		this.bx = this.cx + hh * Cos(radians);
		this.by = this.cy + hh * Sin(radians);

		nr = normalize(radians - wr);
		this.brx = this.cx + d * Cos(nr);
		this.bry = this.cy + d * Sin(nr);

		nr = normalize(radians + wr);
		this.blx = this.cx + d * Cos(nr);
		this.bly = this.cy + d * Sin(nr);
	}

	distanceToXY(x, y) {
		const a = normalize(-this.radians);
		const cos = Cos(a);
		const sin = Sin(a);
		x = x - this.cx;
		y = y - this.cy;
		const xn = x * cos - y * sin;
		const yn = x * sin + y * cos;
		x = xn + this.cx;
		y = yn + this.cy;

		const hh = this.height * .5;
		const hw = this.width * .5;

		const dx = RMaxBJ(0, RMaxBJ(this.cx - hh - x, x - (this.cx + hh)));
		const dy = RMaxBJ(0, RMaxBJ(this.cy - hw - y, y - (this.cy + hw)));

		return SquareRoot(dx * dx + dy * dy);
	}
}

const normalize = r => r - 2 * bj_PI * Math.floor(r / (bj_PI * 2));


