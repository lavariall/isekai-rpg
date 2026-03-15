import Phaser from 'phaser';
import { TextureGenerator } from '../graphics/TextureGenerator';
import { Hero } from '../entities/Hero';
import { Slime } from '../entities/Slime';
import { SpriteStack } from '../entities/SpriteStack';
import { XPParticle } from '../entities/XPParticle';

/**
 * The main game scene where the action takes place.
 * Handles entity spawning, collisions, and gameplay logic.
 */
export class GameScene extends Phaser.Scene {
    private player!: Hero;
    private enemies!: Phaser.Physics.Arcade.Group;
    private obstacles!: Phaser.Physics.Arcade.StaticGroup;

    /**
     * Creates an instance of the GameScene.
     */
    constructor() {
        super('GameScene');
    }

    /**
     * Preloads all necessary assets for the game scene.
     */
    preload() {
        // Load pre-processed high-quality hero textures (background already removed)
        this.load.image('hero_layer_0', 'assets/hero/Hero_00_Boots.png');
        this.load.image('hero_layer_1', 'assets/hero/Hero_01_Waist.png');
        this.load.image('hero_layer_2', 'assets/hero/Hero_02_Lower_Body.png');
        this.load.image('hero_layer_3', 'assets/hero/Hero_03_Upper_Body.png');
        this.load.image('hero_layer_4', 'assets/hero/Hero_04_Neck.png');
        this.load.image('hero_layer_5', 'assets/hero/Hero_05_Lower_Head.png');
        this.load.image('hero_layer_6', 'assets/hero/Hero_05_Upper_Head.png');
        this.load.image('sword', 'assets/hero/Sword.png');

        this.load.image('slime_layer_0', 'assets/slime/Slime_00.png');

        // Load new Rock assets
        this.load.image('rock_v0_0', 'assets/world/Rock_00.png');
        this.load.image('rock_v1_0', 'assets/world/Rock_01.png');
        this.load.image('rock_v2_0', 'assets/world/Rock_02.png');
    }

    /**
     * Initializes the game world, entities, and physics.
     */
    create() {
        // 1. Generate procedural textures (for other entities)
        TextureGenerator.generateHeroTextures(this);
        TextureGenerator.generateSlimeTextures(this);
        TextureGenerator.generateObstacleTextures(this);
        TextureGenerator.generateXPTexture(this);
        TextureGenerator.generateWindTexture(this);
        TextureGenerator.generateSilverTexture(this);

        // 2. Set world bounds and background
        const worldSize = 2000;
        this.physics.world.setBounds(0, 0, worldSize, worldSize);

        // Grass background
        const bg = this.add.graphics();
        bg.fillStyle(0x27ae60, 1);
        bg.fillRect(0, 0, worldSize, worldSize);
        // Subtle grass details
        for (let i = 0; i < 500; i++) {
            bg.fillStyle(0x2ecc71, 0.5);
            bg.fillRect(Math.random() * worldSize, Math.random() * worldSize, 2, 2);
        }

        // 3. Create Obstacles (Rocks/Bushes)
        this.obstacles = this.physics.add.staticGroup();
        for (let i = 0; i < 40; i++) {
            const x = Phaser.Math.Between(100, worldSize - 100);
            const y = Phaser.Math.Between(100, worldSize - 100);
            const type = Math.random() > 0.5 ? 'rock' : 'bush';
            const obstacle = new SpriteStack(this, x, y, type, 12);
            this.physics.add.existing(obstacle, true); // Enable static physics body
            this.obstacles.add(obstacle as any);

            // Setup static body
            const body = (obstacle as any).body as Phaser.Physics.Arcade.StaticBody;
            body.setCircle(12, -12, -12);
        }

        // 4. Create Player
        this.player = new Hero(this, worldSize / 2, worldSize / 2);
        this.sys.updateList.add(this.player); // Register for preUpdate
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, worldSize, worldSize);

        // 5. Create Enemies
        this.enemies = this.physics.add.group({
            classType: Slime,
            runChildUpdate: true
        });

        for (let i = 0; i < 5; i++) {
            this.spawnSlime();
        }

        // 6. Collisions & Overlaps
        this.physics.add.collider(this.player, this.obstacles);
        this.physics.add.collider(this.enemies, this.obstacles);
        this.physics.add.collider(this.enemies, this.enemies);

        // Combat Overlap (Whirlwind AoE)
        this.physics.add.overlap(this.player.meleeCollider, this.enemies, (_s, e) => {
            const collider = this.player.meleeCollider;
            const slime = e as Slime;
            const sword = this.player.sword;

            if (collider.isColliderActive() && !collider.getHitEnemies().has(slime)) {
                const damage = sword.calculateDamage(this.player.stats);
                slime.takeDamage(damage);
                collider.markEnemyAsHit(slime);

                if (slime.health <= 0) {
                    this.defeatEnemy(slime);
                }
            }
        });

    }

    /**
     * Spawns a new slime enemy at a random location on the map.
     */
    spawnSlime(): void {
        const x = Phaser.Math.Between(100, 1900);
        const y = Phaser.Math.Between(100, 1900);
        // Distant from player
        if (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 300) {
            return this.spawnSlime();
        }
        const slime = new Slime(this, x, y);
        slime.setTarget(this.player);
        this.enemies.add(slime);
    }

    /**
     * Handles the defeat of an enemy, spawning particles and removing the enemy.
     * @param {Slime} slime The slime enemy that was defeated.
     */
    defeatEnemy(slime: Slime) {
        new XPParticle(this, slime.x, slime.y);
        slime.destroy();

        // Respawn after a delay
        this.time.delayedCall(3000, () => {
            this.spawnSlime();
        });
    }

    /**
     * Standard Phaser update loop.
     */
    update() {
        // Player preUpdate is called by Phaser because it's a GameObject added to scene
    }
}
