import Phaser from 'phaser';
import { SlimeStatus } from './SlimeStatus';
import { SlimeNpcLogic } from './SlimeNpcLogic';
import { SlimeMeleeWeaponCollider } from './SlimeMeleeWeaponCollider';
import { SlimeMagicWeaponCollider } from './SlimeMagicWeaponCollider';

/**
 * The Slime entity, assembling status, AI, and interaction logic.
 */
export class Slime extends Phaser.Physics.Arcade.Sprite {
    public status: SlimeStatus;
    private ai: SlimeNpcLogic;
    public meleeCollider: SlimeMeleeWeaponCollider;
    public magicCollider: SlimeMagicWeaponCollider;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'slime_layer_0');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setCircle(15, 0, 0);

        this.status = new SlimeStatus();
        this.ai = new SlimeNpcLogic(scene, this.body as Phaser.Physics.Arcade.Body);
        
        this.meleeCollider = new SlimeMeleeWeaponCollider(scene);
        this.magicCollider = new SlimeMagicWeaponCollider(scene);

        this.meleeCollider.setActive(false).setVisible(false);
        this.magicCollider.setActive(false).setVisible(false);
    }

    public setTarget(target: Phaser.GameObjects.Components.Transform): void {
        this.ai.setTarget(target);
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.ai.update(this.status.moveSpeed);

        this.meleeCollider.setPosition(this.x, this.y);
        this.magicCollider.setPosition(this.x, this.y);
    }
}
