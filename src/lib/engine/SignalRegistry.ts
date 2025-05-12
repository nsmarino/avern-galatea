/** Signal names and their expected payload types */
export interface SignalMap {
	onHit: { damage: number };
	onClickCube: {},
	onHeal: { amount: number };
	onSpeak: { message: string };
}
