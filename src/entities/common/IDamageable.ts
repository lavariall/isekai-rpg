/**
 * Interface for any entity that can receive damage.
 */
export interface IDamageable {
    /** The current health of the entity. */
    health: number;
    /** The maximum health of the entity. */
    maxHealth: number;
    /**
     * Applies damage to the entity.
     * @param amount The amount of damage to deal.
     */
    takeDamage(amount: number): void;
}
