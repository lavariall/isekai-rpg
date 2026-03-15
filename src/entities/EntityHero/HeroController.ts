import Phaser from 'phaser';

/**
 * Handles input and movement for the Hero.
 */
export class HeroController {
    private targetBody: Phaser.Physics.Arcade.Body;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };

    /**
     * Initializes the HeroController.
     * @param _scene The parent scene.
     * @param body The physics body to control.
     */
    constructor(_scene: Phaser.Scene, body: Phaser.Physics.Arcade.Body) {
        this.targetBody = body;
        this.cursors = _scene.input.keyboard!.createCursorKeys();
        this.wasd = _scene.input.keyboard!.addKeys('W,A,S,D') as any;
    }

    /**
     * Updates the movement based on keyboard and pointer input.
     * @param speed The movement speed from HeroStatus.
     */
    public update(speed: number): void {
        let vx = 0;
        let vy = 0;

        // 1. Keyboard Input
        if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -1;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = 1;

        if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -1;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = 1;

        // 2. Pointer Input (Mouse Press / Tap)
        const pointer = this.targetBody.gameObject.scene.input.activePointer;
        if (pointer.isDown && vx === 0 && vy === 0) {
            const worldPointer = pointer.positionToCamera(this.targetBody.gameObject.scene.cameras.main) as Phaser.Math.Vector2;
            const angle = Phaser.Math.Angle.Between(this.targetBody.x, this.targetBody.y, worldPointer.x, worldPointer.y);
            vx = Math.cos(angle);
            vy = Math.sin(angle);
            
            // Stop if very close to pointer to avoid flickering
            const distance = Phaser.Math.Distance.Between(this.targetBody.x, this.targetBody.y, worldPointer.x, worldPointer.y);
            if (distance < 5) {
                vx = 0;
                vy = 0;
            }
        }

        const velocity = new Phaser.Math.Vector2(vx, vy).normalize().scale(speed);
        this.targetBody.setVelocity(velocity.x, velocity.y);
    }
}
