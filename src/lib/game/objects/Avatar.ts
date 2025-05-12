import {type SpawnedObject} from '$lib/engine/stores/gameObjects';
import {GameObject} from "$lib/engine/GameObject.svelte"
import component from "$lib/game/components/scene/Avatar.svelte"
import {LogicComponent} from "$lib/game/components/logic/LogicComponent"
import { ColorCycler } from "$lib/game/components/logic/ColorCycler";
interface AvatarProps {
	name: string;
	description: string;
	type: 'Avatar';
	x: number;
	y: number;
	width: number;
	height: number;
}

export const Avatar:SpawnedObject<AvatarProps> = {
    name: 'Galatea',
    create: function (props:Record<string, any>) {
        const obj = new GameObject(props)
        obj.attach(new LogicComponent())
        obj.attach(new ColorCycler())
        return obj
    },
    component,
    props: {
        name: 'Avatar',
        description: 'A player avatar for testing',
        type: 'Avatar',
        width: 50,
        height: 50,
        x: 0,
        y: 0,
    }
}