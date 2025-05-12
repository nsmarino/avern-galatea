<script lang="ts">
    import type { GameState } from "$lib/game/manager";
    import { gameManager } from "$lib/game/manager";

    function stateSwitch(state:GameState){
        gameManager.go(state);
    }
    let currentState = gameManager.state;

</script>

<div class="fixed top-12 left-12 border border-white rounded-sm text-white w-[100px] p-2 flex flex-col gap-2 z-20">
    <button onclick={()=>stateSwitch("ready")} class="border border-white rounded-sm w-full uppercase font-mono text-[8px] p-1 cursor-pointer" class:active={$currentState==="ready"}>title screen</button>
    <button onclick={()=>stateSwitch("playing")} class="border border-white rounded-sm w-full uppercase font-mono text-[8px] p-1 cursor-pointer" class:active={$currentState==="playing"}>demo scene</button>
</div>
<style>
    button.active {
        background: blue;
    }
    button:not(.active):hover {
        background: darkblue;
        transition: ease-in-out 0.1s;
    }
</style>