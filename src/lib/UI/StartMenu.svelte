<script lang="ts">
    import { gameManager } from "$lib/game/manager";

    function handleClick() {
        // enterFullscreen()
		gameManager.go("playing");
    }

	function despawn() {
		gameManager.go("ready");
	}

    function enterFullscreen() {
		const el = document.documentElement; // or a specific container like `document.getElementById('canvas-container')`

		if (el.requestFullscreen) {
			el.requestFullscreen();
		} else if ((el as any).webkitRequestFullscreen) {
			(el as any).webkitRequestFullscreen();
		} else if ((el as any).mozRequestFullScreen) {
			(el as any).mozRequestFullScreen();
		} else if ((el as any).msRequestFullscreen) {
			(el as any).msRequestFullscreen();
		}
	}
</script>

<div class="flex flex-col items-center justify-center w-full my-auto">
    <button class="text-white" onclick={handleClick}>play</button>
	<button class="text-white" onclick={despawn}>stop</button>

	<div class="audio-options fixed bottom-12 right-12 flex flex-col items-center justify-center">
		<h2>Audio</h2>

		<div class="text-white text-center mb-3">
			•၊၊||၊|။||||။၊|။•
		</div>
		<button class="secondary">▶︎</button>
	</div>

	<div class="scene-options fixed top-12 right-12 flex flex-col items-center justify-center">
		<button class="active">1</button>
		<button class="">2</button>
		<button class="">3</button>
	</div>

</div>

<style>
	button {
		border: 1px solid white;
		width: 100%;
		border-radius: 4px;
		padding: 8px 8px;
		background: none;
		font-size: 48px;
		text-transform: uppercase;
		text-align: center;
		aspect-ratio: 1 / 1;
		display: block;
		margin-bottom: 8px;
		transition: all 0.3s ease;
		cursor: pointer;
		color: white;
	}

	button:hover {
		background: RED;
		transition: ease-in-out 0.1s;
	}
	button:first-child:hover {
		background: blue;
	}

	h2 {
		color: white;
		font-size: 10px;
		text-align: center;
		font-family: serif;
		margin-top: 16px;
	}
	button.secondary {
		background: yellow;
		border: 0px solid white;
		color: black;
		font-size: 24px;
		padding: 0;
		width: 60px;
		height: 60px;
		margin: auto;

		
	}

		button.secondary:hover {
		background: cornflowerblue;
		transition: ease-in-out 0.1s;
	}
	.scene-options button {
		font-size: 16px;
		width: 40px;
		height: 40px;
		border-radius: 9999px;

	}

	.scene-options button.active {
		background-color: blue;
	}

</style>