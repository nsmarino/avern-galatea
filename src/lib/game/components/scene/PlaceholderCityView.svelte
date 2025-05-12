<script lang="ts">
	import { T } from '@threlte/core';
	import { getContext } from 'svelte';
	import { GAME_OBJECT } from '$lib/engine/GameObject.svelte';
	import { onMount } from 'svelte';

	const gameObject = getContext(GAME_OBJECT);

	let boxes: { position: [number, number, number]; scale: [number, number, number] }[] = [];

	const boxCount = 100;
	const spread = 100;

	onMount(() => {
		boxes = Array.from({ length: boxCount }, () => {
			const x = (Math.random() - 0.5) * spread;
			const z = (Math.random() - 0.5) * spread;
			const height = Math.random() * 10 + 5;

			return {
				position: [x, height / 2, z],
				scale: [Math.random() * 3 + 1, height, Math.random() * 3 + 1]
			};
		});
	});
</script>

<T.Group>
	{#each boxes as { position, scale }}
		<T.Mesh {position} {scale}>
			<T.BoxGeometry />
			<T.MeshStandardMaterial color="gray" />
		</T.Mesh>
	{/each}
</T.Group>
