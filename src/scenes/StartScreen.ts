import Phaser from 'phaser';
import { ScreenManager } from '../utilities/ScreenManager';

/**
 * The introductory screen that appears when the game starts.
 */
export class StartScreen extends Phaser.Scene {
    /**
     * Creates an instance of the StartScreen.
     */
    constructor() {
        super('StartScreen');
    }

    /**
     * Preloads the background image.
     */
    preload(): void {
        this.load.image('start_bg', 'assets/backgrounds/Background_Start_Screen_concept_art.png');
    }

    /**
     * Sets up the start screen UI elements.
     */
    create(): void {
        const { width, height } = this.scale;

        // 1. Background
        const bg = this.add.image(width / 2, height / 2, 'start_bg');

        // Scale background to cover screen
        const scale = Math.max(width / bg.width, height / bg.height);
        bg.setScale(scale).setAlpha(0.6); // Slightly dimmed for readability

        // 2. Titles with cursive styling
        const titleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: '"Lucida Handwriting", cursive, "Comic Sans MS"',
            fontSize: '84px',
            color: '#bdc3c7',
            stroke: '#2c3e50',
            strokeThickness: 6,
            align: 'center'
        };

        const title = this.add.text(width / 2, height / 2 - 100, 'Isekai RPG', titleStyle)
            .setOrigin(0.5)
            .setAlpha(0);

        const subtitleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            ...titleStyle,
            fontSize: '48px',
            strokeThickness: 4
        };

        const subtitle = this.add.text(width / 2, height / 2, 'Slime Hunter', subtitleStyle)
            .setOrigin(0.5)
            .setAlpha(0);

        // 3. Hint
        const hintStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ecf0f1',
            align: 'center'
        };

        const hint = this.add.text(width / 2, height - 100, 'Press Space to start the Game', hintStyle)
            .setOrigin(0.5)
            .setAlpha(0);

        // 4. Reveal Animations
        this.tweens.add({
            targets: title,
            alpha: 1,
            y: title.y + 20,
            duration: 1500,
            ease: 'Power2'
        });

        this.tweens.add({
            targets: subtitle,
            alpha: 1,
            y: subtitle.y + 20,
            duration: 1500,
            delay: 500,
            ease: 'Power2'
        });

        this.tweens.add({
            targets: hint,
            alpha: 1,
            duration: 1000,
            delay: 1500,
            yoyo: true,
            repeat: -1
        });

        // 5. Input Handling
        this.input.keyboard?.once('keydown-SPACE', () => {
            ScreenManager.transitionTo(this, 'GameScene');
        });
    }
}
