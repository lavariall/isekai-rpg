import Phaser from 'phaser';
import { SpriteStack } from './SpriteStack';

export class Slime extends SpriteStack {
    private bodyProxy: Phaser.Physics.Arcade.Body;
    private target: Phaser.GameObjects.Components.Transform | null = null;
    private speed: number = 50;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'slime', 10);
        
        scene.physics.add.existing(this);
        this.bodyProxy = this.body as Phaser.Physics.Arcade.Body;
        this.bodyProxy.setCircle(10, -10, -10);
        this.spacing = 1.0;
    }

    setTarget(target: Phaser.GameObjects.Components.Transform) {
        this.target = target;
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.target) {
            const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
            this.bodyProxy.setVelocity(
                Math.cos(angle) * this.speed,
                Math.sin(angle) * this.speed
            );
            this.angle = Phaser.Math.RadToDeg(angle);
        }

        // Pulsating effect
        const pulse = 1.0 + Math.sin(time / 200) * 0.2;
        this.spacing = pulse;
    }
}
