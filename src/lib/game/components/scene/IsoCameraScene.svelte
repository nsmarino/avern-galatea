<script lang="ts">
	import { T } from '@threlte/core';
	import { getContext } from 'svelte';
	import { GAME_OBJECT } from '$lib/engine/GameObject.svelte';

	const gameObject = getContext(GAME_OBJECT);
</script>

<T.OrthographicCamera
	makeDefault
	zoom={50}
	position={[0, 20, 20]}
	rotation={[-Math.PI / 4, Math.PI / 4, 0]}
	lookAt={[0, 0, 0]}
/>