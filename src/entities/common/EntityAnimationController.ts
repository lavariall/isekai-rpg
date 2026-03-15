import Phaser from 'phaser';

/**
 * Component for managing animation states on a sprite.
 */
export class EntityAnimationController {
    private sprite: Phaser.GameObjects.Sprite;
    private currentKey: string | null = null;
    private isLocked: boolean = false;

    /**
     * Initializes the EntityAnimationController.
     * @param sprite The sprite to control.
     */
    constructor(sprite: Phaser.GameObjects.Sprite) {
        this.sprite = sprite;
    }

    /**
     * Plays an animation if it's not already playing.
     * @param key The animation key to play.
     * @param ignoreIfPlaying Whether to ignore the call if the same animation is already playing.
     */
    public play(key: string, ignoreIfPlaying: boolean = true): void {
        if (this.isLocked) return;
        
        if (ignoreIfPlaying && this.currentKey === key) return;

        this.sprite.play(key);
        this.currentKey = key;
    }

    /**
     * Plays an animation once and locks state until finished.
     * @param key The animation key to play once.
     * @param onComplete Optional callback when animation finishes.
     */
    public playOnce(key: string, onComplete?: () => void): void {
        this.isLocked = true;
        this.sprite.play(key);
        this.currentKey = key;

        this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isLocked = false;
            if (onComplete) onComplete();
        });
    }

    /**
     * Stops the current animation and shows a specific frame.
     * @param texture The texture key.
     */
    public stopAndShow(texture: string): void {
        this.isLocked = false;
        this.sprite.anims.stop();
        this.sprite.setTexture(texture);
        this.currentKey = null;
    }
}
