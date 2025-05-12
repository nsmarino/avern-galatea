<script lang="ts">
  import { Canvas, } from '@threlte/core';
  import Game from './Game.svelte';
  import Common from './Common.svelte';
  import InputManager from './InputManager.svelte';

</script>

<div class="w-full h-[calc(100vh-16px)]">
  <Canvas>
    <Common />
    <Game />
  </Canvas>
</div>

<InputManager />
  