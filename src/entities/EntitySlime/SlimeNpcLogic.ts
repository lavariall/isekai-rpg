import Phaser from 'phaser';

/**
 * Handles AI/logic for the Slime NPC.
 */
export class SlimeNpcLogic {
    private scene: Phaser.Scene;
    private targetBody: Phaser.Physics.Arcade.Body;
    private targetEntity: Phaser.GameObjects.Components.Transform | null = null;

    constructor(scene: Phaser.Scene, body: Phaser.Physics.Arcade.Body) {
        this.scene = scene;
        this.targetBody = body;
    }

    /**
     * Sets a target for the slime to follow.
     */
    public setTarget(target: Phaser.GameObjects.Components.Transform): void {
        this.targetEntity = target;
    }

    /**
     * Updates the AI behavior.
     * @param speed The movement speed.
     */
    public update(speed: number): void {
        if (!this.targetEntity) return;

        const distance = Phaser.Math.Distance.Between(
            this.targetBody.x, this.targetBody.y,
            this.targetEntity.x, this.targetEntity.y
        );

        if (distance < 400 && distance > 20) {
            this.scene.physics.moveToObject(this.targetBody.gameObject, this.targetEntity, speed);
        } else {
            this.targetBody.setVelocity(0, 0);
        }
    }
}
