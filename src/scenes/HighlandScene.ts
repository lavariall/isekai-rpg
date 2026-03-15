import Phaser from 'phaser';
import { HeroSpawner } from '../spawners/HeroSpawner';
import { SlimeSpawner } from '../spawners/SlimeSpawner';
import { Hero } from '../entities/EntityHero/Hero';
import { Slime } from '../entities/EntitySlime/Slime';

/**
 * Main game scene in a grassland area with seasonal variation.
 */
export class HighlandScene extends Phaser.Scene {
    private hero!: Hero;
    private enemies!: Phaser.Physics.Arcade.Group;
    private season: string = 'spring';

    constructor() {
        super('HighlandScene');
    }

    init() {
        const seasons = ['spring', 'summer', 'winter']; // Autumn missing in assets
        this.season = seasons[Phaser.Math.Between(0, seasons.length - 1)];
        console.log(`Setting season to: ${this.season}`);
    }

    preload() {
        // Hero assets
        for (let i = 0; i < 20; i++) {
            const frameNum = i.toString().padStart(3, '0');
            this.load.image(`hero_idle_${i}`, `assets/entities/hero/Hero_idle_animation/frame_${frameNum}.png`);
        }
        this.load.image('sword', 'assets/entities/hero/Sword.png');

        // Slime assets
        this.load.image('slime_layer_0', 'assets/entities/slime/Slime_00.png');

        // Seasonal World assets
        this.load.image('rock', `assets/world/${this.season}/Rock.png`);
        this.load.image('bush', `assets/world/${this.season}/Bush.png`);
    }

    create() {
        const worldSize = 2000;
        this.physics.world.setBounds(0, 0, worldSize, worldSize);

        // Allow right-click for combat
        this.input.mouse?.disableContextMenu();

        // Pseudo 3D Background (Color based on season)
        const bgColors: { [key: string]: number } = {
            spring: 0x27ae60,
            summer: 0x2ecc71,
            autumn: 0xd35400,
            winter: 0xbdc3c7
        };
        
        const graphics = this.add.graphics();
        graphics.fillStyle(bgColors[this.season], 1);
        graphics.fillRect(0, 0, worldSize, worldSize);

        // Spawn Hero
        this.hero = HeroSpawner.spawn(this, worldSize / 2, worldSize / 2);
        this.cameras.main.startFollow(this.hero, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, worldSize, worldSize);

        // Spawn Enemies
        this.enemies = this.physics.add.group({
            classType: Slime,
            runChildUpdate: true
        });

        for (let i = 0; i < 10; i++) {
            const slime = SlimeSpawner.spawnRandom(this, worldSize, worldSize, this.hero.x, this.hero.y);
            slime.setTarget(this.hero);
            this.enemies.add(slime);
        }

        // Setup Interactions
        this.physics.add.overlap(this.hero.meleeCollider, this.enemies, (_h, e) => {
            const slime = e as Slime;
            this.hero.meleeCollider.onImpact(slime.status);
            
            if (slime.status.health <= 0) {
                slime.destroy();
                // Logic for respawn or XP could go here
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
    }

    update() {
        // Pseudo-3D Z-Sorting
        this.children.each((child: any) => {
            if (child.y) {
                child.setDepth(child.y);
            }
        });
    }
}
