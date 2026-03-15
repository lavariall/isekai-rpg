import type { IDamageable } from '../common/IDamageable';

/**
 * Manages the status and statistics of the Slime NPC.
 */
export class SlimeStatus implements IDamageable {
    public health: number;
    public maxHealth: number;
    public attackDamage: number;
    public moveSpeed: number;

    /**
     * Initializes the SlimeStatus.
     */
    constructor() {
        this.maxHealth = 50;
        this.health = 50;
        this.attackDamage = 10;
        this.moveSpeed = 80;
    }

    /**
     * Applies damage to the slime.
     */
    public takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
        console.log(`Slime took ${amount} damage. Health: ${this.health}`);
    }
}
