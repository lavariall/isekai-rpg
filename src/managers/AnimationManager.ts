import Phaser from 'phaser';

/**
 * Data required to create a folder-based frame animation.
 */
export interface IAnimationData {
    /** The unique key for the animation */
    key: string;
    /** The relative path to the folder containing frames */
    folderPath: string;
    /** Total number of frames in the animation */
    frameCount: number;
    /** Optional playback speed (default: 10) */
    frameRate?: number;
    /** Optional number of repeats (-1 for infinite) */
    repeat?: number;
    /** Optional frame filename prefix (default: 'frame_') */
    prefix?: string;
    /** Optional frame filename suffix (default: '') */
    suffix?: string;
    /** Optional zero padding for frame numbers (default: 3) */
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
    }
}
