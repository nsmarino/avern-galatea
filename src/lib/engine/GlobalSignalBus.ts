import { Signal } from "./Signal"

type Listener<T> = (data: T) => void;

class GlobalSignalBus {
	private signals = new Map<string, Signal<any>>();

	getSignal<T = void>(key: string): Signal<T> {
		if (!this.signals.has(key)) {
			this.signals.set(key, new Signal<T>());
		}
		return this.signals.get(key) as Signal<T>;
	}
}

// Export a single global instance
export const GlobalSignals = new GlobalSignalBus();
export type { Listener };