import Phaser from 'phaser';
import { HeroStats } from './hero/HeroStats';
import { HeroGraphics } from './hero/HeroGraphics';
import { HeroController } from './hero/HeroController';

export class Hero extends Phaser.GameObjects.Container {
    public stats: HeroStats;
    public graphics: HeroGraphics;
    public controller: HeroController;
    private bodyProxy: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);
        
        // 1. Initialize Components
        this.stats = new HeroStats();
        this.graphics = new HeroGraphics(scene, 0, 0);
        this.controller = new HeroController(scene);

        // 2. Setup Graphics as a child
        this.add(this.graphics);

        // 3. Setup Physics
        scene.physics.add.existing(this);
        this.bodyProxy = this.body as Phaser.Physics.Arcade.Body;
        this.bodyProxy.setCircle(12, -12, -12);
    }

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
            this.graphics.startSwing();
        }
    }

    public isSwinging(): boolean {
        return this.graphics.isSwinging();
    }
}
