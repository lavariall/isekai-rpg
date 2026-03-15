import Phaser from 'phaser';
import { SceneStateManager } from '../../scenes/SceneStateManager';

/**
 * Handles interactions with world objects (pickups, portals).
 */
export class ObjectInteractionHandler {
    /**
     * Handles interacting with a portal to another scene.
     */
    public static enterPortal(currentScene: Phaser.Scene, targetSceneKey: string): void {
        console.log(`Entering portal to ${targetSceneKey}`);
        SceneStateManager.getInstance().transitionTo(currentScene, targetSceneKey);
    }

    /**
     * Handles picking up an item.
     */
    public static collectItem(itemKey: string): void {
        console.log(`Collected item: ${itemKey}`);
    }
}
