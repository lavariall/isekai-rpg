import Phaser from 'phaser';
import { Slime } from '../entities/EntitySlime/Slime';

/**
 * Handles the spawning of Slime entities.
 */
export class SlimeSpawner {
    /**
     * Spawns a Slime at a specific location.
     */
    public static spawn(scene: Phaser.Scene, x: number, y: number): Slime {
        const slime = new Slime(scene, x, y);
        return slime;
    }

    /**
     * Spawns a Slime at a random location within bounds, avoiding the hero.
     */
    public static spawnRandom(scene: Phaser.Scene, worldWidth: number, worldHeight: number, avoidX: number, avoidY: number): Slime {
        let x = Phaser.Math.Between(100, worldWidth - 100);
        let y = Phaser.Math.Between(100, worldHeight - 100);

        while (Phaser.Math.Distance.Between(x, y, avoidX, avoidY) < 300) {
            x = Phaser.Math.Between(100, worldWidth - 100);
            y = Phaser.Math.Between(100, worldHeight - 100);
        }

        return this.spawn(scene, x, y);
    }
}
