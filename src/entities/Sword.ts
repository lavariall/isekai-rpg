import Phaser from 'phaser';
import { HeroStats } from './hero/HeroStats';
import { WhirlwindParticle } from './WhirlwindParticle';

/**
 * Represents a sword weapon that can be swung by the hero.
 * Handles swing animations and positioning relative to the hero.
 */
export class Sword extends Phaser.GameObjects.Sprite {
    private swinging: boolean = false;
    private swingProgress: number = 0;
    private heroX: number = 0;
    private heroY: number = 0;
    private baseAngle: number = 0;
    private lastParticleTime: number = 0;
    private readonly PARTICLE_INTERVAL: number = 16; // Spawn every ~frame during swing
    private readonly CENTER_OFFSET_X: number = -4; // Subtle centering
    private readonly CENTER_OFFSET_Y: number = -4; // Subtle centering
    private readonly SWING_DURATION: number = 200; // Faster whirlwind
    private readonly SWING_RADIUS: number = 360; // WHIRLWIND!
    public hitEnemies: Set<Phaser.GameObjects.GameObject> = new Set();

    // Sword Stats & Requirements
    public damage: number = 5;
    public required_strength: number = 10;
    public magic_damage: number = 0;
    public required_magic_power: number = 10;
    public required_agility: number = 10;


    /**
     * Creates an instance of the Sword.
     * @param {Phaser.Scene} scene The Phaser scene this sword belongs to.
     * @param {number} x The initial x-coordinate.
     * @param {number} y The initial y-coordinate.
     */
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'sword');
        scene.add.existing(this);

        this.setAlpha(0); // Hidden by default
        this.setScale(1.5);
        this.setOrigin(1, 0.5); // Handle pivot for the whirlwind

        // Register for preUpdate so swing math actually runs
        scene.sys.updateList.add(this);
    }


    /**
     * Initiates a whirlwind animation.
     * @param {number} baseAngle The angle (in degrees) from which the swing starts.
     */
    public swing(baseAngle: number) {
        if (this.swinging) return;

        this.swinging = true;
        this.swingProgress = 0;
        this.setAlpha(1);
        this.baseAngle = baseAngle;
    }


    /**
     * Internal Phaser update loop for the sword.
     * @param {number} _time The current time.
     * @param {number} delta The delta time since the last frame.
     */
    preUpdate(time: number, delta: number) {
        if (this.swinging) {
            this.swingProgress += delta;

            const t = Math.min(this.swingProgress / this.SWING_DURATION, 1);

            // 360-degree sweep starting from the current orientation
            const currentTheta = this.baseAngle + (t * this.SWING_RADIUS);

            const distance = 40; // Closer for whirlwind effect
            const rad = Phaser.Math.DegToRad(currentTheta);

            this.setPosition(
                this.heroX + Math.cos(rad) * distance,
                this.heroY + Math.sin(rad) * distance
            );

            this.angle = currentTheta + 180;

            // --- PARTICLE EMISSION ---
            if (time > this.lastParticleTime + this.PARTICLE_INTERVAL) {
                // Layer 1: Cyan Wind Slash at blade tip
                const cyanDist = distance + 30;
                new WhirlwindParticle(
                    this.scene,
                    this.heroX + Math.cos(rad) * cyanDist,
                    this.heroY + Math.sin(rad) * cyanDist,
                    this.angle,
                    'wind_particle'
                );

                // Layer 2: Silver Tail Swipe at outer hitbox edge (radius 140)
                const silverDist = 140;
                new WhirlwindParticle(
                    this.scene,
                    this.heroX + Math.cos(rad) * silverDist,
                    this.heroY + Math.sin(rad) * silverDist,
                    this.angle,
                    'silver_particle'
                );

                this.lastParticleTime = time;
            }

            if (t >= 1) {
                this.swinging = false;
                this.setAlpha(0);
            }
        }
    }

    /**
     * Checks if the sword is currently in the middle of a swing animation.
     * @returns {boolean} True if swinging, false otherwise.
     */
    public isSwinging(): boolean {
        return this.swinging;
    }

    /**
     * Updates the sword's position and base angle based on the hero's position.
     * @param {number} x The x-coordinate of the hero.
     * @param {number} y The y-coordinate of the hero.
     * @param {number} offsetAngle The current angle of the hero's graphics.
     */
    public updatePosition(x: number, y: number, offsetAngle: number) {
        this.heroX = x + this.CENTER_OFFSET_X;
        this.heroY = y + this.CENTER_OFFSET_Y;

        if (!this.swinging) {
            // WHIRLWIND: Purely visual update for position
            this.baseAngle = offsetAngle;
            const distance = 40; 
            const rad = Phaser.Math.DegToRad(offsetAngle);
            this.setPosition(
                this.heroX + Math.cos(rad) * distance,
                this.heroY + Math.sin(rad) * distance
            );

            this.angle = offsetAngle + 180;
        }
    }

    /**
     * Calculates the damage output based on the hero's stats.
     * Formula: (HeroStrength / ReqStrength) * HeroStrength * SwordDamage + ...
     * @param {HeroStats} stats The hero's statistics.
     * @returns {number} The calculated damage.
     */
    public calculateDamage(stats: HeroStats): number {
        let physicalDamage = 0;
        if (this.required_strength > 0) {
            physicalDamage = (stats.strength / this.required_strength) * stats.strength * this.damage;
        }

        let magicDamage = 0;
        if (this.required_magic_power > 0) {
            magicDamage = (stats.magicPower / this.required_magic_power) * stats.magicPower * this.magic_damage;
        }

        let agilityDamage = 0;
        if (this.required_agility > 0) {
            agilityDamage = (stats.agility / this.required_agility) * stats.agility * this.damage;
        }

        return physicalDamage + magicDamage + agilityDamage;
    }
}


