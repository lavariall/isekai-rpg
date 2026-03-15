import { EntityCollider } from '../common/EntityCollider';
import type { IDamageable } from '../common/IDamageable';

/**
 * Handles magic attacks for the Slime (e.g. poison splash).
 */
export class SlimeMagicWeaponCollider extends EntityCollider {
    private damage: number = 0;

    /**
     * Initializes the SlimeMagicWeaponCollider.
     * @param scene The parent scene.
     */
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 60, 60);
    }

    /**
     * Sets the damage for the slime's magic attack.
     * @param amount The damage amount.
     */
    public setDamage(amount: number): void {
        this.damage = amount;
    }

    /**
     * Triggered when hitting a damageable target.
     * @param target The target to damage.
     */
    public onImpact(target: IDamageable): void {
        if (!this.hasHit(target)) {
            target.takeDamage(this.damage);
            this.markHit(target);
        }
    }
}
