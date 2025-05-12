export class Signal<T = unknown> {
	private listeners = new Set<(data: T) => void>();

	emit(...args: T extends void ? [] : [T]) {
		for (const fn of this.listeners) fn(...(args as [T]));
	}

	subscribe(fn: (data: T) => void): () => void {
		this.listeners.add(fn);
		return () => this.listeners.delete(fn);
	}
}