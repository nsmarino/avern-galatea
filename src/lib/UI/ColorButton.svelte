<script lang="ts">
	import { useGameObject } from '$lib/engine/useGameObject';
	import { get } from 'svelte/store';

	const avatarStore = useGameObject('Galatea');

	function cycleColor() {
		const avatar = get(avatarStore);
		avatar?.getSignal('onClickCube').emit({});
	}
</script>

<button
	on:click={cycleColor}
	class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer"
>
	Cycle Avatar Color
</button>
