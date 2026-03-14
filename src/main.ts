import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import { StartScreen } from './scenes/StartScreen';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [StartScreen, GameScene]
};

new Phaser.Game(config);

window.addEventListener('resize', () => {
    window.location.reload();
});
