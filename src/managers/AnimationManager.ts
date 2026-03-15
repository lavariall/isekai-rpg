import Phaser from 'phaser';

export interface IAnimationData {
    key: string;
    folderPath: string;
    frameCount: number;
    frameRate?: number;
    repeat?: number;
    prefix?: string;
    suffix?: string;
    zeroPad?: number;
}

/**
 * Utility for handling folder-based frame animations in Phaser.
 */
export class AnimationManager {
    /**
     * Preloads images for a specific animation.
     */
    public static preloadAnimation(scene: Phaser.Scene, config: IAnimationData): void {
        const prefix = config.prefix || 'frame_';
        const suffix = config.suffix || '';
        const zeroPad = config.zeroPad || 3;

        for (let i = 0; i < config.frameCount; i++) {
            const frameNum = i.toString().padStart(zeroPad, '0');
            const frameKey = `${config.key}_${i}`;
            const path = `${config.folderPath}/${prefix}${frameNum}${suffix}.png`;
            console.log(`Preloading frame: ${frameKey} from ${path}`);
            scene.load.image(frameKey, path);
        }
    }

    /**
     * Creates an animation in the global animation manager.
     */
    public static createAnimation(scene: Phaser.Scene, config: IAnimationData): Phaser.Animations.Animation | false {
        const frames = [];
        for (let i = 0; i < config.frameCount; i++) {
            frames.push({ key: `${config.key}_${i}` });
        }

        return scene.anims.create({
            key: config.key,
            frames: frames,
            frameRate: config.frameRate || 10,
            repeat: config.repeat !== undefined ? config.repeat : -1
        });
        console.log(`Created animation: ${config.key}`);
        return anim;
    }
}
