import { setContext } from 'svelte';
import { Vector3 } from 'three';
import {writable, readable, type Writable } from 'svelte/store';
import {type SignalMap} from "./SignalRegistry"
import { Signal } from './Signal';
import * as THREE from 'three';
import { useTask } from '@threlte/core';
import { createTransformStore } from './stores/transform';

export const GAME_OBJECT = Symbol('game-object');

export type GameObjectState = 'idle' | 'active' | 'destroyed';

export interface GameObjectComponent {
	update(dt: number): void;
	onAttach?(host: GameObject): void;
	onDetach?(): void;
}

export class GameObject {
	health: Writable<number> = writable(100);
	state: GameObjectState = 'idle';
	color: Writable<string> = writable('blue');
	object3D: THREE.Group = new THREE.Group();

	transform = createTransformStore();

	private transitions = new Map<GameObjectState, Map<GameObjectState, () => void>>();

	// Components
	private components: GameObjectComponent[] = [];

	// Signals
	private signals = new Map<keyof SignalMap, Signal<any>>();

	constructor(props) {
		if (props?.name) this.object3D.userData.gameObjectName = props.name;
	}

	/** Attach a logic component (e.g., physics, behavior, etc.) */
	attach(component: GameObjectComponent) {
		this.components.push(component);
		component.onAttach?.(this);
	}

	/** Define a transition callback between two states */
	defineTransition(from: GameObjectState, to: GameObjectState, cb: () => void) {
		if (!this.transitions.has(from)) this.transitions.set(from, new Map());
		this.transitions.get(from)!.set(to, cb);
	}

	/** Transition to a new state */
	go(to: GameObjectState) {
		const current = this.state;
		const fn = this.transitions.get(current)?.get(to);
		if (fn) fn();
		this.state = to;
	}

	getState() {
		return this.state;
	}

	update(dt: number) {
		this.components.forEach(component => component.update(dt));
	}

	onDestroy(){
		this.components.forEach(c => c.onDetach?.());
	};

	getSignal<K extends keyof SignalMap>(name: K): Signal<SignalMap[K]> {
		if (!this.signals.has(name)) {
			this.signals.set(name, new Signal<SignalMap[K]>());
		}
		return this.signals.get(name) as Signal<SignalMap[K]>;
	}
}
