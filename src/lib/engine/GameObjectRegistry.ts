import type { GameObject } from './GameObject.svelte';

class GameObjectRegistry {
	private objects = new Map<string, GameObject>();

	register(name: string, obj: GameObject) {
		this.objects.set(name, obj);
	}

	unregister(name: string) {
		this.objects.delete(name);
	}

	get(name: string): GameObject | undefined {
		return this.objects.get(name);
	}

	/** Get all GameObjects with a given prefix or partial tag */
	findByPrefix(prefix: string): GameObject[] {
		return Array.from(this.objects.entries())
			.filter(([key]) => key.startsWith(prefix))
			.map(([, value]) => value);
	}
}

export const Registry = new GameObjectRegistry();
