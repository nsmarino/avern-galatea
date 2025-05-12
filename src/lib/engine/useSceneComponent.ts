// useSceneComponent.ts
import { getContext, onDestroy } from 'svelte';
import type { GameObject } from '$lib/engine/GameObject.svelte';
import { GAME_OBJECT } from '$lib/engine/GameObject.svelte';

export function useSceneComponent({
	signals = {}
}: {
	signals?: Partial<Record<string, (data: any) => void>>;
} = {}) {
	const gameObject = getContext<GameObject>(GAME_OBJECT);
	const cleanups: (() => void)[] = [];

	// Subscribe to signals
	for (const [name, handler] of Object.entries(signals)) {
		const signal = gameObject.getSignal(name as any);
		const unsub = signal.subscribe(handler!);
		cleanups.push(unsub);
	}

	onDestroy(() => {
		cleanups.forEach(fn => fn());
	});

	return gameObject;
}
