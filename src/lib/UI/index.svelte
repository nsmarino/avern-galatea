<script>
    import ColorButton from "./ColorButton.svelte";
    import ExampleButton from "./ExampleButton.svelte";
    import ExampleHud from "./ExampleHUD.svelte";
    import StartMenu from "./StartMenu.svelte";
    import { gameManager } from "$lib/game/manager";
    import StateSwitcher from "./StateSwitcher.svelte";

    let gameState = gameManager.state;

    $effect(() => {
        console.log("gameState changed:", gameState);
    })

</script>

<StateSwitcher />
<!-- 
<div class="z-20 fixed top-8 left-8 bottom-8 w-[200px] border border-2 rounded-lg border-white flex flex-col items-center gap-4 p-8 px-2">
    <h1 class="text-sm text-white font-normal text-center font-sans uppercase mb-4">avern galatea</h1>
    <StartMenu />

    {#if $gameState === "playing"}
    <div class="flex fixed bottom-12 left-[20%] gap-12 items-center justify-center">
        <ExampleHud />

        <ExampleButton />
        <ColorButton />
    </div>
    
    {/if}
</div> -->