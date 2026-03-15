import Phaser from 'phaser';
import { HeroSpawner } from '../spawners/HeroSpawner';
import { SlimeSpawner } from '../spawners/SlimeSpawner';
import { Hero } from '../entities/EntityHero/Hero';
import { Slime } from '../entities/EntitySlime/Slime';
import { AnimationManager } from '../managers/AnimationManager';
import { MapManager } from '../managers/MapManager';
import { GameStateManager } from '../managers/GameStateManager';

/**
 * Main game scene in a grassland area with seasonal variation.
 * Handles isometric rendering, seasonal assets, and the hunter game loop.
 */
export class HighlandScene extends Phaser.Scene {
    private hero!: Hero;
    private enemies!: Phaser.Physics.Arcade.Group;
    private worldObjects!: Phaser.GameObjects.Group;
    private season: string = 'spring';
    private gameState = GameStateManager.getInstance();

    /**
     * Initializes the HighlandScene.
     */
    constructor() {
        super('HighlandScene');
    }

    /**
     * Scene initialization logic.
     */
    init() {
        const seasons = ['spring', 'summer', 'winter']; // Autumn missing in assets
        this.season = seasons[Phaser.Math.Between(0, seasons.length - 1)];
        console.log(`Setting season to: ${this.season}`);
    }

    /**
     * Preloads assets required for the HighlandScene.
     */
    preload() {
        // Hero animations
        AnimationManager.preloadAnimation(this, {
            key: 'hero_idle',
            folderPath: 'assets/entities/hero/hero_idle_animation',
            frameCount: 20
        });

        this.load.image('sword', 'assets/items/Sword.png');

        // Slime assets
        this.load.image('slime_layer_0', 'assets/entities/slime/Slime.png');

        // Seasonal World assets
        const assets = ['Rock', 'Bush', 'Tree', 'Water', 'Sea'];
        assets.forEach(asset => {
            this.load.image(asset.toLowerCase(), `assets/world_objects/${this.season}/${asset}.png`);
        });
        
        const foliage = this.season === 'winter' ? 'Snow' : 'Grass';
        this.load.image('foliage', `assets/world_objects/${this.season}/${foliage}.png`);
    }

    /**
     * Creates and initializes the game objects.
     */
    /**
     * Creates and initializes the game objects.
     */
    create() {
        this.gameState.startSession();

        // Create Hero animations
        AnimationManager.createAnimation(this, {
            key: 'hero_idle',
            folderPath: 'assets/entities/hero/hero_idle_animation',
            frameCount: 20,
            frameRate: 15
        });

        const worldWidth = 2000;
        const worldHeight = 1500;
        const horizonY = 300; // Horizon line Y position

        this.physics.world.setBounds(0, horizonY, worldWidth, worldHeight - horizonY);

        // Allow right-click for combat
        this.input.mouse?.disableContextMenu();

        // Sky and Horizon
        const skyGfx = this.add.graphics();
        skyGfx.setScrollFactor(0);
        
        // Sky Gradient (Top to Horizon)
        const skyColorStart = 0x87ceeb; // Sky blue
        const skyColorEnd = 0xffffff;   // Horizon white
        
        // Draw sky
        skyGfx.fillGradientStyle(skyColorStart, skyColorStart, skyColorEnd, skyColorEnd, 1);
        skyGfx.fillRect(0, 0, this.scale.width, horizonY);

        // Draw ground (Color based on season)
        const bgColors: { [key: string]: number } = {
            spring: 0x27ae60,
            summer: 0x2ecc71,
            autumn: 0xd35400,
            winter: 0xbdc3c7
        };
        
        const groundGfx = this.add.graphics();
        groundGfx.fillStyle(bgColors[this.season], 1);
        groundGfx.fillRect(0, horizonY, worldWidth, worldHeight - horizonY);

        // Load Fixed Map
        this.worldObjects = MapManager.loadMap(this);

        // Spawn Hero at a safe starting point
        this.hero = HeroSpawner.spawn(this, worldWidth / 2, worldHeight / 2 + 200);
        this.cameras.main.startFollow(this.hero, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

        // Spawn Enemies
        this.enemies = this.physics.add.group({
            classType: Slime,
            runChildUpdate: true
        });

        for (let i = 0; i < 15; i++) {
            const x = Phaser.Math.Between(100, worldWidth - 100);
            const y = Phaser.Math.Between(horizonY + 100, worldHeight - 100);
            const slime = SlimeSpawner.spawn(this, x, y);
            slime.setTarget(this.hero);
            this.enemies.add(slime);
        }

        // Setup Collisions
        this.physics.add.collider(this.hero, this.worldObjects);
        this.physics.add.collider(this.enemies, this.worldObjects);

        // Combat Interactions
        this.physics.add.overlap(this.hero.meleeCollider, this.enemies, (_h, e) => {
            const slime = e as Slime;
            this.hero.meleeCollider.onImpact(slime.status);
            
            if (slime.status.health <= 0) {
                this.gameState.incrementScore();
                slime.destroy();
                // Respawn logic
                this.time.delayedCall(3000, () => {
                    const x = Phaser.Math.Between(100, worldWidth - 100);
                    const y = Phaser.Math.Between(horizonY + 100, worldHeight - 100);
                    const newSlime = SlimeSpawner.spawn(this, x, y);
                    newSlime.setTarget(this.hero);
                    this.enemies.add(newSlime);
                });
            }
        });

        this.physics.add.overlap(this.enemies, this.hero, (e, _h) => {
            const slime = e as Slime;
            slime.meleeCollider.setDamage(slime.status.attackDamage);
            slime.meleeCollider.onImpact(this.hero.status);
        });

        // Key for melee attack
        this.input.keyboard?.on('keydown-F', () => {
            this.hero.attackMelee();
        });

        // Simple HUD
        this.createHUD();
    }

    private hudText!: Phaser.GameObjects.Text;

    private createHUD() {
        this.hudText = this.add.text(20, 20, 'Slimes Hunted: 0', {
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setScrollFactor(0).setDepth(10000);
    }

    /**
     * Main update loop for depth sorting and perspective logic.
     */
    update() {
        // Pseudo-3D Z-Sorting and Perspective Scaling
        const horizonY = 300;
        const maxScale = 1.0;
        const minScale = 0.4;

        this.children.each((child: any) => {
            // Only apply perspective and depth to world objects (scrollFactor == 1)
            if (child.y && child.setDepth && child.scrollFactorX !== 0) {
                child.setDepth(child.y);

                // Perspective Scaling based on Y position relative to horizon
                if (child.y > horizonY) {
                    const factor = (child.y - horizonY) / (this.physics.world.bounds.height);
                    const scale = minScale + (maxScale - minScale) * Phaser.Math.Clamp(factor, 0, 1);
                    
                    // Don't scale ground or UI
                    if (child.type !== 'Graphics') {
                        child.setScale(scale);
                    }
                }
            } else if (child.scrollFactorX === 0 && child.setDepth) {
                // Ensure HUD stays on top
                child.setDepth(10000);
            }
        });

        // Update HUD
        if (this.hudText) {
            this.hudText.setText(`Slimes Hunted: ${this.gameState.getScore()}\nTime: ${this.gameState.getElapsedTime()}s`);
        }
    }
}
