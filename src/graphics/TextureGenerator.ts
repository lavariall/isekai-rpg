import Phaser from 'phaser';

/**
 * Utility class for generating procedural textures using Canvas.
 */
export class TextureGenerator {
    /**
     * Generates a series of canvas-based textures for the hero character.
     * @param {Phaser.Scene} scene The Phaser scene to add the textures to.
     */
    static generateHeroTextures(scene: Phaser.Scene) {
        const layers = 12;
        const size = 32;

        for (let i = 0; i < layers; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d')!;

            // Draw shadow on bottom layer
            if (i === 0) {
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.beginPath();
                ctx.ellipse(size / 2, size / 2, 12, 12, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // Hero Body
            let color = '#2ecc71'; // Green (pants/tunic)
            let radius = 8;

            if (i > 4) {
                color = '#3498db'; // Blue (shirt)
            }
            if (i > 8) {
                color = '#f1c40f'; // Head/Hair/Skin
                radius = 6;
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
            ctx.fill();

            // Sword Extension (Middle layers)
            if (i >= 4 && i <= 6) {
                ctx.fillStyle = '#95a5a6'; // Gray
                ctx.fillRect(size / 2 + 6, size / 2 - 2, 12, 4);
            }

            scene.textures.addCanvas(`hero_${i}`, canvas);
        }
    }

    /**
     * Generates a series of canvas-based textures for the slime enemy.
     * @param {Phaser.Scene} scene The Phaser scene to add the textures to.
     */
    static generateSlimeTextures(scene: Phaser.Scene) {
        const layers = 10;
        const size = 32;

        for (let i = 0; i < layers; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d')!;

            const alpha = 0.6;
            const radius = 10 - (i * 0.5);

            ctx.fillStyle = `rgba(46, 204, 113, ${alpha})`;
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
            ctx.fill();

            scene.textures.addCanvas(`slime_${i}`, canvas);
        }
    }

    /**
     * Generates textures for environment obstacles like rocks and bushes.
     * @param {Phaser.Scene} scene The Phaser scene to add the textures to.
     */
    static generateObstacleTextures(scene: Phaser.Scene) {
        const layers = 12;
        const size = 32;

        // Rock
        for (let i = 0; i < layers; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d')!;

            const radius = 12 - (i * 0.8);
            if (radius > 0) {
                ctx.fillStyle = '#7f8c8d';
                ctx.beginPath();
                ctx.arc(size / 2 + (Math.sin(i) * 2), size / 2 + (Math.cos(i) * 2), radius, 0, Math.PI * 2);
                ctx.fill();
            }
            scene.textures.addCanvas(`rock_${i}`, canvas);
        }

        // Bush
        for (let i = 0; i < layers; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d')!;

            const radius = 14 - (i * 1);
            if (radius > 0) {
                ctx.fillStyle = '#27ae60';
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            scene.textures.addCanvas(`bush_${i}`, canvas);
        }
    }

    /**
     * Generates a single-pixel or small square texture for XP particles.
     * @param {Phaser.Scene} scene The Phaser scene to add the texture to.
     */
    static generateXPTexture(scene: Phaser.Scene) {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(2, 2, 4, 4);
        scene.textures.addCanvas('xp_particle', canvas);
    }

    /**
     * Generates a "Wind Slash" texture for whirlwind particles.
     * @param {Phaser.Scene} scene The Phaser scene to add the texture to.
     */
    static generateWindTexture(scene: Phaser.Scene) {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d')!;

        // Draw a glowing, fading streak
        const gradient = ctx.createRadialGradient(8, 8, 2, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); // Inner white
        gradient.addColorStop(0.5, 'rgba(52, 152, 219, 0.5)'); // Middle cyan
        gradient.addColorStop(1, 'rgba(52, 152, 219, 0)'); // Outer transparent

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(8, 8, 8, 0, Math.PI * 2);
        ctx.fill();

        scene.textures.addCanvas('wind_particle', canvas);
    }

    /**
     * Generates a "Silver Slash" texture for whirlwind particles.
     * @param {Phaser.Scene} scene The Phaser scene to add the texture to.
     */
    static generateSilverTexture(scene: Phaser.Scene) {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d')!;

        // Draw a metallic, silver glowing streak
        const gradient = ctx.createRadialGradient(8, 8, 2, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(236, 240, 241, 0.9)'); // Silver white
        gradient.addColorStop(0.5, 'rgba(189, 195, 199, 0.6)'); // Silver gray
        gradient.addColorStop(1, 'rgba(189, 195, 199, 0)'); // Transparent

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(8, 8, 8, 0, Math.PI * 2);
        ctx.fill();

        scene.textures.addCanvas('silver_particle', canvas);
    }
}
