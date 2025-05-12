import { GameObject } from '$lib/engine/GameObject.svelte.ts';
import { IsoCameraLogic } from './components/logic/IsoCameraLogic';
import IsoCameraScene from './components/scene/IsoCameraScene.svelte';

export const IsoCamera = {
	name: 'IsoCamera',
	component: IsoCameraScene,
	create(props) {
		const obj = new GameObject(props);
		obj.attach(new IsoCameraLogic());
		return obj;
	},
	props: {}
};