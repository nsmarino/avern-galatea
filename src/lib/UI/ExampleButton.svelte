<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { GlobalSignals } from '$lib/engine/GlobalSignalBus';
	import { Registry } from '$lib/engine/GameObjectRegistry';

	let state: 'idle' | 'hover' | 'clicked' = 'idle';
	let el: HTMLButtonElement;
	let timeline: gsap.core.Timeline;

	function emitPause() {
		GlobalSignals.getSignal('gamePaused').emit();
	}

	function toggleAvatarHealth() {
		const avatar = Registry.get('Galatea');
		avatar?.getSignal('onHit').emit({ damage: 10 });
	}

	function transitionTo(newState: typeof state) {
		state = newState;

		// kill existing timeline
		timeline?.kill();
		timeline = gsap.timeline();

		if (newState === 'hover') {
			timeline.to(el, { scale: 1.1, duration: 0.2 });
		} else if (newState === 'clicked') {
			timeline.to(el, { scale: 0.95, duration: 0.1 }).to(el, { scale: 1, duration: 0.2 });
		} else if (newState === 'idle') {
			timeline.to(el, { scale: 1, duration: 0.2 });
		}
	}
</script>

<button
    class="border border-2 border-white text-white cursor-pointer"
	bind:this={el}
	on:mouseenter={() => transitionTo('hover')}
	on:mouseleave={() => transitionTo('idle')}
	on:mousedown={() => transitionTo('clicked')}
	on:mouseup={() => {
		transitionTo('hover');
		emitPause();
		toggleAvatarHealth();
	}}
>
	Update Avatar Health
</button>
