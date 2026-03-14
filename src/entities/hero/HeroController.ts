import Phaser from 'phaser';

export class HeroController {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: { [key: string]: Phaser.Input.Keyboard.Key };
    private speed: number = 200;
    
    public movementVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
    public wantToSwing: boolean = false;

    constructor(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard!.createCursorKeys();
        this.wasd = scene.input.keyboard!.addKeys('W,A,S,D') as any;

        scene.input.keyboard!.on('keydown-SPACE', () => {
            this.wantToSwing = true;
        });
    }

    public update() {
        let vx = 0;
        let vy = 0;

        if (this.wasd.A.isDown || this.cursors.left.isDown) vx = -1;
        else if (this.wasd.D.isDown || this.cursors.right.isDown) vx = 1;

        if (this.wasd.W.isDown || this.cursors.up.isDown) vy = -1;
        else if (this.wasd.S.isDown || this.cursors.down.isDown) vy = 1;

        this.movementVector.set(vx, vy).normalize().scale(this.speed);
    }

    public consumeSwing(): boolean {
        const swinging = this.wantToSwing;
        this.wantToSwing = false;
        return swinging;
    }

    public getRawInput(): { x: number, y: number } {
        let x = 0;
        let y = 0;
        if (this.wasd.A.isDown || this.cursors.left.isDown) x = -1;
        else if (this.wasd.D.isDown || this.cursors.right.isDown) x = 1;

        if (this.wasd.W.isDown || this.cursors.up.isDown) y = -1;
        else if (this.wasd.S.isDown || this.cursors.down.isDown) y = 1;

        return { x, y };
    }
}
