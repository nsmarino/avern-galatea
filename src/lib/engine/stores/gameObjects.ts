import { writable } from 'svelte/store';
import type { Component } from 'svelte';

import type { GameObject } from '$lib/engine/GameObject.svelte';

export interface SpawnedObject<TProps extends Record<string, unknown>={}> {
	name: string;
	create: (props:Record<string, unknown>) => GameObject;
	component: Component;
    props: TProps;
}

export const gameObjects = writable<SpawnedObject[]>([]);
