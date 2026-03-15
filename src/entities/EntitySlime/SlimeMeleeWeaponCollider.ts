import { EntityCollider } from '../common/EntityCollider';
import type { IDamageable } from '../common/IDamageable';

/**
 * Handles melee attacks for the Slime.
 */
export class SlimeMeleeWeaponCollider extends EntityCollider {
    private damage: number = 0;

    /**
     * Initializes the SlimeMeleeWeaponCollider.
     * @param scene The parent scene.
     */
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 40, 40);
    }

    /**
     * Sets the damage for the slime's melee attack.
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
