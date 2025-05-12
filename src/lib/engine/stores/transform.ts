import { writable, derived, type Writable, type Readable } from 'svelte/store';

export interface Vector3Store {
	x: Writable<number>;
	y: Writable<number>;
	z: Writable<number>;
	vector: Readable<[number, number, number]>;
	set: (v: [number, number, number]) => void;
}

export interface EulerStore {
	x: Writable<number>;
	y: Writable<number>;
	z: Writable<number>;
	euler: Readable<[number, number, number]>;
	set: (e: [number, number, number]) => void;
}

export interface TransformStore {
	position: Vector3Store;
	rotation: EulerStore;
	scale: Vector3Store;
}

function createVector3Store(initial: [number, number, number] = [0, 0, 0]): Vector3Store {
	const x = writable(initial[0]);
	const y = writable(initial[1]);
	const z = writable(initial[2]);

	const vector = derived([x, y, z], ([$x, $y, $z]) => [$x, $y, $z] as [number, number, number]);

	const set = ([nx, ny, nz]: [number, number, number]) => {
		x.set(nx);
		y.set(ny);
		z.set(nz);
	};

	return { x, y, z, vector, set };
}

function createEulerStore(initial: [number, number, number] = [0, 0, 0]): EulerStore {
	const x = writable(initial[0]);
	const y = writable(initial[1]);
	const z = writable(initial[2]);

	const euler = derived([x, y, z], ([$x, $y, $z]) => [$x, $y, $z] as [number, number, number]);

	const set = ([rx, ry, rz]: [number, number, number]) => {
		x.set(rx);
		y.set(ry);
		z.set(rz);
	};

	return { x, y, z, euler, set };
}

export function createTransformStore(initial?: {
	position?: [number, number, number];
	rotation?: [number, number, number];
	scale?: [number, number, number];
}): TransformStore {
	return {
		position: createVector3Store(initial?.position ?? [0, 0, 0]),
		rotation: createEulerStore(initial?.rotation ?? [0, 0, 0]),
		scale: createVector3Store(initial?.scale ?? [1, 1, 1])
	};
}
