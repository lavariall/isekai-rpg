import Phaser from 'phaser';
import { HeroStatus } from './HeroStatus';
import { HeroController } from './HeroController';
import { HeroMeleeWeaponCollider } from './HeroMeleeWeaponCollider';
import { HeroMagicWeaponCollider } from './HeroMagicWeaponCollider';
import { EntityAnimationController } from '../common/EntityAnimationController';

/**
 * The Hero entity, assembling status, controller, and interaction logic.
 */
export class Hero extends Phaser.Physics.Arcade.Sprite {
    public status: HeroStatus;
    private controller: HeroController;
    public meleeCollider: HeroMeleeWeaponCollider;
    public magicCollider: HeroMagicWeaponCollider;
    private animController: EntityAnimationController;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'hero_idle_0');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.status = new HeroStatus();
        this.controller = new HeroController(scene, this.body as Phaser.Physics.Arcade.Body);
        
        this.meleeCollider = new HeroMeleeWeaponCollider(scene);
        this.magicCollider = new HeroMagicWeaponCollider(scene);

        // Hide colliders initially
        this.meleeCollider.setActive(false).setVisible(false);
        this.magicCollider.setActive(false).setVisible(false);

        this.animController = new EntityAnimationController(this);
        this.animController.play('hero_idle');

        // Right-click for Melee Attack
        scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (pointer.rightButtonDown()) {
                this.attackMelee();
            }
        });
    }

    /**
     * Standard update loop for the Hero.
     */
    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.controller.update(this.status.moveSpeed);

        // Sync colliders with hero position
        this.meleeCollider.setPosition(this.x, this.y);
        this.magicCollider.setPosition(this.x, this.y);
    }

    /**
     * Performs a melee attack.
     */
    public attackMelee(): void {
        this.meleeCollider.setDamage(this.status.attackDamage);
        this.meleeCollider.reset();
        this.meleeCollider.setActive(true).setVisible(true);
        
        this.scene.time.delayedCall(200, () => {
            this.meleeCollider.setActive(false).setVisible(false);
        });
    }
}
