import Phaser from 'phaser';
import { SpriteStack } from './SpriteStack';

export class Slime extends SpriteStack {
    private bodyProxy: Phaser.Physics.Arcade.Body;
    private target: Phaser.GameObjects.Components.Transform | null = null;
    private speed: number = 50;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Use the new high-quality slime texture
        // For now, we use 1 layer as we only have one high-res Slime_00 asset
        super(scene, x, y, 'slime_layer', 1);
        
        scene.physics.add.existing(this);
        this.bodyProxy = this.body as Phaser.Physics.Arcade.Body;
        this.bodyProxy.setCircle(12, -12, -12); // Slightly larger for the new asset
        this.spacing = 1.0;
        
        // Final scale for the pre-processed 48x48 asset
        this.layers.forEach(layer => layer.setScale(1.0));
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
        }

        // Pulsating/Squeeze effect (Wobble)
        const timeScale = time / 150;
        const wobble = Math.sin(timeScale) * 0.1;
        const scaleX = 1.0 + wobble;
        const scaleY = 1.0 - wobble;
        
        this.layers.forEach(layer => {
            layer.setScale(scaleX, scaleY);
        });

        // Vertical spacing pulse
        this.spacing = 1.0 + Math.sin(time / 200) * 0.2;
    }
}
