<script lang="ts">
	import { gameObjects } from './stores/gameObjects'
	import GameObjectHost from './GameObjectHost.svelte';
	import { interactivity } from '@threlte/extras'
    import { World, Debug } from '@threlte/rapier';

	interactivity()

</script>

<World>
	<Debug />
	{#each $gameObjects as { name, create, component, props }}
		<GameObjectHost {create} {props} {name} let:gameObject>
			<svelte:component this={component} {gameObject} />
		</GameObjectHost>
	{/each}
</World>

