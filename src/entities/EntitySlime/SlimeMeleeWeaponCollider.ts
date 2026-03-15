import { EntityCollider } from '../common/EntityCollider';
import type { IDamageable } from '../common/IDamageable';

/**
 * Handles melee attacks for the Slime.
 */
export class SlimeMeleeWeaponCollider extends EntityCollider {
    private damage: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 40, 40);
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
