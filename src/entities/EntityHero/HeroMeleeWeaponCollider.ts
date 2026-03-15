import { EntityCollider } from '../common/EntityCollider';
import type { IDamageable } from '../common/IDamageable';

/**
 * Handles melee attacks for the Hero.
 */
export class HeroMeleeWeaponCollider extends EntityCollider {
    private damage: number = 0;

    /**
     * Initializes the HeroMeleeWeaponCollider.
     * @param scene The parent scene.
     */
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 80, 80);
    }

    /**
     * Sets the damage for the current attack.
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
