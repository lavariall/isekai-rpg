import { EntityCollider } from '../common/EntityCollider';
import type { IDamageable } from '../common/IDamageable';

/**
 * Handles magic attacks for the Hero.
 */
export class HeroMagicWeaponCollider extends EntityCollider {
    private damage: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 120, 120); // Larger AoE
    }

    /**
     * Sets the damage for the current spell.
     */
    public setDamage(amount: number): void {
        this.damage = amount;
    }

    /**
     * Triggered when hitting a damageable target.
     */
    public onImpact(target: IDamageable): void {
        if (!this.hasHit(target)) {
            target.takeDamage(this.damage);
            this.markHit(target);
        }
    }
}
