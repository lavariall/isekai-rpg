import { EntityCollider } from '../common/EntityCollider';
import type { IDamageable } from '../common/IDamageable';

/**
 * Handles magic attacks for the Slime (e.g. poison splash).
 */
export class SlimeMagicWeaponCollider extends EntityCollider {
    private damage: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 60, 60);
    }

    public setDamage(amount: number): void {
        this.damage = amount;
    }

    public onImpact(target: IDamageable): void {
        if (!this.hasHit(target)) {
            target.takeDamage(this.damage);
            this.markHit(target);
        }
    }
}
