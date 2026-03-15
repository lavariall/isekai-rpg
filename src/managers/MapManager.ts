import Phaser from 'phaser';

export interface IMapObject {
    type: 'tree' | 'rock' | 'bush' | 'water' | 'sea';
    x: number;
    y: number;
    scale?: number;
}

/**
 * Manages the fixed map layout and world object instantiation.
 */
export class MapManager {
    private static readonly MAP_DATA: IMapObject[] = [
        // Borders (Sea)
        { type: 'sea', x: 400, y: 100, scale: 2 },
        { type: 'sea', x: 1200, y: 150, scale: 2 },
        
        // Lake (Water)
        { type: 'water', x: 600, y: 800, scale: 1.5 },
        { type: 'water', x: 750, y: 850, scale: 1.2 },

        // Foliage (Trees/Bushes)
        { type: 'tree', x: 300, y: 400 },
        { type: 'tree', x: 1500, y: 600 },
        { type: 'tree', x: 1000, y: 1200 },
        { type: 'bush', x: 450, y: 450 },
        { type: 'bush', x: 1400, y: 650 },

        // Rocks
        { type: 'rock', x: 500, y: 380 },
        { type: 'rock', x: 1100, y: 1150 }
    ];

    /**
     * Loads the map objects into the scene.
     */
    public static loadMap(scene: Phaser.Scene): Phaser.GameObjects.Group {
        const group = scene.add.group();

        this.MAP_DATA.forEach(obj => {
            const sprite = scene.add.sprite(obj.x, obj.y, obj.type);
            if (obj.scale) sprite.setScale(obj.scale);
            
            // Add physics if it's a solid object
            if (obj.type === 'tree' || obj.type === 'rock' || obj.type === 'water' || obj.type === 'sea') {
                scene.physics.add.existing(sprite, true);
            }

            group.add(sprite);
        });

        return group;
    }
}
