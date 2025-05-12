import { Component } from '$lib/engine/Component';

export class ColorCycler extends Component {
	private colors = ['skyblue', 'red', 'green', 'blue', 'yellow', 'orange'];
	private index = 0;

	cycleColor() {
		this.index = (this.index + 1) % this.colors.length;
		this.host.color.set(this.colors[this.index]);
	}

	update() {}

    connectSignals() {
        return [
            this.host.getSignal('onClickCube').subscribe(() => {
                this.cycleColor();
            }),
        ];
    }
}
