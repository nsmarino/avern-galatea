import type { GameObject } from './GameObject.svelte';
import type { SignalMap } from './SignalRegistry';

type SignalCleanup = () => void;

export abstract class Component<TSignals extends Record<string, any> = SignalMap> {
	protected host!: GameObject;
	private signalCleanups: SignalCleanup[] = [];

	onAttach(host: GameObject) {
		this.host = host;
		this.signalCleanups = this.connectSignals();
	}

	onDetach() {
		for (const stop of this.signalCleanups) stop();
		this.signalCleanups = [];
	}

	abstract update(dt: number): void;

	/** Override to subscribe to signals, return unsubscribe fns */
	protected connectSignals(): SignalCleanup[] {
		return [];
	}

	/** Helper to get typed signal from the host */
	protected on<K extends keyof TSignals>(
		name: keyof SignalMap,
		handler: (data: TSignals[K]) => void
	): SignalCleanup {
		const signal = this.host.getSignal(name);
		return signal.subscribe(handler as any);
	}
}
