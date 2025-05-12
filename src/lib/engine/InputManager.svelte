<script lang="ts">
	import { input } from "$lib/engine/stores/input";
	import { onMount } from "svelte";
	import { get } from "svelte/store";

    function onKeyDown(e: KeyboardEvent){
        const inputState = get(input)
        for (const key in inputState) {
            if (inputState[key].config.code === e.code) {
                if (!inputState[key].pressed) {
                    inputState[key].pressed = true
                    inputState[key].wasPressed = true
                } else if (inputState[key].wasPressed) {
                    inputState[key].wasPressed = false
                }
            }
        }
        input.set(inputState)
    }

    function onKeyUp(e: KeyboardEvent){
        const inputState = get(input)
        for (const key in inputState) {
            if (inputState[key].config.code === e.code) {
                if (inputState[key].pressed) {
                    inputState[key].pressed = false
                    inputState[key].wasPressed = false
                }
            }
        }
        input.set(inputState)
    }
</script>

<svelte:window
    on:keydown={onKeyDown}
    on:keyup={onKeyUp}
/>