import Phaser from 'phaser';

export class TextureGenerator {
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
                ctx.ellipse(size/2, size/2, 12, 12, 0, 0, Math.PI * 2);
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
            ctx.arc(size/2, size/2, radius, 0, Math.PI * 2);
            ctx.fill();

            // Sword Extension (Middle layers)
            if (i >= 4 && i <= 6) {
                ctx.fillStyle = '#95a5a6'; // Gray
                ctx.fillRect(size/2 + 6, size/2 - 2, 12, 4);
            }

            scene.textures.addCanvas(`hero_${i}`, canvas);
        }
    }

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
            ctx.arc(size/2, size/2, radius, 0, Math.PI * 2);
            ctx.fill();

            scene.textures.addCanvas(`slime_${i}`, canvas);
        }
    }

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
                 ctx.arc(size/2 + (Math.sin(i) * 2), size/2 + (Math.cos(i) * 2), radius, 0, Math.PI * 2);
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
                 ctx.arc(size/2, size/2, radius, 0, Math.PI * 2);
                 ctx.fill();
            }
            scene.textures.addCanvas(`bush_${i}`, canvas);
        }
    }

    static generateXPTexture(scene: Phaser.Scene) {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(2, 2, 4, 4);
        scene.textures.addCanvas('xp_particle', canvas);
    }
}
