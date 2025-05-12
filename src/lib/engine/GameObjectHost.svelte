<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { T, useTask} from '@threlte/core';
  import { setContext } from 'svelte';
  import { Registry } from "./GameObjectRegistry"
  import { GameObject, GAME_OBJECT } from "./GameObject.svelte"
  import { get } from 'svelte/store';

  export let create: (props: Record<string, any>) => GameObject;
  export let name: string;
  export let props: Record<string, any>;
  let gameObject: GameObject;

  onMount(() => {
    gameObject = create(props);

    Registry.register(name, gameObject);

    setContext(GAME_OBJECT, gameObject);
  });

  onDestroy(() => {
    console.log("Destroying game object", name);
    Registry.unregister(name);
    gameObject.onDestroy()
  });

  useTask((delta) => {
    const [px, py, pz] = get(gameObject.transform.position.vector);
    const [rx, ry, rz] = get(gameObject.transform.rotation.euler);
    const [sx, sy, sz] = get(gameObject.transform.scale.vector);

    gameObject.object3D.position.set(px, py, pz);
    gameObject.object3D.rotation.set(rx, ry, rz);
    gameObject.object3D.scale.set(sx, sy, sz);
    
    gameObject.update(delta)
  });
</script>

{#if gameObject}
  <T.Group bind:ref={gameObject.object3D}>
    <slot {gameObject} />
  </T.Group>
{/if}
  