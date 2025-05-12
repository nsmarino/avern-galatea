<script lang="ts">
    import { gameObjects } from '$lib/engine/stores/gameObjects';
	import { useGameObject } from '$lib/engine/useGameObject';
	import { derived, get } from 'svelte/store';

	const avatarStore = useGameObject('Galatea');

	const health = derived(avatarStore, ($avatar, set) => {
		if (!$avatar) return;
		return $avatar.health.subscribe(set);
	}, 100);

	const y = derived(avatarStore, ($avatar, set) => {
		if (!$avatar) return;
		return $avatar.transform.position.y.subscribe(set);
	}, 0);
	const x = derived(avatarStore, ($avatar, set) => {
		if (!$avatar) return;
		return $avatar.transform.position.x.subscribe(set);
	}, 0);
	const z = derived(avatarStore, ($avatar, set) => {
		if (!$avatar) return;
		return $avatar.transform.position.z.subscribe(set);
	}, 0);
	const name = derived(avatarStore, () => {
	})
	console.log("Avatar Store", $avatarStore)

</script>

<div class="text-white p-4 rounded-lg text-sm font-mono leading-relaxed shadow-lg flex flex-col gap-2">
		<div class="w-[200px]"></div>

	<p>Health: {$health}</p>
	<div class="w-[var(--health)] h-2 bg-[#0f0]" style="--health: {$health}px"></div>
	<div class="flex gap-4">
		<p>X: {$x.toFixed(1)}</p>
		<p>Z: {$z.toFixed(1)}</p>
		<p>Y: {$y.toFixed(1)}</p>	
	</div>
	
</div>
