import Phaser from 'phaser';
import { SpriteStack } from '../SpriteStack';

export class HeroGraphics extends SpriteStack {
    private swinging: boolean = false;
    private swingAngle: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // We use the new concept texture prefix 'hero_layer'
        // There are 7 layers total
        super(scene, x, y, 'hero_layer', 7);
        
        // Scale is now 1.0 as assets are pre-processed to correct size
        const scale = 1.0; 
        this.layers.forEach(layer => {
            layer.setScale(scale);
        });

        // Adjust spacing for the new fixed sizes
        this.spacing = 1.0; 
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.swinging) {
            this.swingAngle += delta * 1.5;
            if (this.swingAngle >= 180) {
                this.swingAngle = 0;
                this.swinging = false;
                // Reset rotations for upper body layers
                // Assuming layers 4, 5, 6 are neck and head parts
                // In the old system it was 4, 5, 6 (sword + head?)
                // We'll see how it looks with the new layers
                this.setLayerRotation(4, 0);
                this.setLayerRotation(5, 0);
                this.setLayerRotation(6, 0);
            } else {
                const rot = Math.sin(Phaser.Math.DegToRad(this.swingAngle)) * 90;
                this.setLayerRotation(4, rot);
                this.setLayerRotation(5, rot);
                this.setLayerRotation(6, rot);
            }
        }
    }

    public startSwing() {
        if (this.swinging) return;
        this.swinging = true;
        this.swingAngle = 0;
    }

    public isSwinging() {
        return this.swinging;
    }

    public updateMovement(vx: number, vy: number) {
        // Tilting effect
        this.setTilt(vx * 3, vy * 3);

        // Angle based on movement
        if (vx !== 0 || vy !== 0) {
            this.angle = Phaser.Math.RadToDeg(Math.atan2(vy, vx));
        }
    }
}
