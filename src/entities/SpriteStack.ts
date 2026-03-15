import Phaser from 'phaser';

/**
 * A utility class for creating pseudo-3D effects by stacking 2D sprites.
 * Handles tilting and rotation of the stacked layers.
 */
export class SpriteStack extends Phaser.GameObjects.Container {
    protected layers: Phaser.GameObjects.Image[] = [];
    public angle: number = 0;
    public tiltX: number = 0;
    public tiltY: number = 0;
    protected spacing: number = 1.5;
    protected layerRotations: Map<number, number> = new Map();

    /**
     * Creates an instance of a SpriteStack.
     * @param {Phaser.Scene} scene The Phaser scene this stack belongs to.
     * @param {number} x The initial x-coordinate.
     * @param {number} y The initial y-coordinate.
     * @param {string} keyPrefix The prefix for the texture layers.
     * @param {number} layerCount The number of layers in the stack.
     */
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

    /**
     * Internal Phaser update loop for the sprite stack.
     * @param {number} _time The current time.
     * @param {number} _delta The delta time since the last frame.
     */
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

    /**
     * Sets a custom rotation for a specific layer in the stack.
     * @param {number} layerIndex The index of the layer to rotate.
     * @param {number} angle The custom rotation angle (in degrees).
     */
    setLayerRotation(layerIndex: number, angle: number) {
        this.layerRotations.set(layerIndex, angle);
    }

    /**
     * Sets the tilt offset for the sprite stack, creating a leaning effect.
     * @param {number} x The tilt amount on the x-axis.
     * @param {number} y The tilt amount on the y-axis.
     */
    setTilt(x: number, y: number) {
        this.tiltX = Phaser.Math.Linear(this.tiltX, x, 0.1);
        this.tiltY = Phaser.Math.Linear(this.tiltY, y, 0.1);
    }
}
