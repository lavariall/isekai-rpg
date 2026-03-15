import Phaser from 'phaser';
import { SceneStateManager } from './SceneStateManager';

export class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload(): void {
        this.load.image('start_bg', 'assets/backgrounds/Background_Start_Screen_concept_art.png');
    }

    create(): void {
        const { width, height } = this.scale;

        // Background
        const bg = this.add.image(width / 2, height / 2, 'start_bg');
        const scale = Math.max(width / bg.width, height / bg.height);
        bg.setScale(scale).setAlpha(0.6);

        // UI
        const titleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: '"Lucida Handwriting", cursive, "Comic Sans MS"',
            fontSize: '84px',
            color: '#bdc3c7',
            stroke: '#2c3e50',
            strokeThickness: 6,
            align: 'center'
        };

        this.add.text(width / 2, height / 2 - 100, 'Isekai RPG', titleStyle).setOrigin(0.5);
        
        const hintStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ecf0f1',
            align: 'center'
        };

        this.add.text(width / 2, height - 100, 'Press Space to start', hintStyle).setOrigin(0.5);

        // Input
        this.input.keyboard?.once('keydown-SPACE', () => {
            SceneStateManager.getInstance().transitionTo(this, 'HighlandScene');
        });
    }
}
