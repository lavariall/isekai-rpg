import Phaser from 'phaser';

/**
 * Manages game scenes and shared data between them.
 */
export class SceneStateManager {
    private static instance: SceneStateManager;
    private sharedState: Map<string, any> = new Map();

    private constructor() {}

    /**
     * Gets the singleton instance of SceneStateManager.
     */
    public static getInstance(): SceneStateManager {
        if (!SceneStateManager.instance) {
            SceneStateManager.instance = new SceneStateManager();
        }
        return SceneStateManager.instance;
    }

    /**
     * Saves a piece of data to the shared state.
     * @param key The key to store the data under.
     * @param value The value to store.
     */
    public setData(key: string, value: any): void {
        this.sharedState.set(key, value);
    }

    /**
     * Retrieves data from the shared state.
     * @param key The key to look up.
     * @returns The value, or undefined if not found.
     */
    public getData(key: string): any {
        return this.sharedState.get(key);
    }

    /**
     * Transitions from the current scene to a new one.
     * @param currentScene The current Phaser Scene.
     * @param targetKey The key of the scene to switch to.
     * @param data Optional data to pass to the next scene's init/create.
     */
    public transitionTo(currentScene: Phaser.Scene, targetKey: string, data?: any): void {
        currentScene.cameras.main.fadeOut(500, 0, 0, 0);
        currentScene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            currentScene.scene.start(targetKey, data);
        });
    }
}
