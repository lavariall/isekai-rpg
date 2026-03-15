import Phaser from 'phaser';
import { Hero } from '../entities/EntityHero/Hero';

/**
 * Handles the spawning of the Hero entity.
 */
export class HeroSpawner {
    /**
     * Spawns the Hero in the given scene.
     * @param scene The Phaser Scene.
     * @param x The x position.
     * @param y The y position.
     * @returns The spawned Hero.
     */
    public static spawn(scene: Phaser.Scene, x: number, y: number): Hero {
        const hero = new Hero(scene, x, y);
        return hero;
    }
}
