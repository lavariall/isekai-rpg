import type { IDamageable } from './IDamageable';

/**
 * Abstract class for entity-based collision objects (weapons, traps, etc.).
 */
export abstract class EntityCollider extends Phaser.GameObjects.Rectangle {
    protected isHandlingCollision: boolean = false;
    protected hitEnemies: Set<IDamageable> = new Set();

    /**
     * Creates an instance of EntityCollider.
     * @param scene The Phaser Scene.
     * @param x The x position.
     * @param y The y position.
     * @param width The width of the collider.
     * @param height The height of the collider.
     */
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height, 0xff0000, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    }

    /**
     * Called when the collider hits a damageable target.
     * @param target The target that was hit.
     */
    abstract onImpact(target: IDamageable): void;

    /**
     * Resets the collider state for a new attack.
     */
    public reset(): void {
        this.hitEnemies.clear();
    }

    /**
     * Checks if a target has already been hit in this collision cycle.
     * @param target The target to check.
     * @returns True if already hit.
     */
    protected hasHit(target: IDamageable): boolean {
        return this.hitEnemies.has(target);
    }

    /**
     * Marks a target as hit.
     * @param target The target to mark.
     */
    protected markHit(target: IDamageable): void {
        this.hitEnemies.add(target);
    }
}
