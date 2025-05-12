import { Component } from "$lib/engine/Component";
import { type SignalMap } from "$lib/engine/SignalRegistry";
import { type GameObject } from "$lib/engine/GameObject.svelte";

export class LogicComponent extends Component {
    constructor(){
        super()
    }
    onAttach(host:GameObject) {
        super.onAttach(host);
    }

    update(dt: number) {
        const t = performance.now() / 1000;
        const newY = Math.sin(t) * 1.5;

        this.host.transform.position.y.set(newY);
    }

    connectSignals(){
        return [
			this.host.getSignal('onHit').subscribe(({ damage }: SignalMap['onHit']) => {
                console.log('Hit received with damage:', damage);
				this.host.health.update(h => h - damage);
			}),
        ]
    }
}