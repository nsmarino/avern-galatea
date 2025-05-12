<script lang="ts">
    import { T, useTask } from '@threlte/core';
      import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'

    import { onMount } from 'svelte';
    import { useCursor } from '@threlte/extras'
    const { onPointerEnter, onPointerLeave } = useCursor()
    import { useSceneComponent } from '$lib/engine/useSceneComponent';
    import { NightbloomWindmill } from '$lib/models';
    import { Collider, RigidBody } from '@threlte/rapier';

    const gameObject = useSceneComponent({
      signals: {
        onHit: ({ damage }) => {
          console.log(`Ouch! Hit for ${damage}`);
        }
      }
    });

    const color = gameObject.color;

    function handleClick(event: PointerEvent) {
      gameObject.getSignal("onClickCube").emit({});
    }

    let rigidBody: RapierRigidBody;

    useTask(()=> {
      if (!rigidBody) return;
        rigidBody.setNextKinematicTranslation({ x: gameObject.object3D.position.x, y: gameObject.object3D.position.y, z: gameObject.object3D.position.z })
    })

</script>

<RigidBody 
  type="kinematicPosition"
  bind:rigidBody
  >
  <Collider
    sensor
    shape={'ball'}
    args={[2]}
  />
</RigidBody>
  <T.Mesh 
    onclick={handleClick}
    onpointerenter={onPointerEnter}
    onpointerleave={onPointerLeave}
  >
    <T.BoxGeometry />
    <T.MeshBasicMaterial color={$color} />
  </T.Mesh>
  <NightbloomWindmill />
  