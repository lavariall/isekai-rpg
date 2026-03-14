import Phaser from 'phaser';

/**
 * Utility class to handle screen transitions and game state management.
 */
export class ScreenManager {
    /**
     * Transitions from one scene to another with a fade effect.
     * @param currentScene The currently active scene.
     * @param nextScene The key of the scene to transition to.
     */
    static transitionTo(currentScene: Phaser.Scene, nextScene: string): void {
        currentScene.cameras.main.fadeOut(500, 0, 0, 0);
        currentScene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            currentScene.scene.start(nextScene);
        });
    }
}
