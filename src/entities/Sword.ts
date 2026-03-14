import Phaser from 'phaser';

/**
 * Represents a sword weapon that can be swung by the hero.
 * Handles swing animations and positioning relative to the hero.
 */
export class Sword extends Phaser.GameObjects.Sprite {
    private swinging: boolean = false;
    private swingProgress: number = 0;
    private heroX: number = 0;
    private heroY: number = 0;
    private baseAngle: number = 0;
    private readonly SWING_DURATION: number = 300; // ms
    private readonly SWING_RADIUS: number = 100; // degrees

    /**
     * Creates an instance of the Sword.
     * @param {Phaser.Scene} scene The Phaser scene this sword belongs to.
     * @param {number} x The initial x-coordinate.
     * @param {number} y The initial y-coordinate.
     */
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'sword');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setAlpha(0); // Hidden by default
        this.setScale(1.5); // 50% bigger
        this.setOrigin(1, 0.5); // Pivot at the handle (right side of asset)

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);
        // Hitbox should be the size of the blade, scaled
        body.setSize(48, 15); 
    }

    /**
     * Initiates a sword swing animation.
     * @param {number} baseAngle The angle (in degrees) from which the swing starts.
     */
    public swing(baseAngle: number) {
        if (this.swinging) return;

        this.swinging = true;
        this.swingProgress = 0;
        this.setAlpha(1);
        this.baseAngle = baseAngle;
    }

    /**
     * Internal Phaser update loop for the sword.
     * @param {number} _time The current time.
     * @param {number} delta The delta time since the last frame.
     */
    preUpdate(_time: number, delta: number) {
        if (this.swinging) {
            this.swingProgress += delta;

            const t = Math.min(this.swingProgress / this.SWING_DURATION, 1);

            // Sweep from -50 to +50 degrees around the baseAngle
            const currentTheta = this.baseAngle - (this.SWING_RADIUS / 2) + (t * this.SWING_RADIUS);

            const distance = 24; // Swing out a bit further for visual impact
            const rad = Phaser.Math.DegToRad(currentTheta);

            this.setPosition(
                this.heroX + Math.cos(rad) * distance,
                this.heroY + Math.sin(rad) * distance
            );

            // Asset points LEFT at angle 0. 
            // To point in direction currentTheta (away from hero), add 180.
            this.angle = currentTheta + 180;

            if (t >= 1) {
                this.swinging = false;
                this.setAlpha(0);
            }
        }
    }

    /**
     * Checks if the sword is currently in the middle of a swing animation.
     * @returns {boolean} True if swinging, false otherwise.
     */
    public isSwinging(): boolean {
        return this.swinging;
    }

    /**
     * Updates the sword's position and base angle based on the hero's position.
     * @param {number} x The x-coordinate of the hero.
     * @param {number} y The y-coordinate of the hero.
     * @param {number} offsetAngle The current angle of the hero's graphics.
     */
    public updatePosition(x: number, y: number, offsetAngle: number) {
        this.heroX = x;
        this.heroY = y;

        if (!this.swinging) {
            this.baseAngle = offsetAngle;
            const distance = 16;
            const rad = Phaser.Math.DegToRad(offsetAngle);
            this.setPosition(
                x + Math.cos(rad) * distance,
                y + Math.sin(rad) * distance
            );

            // Default orientation points away from hero
            this.angle = offsetAngle + 180;
        }
    }
}


