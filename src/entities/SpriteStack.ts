import Phaser from 'phaser';

export class SpriteStack extends Phaser.GameObjects.Container {
    protected layers: Phaser.GameObjects.Image[] = [];
    public angle: number = 0;
    public tiltX: number = 0;
    public tiltY: number = 0;
    protected spacing: number = 1.5;
    protected layerRotations: Map<number, number> = new Map();

    constructor(scene: Phaser.Scene, x: number, y: number, keyPrefix: string, layerCount: number) {
        super(scene, x, y);
        scene.add.existing(this);

        for (let i = 0; i < layerCount; i++) {
            const layer = scene.add.image(0, 0, `${keyPrefix}_${i}`);
            layer.setOrigin(0.5, 0.5);
            this.add(layer);
            this.layers.push(layer);
        }
    }

    preUpdate(_time: number, _delta: number) {
        this.layers.forEach((layer, i) => {
            // Pseudo-3D stacking effect
            layer.setY(-i * this.spacing);
            
            // Add tilting based on movement or manual tilt
            layer.setX(this.tiltX * i);
            layer.setY(-i * this.spacing + (this.tiltY * i));
            
            const extraRot = this.layerRotations.get(i) || 0;
            layer.setAngle(this.angle + extraRot);
        });
    }

    setLayerRotation(layerIndex: number, angle: number) {
        this.layerRotations.set(layerIndex, angle);
    }

    setTilt(x: number, y: number) {
        this.tiltX = Phaser.Math.Linear(this.tiltX, x, 0.1);
        this.tiltY = Phaser.Math.Linear(this.tiltY, y, 0.1);
    }
}
