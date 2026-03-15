import type { IDamageable } from '../common/IDamageable';

/**
 * Manages the status and statistics of the Hero.
 */
export class HeroStatus implements IDamageable {
    public health: number;
    public maxHealth: number;
    public attackDamage: number;
    public moveSpeed: number;

    /**
     * Initializes the HeroStatus.
     */
    constructor() {
        this.maxHealth = 100;
        this.health = 100;
        this.attackDamage = 20;
        this.moveSpeed = 200;
    }

    /**
     * Applies damage to the hero.
     * @param amount The amount of damage taken.
     */
    public takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
        console.log(`Hero took ${amount} damage. Health: ${this.health}`);
    }

    /**
     * Heals the hero.
     * @param amount The amount to heal.
     */
    public heal(amount: number): void {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
}
