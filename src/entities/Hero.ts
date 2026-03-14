import Phaser from 'phaser';
import { HeroStats } from './hero/HeroStats';
import { HeroGraphics } from './hero/HeroGraphics';
import { HeroController } from './hero/HeroController';
import { HeroMeleWeaponCollider } from './hero/HeroMeleWeaponCollider';
import { Sword } from './Sword';

/**
 * The main hero character of the game.
 * Manages stats, graphics, controller, and weapon.
 */
export class Hero extends Phaser.GameObjects.Container {
    public stats: HeroStats;
    public graphics: HeroGraphics;
    public controller: HeroController;
    public sword: Sword;
    public meleeCollider: HeroMeleWeaponCollider;
    private bodyProxy: Phaser.Physics.Arcade.Body;


    /**
     * Creates an instance of the Hero.
     * @param {Phaser.Scene} scene The Phaser scene this hero belongs to.
     * @param {number} x The initial x-coordinate.
     * @param {number} y The initial y-coordinate.
     */
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);
        
        // 1. Initialize Components
        this.stats = new HeroStats();
        this.graphics = new HeroGraphics(scene, 0, 0);
        this.controller = new HeroController(scene);
        this.sword = new Sword(scene, x, y);
        
        // Whirlwind area collider (radius 140 approx distance+blade)
        this.meleeCollider = new HeroMeleWeaponCollider(scene, x, y, 140);


        // 2. Setup Graphics as a child
        this.add(this.graphics);

        scene.physics.add.existing(this);
        this.bodyProxy = this.body as Phaser.Physics.Arcade.Body;
        // 16 radius circle centered at (0,0) in Container space
        this.bodyProxy.setCircle(16, -16, -16);
    }

    /**
     * Internal Phaser update loop for the hero.
     * @param {number} _time The current time.
     * @param {number} _delta The delta time since the last frame.
     */
    preUpdate(_time: number, _delta: number) {
        // Update controller (input)
        this.controller.update();

        // Update graphics (tilting, movement orientation)
        const input = this.controller.getRawInput();
        this.graphics.updateMovement(input.x, input.y);

        // Apply movement to body
        this.bodyProxy.setVelocity(this.controller.movementVector.x, this.controller.movementVector.y);

        // Handle actions
        if (this.controller.consumeSwing()) {
            this.sword.swing(this.graphics.angle);
            this.meleeCollider.activate();
        }

        // Update components
        this.sword.updatePosition(this.x, this.y, this.graphics.angle);
        this.meleeCollider.updatePosition(this.x, this.y);
    }

    /**
     * Checks if the hero's sword is currently swinging.
     * @returns {boolean} True if the sword is swinging, false otherwise.
     */
    public isSwinging(): boolean {
        return this.sword.isSwinging();
    }

}
