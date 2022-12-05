export class Rectangle {

	tlX = 0;
	tlY = 0;
	trX = 0;
	trY = 0;
	blX = 0;
	blY = 0;
	brX = 0;
	brY = 0;

	cX = 0;
	cY = 0;

	angle = 0;

	width = 0;
	height = 0;

	constructor(cX, cY, width, height, angle) {
		this.cX = cX;
		this.cY = cY;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.setAngle(angle);
	}

	setAngle(angle) {
		const d = Math.sqrt(this.width * this.width + this.height * this.height) * .5;
		const wa = (Math.PI - Math.atan(this.height / this.width) * 2) * .5;

		this.angle = normalize(angle);

		let ar;

		ar = normalize(angle - wa);
		this.tlX = this.cX + d * Math.cos(ar);
		this.tlY = this.cY + d * Math.sin(ar);

		ar = normalize(angle + wa);
		this.trX = this.cX + d * Math.cos(ar);
		this.trY = this.cY + d * Math.sin(ar);

		angle += Math.PI;

		ar = normalize(angle - wa);
		this.brX = this.cX + d * Math.cos(ar);
		this.brY = this.cY + d * Math.sin(ar);

		ar = normalize(angle + wa);
		this.blX = this.cX + d * Math.cos(ar);
		this.blY = this.cY + d * Math.sin(ar);
	}

	distanceToPoint(x, y) {
		const a = normalize(-this.angle);
		const cos = Math.cos(a);
		const sin = Math.sin(a);
		x -= this.cX;
		y -= this.cY;
		const xn = x * cos - y * sin;
		const yn = x * sin + y * cos;
		x = xn + this.cX;
		y = yn + this.cY;

		const hh = this.height * .5;
		const hw = this.width * .5;

		const dx = Math.max(0, this.cX - hh - x, x - (this.cX + hh));
		const dy = Math.max(0, this.cY - hw - y, y - (this.cY + hw));

		return Math.sqrt(dx * dx + dy * dy);
	}
}

const normalize = r => r - 2 * Math.PI * Math.floor(r / (Math.PI * 2));


