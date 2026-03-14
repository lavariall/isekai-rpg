import Phaser from 'phaser';
import { SpriteStack } from './SpriteStack';

export class Hero extends SpriteStack {
    private bodyProxy: Phaser.Physics.Arcade.Body;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: { [key: string]: Phaser.Input.Keyboard.Key };
    private speed: number = 200;
    private swinging: boolean = false;
    private swingAngle: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'hero', 12);
        
        scene.physics.add.existing(this);
        this.bodyProxy = this.body as Phaser.Physics.Arcade.Body;
        this.bodyProxy.setCircle(12, -12, -12);
        
        this.cursors = scene.input.keyboard!.createCursorKeys();
        this.wasd = scene.input.keyboard!.addKeys('W,A,S,D') as any;
        
        scene.input.keyboard!.on('keydown-SPACE', () => {
            this.swing();
        });
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        let vx = 0;
        let vy = 0;

        if (this.wasd.A.isDown || this.cursors.left.isDown) vx = -1;
        else if (this.wasd.D.isDown || this.cursors.right.isDown) vx = 1;

        if (this.wasd.W.isDown || this.cursors.up.isDown) vy = -1;
        else if (this.wasd.S.isDown || this.cursors.down.isDown) vy = 1;

        const vec = new Phaser.Math.Vector2(vx, vy).normalize().scale(this.speed);
        this.bodyProxy.setVelocity(vec.x, vec.y);

        // Tilting effect
        this.setTilt(vx * 3, vy * 3);

        // Angle based on movement
        if (vx !== 0 || vy !== 0) {
            this.angle = Phaser.Math.RadToDeg(Math.atan2(vy, vx));
        }

        // Sword swing animation logic
        if (this.swinging) {
            this.swingAngle += delta * 1.5;
            if (this.swingAngle >= 180) {
                this.swingAngle = 0;
                this.swinging = false;
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

    private swing() {
        if (this.swinging) return;
        this.swinging = true;
        this.swingAngle = 0;
    }

    public isSwinging() {
        return this.swinging;
    }
}
