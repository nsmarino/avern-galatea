<script lang="ts">
  import { T, useTask} from '@threlte/core'
  import { Grid, Stars } from '@threlte/extras'
  import { onMount } from 'svelte'
  import * as THREE from 'three'

  let camera: THREE.PerspectiveCamera
  let angle = 0

  useTask((delta) => {
    angle += delta * 0.01// adjust rotation speed here
    const radius = 20 // distance from origin
    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    if (camera) {
      camera.position.set(x, 5, z)
      camera.lookAt(0, 0, 0)
    }
  })
</script>

<T.PerspectiveCamera
  bind:ref={camera}
  makeDefault
/>

<T.DirectionalLight />
<Stars />
<Grid
  sectionColor="#ff3e00"
  sectionThickness={1}
  cellColor="#cccccc"
  gridSize={40}
/>
