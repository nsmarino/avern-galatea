import { writable } from 'svelte/store'

type Input<K extends string, T> = Record<K,T>

interface InputKey {
    pressed: Boolean;
    wasPressed: Boolean;
    config: {
        code: string;
        onlyOnce: Boolean;
    }
}

export const input = writable<Input<string,InputKey>>({
    Forward: {
        pressed:false,
        wasPressed: false,

        config: {
            code: "KeyW",
            onlyOnce: false
        },
    },
    Back: {
        pressed:false,
        wasPressed: false,

        config: {
            code: "KeyS",
            onlyOnce: false
        },
    },
    Left: {
        pressed:false,
        wasPressed: false,

        config: {
            code: "KeyA",
            onlyOnce: false
        },
    },
    Right: {
        pressed:false,
        wasPressed: false,

        config: {
            code: "KeyD",
            onlyOnce: false
        },
    },
})
