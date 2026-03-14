import Phaser from 'phaser';

/**
 * Handles the melee weapon collider for the hero.
 * Spawns a circular collider centered on the hero to detect area-of-effect hits.
 */
export class HeroMeleWeaponCollider extends Phaser.GameObjects.Zone {
    private active_duration: number = 200; // ms, matches whirlwind
    private hitEnemies: Set<Phaser.GameObjects.GameObject> = new Set();
    private isActive: boolean = false;

    /**
     * Creates an instance of HeroMeleWeaponCollider.
     * @param {Phaser.Scene} scene The Phaser scene this collider belongs to.
     * @param {number} x Initial x-coordinate (usually hero x).
     * @param {number} y Initial y-coordinate (usually hero y).
     * @param {number} radius The radius of the area-of-effect attack.
     */
    constructor(scene: Phaser.Scene, x: number, y: number, radius: number) {
        super(scene, x, y, radius * 2, radius * 2);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setCircle(radius);
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.enable = false;
    }

    /**
     * Activates the area collider for a short duration.
     */
    public activate() {
        if (this.isActive) return;

        this.isActive = true;
        this.hitEnemies.clear();
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.enable = true;

        this.scene.time.delayedCall(this.active_duration, () => {
            this.deactivate();
        });
    }

    /**
     * Deactivates the area collider.
     */
    private deactivate() {
        this.isActive = false;
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.enable = false;
    }

    /**
     * Returns the set of enemies already hit during this activation.
     * @returns {Set<Phaser.GameObjects.GameObject>}
     */
    public getHitEnemies(): Set<Phaser.GameObjects.GameObject> {
        return this.hitEnemies;
    }

    /**
     * Marks an enemy as hit so it doesn't take damage again in the same whirlwind.
     * @param {Phaser.GameObjects.GameObject} enemy The enemy to mark.
     */
    public markEnemyAsHit(enemy: Phaser.GameObjects.GameObject) {
        this.hitEnemies.add(enemy);
    }

    /**
     * Checks if the collider is currently active.
     */
    public isColliderActive(): boolean {
        return this.isActive;
    }

    /**
     * Updates the collider's position to stay centered on the hero.
     * @param {number} x The hero's x-coordinate.
     * @param {number} y The hero's y-coordinate.
     */
    public updatePosition(x: number, y: number) {
        this.setPosition(x, y);
    }
}
