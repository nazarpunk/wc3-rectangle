export class Rectangle {

	/**
	 * @param {number} cx
	 * @param {number} cy
	 * @param {number} width
	 * @param {number} height
	 * @param {number} radians
	 */
	constructor(cx, cy, width, height, radians) {
		this.cx = cx;
		this.cy = cy;
		this.width = width;
		this.height = height;
		this.radians = radians;
		this.setRadians(radians);
	}

	/**
	 * @param {number} radians
	 * @return {Rectangle}
	 */
	setRadians(radians) {
		this.diagonal = Math.sqrt(this.width * this.width + this.height * this.height);

		const d = this.diagonal * .5;
		const wr = (Math.PI - Math.atan(this.height / this.width) * 2) * .5;
		const hw = this.width * .5;
		const hh = this.height * .5;
		const hp = Math.PI * .5;

		let nr;
		this.radians = radians - 2 * Math.PI * Math.floor(radians / (Math.PI * 2));
		this.tx = this.cx + hh * Math.cos(this.radians);
		this.ty = this.cy + hh * Math.sin(this.radians);

		nr = radians + hp;
		this.rx = this.cx + hw * Math.cos(nr);
		this.ry = this.cy + hw * Math.sin(nr);

		nr = radians - hp;
		this.lx = this.cx + hw * Math.cos(nr);
		this.ly = this.cy + hw * Math.sin(nr);

		nr = radians - wr;
		this.tlx = this.cx + d * Math.cos(nr);
		this.tly = this.cy + d * Math.sin(nr);

		nr = radians + wr;
		this.trx = this.cx + d * Math.cos(nr);
		this.try = this.cy + d * Math.sin(nr);

		radians = radians + Math.PI;
		this.bx = this.cx + hh * Math.cos(radians);
		this.by = this.cy + hh * Math.sin(radians);

		nr = radians - wr;
		this.brx = this.cx + d * Math.cos(nr);
		this.bry = this.cy + d * Math.sin(nr);

		nr = radians + wr;
		this.blx = this.cx + d * Math.cos(nr);
		this.bly = this.cy + d * Math.sin(nr);

		return this;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @return {number}
	 */
	distanceXY(x, y) {
		const a = -this.radians;
		const cos = Math.cos(a);
		const sin = Math.sin(a);
		x -= this.cx;
		y -= this.cy;
		const xn = x * cos - y * sin;
		const yn = x * sin + y * cos;
		x = xn + this.cx;
		y = yn + this.cy;

		const hh = this.height * .5;
		const hw = this.width * .5;
		const xmin = this.cx - hh;
		const xmax = this.cx + hh;
		const ymin = this.cy - hw;
		const ymax = this.cy + hw;

		const dx = Math.max(0, xmin - x, x - xmax);
		const dy = Math.max(0, ymin - y, y - ymax);

		const d = dx * dx + dy * dy;
		if (d > 0) {
			return -d;
		}
		return Math.min(x - xmin, xmax - x, y - ymin, ymax - y) ** 2;
	}
}


