# avern galatea
This project is a web-based game engine built using:

- Svelte 5 for UI, reactivity, and component structure

- Threlte for 3D rendering and GLTF/Three.js integration

- A custom GameObject system inspired by Unity/Godot

# File Structure Overview

## 📁 File Structure Overview

| Folder                             | Purpose                                                      |
|------------------------------------|--------------------------------------------------------------|
| `src/lib/game/objects/`           | GameObject prefabs (e.g. `Avatar.ts`, `CameraRig.ts`)        |
| `src/lib/game/components/scene/`  | SceneComponents (3D render logic; one per GameObject)        |
| `src/lib/game/components/logic/`  | LogicComponents (update behavior, signal handling)           |
| `src/lib/models/`                 | Auto-generated `.svelte` components from GLTFs               |
| `static/models/`                  | Raw `.glb` or `.gltf` files for transformation               |
| `scripts/transform-models.ts`     | CLI pipeline for transforming GLTFs to Threlte components    |

# GameObject System
Every entity in the game is a GameObject. It can:

- Attach LogicComponents (behavior)

- Include a SceneComponent for 3D representation

- Own a transform store (position, rotation, scale)

- Be uniquely registered and referenced via a GameObjectRegistry

# GameObjectHost
GameObjectHost.svelte is a special wrapper that:

- Creates a GameObject via create(props)

- Registers it in the GameObjectRegistry

- Sets Svelte context (setContext(GAME_OBJECT, ...))

- Provides that context to its slot (where the SceneComponent is rendered)

- Binds the GameObject’s object3D as a T.Group to integrate with Threlte

# Signals
- Each GameObject supports named signal channels like onHit, onHeal, etc.
Components can subscribe with:
```
this.host.getSignal('onHit').subscribe(({ damage }) => ...)
```
- Global signals are managed via a GlobalSignalBus singleton.


# Manager & State Machine
Manager.ts manages global game state and lifecycle:

- Defines states like init, playing, paused

- Each state has enter()/exit() callbacks

- Can spawn or destroy GameObjects on state transitions

# HUD and UI Integration
- UI is built with Svelte

- The HUD subscribes to GameObject state (e.g. Avatar health, position)

- Uses useGameObject('Avatar') to safely connect after GameObject spawn

- Interactive UI elements (e.g. buttons) emit signals or modify GameObjects via the registry or global bus

# Asset Pipeline
- Place .glb/.gltf models in `static/models/`

- Run `pnpm run transform:models` or `watch:models` to convert them

- Output .svelte components go to `src/lib/models`

- Transforms can be run manually or automatically via `chokidar-cli`

