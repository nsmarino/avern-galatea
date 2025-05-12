import { writable, type Writable } from 'svelte/store';
import { gameObjects, type SpawnedObject } from '$lib/engine/stores/gameObjects';
import { Avatar } from '$lib/game/objects/Avatar';

export type GameState = 'booting' | 'loading' | 'ready' | 'playing' | 'paused' | 'gameover';

export class Manager {
	private _state: Writable<GameState> = writable('ready');
	public readonly state = this._state;

	private transitions: Partial<Record<GameState, GameState[]>> = {
		booting: ['loading'],
		loading: ['ready'],
		ready: ['playing', 'paused'],
		playing: ['paused', 'gameover', 'ready'],
		paused: ['playing', 'gameover'],
		gameover: ['booting']
	};

	getState(): GameState {
		let current: GameState;
		this._state.subscribe(v => current = v)();
		return current!;
	}

	canTransitionTo(next: GameState): boolean {
		const current = this.getState();
		return this.transitions[current]?.includes(next) ?? false;
	}

	go(next: GameState) {
		const current = this.getState();

		if (!this.canTransitionTo(next)) {
			console.warn(`Invalid transition: ${current} → ${next}`);
			return;
		}

		console.log(`GameManager: ${current} → ${next}`);

		// Exit current
		this[`onExit_${current}`]?.();

		// Enter next
		this._state.set(next);
		this[`onEnter_${next}`]?.();
	}

	// --------------------------
	// State-specific logic
	// --------------------------

	private onEnter_loading() {
		console.log('[Manager] Entering loading...');
	}

	private onEnter_ready() {
		console.log('[Manager] Game is ready.');
	}

	private onEnter_playing() {
		console.log('[Manager] Spawning player...');
		this.spawn(Avatar, { name: 'Galatea' });
	}

	private onExit_playing() {
		console.log('[Manager] Despawning game objects...');
		this.despawnAll();
	}

	private onEnter_gameover() {
		console.log('[Manager] Showing game over UI...');
	}

	// --------------------------
	// Object Management
	// --------------------------

	spawn(obj: SpawnedObject, overrideProps: Record<string, any> = {}) {
		const finalProps = { ...(obj.props || {}), ...overrideProps };
		const instance = obj.create(finalProps);
		console.log('Spawning object:', instance);
		gameObjects.update(list => [
			...list,
			{
				...obj,
				props: finalProps,
				create: () => instance
			}
		]);
	}

	despawnAll() {
		gameObjects.set([]);
	}

	init() {
		console.log('Game Manager Initialized');
		this._state.set('loading');
	}
}

export const gameManager = new Manager();
