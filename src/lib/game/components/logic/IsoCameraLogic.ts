import { Component } from '$lib/engine/Component';

export class IsoCameraLogic extends Component {
	private moveVector: [number, number] = [0, 0];

	private bounds = {
		threshold: 50,
		speed: 10
	};

	update(dt: number) {
		const [dx, dz] = this.moveVector;
		const speed = this.bounds.speed * dt;

		this.host.transform.position.x.update(x => x + dx * speed);
		this.host.transform.position.z.update(z => z + dz * speed);
	}

	connectSignals() {
		window.addEventListener('mousemove', this.handleMouseMove);
		return [
			() => window.removeEventListener('mousemove', this.handleMouseMove)
		];
	}

	private handleMouseMove = (e: MouseEvent) => {
		const { innerWidth, innerHeight } = window;
		const { threshold } = this.bounds;

		let dx = 0;
		let dz = 0;

		if (e.clientX < threshold) dx = -1;
		else if (e.clientX > innerWidth - threshold) dx = 1;

		if (e.clientY < threshold) dz = -1;
		else if (e.clientY > innerHeight - threshold) dz = 1;

		this.moveVector = [dx, dz];
	};
}
