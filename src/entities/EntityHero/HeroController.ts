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

    constructor(_scene: Phaser.Scene, body: Phaser.Physics.Arcade.Body) {
        this.targetBody = body;
        this.cursors = _scene.input.keyboard!.createCursorKeys();
        this.wasd = _scene.input.keyboard!.addKeys('W,A,S,D') as any;
    }

    /**
     * Updates the movement based on input.
     * @param speed The movement speed from HeroStatus.
     */
    public update(speed: number): void {
        let vx = 0;
        let vy = 0;

        if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -1;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = 1;

        if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -1;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = 1;

        const velocity = new Phaser.Math.Vector2(vx, vy).normalize().scale(speed);
        this.targetBody.setVelocity(velocity.x, velocity.y);
    }
}
