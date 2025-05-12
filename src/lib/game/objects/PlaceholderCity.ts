import { GameObject } from '$lib/engine/GameObject.svelte.ts';
import PlaceHolderCityView from './components/scene/PlaceHolderCityView.svelte';

export const PlaceHolderCity = {
	name: 'PlaceHolderCity',
	component: PlaceHolderCityView,
	create(props) {
		const obj = new GameObject(props);
		obj.transform.position.set([0, 0, 0]);
		return obj;
	},
	props: {}
};
