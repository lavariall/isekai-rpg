import Phaser from 'phaser';
import { TextureGenerator } from '../graphics/TextureGenerator';
import { Hero } from '../entities/Hero';
import { Slime } from '../entities/Slime';
import { SpriteStack } from '../entities/SpriteStack';
import { XPParticle } from '../entities/XPParticle';

export class GameScene extends Phaser.Scene {
    private player!: Hero;
    private enemies!: Phaser.Physics.Arcade.Group;
    private obstacles!: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super('GameScene');
    }

    preload() {
        // Textures are generated in create() using TextureGenerator
    }

    create() {
        // 1. Generate procedural textures
        TextureGenerator.generateHeroTextures(this);
        TextureGenerator.generateSlimeTextures(this);
        TextureGenerator.generateObstacleTextures(this);
        TextureGenerator.generateXPTexture(this);

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
            this.obstacles.add(obstacle as any);
            // Setup static body
            const body = (obstacle as any).body as Phaser.Physics.Arcade.StaticBody;
            body.setCircle(12, -12, -12);
        }

        // 4. Create Player
        this.player = new Hero(this, worldSize / 2, worldSize / 2);
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

        // Combat Overlap (Sword swing)
        this.physics.add.overlap(this.player, this.enemies, (p, e) => {
            if (this.player.isSwinging()) {
                this.defeatEnemy(e as Slime);
            }
        });
    }

    spawnSlime() {
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

    defeatEnemy(slime: Slime) {
        new XPParticle(this, slime.x, slime.y);
        slime.destroy();
        
        // Respawn after a delay
        this.time.delayedCall(3000, () => {
             this.spawnSlime();
        });
    }

    update() {
        // Player preUpdate is called by Phaser because it's a GameObject added to scene
    }
}
