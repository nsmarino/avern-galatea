// src/lib/engine/useGameObject.ts
import { readable } from 'svelte/store';
import { Registry } from './GameObjectRegistry';
import type { GameObject } from './GameObject.svelte';

export function useGameObject(name: string, pollMs = 50) {
	return readable<GameObject | undefined>(undefined, set => {
		const existing = Registry.get(name);
		if (existing) {
			set(existing);
			return () => {};
		}

		const interval = setInterval(() => {
			const found = Registry.get(name);
			if (found) {
				set(found);
				clearInterval(interval);
			}
		}, pollMs);

		return () => clearInterval(interval);
	});
}
