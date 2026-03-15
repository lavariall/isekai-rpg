import Phaser from 'phaser';
import { StartScene } from './scenes/StartScene';
import { HighlandScene } from './scenes/HighlandScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true
        }
    },
    scene: [StartScene, HighlandScene]
};

new Phaser.Game(config);

window.addEventListener('resize', () => {
    window.location.reload();
});
